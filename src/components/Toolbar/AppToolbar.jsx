import { useState, useRef } from 'react'
import './Toolbar.css'

const S = 'currentColor'
const ICON = { viewBox: '0 0 20 20', fill: 'none', stroke: S, strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icons = {
  select: (
    <svg {...ICON}>
      <path d="M4 3l11 6.5-5 1.5-2.5 5L4 3z" />
    </svg>
  ),
  pen: (
    <svg {...ICON}>
      <path d="M13.5 3.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L13.5 3.5z" />
    </svg>
  ),
  eraser: (
    <svg {...ICON}>
      <path d="M3 14.5l5.5-9a1 1 0 0 1 1.5-.2l5.7 5.7a1 1 0 0 1-.2 1.5L9 17H17" />
      <path d="M6.5 17H3" />
    </svg>
  ),
  text: (
    <svg {...ICON}>
      <path d="M4 5h12M10 5v11M7 16h6" />
    </svg>
  ),
  rect: (
    <svg {...ICON}>
      <rect x="3" y="5" width="14" height="10" rx="1.5" />
    </svg>
  ),
  circle: (
    <svg {...ICON}>
      <ellipse cx="10" cy="10" rx="7" ry="5.5" />
    </svg>
  ),
  line: (
    <svg {...ICON}>
      <line x1="4" y1="16" x2="16" y2="4" />
    </svg>
  ),
  arrow: (
    <svg {...ICON}>
      <line x1="4" y1="16" x2="15" y2="5" />
      <path d="M9 5h6v6" />
    </svg>
  ),
  lshape: (
    <svg {...ICON}>
      <polyline points="5 4 5 16 16 16" />
    </svg>
  ),
  undo: (
    <svg {...ICON}>
      <path d="M4 9a6 6 0 1 1 1.5 4.5" />
      <path d="M4 4.5V9H8.5" />
    </svg>
  ),
  redo: (
    <svg {...ICON}>
      <path d="M16 9a6 6 0 1 0-1.5 4.5" />
      <path d="M16 4.5V9H11.5" />
    </svg>
  ),
  grid: (
    <svg {...ICON}>
      <rect x="3" y="3" width="14" height="14" rx="1" />
      <line x1="3" y1="8.3" x2="17" y2="8.3" />
      <line x1="3" y1="13.7" x2="17" y2="13.7" />
      <line x1="8.3" y1="3" x2="8.3" y2="17" />
      <line x1="13.7" y1="3" x2="13.7" y2="17" />
    </svg>
  ),
  image: (
    <svg {...ICON}>
      <rect x="2" y="4" width="16" height="12" rx="1.5" />
      <circle cx="7" cy="8.5" r="1.5" />
      <path d="M2 13.5l4-4 3 3 2.5-2.5 4.5 5" />
    </svg>
  ),
  centerContent: (
    <svg {...ICON}>
      <rect x="3" y="3" width="14" height="14" rx="1.5" />
      <rect x="7" y="7" width="6" height="6" rx="1" />
    </svg>
  ),
}

const TOOLS = [
  { id: 'select', icon: Icons.select, title: 'Selecteren' },
  { id: 'pen',    icon: Icons.pen,    title: 'Tekenen' },
  { id: 'eraser', icon: Icons.eraser, title: 'Gum' },
  { id: 'text',   icon: Icons.text,   title: 'Tekst' },
  { id: 'rect',   icon: Icons.rect,   title: 'Rechthoek' },
  { id: 'circle', icon: Icons.circle, title: 'Cirkel' },
  { id: 'line',    icon: Icons.line,    title: 'Lijn' },
  { id: 'arrow',   icon: Icons.arrow,   title: 'Pijl' },
  { id: 'lshape',  icon: Icons.lshape,  title: 'L-vorm' },
]

export default function AppToolbar({
  note,
  activeTool,
  setActiveTool,
  showGrid,
  onToggleGrid,
  onRename,
  onImportImage,
  onUndo,
  onRedo,
  onOpenProjects,
  menuSlot,
}) {
  const [renamingTitle, setRenamingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(note?.title ?? '')
  const importImageRef = useRef(null)

  function startRename() {
    setTitleValue(note.title)
    setRenamingTitle(true)
  }

  function commitRename() {
    const trimmed = titleValue.trim()
    if (trimmed && trimmed !== note.title) onRename(note.id, trimmed)
    setRenamingTitle(false)
  }

  function handleTitleKeyDown(e) {
    if (e.key === 'Enter') commitRename()
    if (e.key === 'Escape') setRenamingTitle(false)
  }

  return (
    <div className="app-toolbar">
      {/* Hamburger menu (gerenderd door App.jsx) */}
      {menuSlot}

      {/* Projecten-knop */}
      <button
        className="toolbar-btn"
        title="Projecten"
        onClick={onOpenProjects}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5a1 1 0 0 1 1-1h3l2 2h7a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5z" />
        </svg>
      </button>

      <div className="toolbar-sep" />

      {/* Notitietitel */}
      {renamingTitle ? (
        <input
          className="toolbar-title-input"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={handleTitleKeyDown}
          autoFocus
        />
      ) : (
        <div className="toolbar-title" onClick={startRename} title="Klik om te hernoemen">
          {note?.title}
        </div>
      )}

      <div className="toolbar-sep" />

      {/* Tekentools */}
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          className={`toolbar-btn${activeTool === tool.id ? ' active' : ''}`}
          title={tool.title}
          onClick={() => setActiveTool(tool.id)}
        >
          {tool.icon}
        </button>
      ))}

      <div className="toolbar-sep" />

      {/* Undo/Redo */}
      <button className="toolbar-btn" title="Ongedaan maken (Ctrl+Z)" onClick={onUndo}>{Icons.undo}</button>
      <button className="toolbar-btn" title="Opnieuw (Ctrl+Y)" onClick={onRedo}>{Icons.redo}</button>

      <div className="toolbar-sep" />

      {/* Grid toggle */}
      <button
        className={`toolbar-btn${showGrid ? ' active' : ''}`}
        title="Rasterachtergrond aan/uit"
        onClick={onToggleGrid}
      >
        {Icons.grid}
      </button>

      <div className="toolbar-sep" />

      {/* Afbeelding importeren */}
      <button className="toolbar-btn" title="Afbeelding importeren" onClick={() => importImageRef.current?.click()}>
        {Icons.image}
      </button>
      <input
        ref={importImageRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => { if (e.target.files[0]) { onImportImage(e.target.files[0]); e.target.value = '' } }}
      />
    </div>
  )
}
