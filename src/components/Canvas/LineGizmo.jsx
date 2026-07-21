import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { GRID_SIZE } from './useGrid.js'
import { getPillCssStyle } from './pillStyle.js'
import { getConns, walkHierarchy, collectSnapVertices, collectMeasureAffected, findWallBodyNear } from './wallGraph.js'

const SNAP_RAD = 3 * Math.PI / 180

const EP_SNAP_SCREEN_PX    = 10  // screen pixels within which endpoint-to-endpoint snapping kicks in
const BODY_SNAP_SCREEN_PX  = 10  // screen pixels within which endpoint-onto-wall-body snapping (auto-split) kicks in
const ALIGN_SNAP_SCREEN_PX = 8  // screen pixels within which vertex alignment snapping kicks in

// Endpoint-handle (bol) straal: schaalt mee met zoom (HANDLE_RADIUS_BASE / zoom),
// geklemd tussen MIN en MAX zodat hij nooit te klein (onbruikbaar) of te groot wordt.
const HANDLE_RADIUS_BASE = 7
const HANDLE_RADIUS_MIN  = 2
const HANDLE_RADIUS_MAX  = 8
// Extra hit-marge rondom de zichtbare bol (stage-eenheden) — puur voor het
// raken/pakken van de handle, verandert niets aan het uiterlijk. Groter dan
// de bol zelf zodat per ongeluk een muurlijn pakken i.p.v. de hinge minder
// snel gebeurt.
const HANDLE_HIT_STROKE_WIDTH = 26

// eslint-disable-next-line no-unused-vars
export default function LineGizmo({ node, stageRef, mainLayerRef, onEndpointDragMove, onEndpointDragEnd, onEndpointSnap, onEndpointBodySnap, onEndpointCollapse, onMeasureConfirm, onMeasureDelete, snapEnabledRef, version, autoEditRef, showPills = true, pillStyle }) {
  const [, setVersion] = useState(0)
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputValueRef = useRef('')
  const nodeRef = useRef(node)
  nodeRef.current = node
  const circlesRef = useRef([])
  const highlightLineRef = useRef(null)
  const moveNeighborLinesRef = useRef(new Map())  // nodeId -> oranje overlay-lijn, tijdens maatinvoer
  const gizmoLayerRef = useRef(null)
  const rafRef = useRef(null)
  const snapIndicatorRef = useRef(null)
  const xAlignIndicatorRef = useRef(null)  // pink vertical guide for X alignment snap
  const yAlignIndicatorRef = useRef(null)  // pink horizontal guide for Y alignment snap
  const snapTargetRef = useRef(null)       // { kind: 'vertex', nodeId, ep } | { kind: 'body', hostId, x, y } | null
  const activeDragRef = useRef(null)       // 0 | 1 | null — which endpoint is being dragged

  // Wisselt welk eindpunt het anker is tijdens maatinvoer (5.2) — zelfde
  // effect als tikken op het ankerpunt (zie onUp hieronder), nu ook via de
  // draai-richting-knop naast het invoerveld.
  function swapMeasureAnchor() {
    if (!node) return
    const anchorEp = node._measureAnchorEp ?? 0
    node._measureAnchorEp = 1 - anchorEp
    setVersion(v => v + 1)
  }

  function removeSnapIndicator(layer) {
    if (snapIndicatorRef.current) {
      snapIndicatorRef.current.destroy()
      snapIndicatorRef.current = null
      layer?.batchDraw()
    }
  }

  function removeAlignIndicators(layer) {
    if (xAlignIndicatorRef.current) { xAlignIndicatorRef.current.destroy(); xAlignIndicatorRef.current = null }
    if (yAlignIndicatorRef.current) { yAlignIndicatorRef.current.destroy(); yAlignIndicatorRef.current = null }
    layer?.batchDraw()
  }

  // Flush pending measure edit when the gizmo unmounts (e.g. user clicks stage to deselect
  // while the input is focused — onBlur may not fire because the DOM node is removed first).
  const editingRef = useRef(false)
  editingRef.current = editing
  useEffect(() => {
    return () => {
      if (editingRef.current) {
        const v = parseFloat(inputValueRef.current)
        // Pass nodeRef.current explicitly — lineGizmoNodeRef in CanvasView is already
        // cleared synchronously by setGizmoNode(null) before this cleanup runs.
        if (!isNaN(v)) {
          if (v > 0.01) onMeasureConfirm?.(v, nodeRef.current)
          else onMeasureDelete?.(nodeRef.current)
        }
      }
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // Open edit mode immediately if the gizmo was triggered by a pill tap.
  useEffect(() => {
    if (autoEditRef?.current) {
      autoEditRef.current = false
      const pts = node.points()
      const v = (Math.hypot(pts[2] - pts[0], pts[3] - pts[1]) / GRID_SIZE).toFixed(2)
      inputValueRef.current = v
      setInputValue(v)
      setEditing(true)
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // rAF loop: rerender wanneer stage/node positie verandert zodat overlay in sync blijft
  useEffect(() => {
    let prevKey = ''
    function tick() {
      const stage = stageRef.current
      const layer = mainLayerRef.current
      if (!stage || !node || !layer) return
      const hNodes = walkHierarchy(node, layer)
      const nodesKey = hNodes.map(n => {
        const pts = n.points()
        return `${n.id()}:${n.x()},${n.y()},${pts.join(',')}`
      }).join('|')
      const key = `${stage.x()},${stage.y()},${stage.scaleX()}|${nodesKey}`
      if (key !== prevKey) { prevKey = key; setVersion(v => v + 1) }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [node, stageRef, mainLayerRef])

  // Eigen laag voor de bewerk-handles (bollen/kruisjes/geselecteerde-lijn-
  // highlight), boven ZoneFillOverlay's vlak-vulling. ZoneFillOverlay en
  // HingeDecorations zetten hun canvas op een expliciete CSS z-index (5 resp.
  // 6) om Konva's DOM-volgorde te overroepen (frozenCanvas-fix) — zonder een
  // eigen, nóg hogere z-index hier zouden de handles daar governance-loos
  // achter vallen zodra een vlak een kleur heeft. Leeft zolang de gizmo zelf
  // gemount is (dus alleen tijdens edit mode).
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const gizmoLayer = new Konva.Layer({ name: 'lineGizmoHandleLayer' })
    stage.add(gizmoLayer)
    gizmoLayer.getCanvas()._canvas.style.zIndex = 7
    gizmoLayerRef.current = gizmoLayer
    return () => {
      gizmoLayer.destroy()
      gizmoLayerRef.current = null
    }
  }, [stageRef])

  // Konva circles op een eigen handle-laag (zie hierboven) — drag is volledig
  // manueel via native pointer events zodat we op elk pointermove updaten
  // (niet alleen per rAF-frame zoals Konva's eigen drag doet). Voor elke node
  // in de connected hierarchy worden 2 circles aangemaakt (edit mode).
  // `layer` blijft mainLayer: alle hit-queries (walkHierarchy, snap-vertices,
  // wall-body-detectie) moeten de échte muur-content doorzoeken, niet de
  // lege handle-laag.
  useEffect(() => {
    const layer = mainLayerRef.current
    const gizmoLayer = gizmoLayerRef.current
    if (!layer || !gizmoLayer || !node) return

    function clientToStage(clientX, clientY) {
      const stage = stageRef.current
      if (!stage) return null
      const box = stage.container().getBoundingClientRect()
      return stage.getAbsoluteTransform().copy().invert().point({
        x: clientX - box.left,
        y: clientY - box.top,
      })
    }

    const windowListeners = []

    function createCircle(targetNode, i) {
      const pts = targetNode.points()
      const circle = new Konva.Circle({
        x: targetNode.x() + pts[i * 2],
        y: targetNode.y() + pts[i * 2 + 1],
        radius: HANDLE_RADIUS_BASE,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        draggable: false,
        hitStrokeWidth: HANDLE_HIT_STROKE_WIDTH,
        perfectDrawEnabled: false,
        name: `lineGizmoHandle_${targetNode.id()}_${i}`,
      })

      // Puur decoratief kruisje boven op de bol — geen eigen hit-detectie/
      // drag-logica, volgt gewoon positie/straal/kleur van `circle` (die
      // blijft de enige interactieve hit/drag-target, ongewijzigd). Blijft
      // bewust binnen de cirkelrand (precisie-kruis, steekt niet uit).
      function drawCross(ctx) {
        const r = circle.radius()
        const len = r * 1
        ctx.strokeStyle = circle.stroke()
        // Geen vaste ondergrens: die zou bij het inzoomen (r klemt richting
        // HANDLE_RADIUS_MIN) een disproportioneel dikke lijn geven — een
        // stage-eenheden-breedte wordt immers mee vergroot door de zoom.
        ctx.lineWidth = r * 0.12
        ctx.beginPath()
        ctx.moveTo(-len, 0); ctx.lineTo(len, 0)
        ctx.moveTo(0, -len); ctx.lineTo(0, len)
        ctx.stroke()
      }
      const cross = new Konva.Shape({
        x: circle.x(), y: circle.y(),
        sceneFunc: (ctx) => drawCross(ctx),
        listening: false,
        perfectDrawEnabled: false,
        name: `lineGizmoHandle_${targetNode.id()}_${i}_cross`,
      })

      let startStagePt = null
      let startCirclePt = null
      let lastAbsPos = null

      function applyMove(rawAbsX, rawAbsY) {
        const currentPts = targetNode.points().slice()
        let cx = rawAbsX - targetNode.x()
        let cy = rawAbsY - targetNode.y()

        const anchorAbsX = targetNode.x() + currentPts[(1 - i) * 2]
        const anchorAbsY = targetNode.y() + currentPts[(1 - i) * 2 + 1]

        // ── 1. Endpoint-to-endpoint snapping ─────────────────────────────────
        const stage = stageRef.current
        const epSnapDist = EP_SNAP_SCREEN_PX / (stage?.scaleX() ?? 1)
        const currentConns = getConns(targetNode, i)
        let epSnap = null
        for (const other of layer.getChildren()) {
          if (other === targetNode || !other.getAttr('isWall')) continue
          const cls = other.getClassName()
          if (cls !== 'Line' && cls !== 'Arrow') continue
          const otherPts = other.points()
          if (otherPts.length !== 4) continue
          for (let j = 0; j < 2; j++) {
            if (currentConns.some(c => c.id === other.id() && c.ep === j)) continue
            const ex = other.x() + otherPts[j * 2]
            const ey = other.y() + otherPts[j * 2 + 1]
            if (Math.hypot(ex - anchorAbsX, ey - anchorAbsY) < epSnapDist) continue
            if (Math.hypot((targetNode.x() + cx) - ex, (targetNode.y() + cy) - ey) < epSnapDist) {
              epSnap = { nodeId: other.id(), ep: j, absX: ex, absY: ey }
              break
            }
          }
          if (epSnap) break
        }

        let isAngleSnapping = false
        let snappedAngle = 0

        if (epSnap) {
          cx = epSnap.absX - targetNode.x()
          cy = epSnap.absY - targetNode.y()
          removeSnapIndicator(layer)
          removeAlignIndicators(layer)
          snapTargetRef.current = { kind: 'vertex', nodeId: epSnap.nodeId, ep: epSnap.ep }
        } else {
          snapTargetRef.current = null

          // ── 2. Vertex alignment snapping (pink guides) ────────────────────
          // Eigen hiërarchie altijd (ook off-screen), andere hiërarchieën alleen
          // hun on-screen hoekpunten (5.1) — voorkomt dat bijv. een andere
          // verdieping op dezelfde plek constant meesnapt.
          const alignSnapDist = ALIGN_SNAP_SCREEN_PX / (stage?.scaleX() ?? 1)
          const excludeList = [{ id: targetNode.id(), ep: i }, ...currentConns]
          const vertices = collectSnapVertices(layer, stage, targetNode, excludeList)

          let snapX = null, snapY = null
          for (const v of vertices) {
            if (snapX === null && Math.abs((targetNode.x() + cx) - v.x) < alignSnapDist) snapX = v.x
            if (snapY === null && Math.abs((targetNode.y() + cy) - v.y) < alignSnapDist) snapY = v.y
            if (snapX !== null && snapY !== null) break
          }

          if (snapX !== null) cx = snapX - targetNode.x()
          if (snapY !== null) cy = snapY - targetNode.y()

          const sc2 = stage?.scaleX() ?? 1
          const stageLeft   = (-stage.x()) / sc2
          const stageRight  = (stage.width()  - stage.x()) / sc2
          const stageTop    = (-stage.y()) / sc2
          const stageBottom = (stage.height() - stage.y()) / sc2

          if (snapX !== null) {
            if (!xAlignIndicatorRef.current) {
              xAlignIndicatorRef.current = new Konva.Line({
                stroke: '#e64980', strokeWidth: 1, strokeScaleEnabled: false,
                dash: [6, 5], opacity: 0.65, listening: false, perfectDrawEnabled: false,
              })
              layer.add(xAlignIndicatorRef.current)
            }
            xAlignIndicatorRef.current.points([snapX, stageTop, snapX, stageBottom])
          } else if (xAlignIndicatorRef.current) {
            xAlignIndicatorRef.current.destroy()
            xAlignIndicatorRef.current = null
          }

          if (snapY !== null) {
            if (!yAlignIndicatorRef.current) {
              yAlignIndicatorRef.current = new Konva.Line({
                stroke: '#e64980', strokeWidth: 1, strokeScaleEnabled: false,
                dash: [6, 5], opacity: 0.65, listening: false, perfectDrawEnabled: false,
              })
              layer.add(yAlignIndicatorRef.current)
            }
            yAlignIndicatorRef.current.points([stageLeft, snapY, stageRight, snapY])
          } else if (yAlignIndicatorRef.current) {
            yAlignIndicatorRef.current.destroy()
            yAlignIndicatorRef.current = null
          }

          // ── 3. Angle snapping (blue guide) ───────────────────────────────────
          const bothAxesLocked = snapX !== null && snapY !== null
          if (!bothAxesLocked && snapEnabledRef?.current) {
            const dx = (targetNode.x() + cx) - anchorAbsX
            const dy = (targetNode.y() + cy) - anchorAbsY
            const angle = Math.atan2(dy, dx)
            snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
            if (Math.abs(angle - snappedAngle) < SNAP_RAD) {
              isAngleSnapping = true
              const cosA = Math.cos(snappedAngle), sinA = Math.sin(snappedAngle)
              if (snapY !== null) {
                if (Math.abs(sinA) > 1e-9) {
                  const len = ((targetNode.y() + cy) - anchorAbsY) / sinA
                  cx = (anchorAbsX + cosA * len) - targetNode.x()
                }
              } else if (snapX !== null) {
                if (Math.abs(cosA) > 1e-9) {
                  const len = ((targetNode.x() + cx) - anchorAbsX) / cosA
                  cy = (anchorAbsY + sinA * len) - targetNode.y()
                }
              } else {
                const len = Math.hypot(dx, dy)
                cx = (anchorAbsX + cosA * len) - targetNode.x()
                cy = (anchorAbsY + sinA * len) - targetNode.y()
              }
            }
          }

          if (isAngleSnapping) {
            const sc = Math.cos(snappedAngle), ss = Math.sin(snappedAngle)
            const sc2b = stage.scaleX()
            const left   = (-stage.x()) / sc2b
            const right  = (stage.width()  - stage.x()) / sc2b
            const top    = (-stage.y()) / sc2b
            const bottom = (stage.height() - stage.y()) / sc2b
            const ts = []
            if (Math.abs(sc) > 1e-9) { ts.push((left  - anchorAbsX) / sc); ts.push((right - anchorAbsX) / sc) }
            if (Math.abs(ss) > 1e-9) { ts.push((top   - anchorAbsY) / ss); ts.push((bottom - anchorAbsY) / ss) }
            const tMin = Math.min(...ts), tMax = Math.max(...ts)
            if (!snapIndicatorRef.current) {
              snapIndicatorRef.current = new Konva.Line({
                stroke: '#1971c2', strokeWidth: 1, strokeScaleEnabled: false,
                dash: [6, 5], opacity: 0.55, listening: false, perfectDrawEnabled: false,
              })
              layer.add(snapIndicatorRef.current)
            }
            snapIndicatorRef.current.points([
              anchorAbsX + tMin * sc, anchorAbsY + tMin * ss,
              anchorAbsX + tMax * sc, anchorAbsY + tMax * ss,
            ])
          } else {
            removeSnapIndicator(layer)
          }

          // ── 1.5 Endpoint-onto-wall-body snapping (auto-split) ────────────────
          // Draait NA uitlijn/hoek-snap, als fijnkorrelige correctie op het al
          // berekende punt (niet als vervanging) — zo blijven de roze/blauwe
          // hulplijnen gewoon werken terwijl je over een andere muur beweegt;
          // alleen als het (eventueel al gesnapte) eindpunt toevallig binnen
          // BODY_SNAP_SCREEN_PX van een muur-lijf valt, wordt het er exact op
          // gelegd. Sluit de eigen node en zijn huidige buren uit: nooit tegen
          // je eigen aansluiting "splitsen".
          const bodySnapDist = BODY_SNAP_SCREEN_PX / (stage?.scaleX() ?? 1)
          const bodyExcludeIds = [targetNode.id(), ...currentConns.map(c => c.id)]
          const bodyHit = findWallBodyNear(layer, targetNode.x() + cx, targetNode.y() + cy, bodySnapDist, epSnapDist, bodyExcludeIds)
          if (bodyHit) {
            cx = bodyHit.x - targetNode.x()
            cy = bodyHit.y - targetNode.y()
            snapTargetRef.current = { kind: 'body', hostId: bodyHit.node.id(), x: bodyHit.x, y: bodyHit.y }
          }
        }

        const finalAbsX = targetNode.x() + cx
        const finalAbsY = targetNode.y() + cy
        circle.position({ x: finalAbsX, y: finalAbsY })
        cross.position({ x: finalAbsX, y: finalAbsY })

        if (lastAbsPos && (finalAbsX !== lastAbsPos.x || finalAbsY !== lastAbsPos.y)) {
          onEndpointDragMove?.(targetNode.id(), i, finalAbsX, finalAbsY)
          lastAbsPos = { x: finalAbsX, y: finalAbsY }
        }

        currentPts[i * 2]     = cx
        currentPts[i * 2 + 1] = cy
        targetNode.points(currentPts)
        layer.batchDraw()
        gizmoLayer.batchDraw()
        setVersion(v => v + 1)
      }

      circle.on('pointerdown', e => {
        e.cancelBubble = true
        const sp = clientToStage(e.evt.clientX, e.evt.clientY)
        if (!sp) return
        startStagePt  = sp
        startCirclePt = { x: circle.x(), y: circle.y() }
        lastAbsPos    = { x: circle.x(), y: circle.y() }
        activeDragRef.current = { nodeId: targetNode.id(), ep: i }

        function onMove(ev) {
          const active = activeDragRef.current
          if (!active || active.nodeId !== targetNode.id() || active.ep !== i) return
          const sp2 = clientToStage(ev.clientX, ev.clientY)
          if (!sp2 || !startStagePt) return
          applyMove(startCirclePt.x + (sp2.x - startStagePt.x), startCirclePt.y + (sp2.y - startStagePt.y))
        }

        function onUp() {
          activeDragRef.current = null
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup',   onUp)
          removeSnapIndicator(layer)
          removeAlignIndicators(layer)
          layer.batchDraw()

          // Tik (geen sleep) op het ankerpunt terwijl de maatinvoer open staat:
          // wissel het anker i.p.v. het endpoint te verslepen (5.2). Alleen
          // relevant voor de handles van het geselecteerde segment zelf.
          const totalMove = lastAbsPos && startCirclePt
            ? Math.hypot(lastAbsPos.x - startCirclePt.x, lastAbsPos.y - startCirclePt.y)
            : 0
          if (totalMove < 1 && editingRef.current && targetNode === node) {
            const anchorEp = node._measureAnchorEp ?? 0
            if (i === anchorEp) swapMeasureAnchor()
            startStagePt = null; startCirclePt = null; lastAbsPos = null
            return
          }

          const snap = snapTargetRef.current
          snapTargetRef.current = null
          if (snap?.kind === 'vertex') onEndpointSnap?.(targetNode.id(), i, snap.nodeId, snap.ep)
          else if (snap?.kind === 'body') onEndpointBodySnap?.(targetNode.id(), i, snap.hostId, snap.x, snap.y)
          else {
            // Geen snap-target, maar het segment kan alsnog tot (bijna) nul lengte
            // zijn ingeklapt door het eindpunt handmatig/via uitlijn-snap op het
            // ANDERE eindpunt van dezelfde muur te laten vallen (findWallEndpointNear/
            // findWallBodyNear sluiten targetNode zelf altijd uit, dus dit pad
            // wordt nooit als vertex- of body-snap gezien) — ook dan verwijderen.
            const finalPts = targetNode.points()
            if (Math.hypot(finalPts[2] - finalPts[0], finalPts[3] - finalPts[1]) < 0.5) {
              onEndpointCollapse?.(targetNode.id())
            }
          }
          onEndpointDragEnd()
          startStagePt = null; startCirclePt = null; lastAbsPos = null
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup',   onUp)
        windowListeners.push({ move: onMove, up: onUp })
      })

      gizmoLayer.add(circle)
      gizmoLayer.add(cross)
      return { targetNode, ep: i, circle, cross }
    }

    const hierarchyNodes = walkHierarchy(node, layer)
    const circleEntries = hierarchyNodes.flatMap(n => [0, 1].map(i => createCircle(n, i)))
    circlesRef.current = circleEntries
    // Op een T-punt vallen tot drie handles exact samen (bijv. na een split);
    // breng de handles van het geselecteerde segment altijd naar voren zodat
    // ze nooit achter een buur-handle verdwijnen.
    circleEntries.forEach(({ targetNode, circle, cross }) => { if (targetNode === node) { circle.moveToTop(); cross.moveToTop() } })

    // Highlight-overlay: geeft aan WELKE muur precies geselecteerd is (niet de
    // hoekpunten — die blijven overal neutraal, zie createCircle). Getekend
    // exact over het geselecteerde segment met dezelfde dikte, dus leest als
    // "deze lijn is nu grijs" zonder de echte stroke-attr van de node aan te
    // raken (die wordt geserialiseerd; dit overlay-object niet, zie de
    // lineGizmoHandle-naamfilter in konvaSerialize.js).
    const highlightLine = new Konva.Line({
      points: node.points(),
      x: node.x(), y: node.y(),
      stroke: '#929aa1',
      strokeWidth: node.strokeWidth(),
      lineCap: node.lineCap(),
      listening: false,
      perfectDrawEnabled: false,
      name: 'lineGizmoHandle_selectedLine',
    })
    layer.add(highlightLine)
    highlightLine.moveToTop()
    highlightLineRef.current = highlightLine

    layer.batchDraw()
    gizmoLayer.batchDraw()

    return () => {
      circleEntries.forEach(({ circle, cross }) => { circle.destroy(); cross.destroy() })
      circlesRef.current = []
      highlightLine.destroy()
      highlightLineRef.current = null
      for (const line of moveNeighborLinesRef.current.values()) line.destroy()
      moveNeighborLinesRef.current.clear()
      activeDragRef.current = null
      snapTargetRef.current = null
      windowListeners.forEach(({ move, up }) => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup',   up)
      })
      removeSnapIndicator(layer)
      removeAlignIndicators(layer)
    }
  }, [node])  // eslint-disable-line react-hooks/exhaustive-deps

  // Sync circle posities + anker-highlight na elke render (vangt body drag,
  // hierarchy-bewegingen en het openen/wisselen van de maatinvoer op).
  useEffect(() => {
    let handlesDirty = false
    let mainDirty = false
    const active = activeDragRef.current
    const anchorEp = node?._measureAnchorEp ?? 0
    const moveEp = 1 - anchorEp
    // De muren die bij bevestigen als rigide geheel meeverschuiven (zie
    // collectMeasureAffected/handleMeasureConfirm in CanvasView.jsx) — ook
    // oranje: precies één richtingswissel vanaf `node` zelf, en dan die ene
    // rechte lijn oneindig doorgetrokken (180°). Evenwijdig aan `node` zelf
    // wordt nooit meegenomen.
    const moveNeighborIds = editing && node && mainLayerRef.current
      ? new Set(collectMeasureAffected(node, moveEp, mainLayerRef.current).affected.map(n => n.id()))
      : null
    for (const { targetNode, ep, circle, cross } of circlesRef.current) {
      if (active?.nodeId === targetNode.id() && active?.ep === ep) continue
      const pts = targetNode.points()
      if (!pts || pts.length < 4) continue
      const p = { x: targetNode.x() + pts[ep * 2], y: targetNode.y() + pts[ep * 2 + 1] }
      circle.position(p)
      cross.position(p)
      // Tijdens maatbewerking licht het endpoint op dat gaat bewegen (5.2) —
      // tikken op het andere (het anker) wisselt dit, zie onUp hierboven —
      // én de muren die in het rechte verlengde meeverschuiven. Zelfde
      // dikte als een normale handle, alleen de kleur wijkt af.
      if (editing && ((targetNode === node && ep === moveEp) || moveNeighborIds?.has(targetNode.id()))) {
        circle.stroke('#e8590c')
      } else {
        circle.stroke('black')
      }
      circle.strokeWidth(1)
      handlesDirty = true
    }
    if (node && highlightLineRef.current) {
      const pts = node.points()
      if (pts && pts.length >= 4) {
        highlightLineRef.current.points(pts)
        highlightLineRef.current.position({ x: node.x(), y: node.y() })
        mainDirty = true
      }
    }
    // Oranje overlay-lijn(en) over de muur(en) die meeverschuiven — zelfde
    // aanpak als highlightLineRef, maar dan per meeverschuivende buur i.p.v.
    // het geselecteerde segment.
    const wantedIds = moveNeighborIds ?? new Set()
    for (const [id, line] of moveNeighborLinesRef.current) {
      if (!wantedIds.has(id)) { line.destroy(); moveNeighborLinesRef.current.delete(id) }
    }
    for (const { targetNode } of circlesRef.current) {
      if (!wantedIds.has(targetNode.id())) continue
      let line = moveNeighborLinesRef.current.get(targetNode.id())
      if (!line) {
        line = new Konva.Line({
          stroke: '#e8590c',
          strokeWidth: targetNode.strokeWidth(),
          lineCap: targetNode.lineCap(),
          listening: false,
          perfectDrawEnabled: false,
          name: 'lineGizmoHandle_measureNeighborLine',
        })
        gizmoLayerRef.current?.add(line)
        moveNeighborLinesRef.current.set(targetNode.id(), line)
      }
      const npts = targetNode.points()
      if (npts && npts.length >= 4) {
        line.points(npts)
        line.position({ x: targetNode.x(), y: targetNode.y() })
        handlesDirty = true
      }
    }
    if (handlesDirty) gizmoLayerRef.current?.batchDraw()
    if (mainDirty) mainLayerRef.current?.batchDraw()
  })

  // Schaal circle radius mee met zoom
  useEffect(() => {
    const zoom = stageRef.current?.scaleX() ?? 1
    const r = Math.max(HANDLE_RADIUS_MIN, Math.min(HANDLE_RADIUS_MAX, HANDLE_RADIUS_BASE / zoom))
    circlesRef.current.forEach(({ circle }) => circle?.radius(r))
  })

  // Stage-coördinaten → schermcoördinaten (voor HTML overlay)
  function toScreen(stageX, stageY) {
    const stage = stageRef.current
    if (!stage) return { x: 0, y: 0 }
    const box = stage.container().getBoundingClientRect()
    const sp  = stage.getAbsoluteTransform().point({ x: stageX, y: stageY })
    return { x: box.left + sp.x, y: box.top + sp.y }
  }

  if (!node || !node.getLayer()) return null

  const pts = node.points()
  if (pts.length < 4) return null

  const nx = node.x(), ny = node.y()

  const lengthM = Math.hypot(pts[2] - pts[0], pts[3] - pts[1]) / GRID_SIZE
  const midScreen = toScreen(nx + (pts[0] + pts[2]) / 2, ny + (pts[1] + pts[3]) / 2)
  const isDragging = activeDragRef.current !== null

  function confirmMeasure(raw) {
    const v = parseFloat(raw)
    if (!isNaN(v)) {
      // Een waarde van (vrijwel) 0 betekent "verwijder dit segment" — anders
      // eindig je met een onzichtbare/verborgen nul-lengte muur die alleen nog
      // via de scharnier-stip zichtbaar is.
      if (v > 0.01) onMeasureConfirm?.(v, nodeRef.current)
      else onMeasureDelete?.(nodeRef.current)
    }
    setEditing(false)
  }

  return (
    <>
      {showPills && !editing && (
        <button
          className="line-gizmo-measure-label"
          style={{ left: midScreen.x, top: midScreen.y, ...getPillCssStyle(pillStyle) }}
          onPointerDown={e => e.stopPropagation()}
          onClick={() => { const v = lengthM.toFixed(2); inputValueRef.current = v; setInputValue(v); setEditing(true) }}
        >
          {lengthM.toFixed(2)}
        </button>
      )}

      {editing && (
        <input
          className="line-gizmo-measure-input"
          style={{ left: midScreen.x, top: midScreen.y }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={inputValue}
          onChange={e => { setInputValue(e.target.value); inputValueRef.current = e.target.value }}
          onPointerDown={e => e.stopPropagation()}
          onFocus={e => e.target.select()}
          onKeyDown={e => {
            if (e.key === 'Enter') confirmMeasure(inputValue)
            else if (e.key === 'Escape') setEditing(false)
          }}
          onBlur={() => confirmMeasure(inputValue)}
        />
      )}

      {editing && (
        <button
          type="button"
          className="line-gizmo-measure-swap"
          style={{ left: midScreen.x + 46, top: midScreen.y }}
          title="Draairichting omwisselen"
          // preventDefault op mousedown houdt de focus op het invoerveld — anders
          // blurt het veld eerst (en bevestigt/sluit confirmMeasure de invoer al)
          // vóórdat de klik zelf verwerkt wordt.
          onMouseDown={e => e.preventDefault()}
          onPointerDown={e => e.stopPropagation()}
          onClick={swapMeasureAnchor}
        >
          ⇄
        </button>
      )}
    </>
  )
}
