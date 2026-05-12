import { useState, useRef, useCallback, useEffect } from 'react'
import Konva from 'konva'
import { useNotes } from './hooks/useNotes.js'
import CanvasView from './components/Canvas/CanvasView.jsx'
import AppToolbar from './components/Toolbar/AppToolbar.jsx'
import StylePanel, { SIZE_MAP } from './components/StylePanel/StylePanel.jsx'
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu.jsx'
import ProjectsPanel from './components/Projects/ProjectsPanel.jsx'
import { updateNoteSettings } from './db/db.js'
import { exportJnote } from './export/exportJnote.js'
import { exportPdf } from './export/exportPdf.js'
import { parseJnote } from './import/importJnote.js'
import './App.css'

export default function App() {
  const {
    notes,
    templateNotes,
    trashNotes,
    activeNoteId,
    setActiveNoteId,
    loading,
    createNote,
    renameNote,
    softDeleteNote,
    restoreNote,
    permanentDeleteNote,
    importNote,
    duplicateNote,
    moveNote,
    refreshNotes,
  } = useNotes()

  const [projectsOpen, setProjectsOpen] = useState(false)
  const [centerOnSelect, setCenterOnSelect] = useState(false)
  const [activeTool, setActiveTool] = useState('pen')

  useEffect(() => { setCenterOnSelect(false) }, [activeNoteId])

  const penToolRef = useRef('pen')
  const manualSelectRef = useRef(false)

  function handleToolSelect(tool) {
    setActiveTool(tool)
    manualSelectRef.current = (tool === 'select')
    if (tool !== 'select' && tool !== 'eraser') {
      penToolRef.current = tool
    }
  }

  function handleSelectNote(id) {
    setCenterOnSelect(true)
    setActiveNoteId(id)
  }

  const handleInputDetected = useCallback((type) => {
    if (type === 'touch') setActiveTool('select')
    else if (type === 'pen') setActiveTool(manualSelectRef.current ? 'select' : penToolRef.current)
    else if (type === 'pen-eraser') setActiveTool('eraser')
  }, [])

  const [penColor, setPenColor] = useState('#1d1d1d')
  const [opacity, setOpacity] = useState(100)
  const [penSizeCategory, setPenSizeCategory] = useState('s')
  const [strokeStyle, setStrokeStyle] = useState('freehand')
  const [pressureSensitive, setPressureSensitive] = useState(true)

  const penSize = SIZE_MAP[penSizeCategory]
  const canvasViewRef = useRef(null)

  const activeNote = notes.find((n) => n.id === activeNoteId)
    ?? templateNotes.find((n) => n.id === activeNoteId)
    ?? null
  const showGrid = activeNote?.settings?.background === 'grid'

  const handleToggleGrid = useCallback(async () => {
    if (!activeNote) return
    const newBg = showGrid ? 'none' : 'grid'
    await updateNoteSettings(activeNote.id, { ...activeNote.settings, background: newBg })
    await refreshNotes()
  }, [activeNote, showGrid, refreshNotes])

  const handleExportPdf = useCallback(async () => {
    const stage = canvasViewRef.current?.getStage()
    if (!stage || !activeNote) return
    await exportPdf(activeNote, stage, showGrid)
  }, [activeNote, showGrid])

  const handleExportJnote = useCallback(() => {
    const mainLayer = canvasViewRef.current?.getMainLayer()
    if (!mainLayer || !activeNote) return
    exportJnote(activeNote, mainLayer)
  }, [activeNote])

  const handleExportAll = useCallback(async () => {
    const stage = canvasViewRef.current?.getStage()
    const mainLayer = canvasViewRef.current?.getMainLayer()
    if (!stage || !mainLayer || !activeNote) return
    await exportPdf(activeNote, stage, showGrid)
    exportJnote(activeNote, mainLayer)
  }, [activeNote, showGrid])

  const handleImportJnote = useCallback(async (file) => {
    try {
      const noteData = await parseJnote(file)
      await importNote(noteData)
    } catch (err) {
      alert(err.message)
    }
  }, [importNote])

  const handleSaveAsTemplate = useCallback(async (note) => {
    if (!note) return
    const dup = await duplicateNote(note.id)
    // Mark the duplicate as a template via direct db update
    const { default: db } = await import('./db/db.js')
    await db.notes.update(dup.id, {
      is_template: true,
      title: `Template: ${note.title}`,
    })
    await refreshNotes()
  }, [duplicateNote, refreshNotes])

  const handleCreateFromTemplate = useCallback(async (templateId) => {
    const dup = await duplicateNote(templateId)
    const { default: db } = await import('./db/db.js')
    await db.notes.update(dup.id, {
      is_template: false,
      title: dup.title.replace(/^Kopie van (?:Template: )?/, ''),
    })
    await refreshNotes()
    return dup
  }, [duplicateNote, refreshNotes])

  const handleImportImage = useCallback((file) => {
    const addImage = canvasViewRef.current?.addImage
    if (!addImage) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target.result
      const img = new Image()
      img.onload = () => {
        const stage = canvasViewRef.current?.getStage()
        if (!stage) return
        const scale = stage.scaleX()
        const maxW = stage.width() * 0.6 / scale
        let w = img.naturalWidth
        let h = img.naturalHeight
        if (w > maxW) { h = h * (maxW / w); w = maxW }
        const cx = (stage.width()  / 2 - stage.x()) / scale
        const cy = (stage.height() / 2 - stage.y()) / scale
        const konvaImg = new Konva.Image({
          image: img,
          src,
          x: cx - w / 2,
          y: cy - h / 2,
          width: w,
          height: h,
          draggable: true,
          isImage: true,
        })
        addImage(konvaImg)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  if (loading) {
    return <div className="app-loading">Laden…</div>
  }

  const hamburgerMenu = (
    <HamburgerMenu
      activeNote={activeNote}
      onExportPdf={handleExportPdf}
      onExportJnote={handleExportJnote}
      onExportAll={handleExportAll}
      onSaveAsTemplate={handleSaveAsTemplate}
    />
  )

  return (
    <div className="app-layout">
      <main className="main-area">
        {activeNote ? (
          <>
            <AppToolbar
              note={activeNote}
              activeTool={activeTool}
              setActiveTool={handleToolSelect}
              showGrid={showGrid}
              onToggleGrid={handleToggleGrid}
              onRename={renameNote}
              onImportImage={handleImportImage}
              onUndo={() => canvasViewRef.current?.undo()}
              onRedo={() => canvasViewRef.current?.redo()}
              onOpenProjects={() => setProjectsOpen(true)}
              menuSlot={hamburgerMenu}
              notes={notes}
              onSelectNote={handleSelectNote}
            />
            <CanvasView
              key={activeNote.id}
              ref={canvasViewRef}
              note={activeNote}
              activeTool={activeTool}
              penColor={penColor}
              penSize={penSize}
              opacity={opacity}
              strokeStyle={strokeStyle}
              pressureSensitive={pressureSensitive}
              onInputDetected={handleInputDetected}
              shouldCenter={centerOnSelect}
            />
            <StylePanel
              activeTool={activeTool}
              penColor={penColor}
              setPenColor={setPenColor}
              opacity={opacity}
              setOpacity={setOpacity}
              penSizeCategory={penSizeCategory}
              setPenSizeCategory={setPenSizeCategory}
              strokeStyle={strokeStyle}
              setStrokeStyle={setStrokeStyle}
              pressureSensitive={pressureSensitive}
              setPressureSensitive={setPressureSensitive}
            />
            <button
              className="center-content-fab"
              title="Centreer op inhoud"
              onClick={() => canvasViewRef.current?.centerToContent()}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="14" height="14" rx="1.5" />
                <rect x="7" y="7" width="6" height="6" rx="1" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <div className="app-toolbar">{hamburgerMenu}</div>
            <div className="empty-state">
              <div>
                <div style={{ marginBottom: 12, color: 'var(--color-text-muted)' }}>
                  Geen notitie geselecteerd
                </div>
                <button
                  className="projects-open-btn"
                  onClick={() => setProjectsOpen(true)}
                >
                  Projecten openen
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {projectsOpen && (
        <ProjectsPanel
          notes={notes}
          templateNotes={templateNotes}
          trashNotes={trashNotes}
          activeNoteId={activeNoteId}
          onSelect={handleSelectNote}
          onCreate={createNote}
          onCreateFromTemplate={handleCreateFromTemplate}
          onCreateTemplate={() => createNote('Nieuwe template', true)}
          onRename={renameNote}
          onDelete={softDeleteNote}
          onDuplicate={duplicateNote}
          onMove={moveNote}
          onRestore={restoreNote}
          onPermanentDelete={permanentDeleteNote}
          onImportJnote={handleImportJnote}
          onClose={() => setProjectsOpen(false)}
        />
      )}
    </div>
  )
}
