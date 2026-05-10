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
  }, [])

  useEffect(() => {
    async function init() {
      await sweepExpiredNotes()
      await refreshNotes()
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
    if (activeNoteId === id) setActiveNoteId(null)
    await refreshNotes()
  }, [activeNoteId, refreshNotes])

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
    setActiveNoteId,
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
