// Export t.b.v. de Blender-plugin (zie BLENDER_EXPORT_PLAN.md in de repo-root
// voor het volledige schema-ontwerp en de bredere context). format 3.
//   format 1 → 2: per verdieping een `envelope` (buitenomtrek-polygoon +
//   geordende wallIds) + `top` (bovenste verdieping-vlag); per muur
//   `roofBaseHeightM` + `roofCourses` (dak boven de gevel, zie exportRoof).
//   Binnen format 2: walls[] bevat geen binnenmuren meer — alleen omtrekmuren,
//   de referentiepunt-muur en binnenmuren die twee klimatiseringszones
//   scheiden (selectExportedWallIds). Collineaire omtrekranden met dezelfde
//   boundary + hetzelfde dak zijn samengevoegd tot één rand
//   (mergeCollinearEnvelopeEdges). Per rooms[]-vlak `color` en `platDak`.
//
//   format 2 → 3 (gebouwdelen en constructies, zie dat blok in
//   BLENDER_EXPORT_PLAN.md): de eenheid van hoogte/stapeling/dak is niet langer
//   de VERDIEPING maar de REGIO = (verdieping, gebouwdeel). Een aanbouw met een
//   lagere verdiepingsvloer of een lager plat dak is een eigen gebouwdeel met
//   eigen hoogtes, getekend in dezelfde plattegrond.
//     - `floors[].heightM`, `.top` en `.envelope` zijn VERVALLEN; die drie
//       zitten nu per gebouwdeel in `floors[].regions[]`, met `zBottomM`/
//       `zTopM` al uitgerekend (zelfde filosofie als de XY-uitlijning: de
//       Blender-kant hoeft niet meer zelf te stapelen).
//     - `rooms[].gebouwdeelId` + `zBottomM`/`zTopM`; `walls[].constructieId`.
//     - `project.gebouwdelen` / `project.constructies`.
//     - selectExportedWallIds splitst nu op (zone | gebouwdeel), zodat een
//       gebouwdeelgrens altijd in walls[] belandt — Blender heeft 'm nodig voor
//       het gevelstuk tussen twee ongelijke regio-hoogtes.
//   Er wordt bewust GEEN format 2 meer uitgestuurd, ook niet voor een woning
//   met één gebouwdeel (dan simpelweg één regio per verdieping): één codepad.
//   Afgesproken met de Blender-kant omdat de addon nog niet in productie is.
//
// Een verdieping zonder hoogte (op geen enkel gebouwdeel) of zonder
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
import { facesFromNodes, faceHash, resolveRoomAssignment, envelopeForFaces } from '../components/Canvas/roomGraph.js'
import { colorForZone } from '../components/Canvas/zoneColors.js'
import {
  DEFAULT_NORTH_ANGLE, DEFAULT_FRONT_FACADE_SCREEN_ANGLE,
  mainGebouwdeelId, floorHasAnyHeight, computeRegionZ, getFloorHeight,
  GROUND_FLOOR_INDEX, isEmptyHeight,
} from '../components/Building/buildingDefaults.js'

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
    // Afwijkende opbouw/isolatie van deze muur; splitst alleen de
    // m²-berekening, geen geometrie. Zie "Gebouwdelen en constructies".
    constructieId: node.attrs.constructieId ?? null,
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
// verschillende SPLITSINGSSLEUTEL scheiden, want daar snijdt Blender langs.
// Die sleutel is (klimatiseringszone | gebouwdeel): "geen zone" (vlak zonder
// installatie) telt mee als een eigen zone-waarde, en een gebouwdeelgrens komt
// er altijd in — ook bij gelijke zone, want Blender heeft die muur nodig voor
// het gevelstuk tussen twee ongelijke regio-hoogtes (hoofdhuis 2.73 naast
// aanbouw 2.48). Omtrekmuren en de referentiepunt-muur blijven altijd.
// Zie BLENDER_EXPORT_PLAN.md, blokken "Binnenmuren" en "Gebouwdelen en
// constructies".
//
// Puur: faces = facesFromNodes(...), envelope = de verdiepings-omtrek (mag
// null zijn), allWallIds = alle ids in de hiërarchie (fallback bij geen omtrek).
export function selectExportedWallIds({
  faces, envelope, referenceWallId, roomAssignments, installations, defaultHeatingId, allWallIds,
  faceAttributes = {}, mainId = null,
}) {
  // Geen gesloten omtrek (plattegrond nog in bewerking): niets stilzwijgend
  // weggooien, exporteer dan gewoon alles.
  if (!envelope) return new Set(allWallIds ?? [])

  const keep = new Set(envelope.wallIds)
  if (referenceWallId) keep.add(referenceWallId)

  // Splitsingssleutel per vlak — de (heating|cooling)-combinatie van
  // deriveZones(), plus het gebouwdeel.
  const zoneKeyByFace = new Map()
  for (const face of faces) {
    const hash = faceHash(face)
    const { heatingInstallationId, coolingInstallationId } =
      resolveRoomAssignment(hash, roomAssignments, installations, defaultHeatingId)
    const gebouwdeelId = faceAttributes[hash]?.gebouwdeelId ?? mainId
    zoneKeyByFace.set(hash, `${heatingInstallationId ?? ''}|${coolingInstallationId ?? ''}|${gebouwdeelId ?? ''}`)
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
// attrsById = Map<wallId, { boundary, roofKey, constructieId }>. De constructie
// zit in de sleutel zodat een gevel die halverwege anders geïsoleerd is twee
// randen blijft (dat is nu juist het punt van een constructie). Gebouwdeel
// hoeft er niet in: een regio-omtrek loopt per definitie niet over een
// gebouwdeelgrens heen. Zie BLENDER_EXPORT_PLAN.md.
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
      && (a.constructieId ?? null) === (b.constructieId ?? null)
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
  const allFloors = note.settings?.floors ?? []
  const installations = note.settings?.installations ?? []
  const defaultHeatingId = note.settings?.defaultHeatingInstallationId
  const roomAssignments = note.settings?.roomAssignments ?? {}
  const faceAttributes = note.settings?.faceAttributes ?? {}
  const gebouwdelen = note.settings?.gebouwdelen ?? []
  const constructies = note.settings?.constructies ?? []
  const mainId = mainGebouwdeelId(gebouwdelen)
  const warnings = []

  // De geëxporteerde subset eerst bepalen, en pas daarover de Z-stapeling +
  // `top` berekenen: een verdieping die wél een hoogte heeft maar geen (geldig)
  // referentiepunt doet niet mee, en mag de écht bovenste verdieping zijn
  // `top` dus ook niet afpakken (die zou anders zijn platte dak of zijn
  // nokhoogte-controle verliezen). Zie BLENDER_EXPORT_PLAN.md, format 3.
  // computeRegionZ krijgt wél alle rijen (met de subset als predicate), omdat
  // Z=0 aan de begane-grond-index hangt.
  const isExported = f =>
    floorHasAnyHeight(f) && !!f.referencePoint && !!mainLayer.findOne(`#${f.referencePoint.wallId}`)
  const floors = allFloors.filter(isExported)
  const regionZ = computeRegionZ(allFloors, gebouwdelen, isExported)

  // Z=0 is het vloerpeil van de begane grond. Heeft het hoofdhuis daar geen
  // hoogte, dan klopt dat peil niet meer met een echte vloer: melden.
  const groundFloor = allFloors[GROUND_FLOOR_INDEX]
  if (floors.length && groundFloor && isEmptyHeight(getFloorHeight(groundFloor, mainId, gebouwdelen).heightM)) {
    warnings.push(`${groundFloor.name} heeft geen hoogte: Z=0 ligt op een ontbrekende verdieping`)
  }

  const exportedFloors = []
  for (const floor of floors) {
    const startNode = mainLayer.findOne(`#${floor.referencePoint.wallId}`)
    const startPts = startNode.points()
    const ep = floor.referencePoint.ep
    const originPx = { x: startNode.x() + startPts[ep * 2], y: startNode.y() + startPts[ep * 2 + 1] }

    const wallNodes = walkHierarchy(startNode, mainLayer)

    // Vlakken op de VOLLEDIGE muurhiërarchie — binnenmuren doen gewoon mee voor
    // de vlak-detectie (rooms[]). Pas daarna filteren we walls[].
    const faces = facesFromNodes(wallNodes)

    // Vlakken groeperen per gebouwdeel: elke groep wordt één regio met een
    // eigen omtrek, eigen hoogte en eigen Z. Bij één gebouwdeel is dat precies
    // één regio = de hele verdieping, zoals vóór format 3.
    const facesByPart = new Map()
    for (const face of faces) {
      const part = faceAttributes[faceHash(face)]?.gebouwdeelId ?? mainId
      if (!facesByPart.has(part)) facesByPart.set(part, [])
      facesByPart.get(part).push(face)
    }

    // De omtrek van de hele verdieping (alle vlakken samen) blijft nodig als
    // basis voor walls[]: omtrekmuren moeten altijd geëxporteerd worden,
    // ongeacht bij welk gebouwdeel ze horen.
    const env = envelopeForFaces(faces)

    // Welke muren komen in walls[]? Omtrekmuren + referentiepunt-muur +
    // binnenmuren die twee zones óf twee gebouwdelen scheiden. Zie
    // BLENDER_EXPORT_PLAN.md, blok "Binnenmuren".
    const keepIds = selectExportedWallIds({
      faces,
      envelope: env,
      referenceWallId: floor.referencePoint.wallId,
      roomAssignments,
      installations,
      defaultHeatingId,
      allWallIds: wallNodes.map(n => n.id()),
      faceAttributes,
      mainId,
    })
    const walls = wallNodes.filter(n => keepIds.has(n.id())).map(n => exportWall(n, originPx))
    // conns die naar niet-geëxporteerde binnenmuren wijzen weglaten, zodat
    // walls[].conns referentieel consistent blijft met walls[].
    for (const w of walls) {
      w.conns.ep0 = w.conns.ep0.filter(c => keepIds.has(c.id))
      w.conns.ep1 = w.conns.ep1.filter(c => keepIds.has(c.id))
    }

    // Collineaire omtrekranden met dezelfde boundary + hetzelfde dak + dezelfde
    // constructie samenvoegen, zodat een gevel die via T-splitsingen in
    // segmenten is geknipt één rand met één lengte wordt. attrsById uit de
    // volledige wallNodes, vóór de px→m/origin-aftrek.
    const attrsById = new Map()
    for (const node of wallNodes) {
      attrsById.set(node.id(), {
        boundary: resolveWallBoundary(node),
        roofKey: JSON.stringify(exportRoof(node)),
        constructieId: node.attrs.constructieId ?? null,
      })
    }
    const toExportEnvelope = (raw) => {
      const merged = mergeCollinearEnvelopeEdges(raw, attrsById)
      return merged
        ? {
            polygon: merged.polygon.map(v => [toM(v.x - originPx.x), toM(v.y - originPx.y)]),
            wallIds: merged.wallIds,
          }
        : null
    }

    // Eén regio per gebouwdeel dat op deze verdieping vlakken heeft. De
    // hoogte komt uit het eigen tabblad in de sidebar; ontbreekt die, dan valt
    // de regio terug op de hoofdgebouwdeel-hoogte (met een melding) zodat er
    // nog steeds een bruikbaar model uitkomt.
    const regions = []
    for (const g of gebouwdelen) {
      const partFaces = facesByPart.get(g.id)
      // Geen vlakken = niets om te extruderen op deze verdieping. Een
      // ingevulde hoogte zonder vlakken telt nog wel mee voor de Z-stapeling
      // (dat zit in computeRegionZ), maar levert geen regio op.
      if (!partFaces?.length) continue
      const z = regionZ.get(`${floor.id}|${g.id}`)

      let region = z
      if (!region) {
        const fallback = regionZ.get(`${floor.id}|${mainId}`)
        if (!fallback) continue // ook het hoofdgebouwdeel bestaat hier niet
        warnings.push(`${g.name} heeft geen hoogte op ${floor.name}`)
        region = fallback
      }

      regions.push({
        gebouwdeelId: g.id,
        heightM: region.heightM,
        // Absolute Z, al uitgerekend zodat de Blender-kant niet meer stapelt
        // (zelfde filosofie als de XY-uitlijning hierboven).
        zBottomM: region.zBottomM,
        zTopM: region.zTopM,
        // Hoogste GEËXPORTEERDE verdieping waar dit gebouwdeel bestaat — voor
        // een aanbouw met alleen een begane grond dus die begane grond.
        top: region.top,
        envelope: toExportEnvelope(envelopeForFaces(partFaces)),
      })
    }

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
      const gebouwdeelId = faceAttributes[hash]?.gebouwdeelId ?? mainId
      const z = regions.find(r => r.gebouwdeelId === gebouwdeelId)
      return {
        id: hash,
        polygon: face.vertices.map(v => [toM(v.x - originPx.x), toM(v.y - originPx.y)]),
        heatingInstallationId,
        coolingInstallationId,
        color,
        aard: faceAttributes[hash]?.aard ?? 'gebruiksruimte',
        platDak: !!faceAttributes[hash]?.platDak,
        // Gebouwdeel + de Z van zijn regio, hier herhaald zodat de Blender-kant
        // per vlak niet hoeft terug te zoeken in regions[].
        gebouwdeelId,
        zBottomM: z?.zBottomM ?? null,
        zTopM: z?.zTopM ?? null,
      }
    })

    exportedFloors.push({
      id: floor.id,
      title: floor.name,
      // Geen x/y hier — walls/rooms hierboven zijn al t.o.v. dit punt vertaald
      // (originPx), dus het referentiepunt ligt per definitie op (0, 0).
      // wallId/ep blijven staan als herleidbare referentie (welke hoek was
      // het), niet om nog een keer te vertalen.
      referencePoint: { wallId: floor.referencePoint.wallId, ep: floor.referencePoint.ep },
      // Hoogte, omtrek en de bovenste-verdieping-vlag zitten sinds format 3
      // per gebouwdeel hierin, niet meer los op de verdieping.
      regions,
      walls,
      rooms,
    })
  }

  // northAngle = kompasrichting van "onderkant canvas". frontFacadeScreenAngle =
  // schermrichting waarin de voorgevel getekend is (0=boven, 90=rechts,
  // 180=onder, 270=links; 180 = de gangbare situatie). frontFacadeBearing is
  // daaruit afgeleid (northAngle + offset t.o.v. onder) zodat de Blender-kant
  // niet zelf hoeft te rekenen — de relatieve gevelnamen (voor/achter/links/
  // rechts) volgen uit frontFacadeScreenAngle, de kompasnamen uit northAngle.
  const northAngle = note.settings?.northAngle ?? DEFAULT_NORTH_ANGLE
  const frontFacadeScreenAngle = note.settings?.frontFacadeScreenAngle ?? DEFAULT_FRONT_FACADE_SCREEN_ANGLE

  return {
    data: {
      format: 3,
      unit: 'm',
      project: {
        title: note.title,
        northAngle,
        frontFacadeScreenAngle,
        frontFacadeBearing: norm360(northAngle + frontFacadeScreenAngle - 180),
        // Namen horen bij de export zodat het rapport aan de Blender-kant
        // "linkergevel aanbouw" kan schrijven i.p.v. een id.
        gebouwdelen: gebouwdelen.map(g => ({ id: g.id, name: g.name })),
        constructies: constructies.map(c => ({ id: c.id, name: c.name })),
      },
      floors: exportedFloors,
    },
    // Niet-blokkerende meldingen voor de gebruiker (App.jsx toont ze als
    // floaty-toast) — de export zelf gaat gewoon door.
    warnings: [...new Set(warnings)],
  }
}

export function exportBlender(note, mainLayer) {
  const { data, warnings } = buildBlenderExport(note, mainLayer)
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}_blender.json`
  a.click()
  URL.revokeObjectURL(url)
  return warnings
}
