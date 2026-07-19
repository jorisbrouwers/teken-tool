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

  // Werkt bepaalde velden van één notitie direct in de lokale state bij,
  // zonder een volledige refetch van alle notities uit IndexedDB af te
  // wachten. Twee redenen om dit te gebruiken i.p.v. refreshNotes():
  // 1) scheelt merkbare vertraging bij snel opeenvolgende wijzigingen;
  // 2) voorkomt een race: refreshNotes() leest ALLE velden van elke notitie
  //    opnieuw uit de DB en overschrijft daarmee de lokale state volledig —
  //    als op dat moment een andere, nog niet voltooide DB-schrijfactie voor
  //    diezelfde notitie in de lucht hangt (bv. de installaties-seeding vlak
  //    na het aanmaken van een notitie), leest refreshNotes() de oude waarde
  //    en wist zo effectief de nog niet weggeschreven wijziging. Een gerichte
  //    lokale patch van alleen de bekende gewijzigde velden heeft dat risico
  //    niet. De aanroeper regelt zelf de daadwerkelijke IndexedDB-persistence.
  const patchNote = useCallback((id, partial) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...partial } : n))
    setTemplateNotes(prev => prev.map(n => n.id === id ? { ...n, ...partial } : n))
  }, [])

  const patchNoteSettings = useCallback((id, settings) => {
    patchNote(id, { settings })
  }, [patchNote])

  // Verplaatst een notitie lokaal tussen de actieve lijst en de
  // templates-lijst (nodig wanneer is_template wijzigt, zoals bij "opslaan
  // als template" en "aanmaken vanuit template"). patchNote alleen volstaat
  // daar niet voor: die werkt het object bij in de lijst waar het al in
  // staat, maar verplaatst het niet naar de andere lijst. Voorkomt de dure
  // volledige refetch (met alle canvas-snapshots) die anders nodig zou zijn.
  const moveNoteBetweenLists = useCallback((id, updatedNote) => {
    setNotes(prev => prev.filter(n => n.id !== id))
    setTemplateNotes(prev => prev.filter(n => n.id !== id))
    if (updatedNote.is_template) setTemplateNotes(prev => [...prev, updatedNote])
    else setNotes(prev => [...prev, updatedNote])
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

  // Vanaf hier: alle mutaties patchen de lokale lijsten gericht bij op basis
  // van wat de db.js-functie al teruggeeft, i.p.v. steeds alle drie de lijsten
  // (actief/templates/prullenbak) opnieuw uit IndexedDB te lezen. Dat gaf
  // merkbare vertraging bij aanmaken/verwijderen/herordenen/dupliceren, en
  // droeg hetzelfde race-risico als de eerdere hernoem-bug (refreshNotes()
  // kan een nog niet voltooide, andere schrijfactie op dezelfde notitie
  // overschrijven met een verouderde DB-read).

  const handleCreate = useCallback(async (title, isTemplate = false) => {
    const note = await createNote(title, isTemplate)
    if (isTemplate) setTemplateNotes(prev => [...prev, note])
    else setNotes(prev => [...prev, note])
    return note
  }, [])

  const handleRename = useCallback(async (id, title) => {
    await renameNote(id, title)
    patchNote(id, { title, modified_at: new Date().toISOString() })
  }, [patchNote])

  const handleSoftDelete = useCallback(async (id) => {
    const deleted_at = await softDeleteNote(id)
    const note = notes.find(n => n.id === id) ?? templateNotes.find(n => n.id === id)
    setNotes(prev => prev.filter(n => n.id !== id))
    setTemplateNotes(prev => prev.filter(n => n.id !== id))
    if (note) setTrashNotes(prev => [{ ...note, deleted_at }, ...prev])
    if (activeNoteId === id) persistActiveNote(null)
  }, [notes, templateNotes, activeNoteId, persistActiveNote])

  const handleRestore = useCallback(async (id) => {
    await restoreNote(id)
    const note = trashNotes.find(n => n.id === id)
    setTrashNotes(prev => prev.filter(n => n.id !== id))
    if (note) {
      const restored = { ...note, deleted_at: 0 }
      if (restored.is_template) setTemplateNotes(prev => [...prev, restored])
      else setNotes(prev => [...prev, restored])
    }
  }, [trashNotes])

  const handlePermanentDelete = useCallback(async (id) => {
    await permanentDeleteNote(id)
    setTrashNotes(prev => prev.filter(n => n.id !== id))
  }, [])

  const handleImport = useCallback(async (noteObj) => {
    const note = await importNote(noteObj)
    setNotes(prev => [...prev, note])
    return note
  }, [])

  const handleDuplicate = useCallback(async (id) => {
    const note = await duplicateNote(id)
    if (note.is_template) setTemplateNotes(prev => [...prev, note])
    else setNotes(prev => [...prev, note])
    return note
  }, [])

  const handleMove = useCallback(async (id, direction, isTemplate) => {
    const result = await moveNote(id, direction, isTemplate)
    if (!result) return
    const setter = isTemplate ? setTemplateNotes : setNotes
    // Lijst wordt in array-volgorde gerenderd (geen aparte sort in
    // ProjectsPanel) — na het patchen van sort_order moet de array dus ook
    // echt opnieuw gesorteerd worden, anders verandert de zichtbare volgorde
    // niet.
    setter(prev => prev
      .map(n => {
        const changed = result.find(r => r.id === n.id)
        return changed ? { ...n, sort_order: changed.sort_order } : n
      })
      .sort((a, b) => a.sort_order - b.sort_order))
  }, [])

  return {
    notes,
    templateNotes,
    trashNotes,
    activeNoteId,
    setActiveNoteId: persistActiveNote,
    loading,
    refreshNotes,
    patchNoteSettings,
    moveNoteBetweenLists,
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
