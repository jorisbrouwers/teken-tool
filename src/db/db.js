import Dexie from 'dexie'

export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback voor niet-secure contexten (bijv. http:// op iOS)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

const db = new Dexie('teken-tool')

db.version(1).stores({
  notes: '&id, title, deleted_at, modified_at',
})

db.version(2).stores({
  notes: '&id, title, deleted_at, modified_at, sort_order',
}).upgrade(tx =>
  tx.table('notes').toCollection().modify(note => {
    note.sort_order = new Date(note.created_at).getTime()
    note.is_template = false
  })
)

db.version(3).stores({
  notes: '&id, title, deleted_at, modified_at, sort_order',
  app_settings: '&key',
})

// deleted_at: 0 = actief, Unix ms timestamp = zachte verwijdering
// sort_order: lager getal = hoger in de lijst
// is_template: true = template (niet zichtbaar in gewone notitieslijst)

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000

function newNote(title = 'Naamloos') {
  const now = new Date().toISOString()
  return {
    id: generateUUID(),
    title,
    created_at: now,
    modified_at: now,
    deleted_at: 0,
    sort_order: 0,
    is_template: false,
    settings: { background: 'grid' },
    snapshot: null,
  }
}

export async function createNote(title = 'Naamloos', isTemplate = false) {
  const all = await db.notes.where('deleted_at').equals(0).toArray()
  const maxOrder = all.reduce((m, n) => Math.max(m, n.sort_order ?? 0), 0)
  const note = { ...newNote(title), sort_order: maxOrder + 1, is_template: isTemplate }
  await db.notes.add(note)
  return note
}

export async function getActiveNotes() {
  const notes = await db.notes.where('deleted_at').equals(0).toArray()
  return notes.filter(n => !n.is_template).sort((a, b) => a.sort_order - b.sort_order)
}

export async function getTemplateNotes() {
  const notes = await db.notes.where('deleted_at').equals(0).toArray()
  return notes.filter(n => n.is_template).sort((a, b) => a.sort_order - b.sort_order)
}

export async function getNote(id) {
  return db.notes.get(id)
}

export async function duplicateNote(id) {
  const src = await db.notes.get(id)
  const all = await db.notes.where('deleted_at').equals(0).toArray()
  const maxOrder = all.reduce((m, n) => Math.max(m, n.sort_order ?? 0), 0)
  const note = {
    ...src,
    id: generateUUID(),
    title: `Kopie van ${src.title}`,
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    deleted_at: 0,
    sort_order: maxOrder + 1,
  }
  await db.notes.add(note)
  return note
}

// Retourneert de twee gewijzigde {id, sort_order}-paren (of null als er niets
// te verplaatsen viel), zodat de caller de lokale state gericht kan patchen
// i.p.v. alle notities opnieuw te moeten ophalen.
export async function moveNote(id, direction, isTemplate) {
  const all = await db.notes.where('deleted_at').equals(0).toArray()
  const filtered = all
    .filter(n => !!n.is_template === !!isTemplate)
    .sort((a, b) => a.sort_order - b.sort_order)
  const idx = filtered.findIndex(n => n.id === id)
  const targetIdx = direction === 'up' ? idx - 1 : idx + 1
  if (targetIdx < 0 || targetIdx >= filtered.length) return null
  const a = filtered[idx]
  const b = filtered[targetIdx]
  const tmp = a.sort_order
  await db.notes.update(a.id, { sort_order: b.sort_order })
  await db.notes.update(b.id, { sort_order: tmp })
  return [{ id: a.id, sort_order: b.sort_order }, { id: b.id, sort_order: tmp }]
}

export async function updateNoteSnapshot(id, snapshot) {
  await db.notes.update(id, {
    snapshot,
    modified_at: new Date().toISOString(),
  })
}

export async function updateNoteSettings(id, settings) {
  await db.notes.update(id, {
    settings,
    modified_at: new Date().toISOString(),
  })
}

export async function renameNote(id, title) {
  await db.notes.update(id, {
    title,
    modified_at: new Date().toISOString(),
  })
}

export async function softDeleteNote(id) {
  const deleted_at = Date.now()
  await db.notes.update(id, { deleted_at })
  return deleted_at
}

export async function restoreNote(id) {
  await db.notes.update(id, { deleted_at: 0 })
}

export async function permanentDeleteNote(id) {
  await db.notes.delete(id)
}

export async function getTrashNotes() {
  const all = await db.notes.where('deleted_at').above(0).toArray()
  return all.sort((a, b) => b.deleted_at - a.deleted_at)
}

export async function sweepExpiredNotes() {
  const cutoff = Date.now() - NINETY_DAYS_MS
  await db.notes
    .where('deleted_at')
    .above(0)
    .filter((n) => n.deleted_at < cutoff)
    .delete()
}

export async function importNote(noteObj) {
  const now = new Date().toISOString()
  const all = await db.notes.where('deleted_at').equals(0).toArray()
  const maxOrder = all.reduce((m, n) => Math.max(m, n.sort_order ?? 0), 0)
  const note = {
    ...noteObj,
    id: generateUUID(),
    deleted_at: 0,
    modified_at: now,
    sort_order: maxOrder + 1,
    is_template: false,
  }
  await db.notes.add(note)
  return note
}

const SETTINGS_KEY = 'global'

export async function getAppSettings() {
  const row = await db.app_settings.get(SETTINGS_KEY)
  return row?.data ?? {}
}

export async function saveAppSettings(data) {
  await db.app_settings.put({ key: SETTINGS_KEY, data })
}

export default db
