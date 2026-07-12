import Konva from 'konva'
import { migrateWallAttrs } from './wallGraph.js'

// Persistence-snapshotformaat. Formaat 2 = { format: 2, nodes: [{type, attrs}] }
// met muur-verbindingen als lijsten (_ep0conns/_ep1conns) en expliciete isWall.
// Een kale array (zonder wrapper) is het oude formaat van vóór het versieveld:
// daarin gedroeg elk 2-punts Line/Arrow-object zich als muur en waren
// verbindingen enkelvoudig (_ep0conn/_ep1conn) — normalizeSnapshot migreert dat
// bij het inladen. Nieuwe saves schrijven altijd formaat 2.
export const SNAPSHOT_FORMAT = 2

export function wrapSnapshot(nodes) {
  return { format: SNAPSHOT_FORMAT, nodes }
}

// Accepteert zowel het oude formaat (kale array) als het nieuwe ({format, nodes})
// en geeft altijd een genormaliseerde platte array van {type, attrs} terug.
export function normalizeSnapshot(snapshot) {
  if (!snapshot) return []
  if (Array.isArray(snapshot)) {
    return snapshot.map(({ type, attrs }) => ({ type, attrs: migrateWallAttrs(type, attrs) }))
  }
  return snapshot.nodes ?? []
}

// Serialize a specific set of nodes (for copy/paste).
export function serializeNodes(nodes) {
  return nodes.map(node => {
    const attrs = { ...node.attrs }
    if (node.getClassName() === 'Image') delete attrs.image
    delete attrs.visible // runtime-only: viewport culling / inline text edit
    return { type: node.getClassName(), attrs }
  })
}

// Serialize all user content (including images) — used for persistence.
// Transformer and LineGizmo handle circles are excluded: de handles staan op
// de mainLayer en bestaan zolang een lijn geselecteerd is — een save die dan
// afgaat zou ze anders als content opslaan.
export function serializeLayer(layer) {
  return layer.getChildren()
    .filter(n => n.getClassName() !== 'Transformer' && !n.name()?.startsWith('lineGizmoHandle'))
    .map(node => {
      const attrs = { ...node.attrs }
      if (node.getClassName() === 'Image') delete attrs.image // not serializable
      delete attrs.visible // runtime-only: viewport culling / inline text edit
      return { type: node.getClassName(), attrs }
    })
}

// Restore a persistence snapshot into the layer.
// Preserves the Transformer node (keeps it at the top).
export function deserializeLayer(data, layer) {
  const transformer = layer.getChildren().find(n => n.getClassName() === 'Transformer')

  // Destroy everything except the Transformer.
  // Spread to a copy first: destroy() mutates the live children array.
  ;[...layer.getChildren()].forEach(n => {
    if (n.getClassName() !== 'Transformer') n.destroy()
  })

  if (!data?.length) { layer.batchDraw(); return }

  data.forEach(({ type, attrs }) => {
    // Oudere snapshots kunnen per abuis opgeslagen gizmo-handles bevatten.
    if (attrs.name?.startsWith('lineGizmoHandle')) return
    if (type === 'Image') {
      const img = new Image()
      img.onload = () => {
        // listening:false on locked images — they must be transparent to pointer events.
        const node = new Konva.Image({ ...attrs, image: img, listening: !attrs.isLocked })
        layer.add(node)
        node.moveToBottom()
        if (transformer) transformer.moveToTop()
        layer.batchDraw()
      }
      img.onerror = () => layer.batchDraw()
      img.src = attrs.src
    } else {
      const Cls = Konva[type]
      if (Cls) {
        const node = new Cls(attrs)
        layer.add(node)
      }
    }
  })

  if (transformer) transformer.moveToTop()
  layer.batchDraw()
}
