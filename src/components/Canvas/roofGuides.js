// Technische hulplijnen (dak-gerelateerd) — puur berekenend, geen React/Konva-
// state. Zie CLAUDE.md/BLENDER_EXPORT_PLAN.md ("Dak per muur" /
// "Dak dat over meerdere verdiepingen doorloopt") voor de achtergrond: twee
// toepassingen van hetzelfde principe — loop de daklagen (roofCourses) van
// een gootgevel van onder naar boven af, vanaf roofBaseHeightM, tot een
// gevraagde doelhoogte is bereikt, en teken op die horizontale afstand een
// lijn evenwijdig aan de gevel, naar binnen toe:
//   1. de <1,5m-hoogtelijn (doelhoogte vast op 1,5 m), op de eigen hiërarchie;
//   2. de diepte-hulplijn voor de volgende verdieping (doelhoogte = de
//      verdiepingshoogte van de onderliggende verdieping), verschoven naar de
//      canvaspositie van die volgende verdieping via het verschil tussen de
//      twee gekoppelde referentiepunten.
//
// Bewust géén skeleton-offset op hoeken met ongelijke hellingen — per-gevel-
// trig, zoals BLENDER_EXPORT_PLAN.md zelf al aangeeft te accepteren voor een
// eerste versie.

import { GRID_SIZE } from './useGrid.js'
import { isWallNode, walkHierarchy } from './wallGraph.js'
import { facesFromNodes, pointInFace, faceHash } from './roomGraph.js'
import { getFloorHeight, floorHasAnyHeight, mainGebouwdeelId } from '../Building/buildingDefaults.js'

export const LOW_HEADROOM_HEIGHT_M = 1.5

// Loopt roofCourses van onder (roofBaseHeightM) naar boven af en geeft de
// horizontale afstand (in meter, vanaf de gevel) terug waarop targetHeightM
// bereikt wordt — of null als dat niet zinvol/bepaalbaar is (geen daklagen,
// doelhoogte al bereikt vóór de gevel, of de eindige lagen bereiken de
// doelhoogte niet en er is geen open laatste laag).
export function computeRoofRunToHeight(roofBaseHeightM, roofCourses, targetHeightM) {
  const courses = Array.isArray(roofCourses) ? roofCourses : []
  if (!courses.length) return null
  const base = Number(roofBaseHeightM) || 0
  if (targetHeightM <= base) return null

  let accumHeight = base
  let accumRun = 0
  for (const course of courses) {
    const angleDeg = Number(course?.angleDeg) || 0
    if (angleDeg <= 0 || angleDeg >= 90) return null // geen zinvolle helling
    const tanAngle = Math.tan(angleDeg * Math.PI / 180)
    const riseM = course?.riseM == null ? null : Number(course.riseM)

    if (riseM == null) {
      // Open (laatste) laag — loopt door tot de nok, dus geldig zodra de
      // doelhoogte nog niet bereikt is (de werkelijke nok ligt hoger; die
      // hoogte kennen we hier bewust niet, zie BLENDER_EXPORT_PLAN.md).
      return accumRun + (targetHeightM - accumHeight) / tanAngle
    }
    if (targetHeightM <= accumHeight + riseM) {
      return accumRun + (targetHeightM - accumHeight) / tanAngle
    }
    accumRun += riseM / tanAngle
    accumHeight += riseM
  }
  return null // doelhoogte ligt boven alle eindige lagen, geen open laatste laag
}

function resolveFaceAard(face, faceAttributes) {
  return faceAttributes?.[faceHash(face)]?.aard ?? 'gebruiksruimte'
}

// Vindt het vlak dat aan deze muur grenst en geeft de eenheidsnormaal terug
// die "naar binnen" wijst.
//
// Twee lastige gevallen, allebei uit de praktijk (zie gesprek 2026-09):
// 1. Concave vlakken (bv. een L-vorm): een gemiddelde van de hoekpunten is
//    GEEN betrouwbaar "punt binnenin" — bij een concave vorm kan dat
//    gemiddelde aan de verkeerde kant van een rand vallen. Daarom een klein
//    testpunt loodrecht op de muur zetten en met het bestaande `pointInFace`
//    (ray-casting, exact voor elke vorm) checken aan welke kant het
//    daadwerkelijk in het vlak ligt — geen giswerk.
// 2. Een muur die aan TWEE vlakken grenst (interne scheidingsmuur tussen twee
//    ruimtes, elk met eigen dakgegevens — bv. een kamer met een eigen kapje
//    ingeklemd tussen twee plat-dak-zones). Geometrisch is dan niet te
//    bepalen welke kant "juist" is; de vlak-eigenschap (`aard`, zie
//    FACE_AARD_OPTIONS in CanvasView.jsx) geeft wél uitsluitsel: de
//    hoogtelijn gaat over de vraag "waar wordt een GEBRUIKSRUIMTE te laag",
//    dus als precies één van de twee vlakken `gebruiksruimte` is, is dat
//    ondubbelzinnig de juiste kant. Zijn het er 0 of 2, dan blijft het
//    dubbelzinnig en pakken we (zoals voorheen) gewoon de eerste kandidaat.
function findInteriorNormal(wallNode, faces, faceAttributes) {
  const wallId = wallNode.id()
  const candidates = faces.filter(f => f.edgeIds.includes(wallId))
  if (!candidates.length) return null

  let face = candidates[0]
  if (candidates.length > 1) {
    const usageFaces = candidates.filter(f => resolveFaceAard(f, faceAttributes) === 'gebruiksruimte')
    if (usageFaces.length === 1) face = usageFaces[0]
  }

  const pts = wallNode.points()
  const ax = wallNode.x() + pts[0], ay = wallNode.y() + pts[1]
  const bx = wallNode.x() + pts[2], by = wallNode.y() + pts[3]
  const dx = bx - ax, dy = by - ay
  const len = Math.hypot(dx, dy)
  if (len < 1e-6) return null

  const midX = (ax + bx) / 2, midY = (ay + by) / 2
  const EPS = 1 // content-eenheden — klein genoeg om nooit een ANDER vlak te raken
  let nx = -dy / len, ny = dx / len
  if (pointInFace(face, midX + nx * EPS, midY + ny * EPS)) return { nx, ny }
  nx = -nx; ny = -ny
  if (pointInFace(face, midX + nx * EPS, midY + ny * EPS)) return { nx, ny }
  return null // geen van beide kanten valt in het gekozen vlak — zou niet moeten voorkomen
}

// Muur-eindpunten loodrecht naar binnen verschoven met offsetM (meter) —
// null als de binnenkant niet bepaald kon worden of offsetM niet zinvol is.
function computeWallGuideSegment(wallNode, faces, offsetM, faceAttributes) {
  if (offsetM == null || offsetM <= 0) return null
  const normal = findInteriorNormal(wallNode, faces, faceAttributes)
  if (!normal) return null

  const pts = wallNode.points()
  const ax = wallNode.x() + pts[0], ay = wallNode.y() + pts[1]
  const bx = wallNode.x() + pts[2], by = wallNode.y() + pts[3]
  const offPx = offsetM * GRID_SIZE
  return {
    x1: ax + normal.nx * offPx, y1: ay + normal.ny * offPx,
    x2: bx + normal.nx * offPx, y2: by + normal.ny * offPx,
    // Meegegeven zodat een label verder "naar binnen" (dezelfde kant als de
    // verschuiving zelf) t.o.v. de lijn gepositioneerd kan worden — zie
    // RoofGuideOverlay.jsx.
    nx: normal.nx, ny: normal.ny,
  }
}

function resolveReferencePointPos(referencePoint, mainLayer) {
  if (!referencePoint) return null
  const node = mainLayer.findOne(`#${referencePoint.wallId}`)
  if (!node) return null
  const pts = node.points()
  if (!pts || pts.length < 4) return null
  const ep = referencePoint.ep
  return { x: node.x() + pts[ep * 2], y: node.y() + pts[ep * 2 + 1] }
}

// Diepte-hulplijn: waar het dak van verdieping F de vloer van verdieping F+1
// snijdt, getekend op de canvaspositie van F+1 (verschoven via het verschil
// tussen de twee gekoppelde referentiepunten). Ontbreekt bij F of F+1 een
// geldige hoogte/referentiepunt, dan wordt dat paar stil overgeslagen — zelfde
// precedent als de Blender-export (zie exportBlender.js).
function collectFloorDepthGuideSegments(faces, mainLayer, floors, faceAttributes, gebouwdelen) {
  const segments = []
  const valid = (floors ?? []).filter(f => floorHasAnyHeight(f) && f.referencePoint)
  const mainId = mainGebouwdeelId(gebouwdelen)

  // Het gebouwdeel van de ruimte achter deze gevel bepaalt welke
  // verdiepingshoogte telt — een aanbouw met een lagere verdiepingsvloer
  // snijdt het dak op een andere hoogte dan het hoofdhuis. Zie
  // BLENDER_EXPORT_PLAN.md, blok "Gebouwdelen en constructies".
  function gebouwdeelOfWall(node) {
    const candidates = faces.filter(f => f.edgeIds.includes(node.id()))
    if (!candidates.length) return mainId
    const usage = candidates.filter(f => resolveFaceAard(f, faceAttributes) === 'gebruiksruimte')
    const face = usage.length === 1 ? usage[0] : candidates[0]
    return faceAttributes?.[faceHash(face)]?.gebouwdeelId ?? mainId
  }

  for (let i = 0; i < valid.length - 1; i++) {
    const floorF = valid[i]
    const floorNext = valid[i + 1]
    const posF = resolveReferencePointPos(floorF.referencePoint, mainLayer)
    const posNext = resolveReferencePointPos(floorNext.referencePoint, mainLayer)
    if (!posF || !posNext) continue

    const startNode = mainLayer.findOne(`#${floorF.referencePoint.wallId}`)
    if (!startNode) continue
    const dx = posNext.x - posF.x, dy = posNext.y - posF.y

    for (const node of walkHierarchy(startNode, mainLayer)) {
      if (!isWallNode(node)) continue
      const courses = node.attrs.roofCourses
      if (!Array.isArray(courses) || !courses.length) continue
      // Hoogte van het gebouwdeel achter deze gevel; valt terug op het
      // hoofdgebouwdeel als dat deel hier geen eigen hoogte heeft.
      const own = getFloorHeight(floorF, gebouwdeelOfWall(node), gebouwdelen).heightM
      const raw = own == null || own === '' ? getFloorHeight(floorF, mainId, gebouwdelen).heightM : own
      if (raw == null || raw === '') continue
      const targetHeightM = Number(raw)
      const run = computeRoofRunToHeight(node.attrs.roofBaseHeightM, courses, targetHeightM)
      if (run == null) continue
      const seg = computeWallGuideSegment(node, faces, run, faceAttributes)
      if (!seg) continue
      segments.push({
        x1: seg.x1 + dx, y1: seg.y1 + dy,
        x2: seg.x2 + dx, y2: seg.y2 + dy,
        nx: seg.nx, ny: seg.ny, // verschuiving raakt de richting niet, alleen de positie
        wallId: node.id(), floorId: floorF.id, kind: 'depth',
        key: `d:${node.id()}:${floorF.id}`,
      })
    }
  }
  return segments
}

// ─── Verbonden (gemiterde) 1,5m-lijnen per vlak ("1,5m-lijnen intekenen") ──
//
// Anders dan computeWallGuideSegment hierboven (gebruikt voor de diepte-
// hulplijn: per muur onafhankelijk de eigen twee eindpunten naar binnen
// schuiven — prima voor die losse toepassing, maar bij een hoek met twee
// verschillende hellingen laat dat een gat/overlap tussen de twee lijnen zien)
// berekent dit een aaneengesloten
// polylijn per gebruiksruimte-vlak: op elke hoek waar twee gootgevels
// samenkomen wordt het snijpunt van hun beide verschoven lijnen genomen (het
// principe van een straight skeleton, maar dan voor één vaste afstand i.p.v.
// een continu groeiende — dus zonder de topologie-events die een échte
// skeleton lastig maken, zie het gesprek 2026-09). Een hoek met maar één
// gootgevel-buur laat de lijn gewoon doorlopen tot de ANDERE (niet-verschoven)
// muur.
//
// Werkt op een dakregio (zie mergeFacesIntoRoofRegions): één of meer
// aaneengesloten gebruiksruimte-vlakken als één omtrek, zodat bv. een
// aanbouw die via een hulplijn/binnenmuur aan het hoofdgebouw grenst zijn
// 1,5m-lijn doorloopt tot die van het hoofdgebouw (met een kilkeper-diagonaal
// vanuit de binnenhoek) i.p.v. tegen de scheidingslijn af te kappen.
//
// Retourneert twee soorten segmenten:
// - `type: 'edge'` — het eigen verschoven stuk van één muur. Voor elk eindpunt
//   ofwel `null` (gemiterd met het buursegment/de hoek-diagonaal — die
//   eindpunten vallen exact samen, de aanroeper hoeft ze alleen aan elkaar te
//   lassen) of de wallId van de bestaande muur waar dat eindpunt tegenaan
//   gesneden is (dan is een T-splitsing nodig).
// - `type: 'corner'` — de diagonaal bij een gemiterde hoek, van het ECHTE
//   hoekpunt (moet aan de bestaande hiërarchie gelast worden, zie
//   `startWeldWallId`) naar het mitering-snijpunt (deelt dat punt met de twee
//   aangrenzende edge-segmenten). Dit is de "hip"-lijn — puur visueel/ter
//   referentie, geen eigen dakberekening. Ook gebruikt voor de korte
//   verbindingsstukken bij twee in elkaars verlengde liggende gevels (zie
//   hieronder).
function computeHeightGuideChainForRegion(region, mainLayer, targetHeightM) {
  const n = region.vertices.length
  const wallIds = region.orderedEdgeIds
  if (!wallIds || wallIds.length !== n || n < 3) return []

  const runs = wallIds.map(id => {
    const node = mainLayer.findOne(`#${id}`)
    if (!node) return null
    const courses = node.attrs.roofCourses
    if (!Array.isArray(courses) || !courses.length) return null
    return computeRoofRunToHeight(node.attrs.roofBaseHeightM, courses, targetHeightM)
  })
  if (!runs.some(r => r != null)) return []

  // Per rand met een geldige afstand: de verschoven (oneindige) lijn als
  // punt + genormaliseerde richting, plus de eenheidsnormaal (voor het label/
  // metadata, zie collectHeightGuideSegments-stijl).
  // Binnenkant uit de omloopzin i.p.v. een point-in-polygon-test: vlakken uit
  // computeFacesFromWalls hebben altijd een negatieve ondertekende oppervlakte
  // (zie roomGraph.js), en een samengevoegde regio erft die omloopzin per rand
  // — dus "binnen" ligt voor elke rand aan dezelfde kant, ook bij gaten.
  const edgeDirs = region.vertices.map((a, i) => {
    const b = region.vertices[(i + 1) % n]
    const dx = b.x - a.x, dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    return len < 1e-6 ? null : { dx: dx / len, dy: dy / len }
  })
  const offsetLines = wallIds.map((wallId, i) => {
    const run = runs[i]
    const dir = edgeDirs[i]
    if (run == null || !dir) return null
    const a = region.vertices[i]
    const nx = dir.dy, ny = -dir.dx
    const offPx = run * GRID_SIZE
    return { px: a.x + nx * offPx, py: a.y + ny * offPx, dx: dir.dx, dy: dir.dy, nx, ny, offPx }
  })
  // Twee randen in elkaars verlengde (bv. een gevel die door een T-splitsing
  // van een binnenmuur in twee stukken is geknipt) — daar bestaat geen
  // snijpunt, dus projecteren i.p.v. snijden.
  function parallel(i, j) {
    const a = edgeDirs[i], b = edgeDirs[j]
    return !!a && !!b && Math.abs(a.dx * b.dy - a.dy * b.dx) < 1e-6
  }
  function offsetPoint(vertex, line) {
    return { x: vertex.x + line.nx * line.offPx, y: vertex.y + line.ny * line.offPx }
  }

  function intersectLines(l1, l2) {
    const denom = l1.dx * l2.dy - l1.dy * l2.dx
    if (Math.abs(denom) < 1e-9) return null // (bijna) evenwijdig
    const t = ((l2.px - l1.px) * l2.dy - (l2.py - l1.py) * l2.dx) / denom
    return { x: l1.px + l1.dx * t, y: l1.py + l1.dy * t }
  }
  function lineFromSegment(p0, p1) {
    return { px: p0.x, py: p0.y, dx: p1.x - p0.x, dy: p1.y - p0.y }
  }
  // Sanity-grens voor een mitering: een snijpunt dat te ver van de
  // oorspronkelijke hoek af komt te liggen (scherpe/concave hoek — het
  // klassieke "miter"-probleem bij lijndikte-outlines) is onbruikbaar. Ruim
  // bemeten (10× de eigen afstand, met een bodem van 2 grid-eenheden) zodat
  // gewone hoeken nooit onterecht worden afgekeurd.
  function miterSane(point, vertex, runM) {
    const limit = Math.max(runM * GRID_SIZE * 10, GRID_SIZE * 2)
    return Math.hypot(point.x - vertex.x, point.y - vertex.y) < limit
  }

  const startPoint = new Array(n).fill(null)
  const endPoint = new Array(n).fill(null)
  const startWeldWallId = new Array(n).fill(null)
  const endWeldWallId = new Array(n).fill(null)
  const cornerSegments = []

  for (let i = 0; i < n; i++) {
    if (!offsetLines[i]) continue
    const prev = (i - 1 + n) % n
    const vertex = region.vertices[i]

    if (parallel(prev, i)) {
      const pB = offsetPoint(vertex, offsetLines[i])
      startPoint[i] = pB
      if (offsetLines[prev]) {
        // Beide gevels hebben een eigen afstand: elk loodrecht op het
        // gedeelde punt; verschillen de afstanden, dan een verbindingsstukje.
        const pA = offsetPoint(vertex, offsetLines[prev])
        endPoint[prev] = pA
        if (Math.hypot(pA.x - pB.x, pA.y - pB.y) > 0.5) {
          cornerSegments.push({
            type: 'corner', wallId: wallIds[i],
            x1: pA.x, y1: pA.y, x2: pB.x, y2: pB.y,
            startWeldWallId: null, endWeldWallId: null,
          })
        } else {
          startPoint[i] = pA
        }
      } else {
        // Vorige gevel (zelfde lijn) heeft geen dak: lijn loodrecht terug
        // naar het echte hoekpunt.
        cornerSegments.push({
          type: 'corner', wallId: wallIds[i],
          x1: vertex.x, y1: vertex.y, x2: pB.x, y2: pB.y,
          startWeldWallId: wallIds[prev], endWeldWallId: null,
        })
      }
      continue
    }

    let miterPoint = null
    if (offsetLines[prev]) {
      const p = intersectLines(offsetLines[prev], offsetLines[i])
      if (p && miterSane(p, vertex, runs[prev]) && miterSane(p, vertex, runs[i])) miterPoint = p
    }

    if (miterPoint) {
      startPoint[i] = miterPoint
      endPoint[prev] = miterPoint
      // Hoek-diagonaal ("hip"): van het echte hoekpunt naar het mitering-punt.
      // startWeldWallId gezet (niet null) zodat de aanroeper dit eindpunt als
      // "tegen de bestaande hiërarchie lassen" behandelt i.p.v. als mitering —
      // welke van de twee muur-ids maakt niet uit, de weld gebeurt op positie.
      cornerSegments.push({
        type: 'corner',
        x1: vertex.x, y1: vertex.y,
        x2: miterPoint.x, y2: miterPoint.y,
        startWeldWallId: wallIds[prev],
        endWeldWallId: null, // deelt het punt met de twee edge-segmenten hierboven
      })
    } else {
      // Rand i begint waar 'ie de ORIGINELE vorige muur snijdt (geen buur met
      // een eigen afstand, of de mitering was onzinnig).
      const hit = intersectLines(offsetLines[i], lineFromSegment(region.vertices[prev], vertex))
      if (hit) { startPoint[i] = hit; startWeldWallId[i] = wallIds[prev] }
    }
  }
  // Tweede pas: elk eindpunt dat nog geen mitering met de vólgende rand kreeg
  // (eerste pas zet alleen endPoint[prev] bij een geslaagde mitering) afkappen
  // tegen de ORIGINELE volgende muur.
  for (let i = 0; i < n; i++) {
    if (!offsetLines[i] || endPoint[i]) continue
    const next = (i + 1) % n
    const nextVertex = region.vertices[next]
    if (parallel(i, next)) {
      // Volgende gevel in het verlengde zonder dak (die mét dak is al in de
      // eerste pas afgehandeld): loodrecht terug naar het hoekpunt.
      const p = offsetPoint(nextVertex, offsetLines[i])
      endPoint[i] = p
      cornerSegments.push({
        type: 'corner', wallId: wallIds[i],
        x1: nextVertex.x, y1: nextVertex.y, x2: p.x, y2: p.y,
        startWeldWallId: wallIds[next], endWeldWallId: null,
      })
      continue
    }
    const hit = intersectLines(offsetLines[i], lineFromSegment(nextVertex, region.vertices[(next + 1) % n]))
    if (hit) { endPoint[i] = hit; endWeldWallId[i] = wallIds[next] }
  }

  const segments = []
  for (let i = 0; i < n; i++) {
    if (!offsetLines[i] || !startPoint[i] || !endPoint[i]) continue
    segments.push({
      type: 'edge',
      wallId: wallIds[i],
      x1: startPoint[i].x, y1: startPoint[i].y,
      x2: endPoint[i].x, y2: endPoint[i].y,
      nx: offsetLines[i].nx, ny: offsetLines[i].ny,
      startWeldWallId: startWeldWallId[i], // null = mitering (lassen met buursegment/hoek-diagonaal)
      endWeldWallId: endWeldWallId[i],
    })
  }
  return [...segments, ...cornerSegments]
}

// Gedeeld door de hiërarchie-scoped versie (insert-knop) en de mainLayer-brede
// versie (live overlay + snap-cascade, zie hieronder) — zelfde berekening,
// alleen een ander bereik aan vlakken. Elk segment krijgt een stabiele `key`
// (voor de overlay-diff-cache) en `kind` — 'height' voor het eigen verschoven
// muurstuk, 'height-corner' voor de hoek-diagonaal (geen eigen label/dakdata,
// puur de "hip"-richting).
function hasRoofCourses(node) {
  const courses = node?.attrs.roofCourses
  return Array.isArray(courses) && courses.length > 0
}

// Voegt aangrenzende vlakken samen tot dakregio's: twee vlakken die een muur
// ZONDER eigen dak delen (hulplijn, binnenmuur) liggen onder hetzelfde dak, dus
// die muur is voor de 1,5m-lijn geen rand. Een gedeelde muur mét roofCourses
// blijft wél een rand (bv. een kamer met een eigen kapje, zie
// findInteriorNormal). Retourneert [{ vertices, orderedEdgeIds }] — zelfde vorm
// als een vlak, zodat computeHeightGuideChainForRegion er direct op werkt.
function mergeFacesIntoRoofRegions(faces, mainLayer) {
  const facesByWall = new Map() // wallId -> [faceIdx]
  faces.forEach((face, fi) => {
    for (const wallId of new Set(face.orderedEdgeIds)) {
      if (!facesByWall.has(wallId)) facesByWall.set(wallId, [])
      facesByWall.get(wallId).push(fi)
    }
  })

  const parent = faces.map((_, i) => i)
  function find(i) {
    while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i] }
    return i
  }
  const internalWalls = new Set()
  for (const [wallId, fis] of facesByWall) {
    if (fis.length !== 2) continue
    if (hasRoofCourses(mainLayer.findOne(`#${wallId}`))) continue
    internalWalls.add(wallId)
    parent[find(fis[0])] = find(fis[1])
  }

  const groups = new Map() // root -> [faceIdx]
  faces.forEach((_, fi) => {
    const root = find(fi)
    if (!groups.has(root)) groups.set(root, [])
    groups.get(root).push(fi)
  })

  const regions = []
  for (const group of groups.values()) {
    if (group.length === 1) {
      const face = faces[group[0]]
      regions.push({ vertices: face.vertices, orderedEdgeIds: face.orderedEdgeIds })
      continue
    }
    // Randen van alle vlakken in de groep, minus de interne muren. Alle
    // vlakken hebben dezelfde omloopzin, dus de overgebleven randen sluiten
    // kop-aan-staart aan tot de omtrek (en eventuele gaten).
    const edges = []
    const edgesByStart = new Map() // "x,y" -> [edge]
    for (const fi of group) {
      const { vertices, orderedEdgeIds } = faces[fi]
      for (let i = 0; i < vertices.length; i++) {
        if (internalWalls.has(orderedEdgeIds[i])) continue
        const from = vertices[i], to = vertices[(i + 1) % vertices.length]
        const edge = { from, to, wallId: orderedEdgeIds[i], used: false }
        edges.push(edge)
        const key = `${from.x},${from.y}`
        if (!edgesByStart.has(key)) edgesByStart.set(key, [])
        edgesByStart.get(key).push(edge)
      }
    }
    for (const start of edges) {
      if (start.used) continue
      const loop = []
      let cur = start
      while (cur && !cur.used) {
        cur.used = true
        loop.push(cur)
        cur = (edgesByStart.get(`${cur.to.x},${cur.to.y}`) ?? []).find(e => !e.used)
      }
      if (loop.length >= 3) {
        regions.push({ vertices: loop.map(e => e.from), orderedEdgeIds: loop.map(e => e.wallId) })
      }
    }
  }
  return regions
}

function collectHeightGuideChainsForFaces(faces, mainLayer, faceAttributes) {
  const usageFaces = faces.filter(f => resolveFaceAard(f, faceAttributes) === 'gebruiksruimte')
  const segments = []
  for (const region of mergeFacesIntoRoofRegions(usageFaces, mainLayer)) {
    for (const seg of computeHeightGuideChainForRegion(region, mainLayer, LOW_HEADROOM_HEIGHT_M)) {
      if (seg.type === 'corner') {
        segments.push({ ...seg, kind: 'height-corner', key: `hc:${Math.round(seg.x1)},${Math.round(seg.y1)}` })
      } else {
        segments.push({ ...seg, kind: 'height', key: `h:${seg.wallId}` })
      }
    }
  }
  return segments
}

// Alle 1,5m-lijnen (gemiterd, zie hierboven) voor de hiërarchie van
// startNode, over al zijn gebruiksruimte-vlakken heen. Gebruikt door
// CanvasView.jsx's "1,5m-lijnen intekenen"-knop (object-toolbar, per
// geselecteerde muur/hiërarchie — bewust NIET de hele notitie, zodat een
// verdieping die al met de hand is uitgewerkt met rust blijft).
export function collectHeightGuideChainsForHierarchy(mainLayer, startNode, faceAttributes) {
  const faces = facesFromNodes(walkHierarchy(startNode, mainLayer))
  return collectHeightGuideChainsForFaces(faces, mainLayer, faceAttributes)
}

// Eén bron voor zowel het overlay-component (RoofGuideOverlay.jsx) als de
// snap-cascade (CanvasView.jsx::computeWallEndpoint, LineGizmo.jsx::applyMove)
// — geen dubbele geometrie-logica. `floors` = note.settings.floors,
// `faceAttributes` = note.settings.faceAttributes (voor de aard-gebaseerde
// kant-bepaling bij een muur die aan twee vlakken grenst, zie findInteriorNormal).
export function collectTechnicalGuideSegments(mainLayer, floors, faceAttributes, gebouwdelen) {
  const faces = facesFromNodes(mainLayer.getChildren())
  return [
    ...collectHeightGuideChainsForFaces(faces, mainLayer, faceAttributes),
    ...collectFloorDepthGuideSegments(faces, mainLayer, floors ?? [], faceAttributes, gebouwdelen ?? []),
  ]
}
