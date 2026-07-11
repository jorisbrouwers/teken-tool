import { useEffect, useRef } from 'react'
import { updateNoteSnapshot } from '../../db/db.js'
import { serializeLayer } from './konvaSerialize.js'

export const liveSnapshotCache = new Map()

export function usePersistence(mainLayerRef, noteId, scheduleRef, flushRef, activityRef) {
  const timerRef  = useRef(null)
  const idleRef   = useRef(null)
  const dirtyRef  = useRef(false)

  useEffect(() => {
    dirtyRef.current = false
    console.log('[persist] effect mounted, noteId=', noteId)

    function cancelPending() {
      const hadTimer = timerRef.current !== null
      const hadIdle  = idleRef.current  !== null
      clearTimeout(timerRef.current)
      timerRef.current = null
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleRef.current)
      idleRef.current = null
      if (hadTimer || hadIdle) console.log('[persist] cancelPending — cancelled timer:', hadTimer, 'idle:', hadIdle)
    }

    function doSerializeAndSave() {
      const layer = mainLayerRef.current
      console.log('[persist] doSerializeAndSave — layer:', !!layer, 'noteId:', noteId)
      if (!layer || !noteId) {
        console.warn('[persist] doSerializeAndSave skipped — missing layer or noteId')
        return
      }
      const data = serializeLayer(layer)
      console.log('[persist] serialized, nodes:', data?.children?.length ?? '?')
      liveSnapshotCache.set(noteId, data)
      updateNoteSnapshot(noteId, data)
        .then(() => console.log('[persist] DB write done for', noteId))
        .catch(err => console.error('[persist] DB write failed', err))
    }

    function flush() {
      console.log('[persist] flush called — dirty:', dirtyRef.current, 'layer:', !!mainLayerRef.current)
      if (!dirtyRef.current) return
      dirtyRef.current = false
      cancelPending()
      doSerializeAndSave()
    }

    if (flushRef) {
      flushRef.current = flush
      console.log('[persist] flushRef wired up')
    } else {
      console.warn('[persist] no flushRef provided — Effect 1 cannot pre-flush')
    }

    scheduleRef.current = () => {
      dirtyRef.current = true
      cancelPending()
      console.log('[persist] scheduleSnapshot — scheduling idle/timeout save')
      // De save is O(volledige notitie) (serialize + structured clone + IDB
      // read-modify-write) en mag nooit tijdens actief schrijven/gummen op de
      // main thread landen — dat blokkeert peninvoer midden in een streek.
      // requestIdleCallback's timeout forceert hem anders alsnog mid-schrijven;
      // daarom hier een extra activiteitspoort met retry. flush() blijft
      // ongepoort (unmount/beforeunload moet altijd direct wegschrijven).
      function attempt() {
        idleRef.current = null
        timerRef.current = null
        if (activityRef && performance.now() - activityRef.current < 1500) {
          timerRef.current = setTimeout(attempt, 500)
          return
        }
        doSerializeAndSave()
      }
      if (typeof requestIdleCallback !== 'undefined') {
        idleRef.current = requestIdleCallback(attempt, { timeout: 1500 })
      } else {
        timerRef.current = setTimeout(attempt, 600)
      }
    }

    function onBeforeUnload() {
      console.log('[persist] beforeunload — flushing')
      flush()
    }
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      console.log('[persist] cleanup running — dirty:', dirtyRef.current, 'layer:', !!mainLayerRef.current, 'noteId:', noteId)
      if (flushRef) flushRef.current = null
      window.removeEventListener('beforeunload', onBeforeUnload)
      cancelPending()
      flush()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId])
}
