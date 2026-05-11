import { useRef } from 'react'
import './CropOverlay.css'

const HANDLES = [
  { id: 'nw', cursor: 'nw-resize' },
  { id: 'n',  cursor: 'n-resize'  },
  { id: 'ne', cursor: 'ne-resize' },
  { id: 'w',  cursor: 'w-resize'  },
  { id: 'e',  cursor: 'e-resize'  },
  { id: 'sw', cursor: 'sw-resize' },
  { id: 's',  cursor: 's-resize'  },
  { id: 'se', cursor: 'se-resize' },
]

const HS = 10 // half handle size in px

export default function CropOverlay({ imageRect, cropRect, onChange, onConfirm, onCancel }) {
  const draggingRef  = useRef(null)
  const startPosRef  = useRef(null)
  const startCropRef = useRef(null)

  const { x: ix, y: iy, w: iw, h: ih } = imageRect
  const { left, top, right, bottom } = cropRect

  const sL = ix + left, sT = iy + top, sR = ix + right, sB = iy + bottom
  const cW = right - left, cH = bottom - top

  const handlePos = {
    nw: [sL,        sT       ],
    n:  [sL + cW/2, sT       ],
    ne: [sR,        sT       ],
    w:  [sL,        sT + cH/2],
    e:  [sR,        sT + cH/2],
    sw: [sL,        sB       ],
    s:  [sL + cW/2, sB       ],
    se: [sR,        sB       ],
  }

  const MIN = 30

  function onPointerDown(id, e) {
    e.preventDefault()
    e.stopPropagation()
    draggingRef.current  = id
    startPosRef.current  = { x: e.clientX, y: e.clientY }
    startCropRef.current = { ...cropRect }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    const id = draggingRef.current
    if (!id) return
    const dx = e.clientX - startPosRef.current.x
    const dy = e.clientY - startPosRef.current.y
    const s  = startCropRef.current
    let { left, top, right, bottom } = s

    if (id.includes('w')) left   = Math.max(0,  Math.min(s.left   + dx, right  - MIN))
    if (id.includes('e')) right  = Math.min(iw, Math.max(s.right  + dx, left   + MIN))
    if (id.includes('n')) top    = Math.max(0,  Math.min(s.top    + dy, bottom - MIN))
    if (id.includes('s')) bottom = Math.min(ih, Math.max(s.bottom + dy, top    + MIN))

    onChange({ left, top, right, bottom })
  }

  function onPointerUp() { draggingRef.current = null }

  const btnTop = Math.min(sB + 12, window.innerHeight - 52)

  return (
    <div className="crop-overlay" onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      <div className="crop-mask" style={{ left: 0,  top: 0,  width: '100%', height: sT }} />
      <div className="crop-mask" style={{ left: 0,  top: sB, width: '100%', bottom: 0  }} />
      <div className="crop-mask" style={{ left: 0,  top: sT, width: sL,     height: cH }} />
      <div className="crop-mask" style={{ left: sR, top: sT, right: 0,      height: cH }} />

      <div className="crop-border" style={{ left: sL, top: sT, width: cW, height: cH }} />

      {HANDLES.map(h => (
        <div
          key={h.id}
          className="crop-handle"
          style={{ left: handlePos[h.id][0] - HS, top: handlePos[h.id][1] - HS, cursor: h.cursor }}
          onPointerDown={e => onPointerDown(h.id, e)}
        />
      ))}

      <div className="crop-actions" style={{ top: btnTop, left: sL + cW / 2 }}>
        <button className="crop-btn-cancel"  onClick={onCancel}>Annuleren</button>
        <button className="crop-btn-confirm" onClick={onConfirm}>Bijsnijden</button>
      </div>
    </div>
  )
}
