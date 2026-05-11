import { useRef, useCallback } from 'react'
import Konva from 'konva'

const MAX_HISTORY = 50

// Snapshot: exclude Transformer AND images (images are permanent, same as old Fabric approach).
function takeSnapshot(layer) {
  return layer.getChildren()
    .filter(n => n.getClassName() !== 'Transformer' && n.getClassName() !== 'Image')
    .map(n => ({ type: n.getClassName(), attrs: { ...n.attrs } }))
}

// Restore snapshot while preserving current images and the Transformer.
function applySnapshot(snapshot, layer, transformer) {
  // Collect current images
  const images = layer.getChildren().filter(n => n.getClassName() === 'Image')

  // Destroy all non-Transformer, non-Image nodes.
  // Spread to a copy first: destroy() mutates the live children array, causing
  // forEach to skip every other node if iterated directly.
  ;[...layer.getChildren()].forEach(n => {
    if (n.getClassName() !== 'Transformer' && n.getClassName() !== 'Image') n.destroy()
  })

  // Recreate snapshot nodes
  snapshot.forEach(({ type, attrs }) => {
    const Cls = Konva[type]
    if (Cls) layer.add(new Cls(attrs))
  })

  // Re-anchor images at the bottom, Transformer at the top
  images.forEach(img => { layer.add(img); img.moveToBottom() })
  transformer?.moveToTop()

  layer.batchDraw()
}

export function useHistory(mainLayerRef, transformerRef) {
  const undoStack = useRef([])
  const redoStack = useRef([])
  const skipNext = useRef(false)

  const reset = useCallback(() => {
    const layer = mainLayerRef.current
    if (!layer) return
    undoStack.current = [takeSnapshot(layer)]
    redoStack.current = []
  }, [mainLayerRef])

  const pushState = useCallback(() => {
    if (skipNext.current) { skipNext.current = false; return }
    const layer = mainLayerRef.current
    if (!layer) return
    undoStack.current.push(takeSnapshot(layer))
    if (undoStack.current.length > MAX_HISTORY) undoStack.current.shift()
    redoStack.current = []
  }, [mainLayerRef])

  const undo = useCallback(() => {
    if (undoStack.current.length <= 1) return
    const current = undoStack.current.pop()
    redoStack.current.push(current)
    const layer = mainLayerRef.current
    const transformer = transformerRef.current
    transformer?.nodes([])
    applySnapshot(undoStack.current[undoStack.current.length - 1], layer, transformer)
  }, [mainLayerRef, transformerRef])

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return
    const next = redoStack.current.pop()
    undoStack.current.push(next)
    const layer = mainLayerRef.current
    const transformer = transformerRef.current
    transformer?.nodes([])
    applySnapshot(next, layer, transformer)
  }, [mainLayerRef, transformerRef])

  const skipNextHistoryPush = useCallback(() => { skipNext.current = true }, [])

  return { pushState, undo, redo, reset, skipNextHistoryPush }
}
