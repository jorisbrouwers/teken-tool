import { useEffect, useRef } from 'react'
import './common.css'

export default function CalibrateDialog({ onConfirm, onCancel }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  function confirm() {
    const v = parseFloat(inputRef.current?.value)
    if (!isNaN(v) && v > 0.01) onConfirm(v)
  }

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <p className="dialog-message">Werkelijke afstand van de getekende lijn (in meter)</p>
        <input
          ref={inputRef}
          type="number"
          step="0.01"
          min="0"
          defaultValue="1"
          className="dialog-input"
          onKeyDown={(e) => { if (e.key === 'Enter') confirm() }}
        />
        <div className="dialog-actions">
          <button className="btn btn-primary" onClick={confirm}>Toepassen</button>
        </div>
      </div>
    </div>
  )
}
