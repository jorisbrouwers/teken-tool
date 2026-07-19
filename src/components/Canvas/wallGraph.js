// Verbindingsmodel van het lijnsysteem ("muren").
//
// Een muur is een 2-punts Konva.Line/Arrow met attr `isWall: true`. Verbindingen
// per endpoint staan in attrs `_ep0conns`/`_ep1conns` als lijst van {id, ep} en
// worden altijd bidirectioneel bijgehouden. Lijsten (i.p.v. het oude enkelvoudige
// `_ep0conn`/`_ep1conn`) maken graad-N-hoekpunten mogelijk: meerdere muren die
// één punt delen (T-splitsingen). Oud opgeslagen materiaal wordt bij het inladen
// genormaliseerd via migrateWallAttrs (zie normalizeSnapshot in konvaSerialize.js).
//
// Let op performance-invariant 1: deze attrs worden geserialiseerd naar
// persistence/history/export — alleen persistente graafstatus hoort hier thuis.

export function connsAttr(ep) {
  return ep === 0 ? '_ep0conns' : '_ep1conns'
}

export function getConns(node, ep) {
  return node.getAttr(connsAttr(ep)) ?? []
}

export function hasConns(node, ep) {
  return getConns(node, ep).length > 0
}

// Bidirectionele verbinding leggen; dubbele entries worden genegeerd.
export function addConn(nodeA, epA, nodeB, epB) {
  link(nodeA, epA, nodeB.id(), epB)
  link(nodeB, epB, nodeA.id(), epA)
}

function link(node, ep, peerId, peerEp) {
  const list = getConns(node, ep)
  if (!list.some(c => c.id === peerId && c.ep === peerEp)) {
    node.setAttr(connsAttr(ep), [...list, { id: peerId, ep: peerEp }])
  }
}

// Verbindt alle paren in `members` ({id, ep}) onderling volledig (nooit met
// zichzelf) — gebruikt om twee of meer voorheen aparte "kliekjes" die op
// hetzelfde punt samenkomen (las, ineenklap, T-splitsing) tot één volledig
// verbonden mesh te maken. Een T-punt/kruispunt moet ALTIJD een complete kliek
// zijn (elk lid rechtstreeks verbonden met elk ander lid): handleLineEndpointDragMove
// propageert bewust maar 1 hop (geen ketting-propagatie), dus zodra twee leden
// van hetzelfde punt niet rechtstreeks verbonden zijn, laat het verslepen van
// het ene lid het andere achter.
export function connectAllPairs(layer, members) {
  for (let x = 0; x < members.length; x++) {
    for (let y = x + 1; y < members.length; y++) {
      const a = members[x], b = members[y]
      if (a.id === b.id) continue
      const an = layer.findOne(`#${a.id}`)
      const bn = layer.findOne(`#${b.id}`)
      if (an && bn) addConn(an, a.ep, bn, b.ep)
    }
  }
}

// Las (node, ep) vast aan (targetNode, targetEp): voegt de twee kliekjes
// samen (node + zijn huidige buren op ep, target + zijn huidige buren op
// targetEp) tot één complete kliek — een gewone las die alleen node-target
// verbindt raakt anders maar één specifiek lid van een bestaand T-punt/
// kruispunt, waardoor het resultaat een kettinkje blijft i.p.v. een mesh.
export function weldAllAt(layer, node, ep, targetNode, targetEp) {
  const members = [
    { id: node.id(), ep }, ...getConns(node, ep),
    { id: targetNode.id(), ep: targetEp }, ...getConns(targetNode, targetEp),
  ]
  connectAllPairs(layer, members)
}

// Eén entry uit de lijst van `node` verwijderen (alleen deze richting —
// de spiegel-entry bij de peer moet apart verwijderd worden).
export function removeConn(node, ep, peerId, peerEp) {
  const list = getConns(node, ep).filter(c => !(c.id === peerId && c.ep === peerEp))
  node.setAttr(connsAttr(ep), list.length ? list : undefined)
}

export function isWallNode(node) {
  if (!node || !node.getAttr('isWall')) return false
  const cls = node.getClassName()
  return (cls === 'Line' || cls === 'Arrow') && node.points().length === 4
}

// Volledige hiërarchie (verbonden component) vanaf startNode.
export function walkHierarchy(startNode, layer) {
  const visited = new Set()
  const nodes = []
  function walk(n) {
    if (!n || visited.has(n.id())) return
    visited.add(n.id())
    nodes.push(n)
    for (let ep = 0; ep < 2; ep++) {
      for (const conn of getConns(n, ep)) walk(layer.findOne(`#${conn.id}`))
    }
  }
  walk(startNode)
  return nodes
}

// Absolute posities van alle endpoints in de hiërarchie van startNode,
// behalve die in excludeList [{id, ep}] (de bewegende endpoints).
export function collectHierarchyVertices(startNode, layer, excludeList) {
  const visited = new Set()
  const vertices = []
  function walk(n) {
    const id = n.id()
    if (visited.has(id)) return
    visited.add(id)
    const pts = n.points()
    if (pts.length !== 4) return
    for (let ep = 0; ep < 2; ep++) {
      if (!excludeList.some(e => e.id === id && e.ep === ep)) {
        vertices.push({ x: n.x() + pts[ep * 2], y: n.y() + pts[ep * 2 + 1] })
      }
      for (const conn of getConns(n, ep)) {
        const connNode = layer.findOne(`#${conn.id}`)
        if (connNode) walk(connNode)
      }
    }
  }
  walk(startNode)
  return vertices
}

// Dichtstbijzijnde muur-eindpunt binnen maxDist (stage-eenheden), voor lassen/
// kettingen tijdens het tekenen. Scant alle muren op de layer, ongeacht
// hiërarchie — dit is de las-snap en die is per definitie pointer-lokaal (de
// gebruiker wijst er met de pen op), dus geen viewport-beperking nodig.
export function findWallEndpointNear(layer, absX, absY, maxDist) {
  let best = null, bestD = maxDist
  for (const node of layer.getChildren()) {
    if (!node.attrs.isWall) continue
    const pts = node.points()
    if (!pts || pts.length !== 4) continue
    for (let ep = 0; ep < 2; ep++) {
      const ex = node.x() + pts[ep * 2], ey = node.y() + pts[ep * 2 + 1]
      const d = Math.hypot(ex - absX, ey - absY)
      if (d < bestD) { bestD = d; best = { node, ep, x: ex, y: ey } }
    }
  }
  return best
}

// Dichtstbijzijnde punt op de BODY van een muur (niet bij een eindpunt) binnen
// maxDist — voor auto-splitsen bij snap: een endpoint dat op een bestaande
// muur-lijn landt (i.p.v. op een vertex, die snap heeft al voorrang via
// findWallEndpointNear) moet die muur splitsen op het geprojecteerde punt.
// endExclusionDist voorkomt dubbele triggering vlak bij een eindpunt (dat
// geval hoort bij de las-snap). excludeIds: host-kandidaten die deze aanroep
// niet mag gebruiken (bv. de muur waar de sleep zelf toe behoort).
export function findWallBodyNear(layer, x, y, maxDist, endExclusionDist, excludeIds = []) {
  let best = null, bestD = maxDist
  for (const node of layer.getChildren()) {
    if (!node.attrs.isWall || excludeIds.includes(node.id())) continue
    const pts = node.points()
    if (!pts || pts.length !== 4) continue
    const ax = node.x() + pts[0], ay = node.y() + pts[1]
    const bx = node.x() + pts[2], by = node.y() + pts[3]
    const proj = closestPointOnSegment(x, y, ax, ay, bx, by)
    const distToEp0 = Math.hypot(proj.x - ax, proj.y - ay)
    const distToEp1 = Math.hypot(proj.x - bx, proj.y - by)
    if (distToEp0 < endExclusionDist || distToEp1 < endExclusionDist) continue
    const d = Math.hypot(proj.x - x, proj.y - y)
    if (d < bestD) { bestD = d; best = { node, x: proj.x, y: proj.y } }
  }
  return best
}

// Uitlijn-snap-kandidaten (5.1): de eigen hiërarchie (ownHierarchyStartNode)
// doet altijd mee, ook off-screen — nodig om een grote plattegrond ingezoomd
// te kunnen sluiten op een ver hoekpunt. Andere hiërarchieën doen alleen mee
// met hun on-screen hoekpunten, zodat bijvoorbeeld een op dezelfde plek
// getekende verdieping niet constant meesnapt.
export function collectSnapVertices(layer, stage, ownHierarchyStartNode, excludeList = []) {
  const vertices = []
  const ownIds = new Set()
  if (ownHierarchyStartNode) {
    vertices.push(...collectHierarchyVertices(ownHierarchyStartNode, layer, excludeList))
    for (const n of walkHierarchy(ownHierarchyStartNode, layer)) ownIds.add(n.id())
  }
  if (!stage) return vertices
  const w = stage.width(), h = stage.height()
  const transform = stage.getAbsoluteTransform()
  for (const node of layer.getChildren()) {
    if (!node.attrs.isWall || ownIds.has(node.id()) || node._culled) continue
    const pts = node.points()
    if (!pts || pts.length !== 4) continue
    for (let ep = 0; ep < 2; ep++) {
      const ax = node.x() + pts[ep * 2], ay = node.y() + pts[ep * 2 + 1]
      const sp = transform.point({ x: ax, y: ay })
      if (sp.x < 0 || sp.x > w || sp.y < 0 || sp.y > h) continue
      vertices.push({ x: ax, y: ay })
    }
  }
  return vertices
}

// Dichtstbijzijnde punt op het lijnstuk [a,b] bij p, geklemd tussen de
// eindpunten (t in [0,1]). Gebruikt om een pen-down-positie op de body van een
// bestaande muur te projecteren voor mid-segment-aftakking (5.2).
export function closestPointOnSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay
  const lenSq = dx * dx + dy * dy
  if (lenSq < 1e-9) return { x: ax, y: ay, t: 0 }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq
  t = Math.max(0, Math.min(1, t))
  return { x: ax + dx * t, y: ay + dy * t, t }
}

// Migratie van attrs uit het oude opslagformaat (vóór het versieveld):
// elk 2-punts Line/Arrow-object gedroeg zich toen als muur, dus alles wordt
// gemarkeerd met isWall; enkelvoudige _ep0conn/_ep1conn worden lijsten.
export function migrateWallAttrs(type, attrs) {
  if ((type !== 'Line' && type !== 'Arrow') || attrs.points?.length !== 4) return attrs
  const out = { ...attrs, isWall: true }
  if (out._ep0conn) out._ep0conns = [out._ep0conn]
  if (out._ep1conn) out._ep1conns = [out._ep1conn]
  delete out._ep0conn
  delete out._ep1conn
  return out
}
