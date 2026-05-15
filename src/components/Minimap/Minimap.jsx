import { useEffect, useRef, useState } from 'react'
import './Minimap.css'

const MINIMAP_SIZE = 160
const PADDING      = 128

function computeLayout(cb) {
  const aspect = cb.w / cb.h
  if (aspect >= 1) {
    const rh = MINIMAP_SIZE / aspect
    return { rw: MINIMAP_SIZE, rh, ox: 0, oy: (MINIMAP_SIZE - rh) / 2 }
  } else {
    const rw = MINIMAP_SIZE * aspect
    return { rw, rh: MINIMAP_SIZE, ox: (MINIMAP_SIZE - rw) / 2, oy: 0 }
  }
}

export default function Minimap({ stageRef, mainLayerRef, version }) {
  const [thumbnail, setThumbnail] = useState(null)
  const contentBoxRef = useRef(null)
  const panelRef      = useRef(null)
  const draggingRef   = useRef(false)
  const timerRef      = useRef(null)

  // Regenerate thumbnail whenever canvas content changes.
  useEffect(() => {
    clearTimeout(timerRef.current)
    // Small delay so Konva finishes rendering the latest change before we snapshot.
    timerRef.current = setTimeout(() => {
      const mainLayer = mainLayerRef.current
      const stage     = stageRef.current
      if (!mainLayer || !stage) return

      const nodes = mainLayer.getChildren().filter(n => n.getClassName() !== 'Transformer')
      if (!nodes.length) { setThumbnail(null); return }

      // Bounding box in content space.
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      nodes.forEach(n => {
        const r = n.getClientRect({ relativeTo: mainLayer })
        minX = Math.min(minX, r.x);    minY = Math.min(minY, r.y)
        maxX = Math.max(maxX, r.x + r.width); maxY = Math.max(maxY, r.y + r.height)
      })
      minX -= PADDING; minY -= PADDING; maxX += PADDING; maxY += PADDING
      const cw = maxX - minX, ch = maxY - minY
      if (cw <= 0 || ch <= 0) return

      // Temporarily apply a "center-to-content" transform so pixel coordinates are
      // guaranteed within stage bounds (avoids asymmetric clipping on any side).
      const sw = stage.width(), sh = stage.height()
      const margin  = 16
      const fitScale = Math.min((sw - margin * 2) / cw, (sh - margin * 2) / ch)
      const fitX = sw / 2 - (minX + cw / 2) * fitScale
      const fitY = sh / 2 - (minY + ch / 2) * fitScale

      const savedScale = stage.scale()
      const savedPos   = stage.position()
      stage.scale({ x: fitScale, y: fitScale })
      stage.position({ x: fitX, y: fitY })

      // toDataURL now sees content rendered at the virtual transform.
      const pX = minX * fitScale + fitX   // ≈ margin (always in bounds)
      const pY = minY * fitScale + fitY
      const pW = cw * fitScale
      const pH = ch * fitScale

      const layout     = computeLayout({ w: cw, h: ch })
      const pixelRatio = layout.rw / pW

      let url
      try {
        url = mainLayer.toDataURL({ x: pX, y: pY, width: pW, height: pH, pixelRatio, mimeType: 'image/png' })
      } catch {
        // toDataURL can throw on tainted images (cross-origin); silently skip
      }

      // Restore stage transform before the browser paints (fully synchronous).
      stage.scale(savedScale)
      stage.position(savedPos)

      if (url) {
        setThumbnail(url)
        contentBoxRef.current = { x: minX, y: minY, w: cw, h: ch }
      }
    }, 150)

    return () => clearTimeout(timerRef.current)
  }, [version, mainLayerRef, stageRef])

  function panToPoint(clientX, clientY) {
    const stage = stageRef.current
    const cb    = contentBoxRef.current
    if (!stage || !cb || !panelRef.current) return
    const rect           = panelRef.current.getBoundingClientRect()
    const { rw, rh, ox, oy } = computeLayout(cb)
    const cx = cb.x + ((clientX - rect.left - ox) / rw) * cb.w
    const cy = cb.y + ((clientY - rect.top  - oy) / rh) * cb.h
    const scale = stage.scaleX()
    stage.position({
      x: stage.width()  / 2 - cx * scale,
      y: stage.height() / 2 - cy * scale,
    })
    stage.batchDraw()
  }

  function handlePointerDown(e) {
    e.preventDefault()
    draggingRef.current = true
    panelRef.current.setPointerCapture(e.pointerId)
    panToPoint(e.clientX, e.clientY)
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return
    panToPoint(e.clientX, e.clientY)
  }

  function handlePointerUp(e) {
    draggingRef.current = false
    panelRef.current?.releasePointerCapture(e.pointerId)
  }

  if (!thumbnail) return null

  const cb = contentBoxRef.current
  const { rw, rh, ox, oy } = cb ? computeLayout(cb) : { rw: MINIMAP_SIZE, rh: MINIMAP_SIZE, ox: 0, oy: 0 }

  return (
    <div
      ref={panelRef}
      className="minimap-panel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Klik of sleep om te navigeren"
    >
      <img
        src={thumbnail}
        alt=""
        className="minimap-img"
        draggable={false}
        style={{ left: ox, top: oy, width: rw, height: rh }}
      />
    </div>
  )
}
