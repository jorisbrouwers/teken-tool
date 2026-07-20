import { useEffect, useRef } from 'react'
import Konva from 'konva'
import { detectFaces, deriveZones, faceHash } from './roomGraph.js'
import { installationNumber } from '../Installations/InstallationsSidebar.jsx'

const FILL_OPACITY = 0.20
const FILL_OPACITY_HOVER = 0.3
// Hover toont altijd dezelfde neutrale grijstint — ongeacht of het vlak een
// zone-kleur heeft of helemaal geen installatie (dan is er anders geen
// visuele hover-feedback, want een niet-toegewezen vlak krijgt normaal
// gesproken geen polygoon getekend).
const HOVER_COLOR = '#adb5bd'

// Losse, warme/koude paletten (i.p.v. de algemene StylePanel-COLORS) zodat
// verwarming altijd warm en koeling altijd koud oogt. De eerste 4
// installaties van elke soort krijgen een handmatig gekozen, goed van elkaar
// te onderscheiden kleur (installatie 1 → index 0, enz. — zelfde volgnummer
// als de "Verwarming N"-labels in InstallationsSidebar). Pas vanaf de 5e
// installatie van dezelfde soort (zeldzaam) valt het terug op een
// hash-gebaseerde kleur uit een ruimer, minder zorgvuldig gekozen palet —
// nog steeds deterministisch per installatie-id (stabiel), maar niet meer
// gegarandeerd goed te onderscheiden van de andere.
const WARM_COLORS_FIXED = ['#e8590c', '#e03131', '#f08c00', '#7c2d12']
const COOL_COLORS_FIXED = ['#1971c2', '#0c8599', '#4263eb', '#0ca678']
const WARM_COLORS_OVERFLOW = ['#d9480f', '#e64980', '#c92a2a', '#f76707', '#a61e4d']
const COOL_COLORS_OVERFLOW = ['#3b5bdb', '#099268', '#1864ab', '#5f3dc4', '#0b7285']
const FALLBACK_COLOR = '#868e96' // zou niet moeten voorkomen — deriveZones filtert lege zones al

function hashToIndex(str, mod) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h) % mod
}

function colorForInstallation(inst, installations, fixedColors, overflowColors) {
  const number = installationNumber(installations, inst) // 1-based
  if (number <= fixedColors.length) return fixedColors[number - 1]
  return overflowColors[hashToIndex(inst.id, overflowColors.length)]
}

// Koeling bepaalt de kleur wanneer aanwezig (koud), anders verwarming (warm).
function colorForZone(zone, installations) {
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

// Kleurt de gedetecteerde klimatiseringszones in op canvas (toggle). Volgt
// exact het rAF+signature-patroon van HingeDecorations.jsx: eigen, lazy
// aangemaakte Konva-laag, alleen een echte redraw als de signatuur wijzigt.
//
// detectFaces()/deriveZones() draaien hier wél élke tick opnieuw (i.p.v.
// alleen bij een expliciet "topologie gewijzigd"-signaal) — voor de
// omvang van een normale plattegrond is dat verwaarloosbaar werk in JS;
// alleen de duurdere Konva-redraw zelf wordt door de signature-check
// bewaakt (performance-invariant 7).
export default function ZoneFillOverlay({ stageRef, mainLayerRef, installations, roomAssignments, defaultHeatingInstallationId, visible = false, hoveredFaceKeyRef, suppressRef }) {
  const installationsRef = useRef(installations)
  installationsRef.current = installations
  const roomAssignmentsRef = useRef(roomAssignments)
  roomAssignmentsRef.current = roomAssignments
  const defaultHeatingInstallationIdRef = useRef(defaultHeatingInstallationId)
  defaultHeatingInstallationIdRef.current = defaultHeatingInstallationId
  const visibleRef = useRef(visible)
  visibleRef.current = visible

  useEffect(() => {
    let layer = null
    const polys = new Map() // faceHash -> Konva.Line
    let rafId = null
    let prevSig = null

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current

      if (!stage) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'zoneFillLayer' })
        stage.add(layer)
        // Boven mainLayer (index 0) — niet eronder: afbeeldingen (locked én
        // unlocked) staan altijd onderin mainLayer, dus een vullaag ONDER
        // mainLayer zou daar volledig achter verdwijnen. Bij de lage dekking
        // (FILL_OPACITY) blijven muren/tekst er nog prima doorheen zichtbaar.
        layer.zIndex(1)
        // Konva ordent zijn eigen layers puur via DOM-volgorde (geen CSS
        // z-index) — maar tijdens pan/zoom legt CanvasView een los DOM-element
        // (frozenCanvas, een bevroren snapshot van mainLayer inclusief
        // afbeeldingen) over de canvassen heen, zonder zelf een z-index te
        // zetten. Afhankelijk van het toevalstiming van wanneer deze layer
        // versus frozenCanvas aan de DOM zijn toegevoegd, kon die snapshot zo
        // alsnog boven deze laag komen te liggen. Een expliciete z-index hier
        // maakt die volgorde ondubbelzinnig, ongeacht DOM-toevoegingsvolgorde.
        layer.getCanvas()._canvas.style.zIndex = 5
      }

      if (!ml || !visibleRef.current) {
        if (prevSig !== 'hidden') {
          prevSig = 'hidden'
          for (const p of polys.values()) p.visible(false)
          layer.batchDraw()
        }
        rafId = requestAnimationFrame(tick)
        return
      }

      // Tijdens het slepen van een hinge/hiërarchie: helemaal niets herberekenen,
      // gewoon de laatst getekende stand laten staan tot het slepen stopt — zie
      // wallEditActiveRef in CanvasView.jsx voor waarom (anders geeft continu
      // opnieuw detecteren op een kortstondig inconsistente graaf geflikker).
      if (suppressRef?.current) {
        rafId = requestAnimationFrame(tick)
        return
      }

      const faces = detectFaces(ml)
      const zones = deriveZones(faces, roomAssignmentsRef.current, installationsRef.current, defaultHeatingInstallationIdRef.current)
      const hoveredKey = hoveredFaceKeyRef?.current ?? null

      // Kleur per vlak dat daadwerkelijk een zone heeft (installatie(s)
      // toegewezen). Een niet-toegewezen vlak zit hier niet in — die krijgt
      // normaal gesproken geen polygoon — maar wel de gehoverde, zodat je ook
      // op een "lege" ruimte hover-feedback krijgt.
      const facesToShow = new Map() // hash -> face
      const colorByHash = new Map() // hash -> zone-kleur (alleen toegewezen vlakken)
      zones.forEach(zone => {
        const color = colorForZone(zone, installationsRef.current)
        for (const face of zone.faces) {
          const hash = faceHash(face)
          facesToShow.set(hash, face)
          colorByHash.set(hash, color)
        }
      })
      if (hoveredKey && !facesToShow.has(hoveredKey)) {
        const hoveredFace = faces.find(f => faceHash(f) === hoveredKey)
        if (hoveredFace) facesToShow.set(hoveredKey, hoveredFace)
      }

      // Let op: faceHash is topologie-gebaseerd (muur-ids), niet coördinaten —
      // bij het verplaatsen van een hele hiërarchie of het slepen van een
      // scharnier blijven de muur-ids en dus de faceHash ongewijzigd, terwijl
      // de vlak-vorm zelf wél verandert. Vertex-coördinaten moeten daarom ook
      // in de signature, anders blijft de vulling tijdens zo'n sleep hangen
      // op de oude positie (en springt hij pas bij, toevallig, de eerstvolgende
      // stage-transformwijziging door navigatie). Om dezelfde reden moet ook
      // de kleur zelf in de signature: een al getoond vlak dat van installatie
      // wisselt houdt anders dezelfde hash/coördinaten, dus geen wijziging in
      // de signature, en de nieuwe kleur zou dan pas zichtbaar worden bij een
      // toevallige volgende wijziging (bv. hoveren).
      const sig = `${stage.x()},${stage.y()},${stage.scaleX()}|` +
        [...facesToShow.entries()].map(([hash, f]) =>
          `${hash}@${colorByHash.get(hash) ?? ''}@${f.vertices.map(v => `${Math.round(v.x)},${Math.round(v.y)}`).join(';')}`
        ).join(',') +
        `|${hoveredKey}`

      if (sig === prevSig) {
        rafId = requestAnimationFrame(tick)
        return
      }
      prevSig = sig

      const seen = new Set()
      for (const [hash, face] of facesToShow) {
        seen.add(hash)
        const isHovered = hash === hoveredKey
        let poly = polys.get(hash)
        if (!poly) {
          poly = new Konva.Line({ closed: true, listening: false, perfectDrawEnabled: false, stroke: 'transparent' })
          layer.add(poly)
          polys.set(hash, poly)
        }
        poly.points(face.vertices.flatMap(v => [v.x, v.y]))
        poly.fill(isHovered ? HOVER_COLOR : colorByHash.get(hash))
        poly.opacity(isHovered ? FILL_OPACITY_HOVER : FILL_OPACITY)
        poly.visible(true)
      }

      for (const [hash, poly] of [...polys]) {
        if (!seen.has(hash)) {
          poly.destroy()
          polys.delete(hash)
        }
      }

      layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      polys.clear()
    }
  }, [stageRef, mainLayerRef, hoveredFaceKeyRef, suppressRef])

  return null
}
