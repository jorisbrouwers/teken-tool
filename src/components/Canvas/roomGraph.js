// Automatische ruimte-detectie (vlak-herkenning) uit het muur-lijnsysteem.
//
// Vertaalt de bestaande muur-connectiviteitsgraaf (_ep0conns/_ep1conns, zie
// wallGraph.js) naar een planaire graaf en spoort daarin alle gesloten
// binnenvlakken op via een DCEL-achtige rand-traversal (half-edges,
// geordend per vertex op hoek). Zie CanvasView/CLAUDE.md voor de bredere
// context (klimatiseringszones).
//
// computeFacesFromWalls() is bewust Konva-vrij: puur data in, data uit. Dat
// maakt het isoleerd testbaar (bv. met een los Node-scriptje) zonder een
// Konva-stage te hoeven opzetten. detectFaces() is de dunne adapter die de
// benodigde platte data uit de Konva-laag haalt.

import { isWallNode, getConns } from './wallGraph.js'

// Lussen met een ondertekende oppervlakte boven -AREA_EPSILON worden
// genegeerd: het buitenvlak heeft (bij een consistente rotatie-conventie,
// zie signedArea hieronder) een POSITIEVE oppervlakte, en een muur die
// nergens een lus sluit (open keten, of een enkel doodlopend stuk) levert
// een lus met oppervlakte ~0 op (heen-en-terug over dezelfde punten).
// Beide horen niet als "vlak" meegenomen te worden — alleen strikt
// negatieve lussen zijn echte, begrensde binnenvlakken.
const AREA_EPSILON = 1e-6

// Ondertekende oppervlakte (shoelace-formule). Het teken hangt af van de
// traversal-conventie hieronder (nextHalfEdge = "twin's cyclische
// opvolger"): bij deze conventie krijgt het echte begrensde binnenvlak
// altijd een NEGATIEVE oppervlakte, en het onbegrensde buitenvlak (van
// hetzelfde samenhangende deel van de graaf) een positieve — geverifieerd
// met zowel een enkele rechthoek als een rechthoek met een T-splitsing
// (een aftakking die 'm in twee kamers splitst): bij de T-splitsing is de
// rand die de aftakking overslaat en zo de hele buitenomtrek aframt
// duidelijk het buitenvlak, en die kreeg in de simulatie steevast het
// positieve teken, de twee echte kamers steevast het negatieve.
function signedArea(vertices) {
  let sum = 0
  for (let i = 0; i < vertices.length; i++) {
    const a = vertices[i]
    const b = vertices[(i + 1) % vertices.length]
    sum += a.x * b.y - b.x * a.y
  }
  return sum / 2
}

function portKey(id, ep) {
  return `${id}:${ep}`
}

// Minimale union-find, alleen voor gebruik binnen computeFacesFromWalls.
function makeUnionFind() {
  const parent = new Map()
  function ensure(k) {
    if (!parent.has(k)) parent.set(k, k)
  }
  function find(k) {
    ensure(k)
    while (parent.get(k) !== k) {
      parent.set(k, parent.get(parent.get(k)))
      k = parent.get(k)
    }
    return k
  }
  function union(a, b) {
    const ra = find(a), rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }
  return { find, union }
}

// walls: [{ id, x0, y0, x1, y1, conns0, conns1 }] — conns0/conns1 zijn
// lijsten van {id, ep} (zelfde vorm als wallGraph.getConns levert), en
// verwijzen naar de peer-eindpunten waarmee eindpunt 0 resp. 1 van deze muur
// verbonden is. Coördinaten zijn absoluut (stage-space).
//
// Retourneert [{ vertices: [{x,y}, ...], edgeIds: [wallId, ...] }] — één
// entry per gedetecteerd binnenvlak (het buitenvlak/de buitenvlakken worden
// er automatisch uitgefilterd, zie hierboven).
export function computeFacesFromWalls(walls) {
  if (walls.length === 0) return []

  const uf = makeUnionFind()
  for (const w of walls) {
    for (const conn of w.conns0) uf.union(portKey(w.id, 0), portKey(conn.id, conn.ep))
    for (const conn of w.conns1) uf.union(portKey(w.id, 1), portKey(conn.id, conn.ep))
  }

  // Vertex-representatie: root -> absolute positie (eerste lid dat we
  // tegenkomen; bij correct verbonden eindpunten liggen alle leden van een
  // groep sowieso op dezelfde plek).
  const vertexPos = new Map()
  for (const w of walls) {
    const v0 = uf.find(portKey(w.id, 0))
    if (!vertexPos.has(v0)) vertexPos.set(v0, { x: w.x0, y: w.y0 })
    const v1 = uf.find(portKey(w.id, 1))
    if (!vertexPos.has(v1)) vertexPos.set(v1, { x: w.x1, y: w.y1 })
  }

  // Half-edges: elke muur levert er twee (heen en terug).
  const halfEdges = []
  for (const w of walls) {
    const v0 = uf.find(portKey(w.id, 0))
    const v1 = uf.find(portKey(w.id, 1))
    const p0 = vertexPos.get(v0)
    const p1 = vertexPos.get(v1)
    const iFwd = halfEdges.length
    halfEdges.push({ wallId: w.id, from: v0, to: v1, angle: Math.atan2(p1.y - p0.y, p1.x - p0.x) })
    const iBwd = halfEdges.length
    halfEdges.push({ wallId: w.id, from: v1, to: v0, angle: Math.atan2(p0.y - p1.y, p0.x - p1.x) })
    halfEdges[iFwd].twin = iBwd
    halfEdges[iBwd].twin = iFwd
  }

  // Per vertex: uitgaande half-edges gesorteerd op hoek (rotatie-systeem),
  // plus voor elke half-edge zijn positie in die gesorteerde lijst — nodig
  // om "de volgende in rotatie-volgorde" in O(1) te vinden.
  const outgoingByVertex = new Map()
  for (let i = 0; i < halfEdges.length; i++) {
    const from = halfEdges[i].from
    if (!outgoingByVertex.has(from)) outgoingByVertex.set(from, [])
    outgoingByVertex.get(from).push(i)
  }
  const rotIndex = new Map()
  for (const list of outgoingByVertex.values()) {
    list.sort((a, b) => halfEdges[a].angle - halfEdges[b].angle)
    list.forEach((heIdx, pos) => rotIndex.set(heIdx, pos))
  }

  // DCEL "next": de half-edge die cyclisch volgt op de twin van heIdx, in
  // de rotatie-volgorde van de vertex waar die twin begint (= het vertex
  // waar heIdx aankomt). Dit traceert vlak-randen ongeacht vertex-graad
  // (werkt dus ook voor T-splitsingen en hogere-graad kruisingen).
  function nextHalfEdge(heIdx) {
    const twinIdx = halfEdges[heIdx].twin
    const vertex = halfEdges[twinIdx].from
    const list = outgoingByVertex.get(vertex)
    const pos = rotIndex.get(twinIdx)
    return list[(pos + 1) % list.length]
  }

  const visited = new Array(halfEdges.length).fill(false)
  const loops = []
  const maxIter = halfEdges.length * 2 + 10
  for (let i = 0; i < halfEdges.length; i++) {
    if (visited[i]) continue
    const loopHeIdx = []
    let cur = i
    let iter = 0
    while (!visited[cur]) {
      visited[cur] = true
      loopHeIdx.push(cur)
      cur = nextHalfEdge(cur)
      iter++
      // Veiligheidsklep: zou bij een consistente graaf nooit mogen triggeren.
      if (iter > maxIter) break
    }
    loops.push(loopHeIdx)
  }

  const faces = []
  for (const loopHeIdx of loops) {
    const vertices = loopHeIdx.map(idx => vertexPos.get(halfEdges[idx].from))
    if (signedArea(vertices) >= -AREA_EPSILON) continue // buitenvlak of degeneraat, zie boven
    const edgeIds = [...new Set(loopHeIdx.map(idx => halfEdges[idx].wallId))].sort()
    faces.push({ vertices, edgeIds })
  }
  return faces
}

// Dunne adapter: leest de platte walldata uit een lijst Konva-nodes en levert
// die aan computeFacesFromWalls(). Los van detectFaces() getrokken zodat
// vlak-detectie ook op een SUBSET van nodes kan draaien (bv. alleen de
// nodes die gedupliceerd worden), i.p.v. altijd de volledige laag.
export function facesFromNodes(nodes) {
  const walls = nodes
    .filter(isWallNode)
    .map(node => {
      const pts = node.points()
      return {
        id: node.id(),
        x0: node.x() + pts[0], y0: node.y() + pts[1],
        x1: node.x() + pts[2], y1: node.y() + pts[3],
        conns0: getConns(node, 0),
        conns1: getConns(node, 1),
      }
    })
  return computeFacesFromWalls(walls)
}

// mainLayer = Konva.Layer met de muur-nodes.
export function detectFaces(mainLayer) {
  return facesFromNodes(mainLayer.getChildren())
}

// Trekt elke vertex een stukje naar het centroïde toe — een grove maar
// goedkope polygon-inset (geen echte edge-offset). Gebruikt om het
// klikbare/hoverbare gebied net iets kleiner te maken dan het gevulde vlak,
// zodat bewerken vlak bij een rand of scharnier niet per ongeluk de
// toewijzing-hittest laat flikkeren. Krimpt nooit meer dan 40% van de
// afstand tot het centroïde, zodat een kleine ruimte niet in elkaar klapt.
export function shrinkPolygon(vertices, margin) {
  const cx = vertices.reduce((s, v) => s + v.x, 0) / vertices.length
  const cy = vertices.reduce((s, v) => s + v.y, 0) / vertices.length
  return vertices.map(v => {
    const dx = v.x - cx, dy = v.y - cy
    const len = Math.hypot(dx, dy) || 1
    const shrinkBy = Math.min(margin, len * 0.4)
    return { x: v.x - (dx / len) * shrinkBy, y: v.y - (dy / len) * shrinkBy }
  })
}

// Ray-casting point-in-polygon — voor hittesting bij hover/klik in de
// toewijzing-tool (Fase 3).
export function pointInFace(face, x, y) {
  const pts = face.vertices
  let inside = false
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i].x, yi = pts[i].y
    const xj = pts[j].x, yj = pts[j].y
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  return inside
}

// Stabiele identiteit van een vlak, voor gebruik als sleutel in
// note.settings.roomAssignments — gebaseerd op de bijdragende muur-ids
// (al gesorteerd/gededupliceerd door computeFacesFromWalls).
export function faceHash(face) {
  return face.edgeIds.join('|')
}

// Bepaalt welke verwarmingsinstallatie geldt als "de" default voor nieuw
// gedetecteerde vlakken zonder expliciete toewijzing. Prioriteit:
// 1) de bij het aanmaken van de notitie geseede installatie
//    (note.settings.defaultHeatingInstallationId), mits die nog bestaat;
// 2) anders de EERSTE verwarmingsinstallatie (array-volgorde, dus
//    "Verwarming 1") — niet alleen wanneer er toevallig precies één is:
//    zodra een tweede verwarmingsinstallatie wordt toegevoegd moet de default
//    voor alle nog niet handmatig aangepaste vlakken op "Verwarming 1" blijven
//    staan, niet ineens leeg worden. Dekt ook oudere notities van vóór dit
//    veld bestond, en het geval waarin de geseede installatie inmiddels
//    verwijderd is.
export function resolveDefaultHeatingId(installations, defaultHeatingInstallationId) {
  if (defaultHeatingInstallationId && installations.some(i => i.id === defaultHeatingInstallationId)) {
    return defaultHeatingInstallationId
  }
  const heatingInstallations = installations.filter(i => i.kind === 'verwarming')
  return heatingInstallations.length > 0 ? heatingInstallations[0].id : null
}

// Effectieve toewijzing van één vlak — inclusief de impliciete default voor
// vlakken zonder entry in roomAssignments. Heeft een vlak wél een entry
// (ook al staat een veld daarin expliciet op null/"geen"), dan geldt die
// expliciete keuze en wordt niet meer gegokt. Gedeeld door deriveZones en
// de toewijzing-tool (popup), zodat de getoonde en de ingekleurde waarde
// altijd overeenkomen.
//
// Verwijst een (impliciete of expliciete) waarde naar een installatie die
// niet meer bestaat (bv. na het verwijderen van alle installaties), dan
// telt dat als onbepaald/"geen" — anders zou een vlak dat ooit handmatig is
// toegewezen permanent gekleurd blijven, ook nadat de installatie zelf allang
// verwijderd is.
export function resolveRoomAssignment(hash, roomAssignments, installations, defaultHeatingInstallationId) {
  const assignment = roomAssignments[hash]
  const defaultHeatingId = resolveDefaultHeatingId(installations, defaultHeatingInstallationId)
  const rawHeating = assignment ? (assignment.heatingInstallationId ?? null) : defaultHeatingId
  const rawCooling = assignment?.coolingInstallationId ?? null
  return {
    heatingInstallationId: rawHeating && installations.some(i => i.id === rawHeating) ? rawHeating : null,
    coolingInstallationId: rawCooling && installations.some(i => i.id === rawCooling) ? rawCooling : null,
  }
}

// Groepeert vlakken tot klimatiseringszones: alle vlakken met identieke
// (heatingInstallationId, coolingInstallationId)-combinatie vormen samen
// één zone (NTA 8800 "initiële combinatie", zonder de ventilatie/
// oppervlakte-nuances — zie KLIMATISERINGSZONES.md/gespreksgeschiedenis
// voor waarom die bewust buiten scope blijven).
export function deriveZones(faces, roomAssignments, installations, defaultHeatingInstallationId) {
  const groups = new Map()
  for (const face of faces) {
    const hash = faceHash(face)
    const { heatingInstallationId, coolingInstallationId } =
      resolveRoomAssignment(hash, roomAssignments, installations, defaultHeatingInstallationId)
    if (!heatingInstallationId && !coolingInstallationId) continue // onbepaald vlak: geen zone, geen kleur

    const key = `${heatingInstallationId ?? ''}|${coolingInstallationId ?? ''}`
    let group = groups.get(key)
    if (!group) {
      group = { key, heatingInstallationId, coolingInstallationId, faces: [] }
      groups.set(key, group)
    }
    group.faces.push(face)
  }

  return [...groups.values()]
    .sort((a, b) => b.faces.length - a.faces.length)
    .map((group, i) => ({ ...group, name: `Zone ${i + 1}` }))
}
