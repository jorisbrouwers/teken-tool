// Gedeelde defaults voor de Gebouweigenschappen — puur data, geen React/CSS/
// DOM-afhankelijkheden. Los van BuildingSidebar.jsx (die JSX/CSS importeert)
// zodat exportBlender.js — bewust "puur data in, data uit", zie dat bestand —
// dit kan hergebruiken zonder een UI-component mee te slepen.
import { generateUUID } from '../../db/db.js'

// Vaste startrijen — kelder/souterrain blijven leeg (heightM: null) tenzij de
// gebruiker ze invult, en tellen dan niet mee (zie App.jsx-seed-effect en de
// filter in BuildingSidebar.jsx). Verdere rijen via "+ verdieping toevoegen"
// krijgen een oplopend nummer; zie handleAddFloor voor de aanname die dat
// mogelijk maakt.
export const DEFAULT_FLOOR_NAMES = ['Kelder', 'Souterrain', 'Begane grond', '1e verdieping', '2e verdieping']

export function seedFloors() {
  return DEFAULT_FLOOR_NAMES.map(name => ({ id: generateUUID(), name, heightM: null, referencePoint: null }))
}

// 180° = Z (zuid) wijst standaard naar beneden op het wiel, i.p.v. N.
export const DEFAULT_NORTH_ANGLE = 180

// Voorgevel-wijzer in SCHERMRUIMTE: 0 = boven, 90 = rechts, 180 = onder,
// 270 = links (met de klok mee, gelijk aan de wiel-conventie). 180 = onderkant
// canvas = de bestaande aanname dat de voorgevel naar beneden getekend wordt.
// De kompasrichting van de voorgevel volgt hieruit als
// northAngle + (screenAngle - 180); zie FrontFacadeWheel.jsx en
// BLENDER_EXPORT_PLAN.md.
export const DEFAULT_FRONT_FACADE_SCREEN_ANGLE = 180

// ─── Gebouwdelen ────────────────────────────────────────────────────────────
//
// Een gebouwdeel is een echt bouwvolume (hoofdhuis, aanbouw, achterhuis,
// erker) met EIGEN hoogtes per verdieping. Zie BLENDER_EXPORT_PLAN.md, blok
// "Gebouwdelen en constructies". gebouwdelen[0] is altijd het hoofdgebouwdeel:
// zijn hoogtes staan gewoon in floor.heightM/heightNote (ongewijzigd t.o.v.
// vóór deze feature), die van de rest in floor.partHeights[gebouwdeelId].
// Daardoor heeft een bestaande notitie geen migratie nodig — zolang er één
// gebouwdeel is, is er letterlijk niets veranderd aan de data.
export const DEFAULT_GEBOUWDEEL_NAME = 'Hoofdhuis'

export function seedGebouwdelen() {
  return [{ id: generateUUID(), name: DEFAULT_GEBOUWDEEL_NAME }]
}

export function mainGebouwdeelId(gebouwdelen) {
  return gebouwdelen?.[0]?.id ?? null
}

// Leeg = dit gebouwdeel bestaat niet op deze verdieping. Eén plek die die
// vraag beantwoordt, zodat '' en null overal hetzelfde betekenen.
function isEmptyHeight(h) {
  return h == null || h === ''
}

// { heightM, heightNote } van één gebouwdeel op één verdieping.
export function getFloorHeight(floor, gebouwdeelId, gebouwdelen) {
  if (!floor) return { heightM: null, heightNote: '' }
  if (!gebouwdeelId || gebouwdeelId === mainGebouwdeelId(gebouwdelen)) {
    return { heightM: floor.heightM ?? null, heightNote: floor.heightNote ?? '' }
  }
  const entry = floor.partHeights?.[gebouwdeelId]
  return { heightM: entry?.heightM ?? null, heightNote: entry?.heightNote ?? '' }
}

// Onveranderlijke tegenhanger van getFloorHeight: levert een NIEUW floor-object
// met dit veld gewijzigd. patch = { heightM } en/of { heightNote }.
export function setFloorHeight(floor, gebouwdeelId, gebouwdelen, patch) {
  if (!gebouwdeelId || gebouwdeelId === mainGebouwdeelId(gebouwdelen)) {
    return { ...floor, ...patch }
  }
  const current = floor.partHeights?.[gebouwdeelId] ?? {}
  return {
    ...floor,
    partHeights: { ...(floor.partHeights ?? {}), [gebouwdeelId]: { ...current, ...patch } },
  }
}

// "Telt deze verdieping mee?" — vroeger `heightM != null && heightM !== ''`,
// nu: minstens één gebouwdeel heeft hier een hoogte. Vervangt die check overal
// (export, Ag-paneel, hulplijnen, sidebar-filters) zodat een verdieping waar
// ALLEEN een aanbouw bestaat niet stilzwijgend wegvalt.
export function floorHasAnyHeight(floor) {
  if (!floor) return false
  if (!isEmptyHeight(floor.heightM)) return true
  return Object.values(floor.partHeights ?? {}).some(e => !isEmptyHeight(e?.heightM))
}

// Absolute Z per (verdieping, gebouwdeel) — het rekenwerk dat de Blender-kant
// daardoor NIET meer hoeft te doen (zelfde filosofie als de XY-uitlijning die
// de export al doet). Retourneert een Map met sleutel `${floorId}|${gebouwdeelId}`
// → { heightM, zBottomM, zTopM, top }.
//
// floors MOET hier de geëxporteerde subset zijn (verdiepingen met een geldig
// referentiepunt), in sidebar-volgorde van onder naar boven: `top` betekent
// "hoogste verdieping waar dit gebouwdeel bestaat" en moet kloppen met wat er
// werkelijk geëxporteerd wordt — een hogere rij die wél een hoogte heeft maar
// geen referentiepunt mag de echte bovenste verdieping niet zijn `top` afpakken.
//
// Stapel-fallback: bestaat een gebouwdeel op een LAGERE verdieping niet (bv.
// een erker die pas op de 1e verdieping begint), dan telt daar de
// hoofdgebouwdeel-hoogte mee voor het Z-peil — er is niets anders om op te
// stapelen. Dat is puur een stapelregel, geen verborgen default voor de
// verdieping zelf (die blijft "bestaat niet").
export function computeRegionZ(floors, gebouwdelen) {
  const result = new Map()
  const mainId = mainGebouwdeelId(gebouwdelen)
  const zByPart = new Map((gebouwdelen ?? []).map(g => [g.id, 0]))
  const lastFloorByPart = new Map()

  for (const floor of floors ?? []) {
    for (const g of gebouwdelen ?? []) {
      const { heightM } = getFloorHeight(floor, g.id, gebouwdelen)
      const zBottomM = zByPart.get(g.id) ?? 0
      if (isEmptyHeight(heightM)) {
        // Bestaat hier niet: geen regio, maar het Z-peil moet wél doorlopen
        // voor de verdiepingen erboven — anders zou een erker op de 1e
        // verdieping op maaiveld beginnen.
        const fallback = g.id === mainId ? null : getFloorHeight(floor, mainId, gebouwdelen).heightM
        if (!isEmptyHeight(fallback)) zByPart.set(g.id, zBottomM + Number(fallback))
        continue
      }
      const h = Number(heightM)
      const zTopM = zBottomM + h
      const key = `${floor.id}|${g.id}`
      result.set(key, { heightM: h, zBottomM, zTopM, top: false })
      zByPart.set(g.id, zTopM)
      lastFloorByPart.set(g.id, key)
    }
  }

  for (const key of lastFloorByPart.values()) {
    result.get(key).top = true
  }
  return result
}
