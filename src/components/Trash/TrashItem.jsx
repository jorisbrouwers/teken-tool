import { useState } from 'react'
import ConfirmDialog from '../common/ConfirmDialog.jsx'
import './Trash.css'

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000

export default function TrashItem({ note, onRestore, onPermanentDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const daysLeft = Math.max(
    0,
    Math.ceil((note.deleted_at + NINETY_DAYS_MS - Date.now()) / (24 * 60 * 60 * 1000))
  )

  return (
    <>
      <div className="trash-item">
        <div className="trash-item-title">{note.title}</div>
        <div className="trash-item-meta">Verwijderd op {new Date(note.deleted_at).toLocaleDateString('nl-NL')} · nog {daysLeft} dag{daysLeft !== 1 ? 'en' : ''}</div>
        <div className="trash-item-actions">
          <button className="btn btn-primary" onClick={() => onRestore(note.id)}>
            Herstellen
          </button>
          <button className="btn btn-danger" onClick={() => setConfirmDelete(true)}>
            Definitief verwijderen
          </button>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message={`"${note.title}" definitief verwijderen? Dit kan niet ongedaan gemaakt worden.`}
          onConfirm={() => { onPermanentDelete(note.id); setConfirmDelete(false) }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  )
}
