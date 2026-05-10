import { serializeLayer } from '../components/Canvas/konvaSerialize.js'

export function exportJnote(note, mainLayer) {
  const data = {
    version: '2.0',
    title: note.title,
    created: note.created_at,
    modified: new Date().toISOString(),
    settings: note.settings ?? {},
    canvas: {
      konva_snapshot: serializeLayer(mainLayer),
    },
  }

  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}.jnote`
  a.click()
  URL.revokeObjectURL(url)
}
