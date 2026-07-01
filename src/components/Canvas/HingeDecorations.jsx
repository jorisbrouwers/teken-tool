import { useEffect, useRef } from 'react'
import Konva from 'konva'

const HINGE_RADIUS = 1.5  // content units (grid-based; 1 grid = 1 m)

export default function HingeDecorations({ stageRef, mainLayerRef, editModeActive, visible = true }) {
  const editModeActiveRef = useRef(editModeActive)
  editModeActiveRef.current = editModeActive
  const visibleRef = useRef(visible)
  visibleRef.current = visible

  useEffect(() => {
    let layer = null
    const circles = new Map()
    let rafId = null

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current

      // Stage nog niet beschikbaar — wacht een tick
      if (!stage) {
        rafId = requestAnimationFrame(tick)
        return
      }

      // Laag eenmalig aanmaken zodra stage beschikbaar is
      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'hingeLayer' })
        stage.add(layer)
        layer.zIndex(1)  // boven mainLayer, onder drawingLayer
      }

      if (!ml || editModeActiveRef.current || !visibleRef.current) {
        for (const c of circles.values()) c.visible(false)
        layer.batchDraw()
        rafId = requestAnimationFrame(tick)
        return
      }

      const seenKeys = new Set()

      for (const node of ml.getChildren()) {
        const cls = node.getClassName()
        if (cls !== 'Line' && cls !== 'Arrow') continue
        if (!node.id()) continue
        const pts = node.points()
        if (!pts || pts.length < 4) continue

        for (let ep = 0; ep <= 1; ep++) {
          const ax = node.x() + pts[ep * 2]
          const ay = node.y() + pts[ep * 2 + 1]
          const key = `${Math.round(ax)}_${Math.round(ay)}`
          if (seenKeys.has(key)) continue
          seenKeys.add(key)

          let c = circles.get(key)
          if (!c) {
            c = new Konva.Circle({ fill: '#1d1d1d', listening: false, perfectDrawEnabled: false })
            layer.add(c)
            circles.set(key, c)
          }
          c.position({ x: ax, y: ay })
          c.radius(HINGE_RADIUS)
          c.visible(true)
        }
      }

      for (const [key, c] of [...circles]) {
        if (!seenKeys.has(key)) {
          c.destroy()
          circles.delete(key)
        }
      }

      layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      circles.clear()
    }
  }, [stageRef, mainLayerRef])

  return null
}
