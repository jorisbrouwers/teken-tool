import TrashItem from './TrashItem.jsx'
import './Trash.css'

export default function TrashPanel({ trashNotes, onRestore, onPermanentDelete, onClose }) {
  return (
    <div className="trash-panel" onClick={onClose}>
      <div className="trash-panel-inner" onClick={(e) => e.stopPropagation()}>
        <div className="trash-panel-header">
          <span>🗑 Prullenbak</span>
          <button className="trash-panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="trash-panel-scroll">
          {trashNotes.length === 0 ? (
            <div className="trash-empty">De prullenbak is leeg</div>
          ) : (
            trashNotes.map((note) => (
              <TrashItem
                key={note.id}
                note={note}
                onRestore={onRestore}
                onPermanentDelete={onPermanentDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
