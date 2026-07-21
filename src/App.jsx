import { useState, useRef, useCallback, useEffect } from 'react'
import Konva from 'konva'
import { useNotes } from './hooks/useNotes.js'
import CanvasView from './components/Canvas/CanvasView.jsx'
import AppToolbar from './components/Toolbar/AppToolbar.jsx'
import StylePanel, { SIZE_MAP } from './components/StylePanel/StylePanel.jsx'
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu.jsx'
import ProjectsPanel from './components/Projects/ProjectsPanel.jsx'
import { updateNoteSettings, getAppSettings, saveAppSettings, generateUUID } from './db/db.js'
import Calculator from './components/Calculator/Calculator.jsx'
import { exportJnote } from './export/exportJnote.js'
import { exportPdf } from './export/exportPdf.js'
import { parseJnote } from './import/importJnote.js'
import SettingsPanel from './components/Settings/SettingsPanel.jsx'
import FabButton from './components/Sidebar/FabButton.jsx'
import LeftSidebar from './components/Sidebar/LeftSidebar.jsx'
import InstallationsSidebar from './components/Installations/InstallationsSidebar.jsx'
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
    patchNoteSettings,
    moveNoteBetweenLists,
  } = useNotes()

  const [projectsOpen, setProjectsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [installationsOpen, setInstallationsOpen] = useState(false)
  const [showPills, setShowPills] = useState(false)
  const [showPillsInPdf, setShowPillsInPdf] = useState(false)
  const [showZonesInPdf, setShowZonesInPdf] = useState(false)
  const [showHinges, setShowHinges] = useState(true)
  const [showMinimap, setShowMinimap] = useState(true)
  const [pillColor, setPillColor] = useState('#1971c2')
  const [pillOpacity, setPillOpacity] = useState(100)
  const [pillFontSize, setPillFontSize] = useState(10)
  const [pillTextColor, setPillTextColor] = useState('#ffffff')
  const settingsLoadedRef = useRef(false)

  useEffect(() => {
    getAppSettings().then(s => {
      if (s.showPills !== undefined) setShowPills(s.showPills)
      if (s.showPillsInPdf !== undefined) setShowPillsInPdf(s.showPillsInPdf)
      if (s.showZonesInPdf !== undefined) setShowZonesInPdf(s.showZonesInPdf)
      if (s.showHinges !== undefined) setShowHinges(s.showHinges)
      if (s.showMinimap !== undefined) setShowMinimap(s.showMinimap)
      if (s.pillColor !== undefined) setPillColor(s.pillColor)
      if (s.pillOpacity !== undefined) setPillOpacity(s.pillOpacity)
      if (s.pillFontSize !== undefined) setPillFontSize(s.pillFontSize)
      if (s.pillTextColor !== undefined) setPillTextColor(s.pillTextColor)
      settingsLoadedRef.current = true
    })
  }, [])

  useEffect(() => {
    if (!settingsLoadedRef.current) return
    saveAppSettings({ showPills, showPillsInPdf, showZonesInPdf, showHinges, showMinimap, pillColor, pillOpacity, pillFontSize, pillTextColor })
  }, [showPills, showPillsInPdf, showZonesInPdf, showHinges, showMinimap, pillColor, pillOpacity, pillFontSize, pillTextColor])

  const pillStyle = { pillColor, pillOpacity, pillFontSize, pillTextColor }
  const [clipboardData, setClipboardData] = useState(null)
  const [calcOpen, setCalcOpen] = useState(false)
  const [hasSelection, setHasSelection] = useState(false)
  const [centerOnSelect, setCenterOnSelect] = useState(false)
  const [activeTool, setActiveTool] = useState('select')
  const [snapEnabled, setSnapEnabled] = useState(true)

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

  // Sluit zwevende UI (installaties-sidebar) bij élke canvas-interactie —
  // muis, pen of vinger, inclusief navigeren. CanvasView roept dit ongefilterd
  // aan bij elke pointerdown (zie onCanvasPointerDownRef aldaar); i.t.t.
  // onInputDetected hierboven is dit NIET gededupliceerd op input-type, dus
  // het blijft ook werken bij herhaalde aanrakingen van hetzelfde type.
  const handleCanvasPointerDown = useCallback(() => {
    setInstallationsOpen(false)
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
  const installations = activeNote?.settings?.installations ?? []

  const handleToggleGrid = useCallback(async () => {
    if (!activeNote) return
    const newBg = showGrid ? 'none' : 'grid'
    await updateNoteSettings(activeNote.id, { ...activeNote.settings, background: newBg })
    await refreshNotes()
  }, [activeNote, showGrid, refreshNotes])

  // Zero-setup default: een verse notitie krijgt automatisch één CV-ketel,
  // zodat alle ruimtes zonder verdere actie tot "Zone 1" behoren.
  useEffect(() => {
    if (!activeNote) return
    if (activeNote.settings?.installations !== undefined) return
    const seeded = [{ id: generateUUID(), kind: 'verwarming', type: 'cv_ketel' }]
    const newSettings = { ...activeNote.settings, installations: seeded, defaultHeatingInstallationId: seeded[0].id }
    patchNoteSettings(activeNote.id, newSettings)
    updateNoteSettings(activeNote.id, newSettings)
  }, [activeNote?.id])

  // Optimistisch: de UI wordt meteen bijgewerkt (patchNoteSettings, synchroon),
  // de IndexedDB-schrijfactie loopt op de achtergrond. Voorkomt de merkbare
  // vertraging van steeds een volledige notities-refetch afwachten.
  const handleInstallationsChange = useCallback((newList) => {
    if (!activeNote) return
    const newSettings = { ...activeNote.settings, installations: newList }
    patchNoteSettings(activeNote.id, newSettings)
    updateNoteSettings(activeNote.id, newSettings)
  }, [activeNote, patchNoteSettings])

  // Default aan: alleen expliciet uitgezet (showZones === false) telt als uit.
  const showZones = activeNote?.settings?.showZones !== false

  const handleToggleZones = useCallback(() => {
    if (!activeNote) return
    const newSettings = { ...activeNote.settings, showZones: !showZones }
    patchNoteSettings(activeNote.id, newSettings)
    updateNoteSettings(activeNote.id, newSettings)
  }, [activeNote, showZones, patchNoteSettings])

  const handleExportPdf = useCallback(async () => {
    const stage = canvasViewRef.current?.getStage()
    const mainLayer = canvasViewRef.current?.getMainLayer()
    if (!stage || !mainLayer || !activeNote) return
    await exportPdf(activeNote, stage, mainLayer, showGrid, showPillsInPdf, pillStyle, showHinges, showZonesInPdf)
  }, [activeNote, showGrid, showPillsInPdf, pillStyle, showHinges, showZonesInPdf])

  const handleExportJnote = useCallback(() => {
    const mainLayer = canvasViewRef.current?.getMainLayer()
    if (!mainLayer || !activeNote) return
    exportJnote(activeNote, mainLayer)
  }, [activeNote])

  const handleExportAll = useCallback(async () => {
    const stage = canvasViewRef.current?.getStage()
    const mainLayer = canvasViewRef.current?.getMainLayer()
    if (!stage || !mainLayer || !activeNote) return
    await exportPdf(activeNote, stage, mainLayer, showGrid, showPillsInPdf, pillStyle, showHinges, showZonesInPdf)
    exportJnote(activeNote, mainLayer)
  }, [activeNote, showGrid, showPillsInPdf, pillStyle, showHinges, showZonesInPdf])

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
    const title = `Template: ${note.title}`
    await db.notes.update(dup.id, { is_template: true, title })
    // duplicateNote() plaatste dup al lokaal in `notes` (is_template volgde
    // de bron); nu is_template alsnog naar true is gezet, hoort hij in
    // templateNotes — moveNoteBetweenLists regelt dat zonder volledige
    // refetch (die traag is naarmate de gedupliceerde notitie groter is).
    moveNoteBetweenLists(dup.id, { ...dup, is_template: true, title })
  }, [duplicateNote, moveNoteBetweenLists])

  const handleCreateFromTemplate = useCallback(async (templateId) => {
    const dup = await duplicateNote(templateId)
    const { default: db } = await import('./db/db.js')
    const title = dup.title.replace(/^Kopie van (?:Template: )?/, '')
    await db.notes.update(dup.id, { is_template: false, title })
    const finalNote = { ...dup, is_template: false, title }
    moveNoteBetweenLists(dup.id, finalNote)
    return finalNote
  }, [duplicateNote, moveNoteBetweenLists])

  const handleCopyData = useCallback((data) => {
    setClipboardData(data)
  }, [])

  const handleCopyClick = useCallback(() => {
    canvasViewRef.current?.copySelection()
  }, [])

  const handlePaste = useCallback(() => {
    if (!clipboardData) return
    canvasViewRef.current?.pasteNodes(clipboardData)
  }, [clipboardData])

  const handleSelectionChange = useCallback((has) => {
    setHasSelection(has)
  }, [])

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
          // draggable blijft false — CanvasView verplaatst afbeeldingen altijd
          // via zijn eigen gizmo-bbox-systeem (computeDraggable), nooit via
          // Konva-native draggable, zodat niets gesleept kan worden zonder
          // het eerst te selecteren.
          draggable: false,
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
      onOpenSettings={() => setSettingsOpen(true)}
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
              snapEnabled={snapEnabled}
              onToggleSnap={() => setSnapEnabled(v => !v)}
              showPills={showPills}
              onTogglePills={() => setShowPills(v => !v)}
              showZones={showZones}
              onToggleZones={handleToggleZones}
              onRename={renameNote}
              onImportImage={handleImportImage}
              onUndo={() => canvasViewRef.current?.undo()}
              onRedo={() => canvasViewRef.current?.redo()}
              onOpenProjects={() => setProjectsOpen(true)}
              menuSlot={hamburgerMenu}
              notes={notes}
              onSelectNote={handleSelectNote}
              hasClipboard={!!clipboardData}
              hasSelection={hasSelection}
              onCopy={handleCopyClick}
              onPaste={handlePaste}
            />
            <CanvasView
              key={activeNote.id}
              ref={canvasViewRef}
              note={activeNote}
              activeTool={activeTool}
              onToolSelect={handleToolSelect}
              penColor={penColor}
              penSize={penSize}
              opacity={opacity}
              strokeStyle={strokeStyle}
              pressureSensitive={pressureSensitive}
              onInputDetected={handleInputDetected}
              onCanvasPointerDown={handleCanvasPointerDown}
              patchNoteSettings={patchNoteSettings}
              shouldCenter={centerOnSelect}
              onCopy={handleCopyData}
              onSelectionChange={handleSelectionChange}
              snapEnabled={snapEnabled}
              showPills={showPills}
              pillStyle={pillStyle}
              showHinges={showHinges}
              showZones={showZones}
              showMinimap={showMinimap}
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
            {calcOpen
              ? <Calculator onClose={() => setCalcOpen(false)} />
              : (
                <button
                  className="calc-fab"
                  title="Rekenmachine"
                  onClick={() => setCalcOpen(true)}
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="12" height="16" rx="1.5" />
                    <rect x="6.5" y="4.5" width="7" height="3.5" rx="0.8" />
                    <circle cx="7" cy="12" r="0.8" fill="currentColor" stroke="none" />
                    <circle cx="10" cy="12" r="0.8" fill="currentColor" stroke="none" />
                    <circle cx="13" cy="12" r="0.8" fill="currentColor" stroke="none" />
                    <circle cx="7" cy="15" r="0.8" fill="currentColor" stroke="none" />
                    <circle cx="10" cy="15" r="0.8" fill="currentColor" stroke="none" />
                    <circle cx="13" cy="15" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                </button>
              )
            }

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

            <div className="sidebar-fab-stack">
              <FabButton
                title="Installaties"
                active={installationsOpen}
                onClick={() => setInstallationsOpen(v => !v)}
                icon={
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v16M3.5 5.5l13 9M16.5 5.5l-13 9" />
                    <path d="M10 2l-1.6 1.6M10 2l1.6 1.6M10 18l-1.6-1.6M10 18l1.6-1.6" />
                    <path d="M3.5 5.5l.3 2.2M3.5 5.5l2.2-.5M16.5 5.5l-2.2-.5M16.5 5.5l-.3 2.2" />
                    <path d="M3.5 14.5l2.2.5M3.5 14.5l.3-2.2M16.5 14.5l-.3-2.2M16.5 14.5l-2.2.5" />
                  </svg>
                }
              />
            </div>

            <LeftSidebar
              open={installationsOpen}
              onClose={() => setInstallationsOpen(false)}
              title="Installaties"
            >
              <InstallationsSidebar
                installations={installations}
                onChange={handleInstallationsChange}
              />
            </LeftSidebar>
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

      {settingsOpen && (
        <SettingsPanel
          showGrid={showGrid}
          onToggleGrid={handleToggleGrid}
          showPillsInPdf={showPillsInPdf}
          onTogglePillsInPdf={() => setShowPillsInPdf(v => !v)}
          showZonesInPdf={showZonesInPdf}
          onToggleZonesInPdf={() => setShowZonesInPdf(v => !v)}
          pillColor={pillColor}
          onPillColorChange={setPillColor}
          pillOpacity={pillOpacity}
          onPillOpacityChange={setPillOpacity}
          pillFontSize={pillFontSize}
          onPillFontSizeChange={setPillFontSize}
          pillTextColor={pillTextColor}
          onPillTextColorChange={setPillTextColor}
          showHinges={showHinges}
          onToggleHinges={() => setShowHinges(v => !v)}
          showMinimap={showMinimap}
          onToggleMinimap={() => setShowMinimap(v => !v)}
          onClose={() => setSettingsOpen(false)}
          onReset={() => {
            setShowPills(false)
            setShowPillsInPdf(false)
            setShowZonesInPdf(false)
            setShowHinges(true)
            setShowMinimap(true)
            setPillColor('#1971c2')
            setPillOpacity(70)
            setPillFontSize(10)
            setPillTextColor('#ffffff')
            if (!showGrid) handleToggleGrid()
            if (!showZones) handleToggleZones()
          }}
        />
      )}

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
