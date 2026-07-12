import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { GRID_SIZE } from './useGrid.js'
import { getPillCssStyle } from './pillStyle.js'
import { getConns, walkHierarchy, collectSnapVertices } from './wallGraph.js'

const SNAP_RAD = 3 * Math.PI / 180

const EP_SNAP_SCREEN_PX    = 20  // screen pixels within which endpoint-to-endpoint snapping kicks in
const ALIGN_SNAP_SCREEN_PX = 10  // screen pixels within which vertex alignment snapping kicks in

// eslint-disable-next-line no-unused-vars
export default function LineGizmo({ node, stageRef, mainLayerRef, onEndpointDragMove, onEndpointDragEnd, onEndpointSnap, onMeasureConfirm, onMeasureDelete, snapEnabledRef, version, autoEditRef, showPills = true, pillStyle }) {
  const [, setVersion] = useState(0)
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputValueRef = useRef('')
  const nodeRef = useRef(node)
  nodeRef.current = node
  const circlesRef = useRef([])
  const rafRef = useRef(null)
  const snapIndicatorRef = useRef(null)
  const xAlignIndicatorRef = useRef(null)  // pink vertical guide for X alignment snap
  const yAlignIndicatorRef = useRef(null)  // pink horizontal guide for Y alignment snap
  const snapTargetRef = useRef(null)       // { nodeId, ep } when endpoint-snap is active
  const activeDragRef = useRef(null)       // 0 | 1 | null — which endpoint is being dragged

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

  // Konva circles op mainLayer — drag is volledig manueel via native pointer events
  // zodat we op elk pointermove updaten (niet alleen per rAF-frame zoals Konva's eigen drag doet).
  // Voor elke node in de connected hierarchy worden 2 circles aangemaakt (edit mode).
  useEffect(() => {
    const layer = mainLayerRef.current
    if (!layer || !node) return

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
      const isSelectedNode = targetNode === node
      const circle = new Konva.Circle({
        x: targetNode.x() + pts[i * 2],
        y: targetNode.y() + pts[i * 2 + 1],
        radius: 10,
        fill: 'white',
        stroke: isSelectedNode ? '#1971c2' : '#868e96',
        strokeWidth: isSelectedNode ? 2 : 1.5,
        draggable: false,
        hitStrokeWidth: 14,
        perfectDrawEnabled: false,
        name: `lineGizmoHandle_${targetNode.id()}_${i}`,
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
          snapTargetRef.current = { nodeId: epSnap.nodeId, ep: epSnap.ep }
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
        }

        const finalAbsX = targetNode.x() + cx
        const finalAbsY = targetNode.y() + cy
        circle.position({ x: finalAbsX, y: finalAbsY })

        if (lastAbsPos && (finalAbsX !== lastAbsPos.x || finalAbsY !== lastAbsPos.y)) {
          onEndpointDragMove?.(targetNode.id(), i, finalAbsX, finalAbsY)
          lastAbsPos = { x: finalAbsX, y: finalAbsY }
        }

        currentPts[i * 2]     = cx
        currentPts[i * 2 + 1] = cy
        targetNode.points(currentPts)
        layer.batchDraw()
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
            if (i === anchorEp) {
              node._measureAnchorEp = 1 - anchorEp
              setVersion(v => v + 1)
            }
            startStagePt = null; startCirclePt = null; lastAbsPos = null
            return
          }

          const snap = snapTargetRef.current
          snapTargetRef.current = null
          if (snap) onEndpointSnap?.(targetNode.id(), i, snap.nodeId, snap.ep)
          onEndpointDragEnd()
          startStagePt = null; startCirclePt = null; lastAbsPos = null
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup',   onUp)
        windowListeners.push({ move: onMove, up: onUp })
      })

      layer.add(circle)
      return { targetNode, ep: i, circle }
    }

    const hierarchyNodes = walkHierarchy(node, layer)
    const circleEntries = hierarchyNodes.flatMap(n => [0, 1].map(i => createCircle(n, i)))
    circlesRef.current = circleEntries
    // Op een T-punt vallen tot drie handles exact samen (bijv. na een split);
    // breng de handles van het geselecteerde segment altijd naar voren zodat
    // zijn blauwe/oranje (anker-)styling nooit achter een buur-handle verdwijnt.
    circleEntries.forEach(({ targetNode, circle }) => { if (targetNode === node) circle.moveToTop() })
    layer.batchDraw()

    return () => {
      circleEntries.forEach(({ circle }) => circle.destroy())
      circlesRef.current = []
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
    let dirty = false
    const active = activeDragRef.current
    const anchorEp = node?._measureAnchorEp ?? 0
    const moveEp = 1 - anchorEp
    for (const { targetNode, ep, circle } of circlesRef.current) {
      if (active?.nodeId === targetNode.id() && active?.ep === ep) continue
      const pts = targetNode.points()
      if (!pts || pts.length < 4) continue
      circle.position({ x: targetNode.x() + pts[ep * 2], y: targetNode.y() + pts[ep * 2 + 1] })
      // Tijdens maatbewerking licht het endpoint op dat gaat bewegen (5.2) —
      // tikken op het andere (het anker) wisselt dit, zie onUp hierboven.
      if (editing && targetNode === node && ep === moveEp) {
        circle.stroke('#e8590c')
        circle.strokeWidth(2.5)
      } else {
        const isSelectedNode = targetNode === node
        circle.stroke(isSelectedNode ? '#1971c2' : '#868e96')
        circle.strokeWidth(isSelectedNode ? 2 : 1.5)
      }
      dirty = true
    }
    if (dirty) mainLayerRef.current?.batchDraw()
  })

  // Schaal circle radius mee met zoom
  useEffect(() => {
    const zoom = stageRef.current?.scaleX() ?? 1
    const r = Math.max(4, Math.min(12, 10 / zoom))
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
    </>
  )
}
