// Viewport culling: nodes die volledig buiten het zichtbare stage-gebied vallen
// worden verborgen zodat Konva ze overslaat bij elke layer-draw (scene + hit).
// Draait aan het einde van elke navigatie — het enige moment waarop de
// viewport verandert.
//
// De cull-status staat als gewone JS-property (`_culled`) op de node, NIET in
// node.attrs: attrs worden geserialiseerd naar persistence/history/export en
// daar mag deze runtime-status nooit in lekken (dat was de bug in het oude,
// verwijderde culling-mechanisme). Alleen nodes die dóór culling verborgen
// zijn worden ooit weer getoond; nodes die om een andere reden onzichtbaar
// zijn (bv. een Text-node tijdens inline editen) blijven met rust gelaten.

const CULL_PAD = 200 // schermpixels rond de viewport die nog als zichtbaar tellen

export function applyViewportCulling(stage, layer, shouldSkip) {
  const w = stage.width()
  const h = stage.height()
  for (const node of layer.getChildren()) {
    if (node.getClassName() === 'Transformer') continue
    if (node.name()?.startsWith('lineGizmoHandle')) continue
    if (shouldSkip?.(node)) {
      if (node._culled) { node.visible(true); node._culled = false }
      continue
    }
    const r = node.getClientRect() // containercoördinaten; negeert huidige visibility
    const off =
      r.x + r.width  < -CULL_PAD || r.y + r.height < -CULL_PAD ||
      r.x > w + CULL_PAD || r.y > h + CULL_PAD
    if (off) {
      if (node.visible()) { node.visible(false); node._culled = true }
    } else if (node._culled) {
      node.visible(true)
      node._culled = false
    }
  }
}

// Toon geculde nodes tijdelijk voor renders van de volledige inhoud
// (minimap-thumbnail, PDF-export) en herstel daarna de cull-status.
export function withCulledVisible(layer, fn) {
  const culled = layer.getChildren().filter(n => n._culled)
  culled.forEach(n => n.visible(true))
  try {
    return fn()
  } finally {
    culled.forEach(n => { if (n.getLayer()) n.visible(false) })
  }
}
