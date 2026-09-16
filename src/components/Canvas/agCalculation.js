// Real-time Ag-berekening (gebruiksoppervlak) — zie BLENDER_EXPORT_PLAN.md,
// blok "Ag-berekening (teken-tool, nog te bouwen)". Puur data in, data uit
// (zelfde aanpak als roomGraph.js/exportBlender.js): geen React/Konva-imports,
// zodat dit ook los te testen en later door een canvas-snapshot-actie te
// hergebruiken is.
//
// Ag van een verdieping/zone = som van de oppervlaktes (shoelace) van de
// gedetecteerde vlakken met aard === 'gebruiksruimte' (dus niet <1,5m, niet
// niet-berekend), per verdieping bepaald via walkHierarchy vanaf het
// referentiepunt (zelfde subset als de Blender-export). `platDak` telt hier
// bewust niet mee: een plat dak is een losse eigenschap van het vlak, geen
// aard-waarde — een gebruiksruimte met een plat dak erboven blijft gewoon
// meetellen. Zie BLENDER_EXPORT_PLAN.md, blok "Vlak-eigenschap".
import { facesFromNodes, faceHash, signedArea, deriveZones, resolveRoomAssignment } from './roomGraph.js'
import { walkHierarchy } from './wallGraph.js'
import { GRID_SIZE } from './useGrid.js'
import { installationLabel } from '../Installations/InstallationsSidebar.jsx'
import { floorHasAnyHeight, mainGebouwdeelId } from '../Building/buildingDefaults.js'

function faceAreaM2(face) {
  return Math.abs(signedArea(face.vertices)) / (GRID_SIZE * GRID_SIZE)
}

function zoneLabel(zone, installations) {
  const parts = []
  if (zone.heatingInstallationId) {
    const inst = installations.find(i => i.id === zone.heatingInstallationId)
    if (inst) parts.push(installationLabel(installations, inst))
  }
  if (zone.coolingInstallationId) {
    const inst = installations.find(i => i.id === zone.coolingInstallationId)
    if (inst) parts.push(installationLabel(installations, inst))
  }
  return parts.length > 0 ? parts.join(' + ') : zone.name
}

// note: de volledige notitie (settings.floors/installations/roomAssignments/
// faceAttributes); mainLayer: de Konva-laag met alle muur-nodes van álle
// verdiepingen door elkaar (ruimtelijk gescheiden hiërarchieën).
export function computeAgTotals(note, mainLayer) {
  const floors = note.settings?.floors ?? []
  const installations = note.settings?.installations ?? []
  const defaultHeatingInstallationId = note.settings?.defaultHeatingInstallationId
  const roomAssignments = note.settings?.roomAssignments ?? {}
  const faceAttributes = note.settings?.faceAttributes ?? {}
  const gebouwdelen = note.settings?.gebouwdelen ?? []
  const mainId = mainGebouwdeelId(gebouwdelen)

  const floorTotals = [] // [{ floorId, name, areaM2 }]
  const allFaces = [] // gebruiksruimte-vlakken van alle verdiepingen, getagd met _floorId
  const areaByPart = new Map() // gebouwdeelId -> m²

  for (const floor of floors) {
    if (!floorHasAnyHeight(floor) || !floor.referencePoint) continue
    const startNode = mainLayer.findOne(`#${floor.referencePoint.wallId}`)
    if (!startNode) continue // gekoppelde muur bestaat niet meer

    const wallNodes = walkHierarchy(startNode, mainLayer)
    const faces = facesFromNodes(wallNodes)

    let areaM2 = 0
    for (const face of faces) {
      const hash = faceHash(face)
      const aard = faceAttributes[hash]?.aard ?? 'gebruiksruimte'
      if (aard !== 'gebruiksruimte') continue
      const area = faceAreaM2(face)
      areaM2 += area
      const part = faceAttributes[hash]?.gebouwdeelId ?? mainId
      areaByPart.set(part, (areaByPart.get(part) ?? 0) + area)
      face._floorId = floor.id // tijdelijk, puur JS — geen Konva-attr, niets geserialiseerd
      allFaces.push(face)
    }
    floorTotals.push({ floorId: floor.id, name: floor.name, areaM2 })
  }

  const grandTotal = floorTotals.reduce((s, f) => s + f.areaM2, 0)

  const zoneGroups = deriveZones(allFaces, roomAssignments, installations, defaultHeatingInstallationId)
  const zones = zoneGroups.map(group => {
    const byFloor = new Map() // floorId -> areaM2
    for (const face of group.faces) {
      byFloor.set(face._floorId, (byFloor.get(face._floorId) ?? 0) + faceAreaM2(face))
    }
    const zoneFloors = floorTotals
      .filter(f => byFloor.has(f.floorId))
      .map(f => ({ floorId: f.floorId, name: f.name, areaM2: byFloor.get(f.floorId) }))
    return {
      key: group.key,
      label: zoneLabel(group, installations),
      floors: zoneFloors,
      total: zoneFloors.reduce((s, f) => s + f.areaM2, 0),
    }
  })

  // Alleen zinvol zodra er meer dan één gebouwdeel is; anders is dit gewoon
  // het totaal nog een keer.
  const parts = gebouwdelen.length > 1
    ? gebouwdelen
        .filter(g => (areaByPart.get(g.id) ?? 0) > 0)
        .map(g => ({ id: g.id, name: g.name, areaM2: areaByPart.get(g.id) }))
    : []

  return { floors: floorTotals, grandTotal, zones, parts }
}
