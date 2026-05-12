import { useState, useRef, useEffect } from 'react'
import ConfirmDialog from '../common/ConfirmDialog.jsx'
import TrashItem from '../Trash/TrashItem.jsx'
import './ProjectsPanel.css'

const TABS = ['Notities', 'Templates', 'Prullenbak']

const IC = { viewBox: '0 0 20 20', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icons = {
  rename: (
    <svg {...IC}>
      <path d="M13.5 3.5a2.121 2.121 0 0 1 3 3L6 17l-4 1 1-4L13.5 3.5z" />
    </svg>
  ),
  duplicate: (
    <svg {...IC}>
      <rect x="7" y="7" width="10" height="12" rx="1.5" />
      <path d="M13 7V5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 5v9A1.5 1.5 0 0 0 4 15.5h2" />
    </svg>
  ),
  up: (
    <svg {...IC}>
      <polyline points="5 12 10 7 15 12" />
    </svg>
  ),
  down: (
    <svg {...IC}>
      <polyline points="5 8 10 13 15 8" />
    </svg>
  ),
  trash: (
    <svg {...IC}>
      <polyline points="3 6 5 6 17 6" />
      <path d="M8 6V4h4v2" />
      <path d="M5 6l1 11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-11" />
      <line x1="10" y1="10" x2="10" y2="14" />
      <line x1="13" y1="10" x2="12.7" y2="14" />
      <line x1="7" y1="10" x2="7.3" y2="14" />
    </svg>
  ),
  import: (
    <svg {...IC}>
      <path d="M13 3H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-3-4z" />
      <path d="M13 3v4h4" />
      <path d="M10 9v4M8 11l2 2 2-2" />
    </svg>
  ),
}

export default function ProjectsPanel({
  notes,
  templateNotes,
  trashNotes,
  activeNoteId,
  onSelect,
  onCreate,
  onCreateFromTemplate,
  onCreateTemplate,
  onRename,
  onDelete,
  onDuplicate,
  onMove,
  onRestore,
  onPermanentDelete,
  onImportJnote,
  onClose,
}) {
  const [tab, setTab] = useState('Notities')
  const [renamingNoteId, setRenamingNoteId] = useState(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    () => localStorage.getItem('jnote-new-note-template') || null
  )
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false)
  const importRef = useRef(null)
  const templateDropdownRef = useRef(null)

  // Validate stored template — fall back to blank if it no longer exists
  const validTemplateId = templateNotes.find(t => t.id === selectedTemplateId)?.id ?? null

  useEffect(() => {
    if (!showTemplateDropdown) return
    function onClickOutside(e) {
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(e.target)) {
        setShowTemplateDropdown(false)
      }
    }
    document.addEventListener('pointerdown', onClickOutside)
    return () => document.removeEventListener('pointerdown', onClickOutside)
  }, [showTemplateDropdown])

  function selectTemplate(id) {
    setSelectedTemplateId(id)
    if (id) localStorage.setItem('jnote-new-note-template', id)
    else localStorage.removeItem('jnote-new-note-template')
    setShowTemplateDropdown(false)
  }

  async function handleNewNote() {
    if (validTemplateId) {
      const note = await onCreateFromTemplate(validTemplateId)
      setRenamingNoteId(note?.id ?? null)
    } else {
      const note = await onCreate()
      setRenamingNoteId(note?.id ?? null)
    }
  }

  async function handleCreateFromTemplate(templateId) {
    const note = await onCreateFromTemplate(templateId)
    setRenamingNoteId(note?.id ?? null)
  }

  async function handleDuplicate(id) {
    const note = await onDuplicate(id)
    setRenamingNoteId(note?.id ?? null)
  }

  async function handleCreateTemplate() {
    const note = await onCreateTemplate()
    setRenamingNoteId(note?.id ?? null)
  }

  return (
    <div className="projects-backdrop" onClick={onClose}>
      <div className="projects-panel" onClick={(e) => e.stopPropagation()}>
        <div className="projects-header">
          <span className="projects-title">Projecten</span>
          <button className="projects-close" onClick={onClose} title="Sluiten">✕</button>
        </div>

        <div className="projects-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`projects-tab${tab === t ? ' active' : ''}`}
              onClick={() => { setTab(t); setShowTemplateDropdown(false) }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Notities' && (
          <div className="projects-actions">
            <div className="projects-actions-row">
              <div className="new-note-split">
                <button
                  className={`projects-new-btn${templateNotes.length > 0 ? ' split' : ''}`}
                  onClick={handleNewNote}
                >
                  <span className="new-note-btn-action">+ Nieuwe notitie</span>
                  {templateNotes.length > 0 && (
                    <span className="new-note-btn-template">
                      {validTemplateId
                        ? templateNotes.find(t => t.id === validTemplateId)?.title
                        : 'Leeg'}
                    </span>
                  )}
                </button>
                {templateNotes.length > 0 && (
                  <div className="new-note-dropdown-wrapper" ref={templateDropdownRef}>
                    <button
                      className={`new-note-chevron-btn${showTemplateDropdown ? ' open' : ''}`}
                      onClick={() => setShowTemplateDropdown(v => !v)}
                      title="Template kiezen"
                    >
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="5 8 10 13 15 8" />
                      </svg>
                    </button>
                    {showTemplateDropdown && (
                      <div className="new-note-dropdown">
                        <div
                          className={`new-note-dropdown-item${!validTemplateId ? ' active' : ''}`}
                          onPointerDown={(e) => { e.preventDefault(); selectTemplate(null) }}
                        >
                          <span>Leeg</span>
                          {!validTemplateId && <span className="new-note-dropdown-check">✓</span>}
                        </div>
                        {templateNotes.map(t => (
                          <div
                            key={t.id}
                            className={`new-note-dropdown-item${validTemplateId === t.id ? ' active' : ''}`}
                            onPointerDown={(e) => { e.preventDefault(); selectTemplate(t.id) }}
                          >
                            <span>{t.title}</span>
                            {validTemplateId === t.id && <span className="new-note-dropdown-check">✓</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                className="projects-import-btn"
                title="Importeer .jnote bestand"
                onClick={() => importRef.current?.click()}
              >
                {Icons.import}
                <span>Importeren</span>
              </button>
              <input
                ref={importRef}
                type="file"
                accept=".zip,.jnote,application/zip,application/json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    onImportJnote(e.target.files[0])
                    e.target.value = ''
                  }
                }}
              />
            </div>
          </div>
        )}

        {tab === 'Templates' && (
          <div className="projects-actions">
            <button className="projects-new-btn" onClick={handleCreateTemplate}>
              + Nieuwe template
            </button>
          </div>
        )}

        <div className="projects-body">
          {tab === 'Notities' && (
            <>
              {notes.length === 0 ? (
                <div className="projects-empty">Geen notities. Maak er een aan.</div>
              ) : (
                notes.map((note, idx) => (
                  <ProjectItem
                    key={note.id}
                    note={note}
                    isActive={note.id === activeNoteId}
                    isFirst={idx === 0}
                    isLast={idx === notes.length - 1}
                    isTemplate={false}
                    onSelect={() => { onSelect(note.id); onClose() }}
                    onRename={onRename}
                    onDelete={onDelete}
                    onDuplicate={handleDuplicate}
                    onMove={onMove}
                    autoRename={note.id === renamingNoteId}
                    onAutoRenameDone={() => setRenamingNoteId(null)}
                  />
                ))
              )}
            </>
          )}

          {tab === 'Templates' && (
            <>
              {templateNotes.length === 0 ? (
                <div className="projects-empty">Geen templates. Sla een notitie op als template via het menu.</div>
              ) : (
                templateNotes.map((note, idx) => (
                  <ProjectItem
                    key={note.id}
                    note={note}
                    isActive={note.id === activeNoteId}
                    isFirst={idx === 0}
                    isLast={idx === templateNotes.length - 1}
                    isTemplate={true}
                    onSelect={() => { onSelect(note.id); onClose() }}
                    onRename={onRename}
                    onDelete={onDelete}
                    onDuplicate={handleDuplicate}
                    onMove={onMove}
                    autoRename={note.id === renamingNoteId}
                    onAutoRenameDone={() => setRenamingNoteId(null)}
                  />
                ))
              )}
            </>
          )}

          {tab === 'Prullenbak' && (
            <>
              {trashNotes.length === 0 ? (
                <div className="projects-empty">De prullenbak is leeg.</div>
              ) : (
                trashNotes.map(note => (
                  <TrashItem
                    key={note.id}
                    note={note}
                    onRestore={onRestore}
                    onPermanentDelete={onPermanentDelete}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectItem({ note, isActive, isFirst, isLast, isTemplate, onSelect, onRename, onDelete, onDuplicate, onMove, autoRename, onAutoRenameDone }) {
  const [renaming, setRenaming] = useState(!!autoRename)
  const [renameValue, setRenameValue] = useState(note.title)
  const [confirmDelete, setConfirmDelete] = useState(false)

  function startRename() {
    setRenameValue(note.title)
    setRenaming(true)
  }

  function commitRename() {
    const trimmed = renameValue.trim()
    if (trimmed && trimmed !== note.title) onRename(note.id, trimmed)
    setRenaming(false)
    onAutoRenameDone?.()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitRename()
    if (e.key === 'Escape') { setRenaming(false); onAutoRenameDone?.() }
  }

  return (
    <>
      <div className={`project-item${isActive ? ' active' : ''}`}>
        {renaming ? (
          <input
            className="project-rename-input"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleKeyDown}
            onFocus={(e) => e.target.select()}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="project-item-title" onClick={onSelect} title={note.title}>
            {note.title}
          </div>
        )}
        <div className="project-item-actions">
          <button className="project-action-btn" title="Hernoemen" onClick={startRename}>
            {Icons.rename}
          </button>
          {onDuplicate && (
            <button className="project-action-btn" title="Dupliceren" onClick={() => onDuplicate(note.id)}>
              {Icons.duplicate}
            </button>
          )}
          {onMove && (
            <>
              <button className="project-action-btn" title="Omhoog" onClick={() => onMove(note.id, 'up', isTemplate)} disabled={isFirst}>
                {Icons.up}
              </button>
              <button className="project-action-btn" title="Omlaag" onClick={() => onMove(note.id, 'down', isTemplate)} disabled={isLast}>
                {Icons.down}
              </button>
            </>
          )}
          <button className="project-action-btn danger" title="Verwijderen" onClick={() => setConfirmDelete(true)}>
            {Icons.trash}
          </button>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message={`"${note.title}" verwijderen?`}
          onConfirm={() => { onDelete(note.id); setConfirmDelete(false) }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  )
}
