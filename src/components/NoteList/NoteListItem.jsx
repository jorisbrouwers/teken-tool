import { useState, useRef, useEffect } from 'react'

export default function NoteListItem({ note, isActive, onSelect, onRename, onDelete }) {
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(note.title)
  const inputRef = useRef(null)

  useEffect(() => {
    if (renaming) {
      inputRef.current?.select()
    }
  }, [renaming])

  function startRename(e) {
    e.stopPropagation()
    setRenameValue(note.title)
    setRenaming(true)
  }

  function commitRename() {
    const trimmed = renameValue.trim()
    if (trimmed && trimmed !== note.title) {
      onRename(note.id, trimmed)
    }
    setRenaming(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') commitRename()
    if (e.key === 'Escape') setRenaming(false)
  }

  function handleDelete(e) {
    e.stopPropagation()
    onDelete(note.id)
  }

  return (
    <div
      className={`note-list-item${isActive ? ' active' : ''}`}
      onClick={() => !renaming && onSelect(note.id)}
    >
      {renaming ? (
        <div className="note-list-item-rename">
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : (
        <span className="note-list-item-title">{note.title}</span>
      )}
      {!renaming && (
        <>
          <button
            className="note-list-item-btn"
            title="Hernoemen"
            onClick={startRename}
          >
            ✎
          </button>
          <button
            className="note-list-item-btn danger"
            title="Verwijderen"
            onClick={handleDelete}
          >
            🗑
          </button>
        </>
      )}
    </div>
  )
}
