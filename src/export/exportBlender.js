// Export t.b.v. de Blender-plugin (zie BLENDER_EXPORT_PLAN.md in de repo-root
// voor het volledige schema-ontwerp en de bredere context). format 2, additief
// uitbreidbaar zoals .jnote — nieuwe velden komen er later bij, bestaande
// velden veranderen niet.
//   format 1 → 2: per verdieping een `envelope` (buitenomtrek-polygoon +
//   geordende wallIds) + `top` (bovenste verdieping-vlag, zie hieronder); per
//   muur `roofBaseHeightM` + `roofCourses` (dak boven de gevel, zie exportRoof
//   en BLENDER_EXPORT_PLAN.md).
//   Binnen format 2 (geen veld verandert van type, alleen minder/samengevatte
//   data): walls[] bevat geen binnenmuren meer — alleen omtrekmuren, de
//   referentiepunt-muur en binnenmuren die twee klimatiseringszones scheiden
//   (selectExportedWallIds). Collineaire omtrekranden met dezelfde boundary +
//   hetzelfde dak zijn samengevoegd tot één rand (mergeCollinearEnvelopeEdges),
//   zodat een door T-splitsingen geknipte gevel één lengte heeft. Zie
//   BLENDER_EXPORT_PLAN.md, blok "Binnenmuren". Later additief bijgekomen,
//   nog steeds format 2: per rooms[]-vlak `color` en `platDak` (plat dak is
//   een eigenschap van het vlak, los van `aard` — zie de rooms-map in
//   buildBlenderExport hieronder).
//
// Elke verdieping in note.settings.floors zonder heightM of zonder
// referencePoint wordt overgeslagen — die twee zijn de randvoorwaarde om een
// verdieping zinvol te kunnen exporteren (hoogte voor de Z-extrusie,
// referentiepunt om walkHierarchy() de juiste muur-subset te laten opleveren).
//
// XY-uitlijning tussen verdiepingen: verdiepingen worden vaak op onderling
// willekeurige plekken op hetzelfde canvas getekend, dus de absolute
// canvas-positie is niet relevant — alleen de positie van elke muur/vlak
// TEN OPZICHTE VAN het eigen referentiepunt telt. Daarom worden walls[]/
// rooms[] hieronder al hier vertaald (zie originPx bij exportWall) zodat elke
// verdieping in de export al in zijn eigen lokale coördinatenstelsel staat
// (referentiepunt = 0,0) — de Blender-kant hoeft dan alleen nog de
// Z-offset per verdieping toe te passen, geen XY-rekenwerk meer.
//
// "Geen zone"-representatie (open punt uit BLENDER_EXPORT_PLAN.md): elk
// gedetecteerd vlak komt altijd in rooms[] terecht, ook zonder installatie —
// heatingInstallationId/coolingInstallationId zijn dan null, en `aard` draagt
// het semantische onderscheid (niet berekend / <1,5m / gebruiksruimte). Dat
// is informatiever dan zulke vlakken weglaten, en laat de Blender-kant zelf
// beslissen wat "geen zone" in elk geval betekent.
//
// `platDak` (los van `aard`, zie BLENDER_EXPORT_PLAN.md blok "Vlak-
// eigenschap"): een schuin dak is een eigenschap van muren (roofCourses),
// een plat dak een eigenschap van een VLAK — en een vlak met een plat dak
// erboven is heel normaal gewoon nog een verwarmde gebruiksruimte. Vandaar
// een eigen boolean i.p.v. een aard-waarde "plat dak" (die kon dat
// onderscheid niet maken).
import { GRID_SIZE } from '../components/Canvas/useGrid.js'
import { walkHierarchy, getConns, resolveWallBoundary } from '../components/Canvas/wallGraph.js'
import { facesFromNodes, faceHash, resolveRoomAssignment, envelopeFromNodes } from '../components/Canvas/roomGraph.js'
import { colorForZone } from '../components/Canvas/zoneColors.js'
import { DEFAULT_NORTH_ANGLE, DEFAULT_FRONT_FACADE_SCREEN_ANGLE } from '../components/Building/buildingDefaults.js'

const norm360 = (a) => ((a % 360) + 360) % 360

// Alle geëxporteerde coördinaten worden op 1 mm afgerond. Hygiëne tegen
// float-ruis (node.x() + pts[i], sin/cos bij schuine muren, maatinvoer als
// 3.5999999999999996): gedeelde hoekpunten tussen walls[], envelope en rooms[]
// komen zo in de praktijk exact overeen — roomGraph.js pakt per verbonden
// hoekpunt de positie van het eerste lid, buurmuren kunnen daar net naast
// zitten. 1 mm = 0,025 px, ver onder tekenprecisie. Alleen de export; alle
// tussenrekenwerk (collineair-merge, faceHash) gebeurt nog exact in px.
// Hoogtes/daklagen zijn gebruikersinvoer en worden níet afgerond.
function toM(px) {
  return Math.round((px / GRID_SIZE) * 1000) / 1000
}

// originPx = de resolved positie (in px, canvas-space) van het referentiepunt
// van déze verdieping — wordt afgetrokken zodat elke verdieping in de export
// in zijn EIGEN lokale coördinatenstelsel staat (referentiepunt = 0,0).
// Verdiepingen worden immers vaak op willekeurige, onderling verschillende
// plekken op hetzelfde canvas getekend (zie BLENDER_EXPORT_PLAN.md) — zonder
// deze aftrek zou de absolute canvas-positie waar iemand toevallig getekend
// heeft blijven meetellen, en zouden verdiepingen bij het stapelen in Blender
// niet op elkaar aansluiten.
// Dak boven een gevel (zie BLENDER_EXPORT_PLAN.md, "Dak per muur"):
//  - roofBaseHeightM = goothoogte boven het vloerpeil van díe verdieping
//    (jouw "starthoogte"; 0 = dak begint op de vloer). Alleen betekenisvol als
//    er minstens één course is.
//  - roofCourses = geordende daklagen van onder naar boven, elk
//    { angleDeg, riseM }. riseM = verticale winst van die laag; null (alleen
//    de laatste) = "open", loopt door tot de nok. Lege lijst = deze muur is
//    géén gootlijn (topgevel / aansluiting tegen bovenliggende verdieping,
//    gewicht 0 in het straight skeleton).
// Nokhoogte is altijd een uitkomst van het skeleton, nooit invoer.
function exportRoof(node) {
  const raw = Array.isArray(node.attrs.roofCourses) ? node.attrs.roofCourses : []
  const courses = raw.map(c => ({
    angleDeg: Number(c?.angleDeg) || 0,
    riseM: c?.riseM == null || c?.riseM === '' ? null : Number(c.riseM),
  }))
  return {
    roofBaseHeightM: node.attrs.roofBaseHeightM == null || node.attrs.roofBaseHeightM === ''
      ? 0 : Number(node.attrs.roofBaseHeightM),
    roofCourses: courses,
  }
}

function exportWall(node, originPx) {
  const pts = node.points()
  return {
    id: node.id(),
    x1: toM(node.x() + pts[0] - originPx.x), y1: toM(node.y() + pts[1] - originPx.y),
    x2: toM(node.x() + pts[2] - originPx.x), y2: toM(node.y() + pts[3] - originPx.y),
    conns: { ep0: getConns(node, 0), ep1: getConns(node, 1) },
    boundary: resolveWallBoundary(node),
    isAux: !!node.attrs.isAux,
    ...exportRoof(node),
  }
}

// 1° — tolerantie voor "collineaire" omtrekranden bij het samenvoegen. Bewust
// veel strakker dan de 8° van wallGraph.js: een bewust getekende knik in de
// gevel mag niet wegvallen, alleen echt rechte segmenten (T-splitsing van één
// muur) worden samengevoegd.
const COLLINEAR_EPS_RAD = Math.PI / 180

// Bepaalt welke muur-ids in floors[].walls[] terechtkomen. Binnenmuren zijn
// voor de Blender-kant (die alleen de schil van de woning modelleert)
// irrelevant en worden weggelaten — TENZIJ ze twee vlakken met een
// verschillende klimatiseringszone scheiden, want daar snijdt de zone-uitsnede
// in Blender langs. "Geen zone" (vlak zonder installatie) telt daarbij mee als
// een eigen zone-sleutel. Omtrekmuren en de referentiepunt-muur blijven altijd.
// Zie BLENDER_EXPORT_PLAN.md, blok "Binnenmuren".
//
// Puur: faces = facesFromNodes(...), envelope = envelopeFromNodes(...) (mag
// null zijn), allWallIds = alle ids in de hiërarchie (fallback bij geen omtrek).
export function selectExportedWallIds({
  faces, envelope, referenceWallId, roomAssignments, installations, defaultHeatingId, allWallIds,
}) {
  // Geen gesloten omtrek (plattegrond nog in bewerking): niets stilzwijgend
  // weggooien, exporteer dan gewoon alles.
  if (!envelope) return new Set(allWallIds ?? [])

  const keep = new Set(envelope.wallIds)
  if (referenceWallId) keep.add(referenceWallId)

  // Zone-sleutel per vlak — zelfde (heating|cooling)-combinatie als deriveZones().
  const zoneKeyByFace = new Map()
  for (const face of faces) {
    const hash = faceHash(face)
    const { heatingInstallationId, coolingInstallationId } =
      resolveRoomAssignment(hash, roomAssignments, installations, defaultHeatingId)
    zoneKeyByFace.set(hash, `${heatingInstallationId ?? ''}|${coolingInstallationId ?? ''}`)
  }

  // Per muur de verzameling zone-sleutels van de aangrenzende vlakken. Een
  // echte binnenmuur staat in de edgeIds van precies 2 vlakken; een spur in 1.
  const zoneKeysByWall = new Map()
  for (const face of faces) {
    const zk = zoneKeyByFace.get(faceHash(face))
    for (const wid of face.edgeIds) {
      let set = zoneKeysByWall.get(wid)
      if (!set) { set = new Set(); zoneKeysByWall.set(wid, set) }
      set.add(zk)
    }
  }
  for (const [wid, zoneKeys] of zoneKeysByWall) {
    if (zoneKeys.size >= 2) keep.add(wid)
  }
  return keep
}

// Voegt opeenvolgende collineaire omtrekranden met dezelfde begrenzing en
// hetzelfde dak samen tot één rand, zodat een gevel die door T-splitsingen in
// segmenten is geknipt in de export één lengte heeft (de auditor hoeft geen
// deelmaten meer op te tellen). In-/uitvoer volgen het bestaande contract:
// wallIds[i] hoort bij de rand polygon[i] -> polygon[(i+1) % n]. De behouden
// wallId is een representant van de run — alle leden delen boundary/roofCourses,
// dus elke id volstaat om die op te zoeken in walls[].
// envelope = { polygon: [{x,y}], wallIds: [id] } (px, vóór de origin-aftrek);
// attrsById = Map<wallId, { boundary, roofKey }>. Zie BLENDER_EXPORT_PLAN.md.
export function mergeCollinearEnvelopeEdges(envelope, attrsById) {
  if (!envelope) return envelope
  const src = envelope.polygon
  const ids = envelope.wallIds
  const n = src.length
  if (n < 3 || ids.length !== n) return envelope

  const sameLine = (a, b, c) => {
    const ux = b.x - a.x, uy = b.y - a.y
    const vx = c.x - b.x, vy = c.y - b.y
    const lu = Math.hypot(ux, uy), lv = Math.hypot(vx, vy)
    if (lu < 1e-9 || lv < 1e-9) return true // degeneraat punt: laten samensmelten
    const cross = (ux * vy - uy * vx) / (lu * lv)
    const dot = (ux * vx + uy * vy) / (lu * lv)
    return dot > 0 && Math.abs(cross) < Math.sin(COLLINEAR_EPS_RAD)
  }
  const mergeable = (idA, idB) => {
    const a = attrsById.get(idA), b = attrsById.get(idB)
    return !!a && !!b && a.boundary === b.boundary && a.roofKey === b.roofKey
  }

  // Vertex (i+1) verdwijnt als rand i en rand (i+1) op één lijn liggen én hun
  // muren dezelfde boundary + dak hebben. De representant van de samengevoegde
  // rand blijft de eerste (in traversal-volgorde) — zie de push-lus hieronder.
  const dropVertex = new Array(n).fill(false)
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const k = (i + 2) % n
    if (sameLine(src[i], src[j], src[k]) && mergeable(ids[i], ids[j])) dropVertex[j] = true
  }
  if (dropVertex.every(Boolean)) return envelope // alles collineair: laat met rust

  const polygon = []
  const wallIds = []
  for (let i = 0; i < n; i++) {
    if (dropVertex[i]) continue
    polygon.push(src[i])
    wallIds.push(ids[i]) // id van de rand die hier begint; opgeslokte randen erven deze
  }
  if (polygon.length < 3) return envelope // zou geen geldige omtrek meer zijn
  return { ...envelope, polygon, wallIds }
}

// Puur data in, data uit (net als roomGraph.js) — geen browser-/DOM-
// afhankelijkheden, zodat dit ook los te testen/her te gebruiken is.
export function buildBlenderExport(note, mainLayer) {
  const floors = note.settings?.floors ?? []
  const installations = note.settings?.installations ?? []
  const defaultHeatingId = note.settings?.defaultHeatingInstallationId
  const roomAssignments = note.settings?.roomAssignments ?? {}
  const faceAttributes = note.settings?.faceAttributes ?? {}

  const exportedFloors = []
  for (const floor of floors) {
    if (floor.heightM == null || floor.heightM === '' || !floor.referencePoint) continue
    const startNode = mainLayer.findOne(`#${floor.referencePoint.wallId}`)
    if (!startNode) continue // gekoppelde muur bestaat niet meer (verwijderd) — verdieping overslaan

    const startPts = startNode.points()
    const ep = floor.referencePoint.ep
    const originPx = { x: startNode.x() + startPts[ep * 2], y: startNode.y() + startPts[ep * 2 + 1] }

    const wallNodes = walkHierarchy(startNode, mainLayer)

    // Buitenomtrek + vlakken op de VOLLEDIGE muurhiërarchie — binnenmuren doen
    // gewoon mee voor de vlak-detectie (rooms[]). Pas daarna filteren we walls[].
    // envelope: de gesloten lijn waarop de Blender-kant het dak-skeleton draait
    // en waarmee verdiepingen onderling worden afgetrokken (envelope(F) −
    // envelope(F+1), zie BLENDER_EXPORT_PLAN.md). wallIds[i] hoort bij de rand
    // polygon[i] → polygon[(i+1) % n], zodat elke rand zijn begrenzing/dak kan
    // opzoeken in walls[].
    const env = envelopeFromNodes(wallNodes)
    const faces = facesFromNodes(wallNodes)

    // Welke muren komen in walls[]? Omtrekmuren + referentiepunt-muur +
    // binnenmuren die twee klimatiseringszones scheiden. Zie
    // BLENDER_EXPORT_PLAN.md, blok "Binnenmuren".
    const keepIds = selectExportedWallIds({
      faces,
      envelope: env,
      referenceWallId: floor.referencePoint.wallId,
      roomAssignments,
      installations,
      defaultHeatingId,
      allWallIds: wallNodes.map(n => n.id()),
    })
    const walls = wallNodes.filter(n => keepIds.has(n.id())).map(n => exportWall(n, originPx))
    // conns die naar niet-geëxporteerde binnenmuren wijzen weglaten, zodat
    // walls[].conns referentieel consistent blijft met walls[].
    for (const w of walls) {
      w.conns.ep0 = w.conns.ep0.filter(c => keepIds.has(c.id))
      w.conns.ep1 = w.conns.ep1.filter(c => keepIds.has(c.id))
    }

    // Collineaire omtrekranden met dezelfde boundary + hetzelfde dak samenvoegen,
    // zodat een gevel die via T-splitsingen in segmenten is geknipt één rand met
    // één lengte wordt. attrsById uit de volledige wallNodes (alle omtrekmuren
    // zitten daarin), vóór de px→m/origin-aftrek.
    const envAttrsById = new Map()
    if (env) {
      const need = new Set(env.wallIds)
      for (const node of wallNodes) {
        if (!need.has(node.id())) continue
        envAttrsById.set(node.id(), {
          boundary: resolveWallBoundary(node),
          roofKey: JSON.stringify(exportRoof(node)),
        })
      }
    }
    const mergedEnv = mergeCollinearEnvelopeEdges(env, envAttrsById)
    const envelope = mergedEnv
      ? {
          polygon: mergedEnv.polygon.map(v => [toM(v.x - originPx.x), toM(v.y - originPx.y)]),
          wallIds: mergedEnv.wallIds,
        }
      : null

    const rooms = faces.map(face => {
      const hash = faceHash(face)
      const { heatingInstallationId, coolingInstallationId } =
        resolveRoomAssignment(hash, roomAssignments, installations, defaultHeatingId)
      // color = dezelfde kleur als het vlak in de tekentool krijgt
      // (ZoneFillOverlay.jsx, via colorForZone in zoneColors.js) — null voor
      // een onbepaald vlak, want dat wordt in de tekentool ook niet gekleurd
      // (zie deriveZones()).
      const color = heatingInstallationId || coolingInstallationId
        ? colorForZone({ heatingInstallationId, coolingInstallationId }, installations)
        : null
      return {
        id: hash,
        polygon: face.vertices.map(v => [toM(v.x - originPx.x), toM(v.y - originPx.y)]),
        heatingInstallationId,
        coolingInstallationId,
        color,
        aard: faceAttributes[hash]?.aard ?? 'gebruiksruimte',
        platDak: !!faceAttributes[hash]?.platDak,
      }
    })

    exportedFloors.push({
      id: floor.id,
      title: floor.name,
      heightM: floor.heightM,
      // top wordt na de lus op de laatste (hoogste) geëxporteerde verdieping
      // gezet. De Blender-kant gebruikt heightM van de bovenste verdieping
      // alléén als de omtrek geen roofCourses heeft (plat dak → afkaphoogte);
      // mét roofCourses is de nok een skeleton-uitkomst en is heightM daar
      // slechts de op locatie gemeten controlewaarde. Zie BLENDER_EXPORT_PLAN.md.
      top: false,
      // Geen x/y hier — walls/rooms hierboven zijn al t.o.v. dit punt vertaald
      // (originPx), dus het referentiepunt ligt per definitie op (0, 0).
      // wallId/ep blijven staan als herleidbare referentie (welke hoek was
      // het), niet om nog een keer te vertalen.
      referencePoint: { wallId: floor.referencePoint.wallId, ep: floor.referencePoint.ep },
      envelope,
      walls,
      rooms,
    })
  }

  // De laatste geëxporteerde verdieping is de bovenste (floors staan in
  // sidebar-volgorde kelder→boven, lege rijen zijn al overgeslagen).
  if (exportedFloors.length) exportedFloors[exportedFloors.length - 1].top = true

  // northAngle = kompasrichting van "onderkant canvas". frontFacadeScreenAngle =
  // schermrichting waarin de voorgevel getekend is (0=boven, 90=rechts,
  // 180=onder, 270=links; 180 = de gangbare situatie). frontFacadeBearing is
  // daaruit afgeleid (northAngle + offset t.o.v. onder) zodat de Blender-kant
  // niet zelf hoeft te rekenen — de relatieve gevelnamen (voor/achter/links/
  // rechts) volgen uit frontFacadeScreenAngle, de kompasnamen uit northAngle.
  const northAngle = note.settings?.northAngle ?? DEFAULT_NORTH_ANGLE
  const frontFacadeScreenAngle = note.settings?.frontFacadeScreenAngle ?? DEFAULT_FRONT_FACADE_SCREEN_ANGLE

  return {
    format: 2,
    unit: 'm',
    project: {
      title: note.title,
      northAngle,
      frontFacadeScreenAngle,
      frontFacadeBearing: norm360(northAngle + frontFacadeScreenAngle - 180),
    },
    floors: exportedFloors,
  }
}

export function exportBlender(note, mainLayer) {
  const data = buildBlenderExport(note, mainLayer)
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}_blender.json`
  a.click()
  URL.revokeObjectURL(url)
}
