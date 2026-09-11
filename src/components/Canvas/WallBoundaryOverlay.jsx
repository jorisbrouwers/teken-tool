import { useEffect, useRef } from 'react'
import Konva from 'konva'
import { WALL_BOUNDARY_OPTIONS, resolveWallBoundary } from './wallGraph.js'

const BOUNDARY_COLORS = Object.fromEntries(WALL_BOUNDARY_OPTIONS.map(o => [o.value, o.color]))

// Toont muurbegrenzing (buiten/buren/aor/sgr) als een dunnere, gekleurde
// lijn boven op de (altijd zwarte, zie WALL_STROKE_COLOR) muurlijn — zodat de
// zwarte muur als rand zichtbaar blijft en de begrenzingskleur als "vulling"
// oogt. Zelfde rAF+signature-patroon als HingeDecorations.jsx: eigen, lazy
// aangemaakte laag, alleen een echte redraw als de signatuur wijzigt.
export default function WallBoundaryOverlay({ stageRef, mainLayerRef, visible = true }) {
  const visibleRef = useRef(visible)
  visibleRef.current = visible

  useEffect(() => {
    let layer = null
    const lines = new Map() // wallId -> Konva.Line
    let rafId = null
    let prevSig = null

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current

      if (!stage) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'wallBoundaryLayer' })
        stage.add(layer)
        layer.zIndex(1)
        // Zelfde reden als in HingeDecorations/ZoneFillOverlay: expliciete
        // CSS z-index nodig om de frozen-canvas-volgorde tijdens navigatie te
        // overroepen (Konva ordent zijn layers puur via DOM-volgorde). Boven
        // de zone-vulling (5) én de scharnieren (6) — begrenzingskleur moet
        // altijd zichtbaar blijven.
        layer.getCanvas()._canvas.style.zIndex = 7
      }

      if (!ml || !visibleRef.current) {
        if (prevSig !== 'hidden') {
          prevSig = 'hidden'
          for (const l of lines.values()) l.visible(false)
          layer.batchDraw()
        }
        rafId = requestAnimationFrame(tick)
        return
      }

      const w = stage.width(), h = stage.height()
      const transform = stage.getAbsoluteTransform()
      const seen = new Map() // wallId -> { x, y, points, boundary, strokeWidth }

      for (const node of ml.getChildren()) {
        if (!node.attrs.isWall || node.attrs.isAux) continue
        const cls = node.getClassName()
        if (cls !== 'Line' && cls !== 'Arrow') continue
        if (!node.id() || node._culled) continue
        const boundary = resolveWallBoundary(node)
        if (boundary === 'buiten') continue
        const pts = node.points()
        if (!pts || pts.length < 4) continue

        // On-screen check zoals HingeDecorations — geen marge nodig, deze
        // laag heeft geen los klik-doel dat net buiten beeld moet blijven.
        const ax = node.x() + pts[0], ay = node.y() + pts[1]
        const bx = node.x() + pts[2], by = node.y() + pts[3]
        const spA = transform.point({ x: ax, y: ay })
        const spB = transform.point({ x: bx, y: by })
        const onScreen = (spA.x >= 0 && spA.x <= w && spA.y >= 0 && spA.y <= h)
          || (spB.x >= 0 && spB.x <= w && spB.y >= 0 && spB.y <= h)
        if (!onScreen) continue

        seen.set(node.id(), {
          x: node.x(), y: node.y(), points: pts, boundary,
          strokeWidth: node.strokeWidth() * 0.5,
        })
      }

      const sig = `${stage.x()},${stage.y()},${stage.scaleX()}|` +
        [...seen.entries()].map(([id, s]) => `${id}:${s.x},${s.y},${s.points.join(',')},${s.boundary}`).join(';')
      if (sig === prevSig) {
        rafId = requestAnimationFrame(tick)
        return
      }
      prevSig = sig

      for (const [id, s] of seen) {
        let line = lines.get(id)
        if (!line) {
          line = new Konva.Line({ listening: false, perfectDrawEnabled: false, lineCap: 'round' })
          layer.add(line)
          lines.set(id, line)
        }
        line.position({ x: s.x, y: s.y })
        line.points(s.points)
        line.stroke(BOUNDARY_COLORS[s.boundary])
        line.strokeWidth(s.strokeWidth)
        line.visible(true)
      }

      for (const [id, line] of [...lines]) {
        if (!seen.has(id)) {
          line.destroy()
          lines.delete(id)
        }
      }

      layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      lines.clear()
    }
  }, [stageRef, mainLayerRef])

  return null
}
