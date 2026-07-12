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
