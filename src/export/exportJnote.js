import { strToU8, zipSync } from 'fflate'
import { serializeLayer } from '../components/Canvas/konvaSerialize.js'

export function exportJnote(note, mainLayer) {
  // 2.1 = muur-verbindingen als lijsten (_ep0conns/_ep1conns) + expliciete
  // isWall-markering. 2.0-bestanden worden bij import gemigreerd (importJnote.js).
  const data = {
    version: '2.1',
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
  a.download = `notitie_${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}.zip`
  a.click()
  URL.revokeObjectURL(url)
}
