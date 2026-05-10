import { useState, useEffect, useRef } from 'react'
import './HamburgerMenu.css'

export default function HamburgerMenu({
  activeNote,
  onExportPdf,
  onExportJnote,
  onSaveAsTemplate,
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', handleClick)
    return () => document.removeEventListener('pointerdown', handleClick)
  }, [open])

  function item(label, onClick, disabled = false) {
    return (
      <button
        className={`hamburger-item${disabled ? ' disabled' : ''}`}
        onClick={() => { if (!disabled) { onClick(); setOpen(false) } }}
        disabled={disabled}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="hamburger-wrapper" ref={menuRef}>
      <button
        className={`toolbar-btn${open ? ' active' : ''}`}
        title="Menu"
        onClick={() => setOpen(o => !o)}
        aria-label="Menu openen"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="3" y1="6"  x2="17" y2="6"  />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14" x2="17" y2="14" />
        </svg>
      </button>

      {open && (
        <div className="hamburger-dropdown">
          {item('Exporteren als PDF', () => onExportPdf(), !activeNote)}
          {item('Exporteren als .jnote', () => onExportJnote(), !activeNote)}
          <div className="hamburger-sep" />
          {item('Opslaan als template', () => onSaveAsTemplate(activeNote), !activeNote)}
        </div>
      )}
    </div>
  )
}
