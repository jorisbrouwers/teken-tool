// Zone-kleuren (klimatiseringszones) — enige bron van waarheid, gedeeld door
// ZoneFillOverlay.jsx (canvas-weergave) en exportBlender.js (Blender-export),
// zodat een vlak in de tekentool en het bijbehorende material in Blender
// altijd dezelfde kleur hebben.
import { installationNumber } from '../Installations/InstallationsSidebar.jsx'

// Losse, warme/koude paletten (i.p.v. de algemene StylePanel-COLORS) zodat
// verwarming altijd warm en koeling altijd koud oogt. De eerste 4
// installaties van elke soort krijgen een handmatig gekozen, goed van elkaar
// te onderscheiden kleur (installatie 1 → index 0, enz. — zelfde volgnummer
// als de "Verwarming N"-labels in InstallationsSidebar). Pas vanaf de 5e
// installatie van dezelfde soort (zeldzaam) valt het terug op een
// hash-gebaseerde kleur uit een ruimer, minder zorgvuldig gekozen palet —
// nog steeds deterministisch per installatie-id (stabiel), maar niet meer
// gegarandeerd goed te onderscheiden van de andere.
export const WARM_COLORS_FIXED = ['#e8590c', '#e03131', '#f08c00', '#7c2d12']
export const COOL_COLORS_FIXED = ['#1971c2', '#0c8599', '#4263eb', '#0ca678']
export const WARM_COLORS_OVERFLOW = ['#d9480f', '#e64980', '#c92a2a', '#f76707', '#a61e4d']
export const COOL_COLORS_OVERFLOW = ['#3b5bdb', '#099268', '#1864ab', '#5f3dc4', '#0b7285']
export const FALLBACK_COLOR = '#868e96' // zou niet moeten voorkomen — deriveZones filtert lege zones al

function hashToIndex(str, mod) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h) % mod
}

export function colorForInstallation(inst, installations, fixedColors, overflowColors) {
  const number = installationNumber(installations, inst) // 1-based
  if (number <= fixedColors.length) return fixedColors[number - 1]
  return overflowColors[hashToIndex(inst.id, overflowColors.length)]
}

// Koeling bepaalt de kleur wanneer aanwezig (koud), anders verwarming (warm).
// `zone` = { heatingInstallationId, coolingInstallationId } (zowel een
// deriveZones()-zone als een los room-object voldoen aan deze vorm).
export function colorForZone(zone, installations) {
  if (zone.coolingInstallationId) {
    const inst = installations.find(i => i.id === zone.coolingInstallationId)
    if (inst) return colorForInstallation(inst, installations, COOL_COLORS_FIXED, COOL_COLORS_OVERFLOW)
  }
  if (zone.heatingInstallationId) {
    const inst = installations.find(i => i.id === zone.heatingInstallationId)
    if (inst) return colorForInstallation(inst, installations, WARM_COLORS_FIXED, WARM_COLORS_OVERFLOW)
  }
  return FALLBACK_COLOR
}
