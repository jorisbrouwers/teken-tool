import { useEffect, useRef } from 'react'
import Konva from 'konva'

const MARKER_COLOR = '#7048e8'
const MARKER_RADIUS_SCREEN_PX = 9 // constante schermgrootte, zie tegenschaling hieronder

// Markeert op het canvas welke muurhoeken als referentiepunt aan een
// verdieping gekoppeld zijn (note.settings.floors[].referencePoint = {wallId,
// ep}) — aan/uit via het oog-knopje bij "Referentiepunten" in de
// Gebouweigenschappen-sidebar. Geen onderscheid per verdieping: het gaat er
// alleen om te zien wélke hoeken gekoppeld zijn. Zelfde rAF+signature-patroon
// als HeightGuideLabels.jsx/WallBoundaryOverlay.jsx (performance-invariant 7).
export default function ReferencePointMarkers({ stageRef, mainLayerRef, floors, visible = false }) {
  const visibleRef = useRef(visible)
  visibleRef.current = visible
  const floorsRef = useRef(floors)
  floorsRef.current = floors

  useEffect(() => {
    let layer = null
    const markers = [] // [{ ring, dot }]
    let rafId = null
    let prevSig = null

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current
      if (!stage || !ml) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'referencePointLayer' })
        stage.add(layer)
        layer.zIndex(1)
        // Expliciete CSS z-index, zelfde reden als de andere overlays
        // (frozen-canvas-volgorde tijdens navigatie); boven de muren en
        // begrenzingskleur.
        layer.getCanvas()._canvas.style.zIndex = 8
      }

      // Posities van de gekoppelde hoeken (dubbele hoeken — twee verdiepingen
      // aan hetzelfde punt — één keer).
      const points = new Map()
      if (visibleRef.current) {
        for (const f of floorsRef.current ?? []) {
          const rp = f.referencePoint
          if (!rp) continue
          const node = ml.findOne(`#${rp.wallId}`)
          const pts = node?.points()
          if (!pts || pts.length < 4) continue
          const x = node.x() + pts[rp.ep * 2], y = node.y() + pts[rp.ep * 2 + 1]
          points.set(`${Math.round(x)},${Math.round(y)}`, { x, y })
        }
      }

      const scale = stage.scaleX() || 1
      const sig = `${scale}|${[...points.values()].map(p => `${p.x},${p.y}`).join(';')}`
      if (sig === prevSig) {
        rafId = requestAnimationFrame(tick)
        return
      }
      prevSig = sig

      const list = [...points.values()]
      while (markers.length < list.length) {
        const ring = new Konva.Circle({ stroke: MARKER_COLOR, fill: 'rgba(112, 72, 232, 0.15)', listening: false, perfectDrawEnabled: false })
        const dot = new Konva.Circle({ fill: MARKER_COLOR, listening: false, perfectDrawEnabled: false })
        layer.add(ring); layer.add(dot)
        markers.push({ ring, dot })
      }
      while (markers.length > list.length) {
        const { ring, dot } = markers.pop()
        ring.destroy(); dot.destroy()
      }
      const inv = 1 / scale
      list.forEach((p, i) => {
        const { ring, dot } = markers[i]
        ring.position(p); ring.radius(MARKER_RADIUS_SCREEN_PX * inv); ring.strokeWidth(2 * inv)
        dot.position(p); dot.radius(2.5 * inv)
      })

      layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      markers.length = 0
    }
  }, [stageRef, mainLayerRef])

  return null
}
