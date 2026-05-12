import { strToU8, zipSync } from 'fflate'
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

  const jsonBytes = strToU8(JSON.stringify(data, null, 2))
  const zipped = zipSync({ 'note.json': jsonBytes })
  const blob = new Blob([zipped], { type: 'application/zip' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `schets_${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}.zip`
  a.click()
  URL.revokeObjectURL(url)
}
