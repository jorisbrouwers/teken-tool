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
export function signedArea(vertices) {
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

// Kern-traversal: bouwt de planaire graaf en loopt álle randlussen af
// (binnenvlakken én buitenvlak(ken)). Retourneert per lus de geordende
// vertex-posities plus de geordende wall-ids (edgeWallIds[i] = de muur tussen
// vertices[i] en vertices[i+1]) en de ondertekende oppervlakte. Gedeeld door
// computeFacesFromWalls (filtert op negatieve oppervlakte = binnenvlak) en
// computeEnvelopeFromWalls (positieve oppervlakte = buitenomtrek).
function computeLoops(walls) {
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

  return loops.map(loopHeIdx => {
    const vertices = loopHeIdx.map(idx => vertexPos.get(halfEdges[idx].from))
    return {
      vertices,
      edgeWallIds: loopHeIdx.map(idx => halfEdges[idx].wallId),
      area: signedArea(vertices),
    }
  })
}

// walls: [{ id, x0, y0, x1, y1, conns0, conns1 }] — conns0/conns1 zijn
// lijsten van {id, ep} (zelfde vorm als wallGraph.getConns levert), en
// verwijzen naar de peer-eindpunten waarmee eindpunt 0 resp. 1 van deze muur
// verbonden is. Coördinaten zijn absoluut (stage-space).
//
// Retourneert [{ vertices: [{x,y}, ...], edgeIds: [wallId, ...], orderedEdgeIds }]
// — één entry per gedetecteerd binnenvlak (het buitenvlak/de buitenvlakken
// worden er automatisch uitgefilterd, zie hierboven). `edgeIds` is gededupliceerd/
// gesorteerd (stabiele sleutel, zie faceHash); `orderedEdgeIds` behoudt de
// muur-volgorde zodat orderedEdgeIds[i] de muur is tussen vertices[i] en
// vertices[(i+1) % n] — nodig voor bewerkingen die de buurmuur van een rand
// moeten kennen (bv. roofGuides.js, die bij het intekenen van 1,5m-lijnen de
// aangrenzende muur van een hoek moet vinden om tegenaan te snijden/lassen).
export function computeFacesFromWalls(walls) {
  const faces = []
  for (const loop of computeLoops(walls)) {
    if (loop.area >= -AREA_EPSILON) continue // buitenvlak of degeneraat, zie boven
    const edgeIds = [...new Set(loop.edgeWallIds)].sort()
    faces.push({ vertices: loop.vertices, edgeIds, orderedEdgeIds: loop.edgeWallIds })
  }
  return faces
}

// Buitenomtrek (envelope) van het muurnetwerk: de lus met POSITIEVE
// ondertekende oppervlakte. Voor één samenhangende muur-hiërarchie — wat
// walkHierarchy() oplevert, en wat een energielabel-thermische zone altijd is
// (één geheel, geen losstaande delen) — is dat er precies één; bij meerdere
// wordt de grootste gekozen. Retourneert { polygon: [{x,y},...], wallIds:
// [wallId,...] } waar wallIds[i] de muur is tussen polygon[i] en
// polygon[(i+1) % n], of null als er geen gesloten omtrek is.
//
// De winding-richting is niet genormaliseerd (valt uit de traversal) — de
// consument (Blender-export → straight skeleton) normaliseert zelf op teken
// van de oppervlakte. Doodlopende muurstukken (open uiteinden) worden in de
// omtrek heen-en-terug gelopen; bij een net gesloten getekende plattegrond
// speelt dat niet.
export function computeEnvelopeFromWalls(walls) {
  const outer = computeLoops(walls)
    .filter(loop => loop.area > AREA_EPSILON)
    .sort((a, b) => b.area - a.area)
  if (outer.length === 0) return null
  return { polygon: outer[0].vertices, wallIds: outer[0].edgeWallIds }
}

// Buitenomtrek van een DEELVERZAMELING vlakken — de omtrek van één gebouwdeel
// op één verdieping (zie BLENDER_EXPORT_PLAN.md, blok "Gebouwdelen en
// constructies"). Anders dan computeEnvelopeFromWalls, die over de muurgraaf
// loopt, werkt dit op al gedetecteerde vlakken: een rand hoort bij de omtrek
// als de tegenoverliggende (omgekeerde) rand NIET ook in deze verzameling zit
// — dus als er aan de andere kant geen vlak van hetzelfde gebouwdeel ligt.
//
// Daardoor blijft een hulplijn (isAux) die als gebouwdeelgrens getekend is hier
// juist wél in de omtrek staan: aan de andere kant ligt een vlak van een ánder
// gebouwdeel, en het dak van deze regio moet daar eindigen. Dat is precies
// andersom dan bij envelopeFromNodes, waar isAux-muren geen gevel zijn.
//
// faces = entries uit computeFacesFromWalls (vertices + orderedEdgeIds).
// Retourneert { polygon: [{x,y}], wallIds: [id] } met hetzelfde contract als
// computeEnvelopeFromWalls (wallIds[i] hoort bij polygon[i] → polygon[i+1]),
// of null als er geen gesloten ring uit komt.
export function envelopeForFaces(faces) {
  if (!faces?.length) return null

  // Vertex-sleutel op positie: vlakken delen dezelfde vertex-objecten uit
  // computeLoops (vertexPos), maar twee vlakken kunnen hun eigen object voor
  // hetzelfde punt hebben. Afronden op 1e-6 px is ver onder tekenprecisie en
  // maakt de sleutel robuust tegen float-ruis.
  const key = (v) => `${Math.round(v.x * 1e6)},${Math.round(v.y * 1e6)}`

  // Alle gerichte randen van alle vlakken in de verzameling.
  const edges = new Map() // "from->to" -> { from, to, wallId }
  for (const face of faces) {
    const n = face.vertices.length
    for (let i = 0; i < n; i++) {
      const a = face.vertices[i]
      const b = face.vertices[(i + 1) % n]
      edges.set(`${key(a)}->${key(b)}`, { from: a, to: b, wallId: face.orderedEdgeIds?.[i] })
    }
  }

  // Grensranden = randen zonder tegenhanger binnen de verzameling.
  const boundary = new Map() // fromKey -> [{ from, to, wallId }]
  for (const [k, edge] of edges) {
    const reversed = `${key(edge.to)}->${key(edge.from)}`
    if (edges.has(reversed)) continue
    const fk = key(edge.from)
    if (!boundary.has(fk)) boundary.set(fk, [])
    boundary.get(fk).push(edge)
  }
  if (boundary.size === 0) return null

  // Grensranden aan elkaar rijgen tot ring(en). Bij een vertex met meerdere
  // uitgaande grensranden (twee stukken die elkaar in één punt raken) pakken we
  // gewoon de eerstvolgende ongebruikte — dat levert nog steeds gesloten
  // ringen op; we kiezen daarna de grootste.
  const used = new Set()
  const rings = []
  for (const [startKey, startEdges] of boundary) {
    for (const startEdge of startEdges) {
      if (used.has(startEdge)) continue
      const polygon = []
      const wallIds = []
      let cur = startEdge
      while (cur && !used.has(cur)) {
        used.add(cur)
        polygon.push(cur.from)
        wallIds.push(cur.wallId)
        const nextList = boundary.get(key(cur.to)) ?? []
        cur = nextList.find(e => !used.has(e))
        if (cur && key(cur.from) === startKey) break // ring rond
      }
      if (polygon.length >= 3) rings.push({ polygon, wallIds, area: Math.abs(signedArea(polygon)) })
    }
  }
  if (!rings.length) return null

  rings.sort((a, b) => b.area - a.area)
  return { polygon: rings[0].polygon, wallIds: rings[0].wallIds }
}

// Platte walldata uit een lijst Konva-nodes (zelfde vorm die
// computeFacesFromWalls/computeEnvelopeFromWalls verwachten).
export function wallsFromNodes(nodes) {
  return nodes
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
}

// Dunne adapter: leest de platte walldata uit een lijst Konva-nodes en levert
// die aan computeFacesFromWalls(). Los van detectFaces() getrokken zodat
// vlak-detectie ook op een SUBSET van nodes kan draaien (bv. alleen de
// nodes die gedupliceerd worden), i.p.v. altijd de volledige laag.
export function facesFromNodes(nodes) {
  return computeFacesFromWalls(wallsFromNodes(nodes))
}

// Idem, maar voor de buitenomtrek — gebruikt door de Blender-export per
// verdieping (subset = walkHierarchy vanaf het referentiepunt).
//
// isAux-muren (hulplijnen: <1,5m-lijn, begrenzing-splitmarkering,
// referentiepunt-anker) tellen NIET mee voor de omtrek. Ze zijn geen gevel, en
// een hulplijn met een vrij uiteinde zou anders heen-en-terug meegelopen worden
// en als nul-oppervlak-spike in de polygoon belanden. Ze blijven wél meedoen
// voor facesFromNodes hierboven, waar ze juist een ruimte moeten splitsen.
// Een hulplijn die op een echte muur T-splitst laat die muur heel: de twee
// helften zijn onderling direct verbonden (T-punt = complete kliek, zie
// wallGraph.js), dus de omtrek loopt na het weglaten van de hulplijn gewoon
// rechtdoor door het splitspunt.
export function envelopeFromNodes(nodes) {
  return computeEnvelopeFromWalls(wallsFromNodes(nodes.filter(n => !n.attrs?.isAux)))
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

// Een punt dat gegarandeerd BINNEN het vlak ligt (het zwaartepunt ligt bij een
// L-vormige ruimte er vaak buiten). Scanline op de gemiddelde vertex-y: de
// snijpunten met de randen gesorteerd, in paren = binnen-intervallen; het
// midden van het breedste interval. Zelfde half-open regel als pointInFace,
// dus een vertex precies op de scanline telt consistent. Een doodlopend
// muurstuk in het vlak (heen-en-terug gelopen) levert een interval van
// breedte 0 op en wint dus nooit. null bij een degeneraat vlak.
export function interiorPoint(vertices) {
  const n = vertices.length
  if (n < 3) return null
  const y = vertices.reduce((s, v) => s + v.y, 0) / n
  const xs = []
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const a = vertices[i], b = vertices[j]
    if ((a.y > y) !== (b.y > y)) xs.push((b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x)
  }
  xs.sort((p, q) => p - q)
  let best = null, bestWidth = 0
  for (let k = 0; k + 1 < xs.length; k += 2) {
    const w = xs[k + 1] - xs[k]
    if (w > bestWidth) { bestWidth = w; best = { x: (xs[k] + xs[k + 1]) / 2, y } }
  }
  return best
}

// Vlak-gegevens (roomAssignments/faceAttributes) hangen aan faceHash = de
// muur-ids van het vlak. Een T-aftakking (splitWallAt) of het weer samenvoegen
// (tryMergeCollinearJoint) vervangt muren door nieuwe ids, en een nieuwe muur
// die een ruimte doorsnijdt maakt twee nieuwe vlakken — telkens zou de
// toewijzing van dat vlak dan stilzwijgend verdwijnen. Deze functie zoekt voor
// elk NIEUW vlak zonder gegevens het verdwenen oude vlak (mét gegevens) waar
// het ruimtelijk mee overlapt, zodat de aanroeper de gegevens kan overerven:
//   - zelfde vorm, andere muur-ids → 1-op-1
//   - ruimte in tweeën gesplitst  → beide helften erven van het origineel
//   - twee ruimtes samengevoegd   → erft van de grootste
// Overlap wordt benaderd met binnenpunt-tests in beide richtingen (nieuw in
// oud = splitsing/gelijk, oud in nieuw = samenvoeging); bij meerdere
// kandidaten wint de grootste min(oppervlak), dus de beste overlap.
//
// hasData(hash) → true als er voor dat vlak iets bewaard is. Retourneert
// Map nieuweHash → oudeHash.
export function matchOrphanedFaces(oldFaces, newFaces, hasData) {
  const result = new Map()
  const newHashes = new Set(newFaces.map(faceHash))
  const orphans = []
  for (const face of oldFaces) {
    const hash = faceHash(face)
    if (newHashes.has(hash) || !hasData(hash)) continue
    orphans.push({ hash, face, area: Math.abs(signedArea(face.vertices)), pt: interiorPoint(face.vertices) })
  }
  if (!orphans.length) return result

  const oldHashes = new Set(oldFaces.map(faceHash))
  for (const face of newFaces) {
    const hash = faceHash(face)
    if (oldHashes.has(hash) || hasData(hash)) continue // ongewijzigd, of heeft al eigen gegevens
    const area = Math.abs(signedArea(face.vertices))
    const pt = interiorPoint(face.vertices)
    let best = null, bestScore = 0
    for (const o of orphans) {
      const newInOld = pt && pointInFace(o.face, pt.x, pt.y)
      const oldInNew = o.pt && pointInFace(face, o.pt.x, o.pt.y)
      if (!newInOld && !oldInNew) continue
      const score = Math.min(area, o.area)
      if (score > bestScore) { bestScore = score; best = o }
    }
    if (best) result.set(hash, best.hash)
  }
  return result
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
