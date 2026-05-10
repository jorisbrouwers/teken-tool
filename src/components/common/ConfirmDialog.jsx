import { useEffect, useRef } from 'react'
import './common.css'

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const confirmRef = useRef(null)

  useEffect(() => {
    confirmRef.current?.focus()
  }, [])

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Annuleren</button>
          <button className="btn btn-danger" ref={confirmRef} onClick={onConfirm}>Verwijderen</button>
        </div>
      </div>
    </div>
  )
}
