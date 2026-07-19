import './Sidebar.css'

// Zwevend paneel dat over het canvas heen schuift, vanaf de linkerkant.
// Sluiten bij canvas-interactie gebeurt niet hier, maar door de aanroeper:
// App.jsx roept onClose aan vanuit CanvasView's onCanvasPointerDown-callback,
// die ongefilterd op élke pointerdown (muis/pen/vinger, ook navigatie) vuurt —
// zie de toelichting bij onCanvasPointerDownRef in CanvasView.jsx.
export default function LeftSidebar({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className="left-sidebar" onPointerDown={e => e.stopPropagation()}>
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
