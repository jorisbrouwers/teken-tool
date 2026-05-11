import { unzipSync, strFromU8 } from 'fflate'

function isZip(buffer) {
  const b = new Uint8Array(buffer, 0, 4)
  return b[0] === 0x50 && b[1] === 0x4B && b[2] === 0x03 && b[3] === 0x04
}

function parseJson(raw) {
  const data = JSON.parse(raw)

  if (!data.version) {
    throw new Error('Ongeldig bestand: versieveld ontbreekt.')
  }

  if (data.version === '1.0') {
    throw new Error(
      'Dit bestand is aangemaakt met een oudere versie van de app (v1.0) ' +
      'en is niet compatibel met de huidige versie. Gebruik een recenter bestand.'
    )
  }

  if (!data.canvas?.konva_snapshot) {
    throw new Error('Ongeldig bestand: canvas-data ontbreekt.')
  }

  return {
    title: data.title ?? 'Geïmporteerde notitie',
    created_at: data.created ?? new Date().toISOString(),
    settings: data.settings ?? {},
    snapshot: data.canvas.konva_snapshot,
  }
}

export function parseJnote(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Bestand kon niet worden gelezen.'))
    reader.onload = (e) => {
      try {
        const buffer = e.target.result
        if (isZip(buffer)) {
          const unzipped = unzipSync(new Uint8Array(buffer))
          const entry = unzipped['note.json']
          if (!entry) throw new Error('ZIP-bestand bevat geen note.json.')
          resolve(parseJson(strFromU8(entry)))
        } else {
          // Backward compat: oude .jnote bestanden zijn plain JSON
          resolve(parseJson(new TextDecoder().decode(buffer)))
        }
      } catch (err) {
        reject(new Error(`Kon bestand niet inlezen: ${err.message}`))
      }
    }
    reader.readAsArrayBuffer(file)
  })
}
