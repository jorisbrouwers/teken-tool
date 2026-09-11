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
