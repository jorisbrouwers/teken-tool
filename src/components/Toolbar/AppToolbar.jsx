import { useState, useRef, useEffect } from 'react'
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
  wall: (
    <svg {...ICON}>
      <rect x="2" y="3" width="16" height="14" rx="1.5" />
      <line x1="2" y1="10" x2="18" y2="10" />
      <line x1="10" y1="3" x2="10" y2="10" />
      <line x1="6" y1="10" x2="6" y2="17" />
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
  triangle: (
    <svg {...ICON}>
      <polygon points="10 3 17 17 3 17" />
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
  camera: (
    <svg {...ICON}>
      <rect x="2" y="6" width="16" height="11" rx="1.5" />
      <circle cx="10" cy="11.5" r="3" />
      <path d="M7 6l1.5-2h3L13 6" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, flexShrink: 0 }}>
      <polyline points="5 8 10 13 15 8" />
    </svg>
  ),
}

const DRAW_TOOLS = [
  { id: 'select', icon: Icons.select, title: 'Selecteren' },
  { id: 'pen',    icon: Icons.pen,    title: 'Tekenen' },
  { id: 'wall',   icon: Icons.wall,   title: 'Muur' },
  { id: 'eraser', icon: Icons.eraser, title: 'Gum' },
  { id: 'text',   icon: Icons.text,   title: 'Tekst' },
]

const SHAPE_TOOLS = [
  { id: 'rect',     icon: Icons.rect,     title: 'Rechthoek' },
  { id: 'circle',   icon: Icons.circle,   title: 'Cirkel' },
  { id: 'line',     icon: Icons.line,     title: 'Lijn' },
  { id: 'arrow',    icon: Icons.arrow,    title: 'Pijl' },
  { id: 'lshape',   icon: Icons.lshape,   title: 'L-vorm' },
  { id: 'triangle', icon: Icons.triangle, title: 'Driehoek' },
]

export default function AppToolbar({
  note,
  activeTool,
  setActiveTool,
  showGrid,
  onToggleGrid,
  snapEnabled,
  onToggleSnap,
  onRename,
  onImportImage,
  onUndo,
  onRedo,
  onOpenProjects,
  menuSlot,
  notes,
  onSelectNote,
  hasClipboard,
  hasSelection,
  onCopy,
  onPaste,
}) {
  const [renamingTitle, setRenamingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(note?.title ?? '')
  const importImageRef = useRef(null)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [showNoteDropdown, setShowNoteDropdown] = useState(false)
  const [noteDropdownPos, setNoteDropdownPos] = useState({ top: 0, left: 0 })
  const noteTitleRef = useRef(null)
  const noteDropdownRef = useRef(null)

  useEffect(() => {
    if (!showNoteDropdown) return
    function onClickOutside(e) {
      if (
        noteDropdownRef.current && !noteDropdownRef.current.contains(e.target) &&
        noteTitleRef.current && !noteTitleRef.current.contains(e.target)
      ) {
        setShowNoteDropdown(false)
      }
    }
    document.addEventListener('pointerdown', onClickOutside, true)
    return () => document.removeEventListener('pointerdown', onClickOutside, true)
  }, [showNoteDropdown])

  useEffect(() => {
    if (!showCamera) return
    let stream
    async function startCamera() {
      const initial = await navigator.mediaDevices.getUserMedia({ video: true })
      initial.getTracks().forEach(t => t.stop())

      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter(d => d.kind === 'videoinput')

      const rearKeywords = /rear|back|achter|environment|world/i
      const rear = cameras.find(d => rearKeywords.test(d.label))
      const constraints = rear
        ? { video: { deviceId: { exact: rear.deviceId } } }
        : { video: { facingMode: 'environment' } }

      stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    }
    startCamera().catch(() => setCameraError('Camera niet beschikbaar of geen toestemming gegeven.'))
    return () => {
      stream?.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }, [showCamera])

  function openCamera() {
    setCameraError(null)
    setShowCamera(true)
  }

  function closeCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setShowCamera(false)
  }

  function capturePhoto() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      onImportImage(new File([blob], 'foto.jpg', { type: 'image/jpeg' }))
      closeCamera()
    }, 'image/jpeg', 0.92)
  }

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

  function openNoteDropdown() {
    const r = noteTitleRef.current.getBoundingClientRect()
    setNoteDropdownPos({ top: r.bottom + 4, left: r.left, width: r.width, maxHeight: window.innerHeight - r.bottom - 12 })
    setShowNoteDropdown(true)
  }

  return (
    <div className="app-toolbar">
      {/* Hamburger menu */}
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

      {/* Notitietitel / dropdown */}
      {renamingTitle ? (
        <input
          className="toolbar-title-input"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={handleTitleKeyDown}
          onFocus={(e) => e.target.select()}
          autoFocus
        />
      ) : (
        <div
          ref={noteTitleRef}
          className={`toolbar-title toolbar-title--switchable${showNoteDropdown ? ' toolbar-title--open' : ''}`}
          onClick={openNoteDropdown}
          title="Klik om van notitie te wisselen"
        >
          <span className="toolbar-title-text">{note?.title}</span>
          {Icons.chevronDown}
        </div>
      )}

      {/* Notitie-switcher dropdown */}
      {showNoteDropdown && (
        <div
          ref={noteDropdownRef}
          className="note-switcher-dropdown"
          style={{ top: noteDropdownPos.top, left: noteDropdownPos.left, width: noteDropdownPos.width, maxHeight: noteDropdownPos.maxHeight }}
        >
          {(notes ?? []).map(n => (
            <div
              key={n.id}
              className={`note-switcher-item${n.id === note?.id ? ' note-switcher-item--active' : ''}`}
              onClick={() => { onSelectNote(n.id); setShowNoteDropdown(false) }}
            >
              <span className="note-switcher-item-title">{n.title}</span>
            </div>
          ))}
        </div>
      )}

      <div className="toolbar-sep" />

      {/* Undo/Redo */}
      <button className="toolbar-btn" title="Ongedaan maken (Ctrl+Z)" onClick={onUndo}>{Icons.undo}</button>
      <button className="toolbar-btn" title="Opnieuw (Ctrl+Y)" onClick={onRedo}>{Icons.redo}</button>

      <div className="toolbar-sep" />

      {/* Kopiëren / Plakken */}
      <button
        className="toolbar-btn"
        title="Kopiëren"
        onClick={hasSelection ? onCopy : undefined}
        style={hasSelection ? {} : { opacity: 0.4, pointerEvents: 'none' }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="7" width="9" height="9" rx="1.5" />
          <path d="M4 13V4h9" />
        </svg>
      </button>
      <button
        className="toolbar-btn"
        title="Plakken"
        onClick={hasClipboard ? onPaste : undefined}
        style={hasClipboard ? {} : { opacity: 0.4, pointerEvents: 'none' }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h6a1 1 0 0 1 1 1v1H6V4a1 1 0 0 1 1-1z" />
          <rect x="4" y="5" width="12" height="13" rx="1.5" />
          <line x1="7" y1="10" x2="13" y2="10" />
          <line x1="7" y1="13" x2="11" y2="13" />
        </svg>
      </button>

      <div className="toolbar-sep" />

      {/* Tekentools */}
      {DRAW_TOOLS.map((tool) => (
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

      {/* Vormen */}
      {SHAPE_TOOLS.map((tool) => (
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

      {/* Grid toggle */}
      <button
        className={`toolbar-btn${showGrid ? ' active' : ''}`}
        title="Rasterachtergrond aan/uit"
        onClick={onToggleGrid}
      >
        {Icons.grid}
      </button>

      {/* Snap toggle */}
      <button
        className={`toolbar-btn${snapEnabled ? ' active' : ''}`}
        title={snapEnabled ? 'Snappen aan/uit (nu aan)' : 'Snappen aan/uit (nu uit)'}
        onClick={onToggleSnap}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 15V8a5 5 0 0 1 10 0v7" />
          <line x1="2.5" y1="15" x2="7.5" y2="15" />
          <line x1="12.5" y1="15" x2="17.5" y2="15" />
        </svg>
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
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          Array.from(e.target.files).forEach(f => onImportImage(f))
          e.target.value = ''
        }}
      />

      {/* Camera */}
      <button className="toolbar-btn" title="Camera" onClick={openCamera}>
        {Icons.camera}
      </button>


      {/* Camera modal */}
      {showCamera && (
        <div className="camera-backdrop" onClick={closeCamera}>
          <div className="camera-modal" onClick={e => e.stopPropagation()}>
            {cameraError ? (
              <p className="camera-error">{cameraError}</p>
            ) : (
              <video ref={videoRef} className="camera-video" autoPlay playsInline muted />
            )}
            <div className="camera-actions">
              <button className="camera-btn camera-btn-secondary" onClick={closeCamera}>Annuleren</button>
              {!cameraError && (
                <button className="camera-btn camera-btn-primary" onClick={capturePhoto}>Foto nemen</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
