import { useEffect, useRef } from 'react'
import { GRID_SIZE } from './useGrid.js'
import { getPillCssStyle } from './pillStyle.js'

export default function MeasurementLabels({ mainLayerRef, stageRef, skipNodeId, suppressRef, onPillClick, showPills = true, pillStyle, editModeActive = false }) {
  const containerRef    = useRef(null)
  const labelMapRef     = useRef(new Map())
  const rafRef          = useRef(null)
  const onPillClickRef  = useRef(onPillClick)
  onPillClickRef.current = onPillClick
  const showPillsRef    = useRef(showPills)
  showPillsRef.current  = showPills
  const pillStyleRef    = useRef(pillStyle)
  pillStyleRef.current  = pillStyle
  // In edit mode moeten pillen "doorzichtig" zijn voor de pointer: anders
  // vangt de pill een pendown weg die eigenlijk bedoeld is om de muur
  // eronder te slepen (body-drag begint immers al bij pointerdown, niet pas
  // bij een los click-event dat de pill zelf afhandelt).
  const editModeActiveRef = useRef(editModeActive)
  editModeActiveRef.current = editModeActive

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
          if (!node.attrs.isWall) continue  // alleen lijnsysteem-segmenten krijgen een pill
          const cls = node.getClassName()
          if ((cls !== 'Line' && cls !== 'Arrow') || node.points().length !== 4) continue
          const id = node.id()
          if (!id) continue              // snap/align indicators have no user id
          if (id === skipNodeId) continue
          // Geculed = tijdens navigatie nog niet herteked (frozen-canvas
          // mechanisme) — de pill zou anders los van zijn muur zweven totdat
          // endNav de echte inhoud bijwerkt.
          if (node._culled) continue

          const pts      = node.points()
          const lengthPx = Math.hypot(pts[2] - pts[0], pts[3] - pts[1])
          if (lengthPx < 1) continue  // skip collapsed / zero-length segments
          const mx      = node.x() + (pts[0] + pts[2]) / 2
          const my      = node.y() + (pts[1] + pts[3]) / 2
          const sp      = transform.point({ x: mx, y: my })
          const x       = box.left + sp.x
          const y       = box.top  + sp.y
          // Pills zijn position:fixed en ontsnappen daardoor aan het
          // overflow:hidden van canvas-wrapper (dat clipt alleen het canvas
          // zelf) — buiten de viewport dus zelf verbergen.
          if (x < box.left || x > box.right || y < box.top || y > box.bottom) continue
          seenIds.add(id)

          const lengthM = (lengthPx / GRID_SIZE).toFixed(2)
          const text    = `${lengthM}`

          let el = labelMapRef.current.get(id)
          if (!el) {
            el = document.createElement('span')
            el.className = 'measurement-label-global'
            el.style.cursor = 'pointer'
            el.addEventListener('click', (e) => {
              e.stopPropagation()
              onPillClickRef.current?.(id)
            })
            container.appendChild(el)
            labelMapRef.current.set(id, el)
          }
          const ps = getPillCssStyle(pillStyleRef.current)
          el.style.background = ps.background
          el.style.color      = ps.color
          el.style.fontSize   = ps.fontSize
          if (ps.boxShadow !== undefined) el.style.boxShadow = ps.boxShadow
          el.style.visibility = ''
          el.style.left    = x + 'px'
          el.style.top     = y + 'px'
          el.textContent   = text
          // In edit mode: 'none' zodat pointerdown door de pill heen valt
          // naar de muur eronder (body-drag) i.p.v. door de pill zelf
          // afgevangen te worden.
          el.style.pointerEvents = editModeActiveRef.current ? 'none' : 'auto'
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
