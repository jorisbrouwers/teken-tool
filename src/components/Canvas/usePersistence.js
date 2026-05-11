import { useEffect, useRef } from 'react'
import { updateNoteSnapshot } from '../../db/db.js'
import { serializeLayer } from './konvaSerialize.js'

// In-memory cache: noteId → latest serialized snapshot.
// Written synchronously on every draw so Effect 1 can read it instantly when
// switching notes, avoiding any race between the async DB write and DB read.
export const liveSnapshotCache = new Map()

// Exposes a `scheduleRef.current()` function that debounces IndexedDB saves.
// Called imperatively from CanvasView after any canvas mutation.
export function usePersistence(mainLayerRef, noteId, scheduleRef) {
  const timerRef = useRef(null)
  // Only flush on cleanup if the user actually made changes since mount.
  // Without this guard, React Strict Mode's mount→cleanup→remount cycle fires
  // flush() while the layer is still empty (async DB load not yet complete),
  // overwriting both the cache and IndexedDB with an empty snapshot.
  const dirtyRef = useRef(false)

  useEffect(() => {
    dirtyRef.current = false

    function flush() {
      if (!dirtyRef.current) return
      const layer = mainLayerRef.current
      if (!layer || !noteId) return
      const data = serializeLayer(layer)
      liveSnapshotCache.set(noteId, data)
      return updateNoteSnapshot(noteId, data)
    }

    scheduleRef.current = () => {
      const layer = mainLayerRef.current
      if (!layer || !noteId) return
      dirtyRef.current = true
      // Serialize and cache immediately — this is the source of truth for the
      // current session. IndexedDB write is debounced behind it.
      const data = serializeLayer(layer)
      liveSnapshotCache.set(noteId, data)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(async () => {
        const cached = liveSnapshotCache.get(noteId)
        if (cached) await updateNoteSnapshot(noteId, cached)
      }, 200)
    }

    // Flush on tab close / refresh (graceful shutdown only — hard crashes bypass this).
    function onBeforeUnload() { flush() }
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      clearTimeout(timerRef.current)
      // Flush to IndexedDB on unmount (note switch) so data survives a page reload.
      flush()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId])
}
