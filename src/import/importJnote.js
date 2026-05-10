export function parseJnote(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target.result)

        if (!raw.version) {
          reject(new Error('Ongeldig .jnote bestand: versieveld ontbreekt.'))
          return
        }

        if (raw.version === '1.0') {
          reject(new Error(
            'Dit .jnote bestand is aangemaakt met een oudere versie van de app (v1.0) ' +
            'en is niet compatibel met de huidige versie. Gebruik een recenter bestand.'
          ))
          return
        }

        if (!raw.canvas?.konva_snapshot) {
          reject(new Error('Ongeldig .jnote bestand: canvas-data ontbreekt.'))
          return
        }

        resolve({
          title: raw.title ?? 'Geïmporteerde notitie',
          created_at: raw.created ?? new Date().toISOString(),
          settings: raw.settings ?? {},
          snapshot: raw.canvas.konva_snapshot,
        })
      } catch (err) {
        reject(new Error(`Kon .jnote niet inlezen: ${err.message}`))
      }
    }
    reader.onerror = () => reject(new Error('Bestand kon niet worden gelezen.'))
    reader.readAsText(file)
  })
}
