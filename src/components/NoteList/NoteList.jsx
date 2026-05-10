import { useState } from 'react'
import NoteListItem from './NoteListItem.jsx'
import ConfirmDialog from '../common/ConfirmDialog.jsx'
import './NoteList.css'

export default function NoteList({
  notes,
  activeNoteId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
  onTrashOpen,
}) {
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleDeleteRequest(id) {
    setDeleteTarget(id)
  }

  async function handleDeleteConfirm() {
    await onDelete(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="note-list">
        <div className="note-list-actions">
          <button className="note-list-new-btn" onClick={() => onCreate()}>
            + Nieuwe notitie
          </button>
        </div>
        <div className="note-list-scroll">
          {notes.length === 0 ? (
            <div className="note-list-empty">Geen notities</div>
          ) : (
            notes.map((note) => (
              <NoteListItem
                key={note.id}
                note={note}
                isActive={note.id === activeNoteId}
                onSelect={onSelect}
                onRename={onRename}
                onDelete={handleDeleteRequest}
              />
            ))
          )}
        </div>
        <div className="sidebar-footer">
          <button className="sidebar-footer-btn" onClick={onTrashOpen}>
            🗑 Prullenbak
          </button>
        </div>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          message="Weet je zeker dat je deze notitie wilt verwijderen? Je kunt hem terugzetten vanuit de prullenbak."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}
