import { useEffect, useRef } from 'react'
import { GRID_SIZE } from './useGrid.js'

export default function MeasurementLabels({ mainLayerRef, stageRef, skipNodeId, suppressRef, onPillClick, showPills = true }) {
  const containerRef    = useRef(null)
  const labelMapRef     = useRef(new Map())
  const rafRef          = useRef(null)
  const onPillClickRef  = useRef(onPillClick)
  onPillClickRef.current = onPillClick
  const showPillsRef    = useRef(showPills)
  showPillsRef.current  = showPills

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function tick() {
      const layer = mainLayerRef.current
      const stage = stageRef.current
      if (suppressRef?.current || !showPillsRef.current) {
        labelMapRef.current.forEach(el => { el.style.visibility = 'hidden' })
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (layer && stage) {
        const box       = stage.container().getBoundingClientRect()
        const transform = stage.getAbsoluteTransform()
        const seenIds   = new Set()

        for (const node of layer.getChildren()) {
          const cls = node.getClassName()
          if ((cls !== 'Line' && cls !== 'Arrow') || node.points().length !== 4) continue
          const id = node.id()
          if (!id) continue              // snap/align indicators have no user id
          if (id === skipNodeId) continue
          seenIds.add(id)

          const pts      = node.points()
          const lengthPx = Math.hypot(pts[2] - pts[0], pts[3] - pts[1])
          if (lengthPx < 1) continue  // skip collapsed / zero-length segments
          const mx      = node.x() + (pts[0] + pts[2]) / 2
          const my      = node.y() + (pts[1] + pts[3]) / 2
          const sp      = transform.point({ x: mx, y: my })
          const x       = box.left + sp.x
          const y       = box.top  + sp.y
          const lengthM = (lengthPx / GRID_SIZE).toFixed(2)
          const text    = `${lengthM} m`

          let el = labelMapRef.current.get(id)
          if (!el) {
            el = document.createElement('span')
            el.className = 'measurement-label-global'
            el.style.pointerEvents = 'auto'
            el.style.cursor = 'pointer'
            el.addEventListener('click', (e) => {
              e.stopPropagation()
              onPillClickRef.current?.(id)
            })
            container.appendChild(el)
            labelMapRef.current.set(id, el)
          }
          el.style.visibility = ''
          el.style.left    = x + 'px'
          el.style.top     = y + 'px'
          el.textContent   = text
        }

        for (const [id, el] of [...labelMapRef.current]) {
          if (!seenIds.has(id)) {
            el.remove()
            labelMapRef.current.delete(id)
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      labelMapRef.current.forEach(el => el.remove())
      labelMapRef.current.clear()
    }
  }, [mainLayerRef, stageRef, skipNodeId])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    />
  )
}
