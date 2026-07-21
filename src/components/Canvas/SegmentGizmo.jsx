import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'

// Lichtgewicht variant van LineGizmo.jsx voor losse (niet-muur) lijn/pijl/
// L-vorm-shapes: bolletjes op elke hoek om die hoek te verslepen, plus de
// lijn zelf slepen om het hele object te verplaatsen. Bewust zonder muur-
// functionaliteit (geen fan-knoppen, geen maat-pill, geen snapping tegen
// andere lijnen/verbindingen/hiërarchie) — wél dezelfde 45°-hoek-snap als
// tijdens het tekenen, zodat bewerken er niet plotseling "losser" uitvoelt.

const SNAP_RAD = 3 * Math.PI / 180

const HANDLE_RADIUS_BASE = 7
const HANDLE_RADIUS_MIN  = 2
const HANDLE_RADIUS_MAX  = 8
const HANDLE_HIT_STROKE_WIDTH = 16

export default function SegmentGizmo({ node, stageRef, mainLayerRef, snapEnabledRef, onEndpointDragEnd }) {
  const [, setVersion] = useState(0)
  const nodeRef = useRef(node)
  nodeRef.current = node
  const circlesRef = useRef([])
  const highlightLineRef = useRef(null)
  const gizmoLayerRef = useRef(null)
  const rafRef = useRef(null)
  const snapIndicatorRef = useRef(null)
  const activeDragRef = useRef(null) // vertex-index | 'body' | null

  // rAF-loop: her-render zodra node-positie/punten of stage-transform wijzigen
  // (bv. tijdens pan/zoom) — alleen bij verandering, zie performance-invariant 7.
  useEffect(() => {
    let prevKey = ''
    function tick() {
      const stage = stageRef.current
      const layer = mainLayerRef.current
      if (!stage || !node || !layer) return
      const key = `${stage.x()},${stage.y()},${stage.scaleX()}|${node.x()},${node.y()},${node.points().join(',')}`
      if (key !== prevKey) { prevKey = key; setVersion(v => v + 1) }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [node, stageRef, mainLayerRef])

  // Eigen laag boven de rest (zelfde CSS z-index-truc als LineGizmo, zie
  // aldaar) — leeft zolang dit component gemount is.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const gizmoLayer = new Konva.Layer({ name: 'segmentGizmoHandleLayer' })
    stage.add(gizmoLayer)
    gizmoLayer.getCanvas()._canvas.style.zIndex = 7
    gizmoLayerRef.current = gizmoLayer
    return () => {
      gizmoLayer.destroy()
      gizmoLayerRef.current = null
    }
  }, [stageRef])

  function removeSnapIndicator(layer) {
    if (snapIndicatorRef.current) {
      snapIndicatorRef.current.destroy()
      snapIndicatorRef.current = null
      layer?.batchDraw()
    }
  }

  // Handles + highlight aanmaken — drag volledig manueel via native pointer
  // events (net als LineGizmo) zodat elke pointermove meteen bijwerkt.
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
    const vertexCount = node.points().length / 2

    // Dezelfde 45°-hoekvergrendeling als bij het tekenen (snapLineAngle in
    // CanvasView.jsx), hier lokaal herhaald omdat die functie op een los punt
    // werkt i.p.v. op een Konva-node — het aangrenzende hoekpunt is het anker.
    function snapAngle(anchorAbsX, anchorAbsY, targetAbsX, targetAbsY) {
      if (!snapEnabledRef?.current) return { x: targetAbsX, y: targetAbsY, snapping: false, angle: 0 }
      const dx = targetAbsX - anchorAbsX
      const dy = targetAbsY - anchorAbsY
      const angle = Math.atan2(dy, dx)
      const snapped = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
      if (Math.abs(angle - snapped) >= SNAP_RAD) return { x: targetAbsX, y: targetAbsY, snapping: false, angle: 0 }
      const len = Math.hypot(dx, dy)
      return { x: anchorAbsX + Math.cos(snapped) * len, y: anchorAbsY + Math.sin(snapped) * len, snapping: true, angle: snapped }
    }

    function createCircle(i) {
      const pts = node.points()
      const anchorIdx = i === 0 ? 1 : i - 1
      const circle = new Konva.Circle({
        x: node.x() + pts[i * 2],
        y: node.y() + pts[i * 2 + 1],
        radius: HANDLE_RADIUS_BASE,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        draggable: false,
        hitStrokeWidth: HANDLE_HIT_STROKE_WIDTH,
        perfectDrawEnabled: false,
        name: `segmentGizmoHandle_${node.id()}_${i}`,
      })

      function drawCross(ctx) {
        const r = circle.radius()
        const len = r * 1
        ctx.strokeStyle = circle.stroke()
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
        name: `segmentGizmoHandle_${node.id()}_${i}_cross`,
      })

      let startStagePt = null
      let startCirclePt = null

      function applyMove(rawAbsX, rawAbsY) {
        const pts = node.points()
        const anchorAbsX = node.x() + pts[anchorIdx * 2]
        const anchorAbsY = node.y() + pts[anchorIdx * 2 + 1]
        const snapped = snapAngle(anchorAbsX, anchorAbsY, rawAbsX, rawAbsY)

        const stage = stageRef.current
        if (snapped.snapping) {
          const sc2 = stage.scaleX()
          const left   = (-stage.x()) / sc2
          const right  = (stage.width()  - stage.x()) / sc2
          const top    = (-stage.y()) / sc2
          const bottom = (stage.height() - stage.y()) / sc2
          const cs = Math.cos(snapped.angle), sn = Math.sin(snapped.angle)
          const ts = []
          if (Math.abs(cs) > 1e-9) { ts.push((left  - anchorAbsX) / cs); ts.push((right - anchorAbsX) / cs) }
          if (Math.abs(sn) > 1e-9) { ts.push((top   - anchorAbsY) / sn); ts.push((bottom - anchorAbsY) / sn) }
          const tMin = Math.min(...ts), tMax = Math.max(...ts)
          if (!snapIndicatorRef.current) {
            snapIndicatorRef.current = new Konva.Line({
              stroke: '#1971c2', strokeWidth: 1, strokeScaleEnabled: false,
              dash: [6, 5], opacity: 0.55, listening: false, perfectDrawEnabled: false,
            })
            layer.add(snapIndicatorRef.current)
          }
          snapIndicatorRef.current.points([
            anchorAbsX + tMin * cs, anchorAbsY + tMin * sn,
            anchorAbsX + tMax * cs, anchorAbsY + tMax * sn,
          ])
        } else {
          removeSnapIndicator(layer)
        }

        const newPts = pts.slice()
        newPts[i * 2]     = snapped.x - node.x()
        newPts[i * 2 + 1] = snapped.y - node.y()
        node.points(newPts)
        circle.position({ x: snapped.x, y: snapped.y })
        cross.position({ x: snapped.x, y: snapped.y })
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
        activeDragRef.current = i

        function onMove(ev) {
          if (activeDragRef.current !== i) return
          const sp2 = clientToStage(ev.clientX, ev.clientY)
          if (!sp2 || !startStagePt) return
          applyMove(startCirclePt.x + (sp2.x - startStagePt.x), startCirclePt.y + (sp2.y - startStagePt.y))
        }

        function onUp() {
          activeDragRef.current = null
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup',   onUp)
          removeSnapIndicator(layer)
          startStagePt = null; startCirclePt = null
          onEndpointDragEnd?.()
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup',   onUp)
        windowListeners.push({ move: onMove, up: onUp })
      })

      gizmoLayer.add(circle)
      gizmoLayer.add(cross)
      return { ep: i, circle, cross }
    }

    const circleEntries = Array.from({ length: vertexCount }, (_, i) => createCircle(i))
    circlesRef.current = circleEntries

    // Sleep-op-het-lijf: het hele object verplaatsen. Los van Konva's eigen
    // draggable-systeem (dat staat overal uit, zie computeDraggable) en van
    // het generieke gizmo-bbox-slepen (dat vereist zichtbare Transformer-
    // anchors om zijn hit-box te berekenen — hier bewust niet aanwezig) —
    // dus net als bij een muur-body (wallBodyDrag) een eigen, simpele
    // pointer-gebaseerde translatie van node.x()/y().
    let bodyStartStagePt = null
    let bodyStartNodePt  = null

    function onBodyMove(ev) {
      if (activeDragRef.current !== 'body') return
      const sp2 = clientToStage(ev.clientX, ev.clientY)
      if (!sp2 || !bodyStartStagePt || !bodyStartNodePt) return
      node.position({
        x: bodyStartNodePt.x + (sp2.x - bodyStartStagePt.x),
        y: bodyStartNodePt.y + (sp2.y - bodyStartStagePt.y),
      })
      layer.batchDraw()
      setVersion(v => v + 1)
    }
    function onBodyUp() {
      if (activeDragRef.current !== 'body') return
      activeDragRef.current = null
      window.removeEventListener('pointermove', onBodyMove)
      window.removeEventListener('pointerup',   onBodyUp)
      bodyStartStagePt = null; bodyStartNodePt = null
      onEndpointDragEnd?.()
    }
    function onBodyDown(e) {
      e.cancelBubble = true
      const sp = clientToStage(e.evt.clientX, e.evt.clientY)
      if (!sp) return
      bodyStartStagePt = sp
      bodyStartNodePt  = { x: node.x(), y: node.y() }
      activeDragRef.current = 'body'
      window.addEventListener('pointermove', onBodyMove)
      window.addEventListener('pointerup',   onBodyUp)
      windowListeners.push({ move: onBodyMove, up: onBodyUp })
    }
    node.on('pointerdown.segmentGizmoBody', onBodyDown)

    const highlightLine = new Konva.Line({
      points: node.points(),
      x: node.x(), y: node.y(),
      stroke: '#929aa1',
      strokeWidth: node.strokeWidth(),
      lineCap: node.lineCap(),
      listening: false,
      perfectDrawEnabled: false,
      name: 'segmentGizmoHandle_selectedLine',
    })
    layer.add(highlightLine)
    highlightLine.moveToTop()
    highlightLineRef.current = highlightLine

    layer.batchDraw()
    gizmoLayer.batchDraw()

    return () => {
      node.off('pointerdown.segmentGizmoBody')
      circleEntries.forEach(({ circle, cross }) => { circle.destroy(); cross.destroy() })
      circlesRef.current = []
      highlightLine.destroy()
      highlightLineRef.current = null
      activeDragRef.current = null
      windowListeners.forEach(({ move, up }) => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup',   up)
      })
      removeSnapIndicator(layer)
    }
  }, [node])  // eslint-disable-line react-hooks/exhaustive-deps

  // Sync handle-posities + highlight na elke render (vangt whole-object-drag
  // en pan/zoom op — zie de rAF-loop hierboven).
  useEffect(() => {
    let dirty = false
    const active = activeDragRef.current
    const pts = node?.points()
    if (!pts) return
    for (const { ep, circle, cross } of circlesRef.current) {
      if (active === ep) continue
      const p = { x: node.x() + pts[ep * 2], y: node.y() + pts[ep * 2 + 1] }
      circle.position(p)
      cross.position(p)
      dirty = true
    }
    if (highlightLineRef.current) {
      highlightLineRef.current.points(pts)
      highlightLineRef.current.position({ x: node.x(), y: node.y() })
      dirty = true
    }
    if (dirty) { gizmoLayerRef.current?.batchDraw(); mainLayerRef.current?.batchDraw() }
  })

  // Schaal circle-straal mee met zoom
  useEffect(() => {
    const zoom = stageRef.current?.scaleX() ?? 1
    const r = Math.max(HANDLE_RADIUS_MIN, Math.min(HANDLE_RADIUS_MAX, HANDLE_RADIUS_BASE / zoom))
    circlesRef.current.forEach(({ circle }) => circle?.radius(r))
  })

  return null
}
