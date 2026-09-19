import { useEffect, useRef } from 'react'
import './Sidebar.css'

// Zwevend paneel dat over het canvas heen schuift, vanaf de linkerkant.
//
// Sluiten bij canvas-interactie loopt via TWEE onafhankelijke, elkaar
// overlappende mechanismen:
// 1) App.jsx roept onClose aan vanuit CanvasView's onCanvasPointerDown-
//    callback (ongefilterd op élke pointerdown binnen het canvas — muis, pen,
//    vinger, ook navigatie).
// 2) Deze eigen document-listener hieronder, los van CanvasView's
//    pointer-afhandeling — nodig gebleken omdat mechanisme 1 op iOS/Safari
//    niet betrouwbaar bleek te werken (Pointer Events gedragen zich daar
//    anders dan op Windows/Chromium). touchstart wordt bewust apart
//    meegeluisterd: dat is het oudste, meest universeel ondersteunde
//    touch-event en werkt als vangnet ook wanneer Pointer Events zelf om wat
//    voor reden dan ook niet vuren.
// Beide mogen elkaar overlappen — onClose nogmaals aanroepen op een reeds
// gesloten sidebar is onschadelijk. `closeOnOutside={false}` zet mechanisme 2
// tijdelijk uit (bv. tijdens het koppelen van een referentiepunt, waar de
// canvas-tik juist bij de sidebar-actie hoort); mechanisme 1 moet de aanroeper
// dan zelf ook overslaan.
export default function LeftSidebar({ open, onClose, title, children, closeOnOutside = true }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open || !closeOnOutside) return
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
    }
    // Pas in de volgende taak aanzetten: de tik die closeOnOutside weer op
    // true zet (de hoek-tik die het koppelen afrondt) vuurt na zijn
    // pointerdown nog een mousedown/touchstart af — die mag het paneel niet
    // alsnog sluiten.
    const timer = setTimeout(() => {
      document.addEventListener('pointerdown', handleOutside, true)
      document.addEventListener('touchstart', handleOutside, true)
      document.addEventListener('mousedown', handleOutside, true)
    }, 0)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('pointerdown', handleOutside, true)
      document.removeEventListener('touchstart', handleOutside, true)
      document.removeEventListener('mousedown', handleOutside, true)
    }
  }, [open, onClose, closeOnOutside])

  if (!open) return null

  return (
    <div ref={panelRef} className="left-sidebar" onPointerDown={e => e.stopPropagation()}>
      <div className="left-sidebar-header">
        <span className="left-sidebar-title">{title}</span>
        <button className="left-sidebar-close" onClick={onClose} title="Sluiten">✕</button>
      </div>
      <div className="left-sidebar-body">
        {children}
      </div>
    </div>
  )
}
