import { useState, useEffect, useCallback } from 'react'
import {
  createNote,
  getActiveNotes,
  getTemplateNotes,
  getTrashNotes,
  renameNote,
  softDeleteNote,
  restoreNote,
  permanentDeleteNote,
  sweepExpiredNotes,
  importNote,
  duplicateNote,
  moveNote,
} from '../db/db.js'

const ACTIVE_KEY = 'jnote-active-note-id'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [templateNotes, setTemplateNotes] = useState([])
  const [trashNotes, setTrashNotes] = useState([])
  const [activeNoteId, setActiveNoteId] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshNotes = useCallback(async () => {
    const [active, templates, trash] = await Promise.all([
      getActiveNotes(),
      getTemplateNotes(),
      getTrashNotes(),
    ])
    setNotes(active)
    setTemplateNotes(templates)
    setTrashNotes(trash)
    return { active, templates }
  }, [])

  // Setter that keeps localStorage in sync with state
  const persistActiveNote = useCallback((id) => {
    setActiveNoteId(id)
    if (id) localStorage.setItem(ACTIVE_KEY, id)
    else localStorage.removeItem(ACTIVE_KEY)
  }, [])

  useEffect(() => {
    async function init() {
      await sweepExpiredNotes()
      const { active, templates } = await refreshNotes()
      // Restore the last active note if it still exists
      const storedId = localStorage.getItem(ACTIVE_KEY)
      if (storedId && [...active, ...templates].find(n => n.id === storedId)) {
        setActiveNoteId(storedId)
      } else {
        localStorage.removeItem(ACTIVE_KEY)
      }
      setLoading(false)
    }
    init()
  }, [refreshNotes])

  const handleCreate = useCallback(async (title, isTemplate = false) => {
    const note = await createNote(title, isTemplate)
    await refreshNotes()
    return note
  }, [refreshNotes])

  const handleRename = useCallback(async (id, title) => {
    await renameNote(id, title)
    await refreshNotes()
  }, [refreshNotes])

  const handleSoftDelete = useCallback(async (id) => {
    await softDeleteNote(id)
    if (activeNoteId === id) persistActiveNote(null)
    await refreshNotes()
  }, [activeNoteId, refreshNotes, persistActiveNote])

  const handleRestore = useCallback(async (id) => {
    await restoreNote(id)
    await refreshNotes()
  }, [refreshNotes])

  const handlePermanentDelete = useCallback(async (id) => {
    await permanentDeleteNote(id)
    await refreshNotes()
  }, [refreshNotes])

  const handleImport = useCallback(async (noteObj) => {
    const note = await importNote(noteObj)
    await refreshNotes()
    return note
  }, [refreshNotes])

  const handleDuplicate = useCallback(async (id) => {
    const note = await duplicateNote(id)
    await refreshNotes()
    return note
  }, [refreshNotes])

  const handleMove = useCallback(async (id, direction, isTemplate) => {
    await moveNote(id, direction, isTemplate)
    await refreshNotes()
  }, [refreshNotes])

  return {
    notes,
    templateNotes,
    trashNotes,
    activeNoteId,
    setActiveNoteId: persistActiveNote,
    loading,
    refreshNotes,
    createNote: handleCreate,
    renameNote: handleRename,
    softDeleteNote: handleSoftDelete,
    restoreNote: handleRestore,
    permanentDeleteNote: handlePermanentDelete,
    importNote: handleImport,
    duplicateNote: handleDuplicate,
    moveNote: handleMove,
  }
}
