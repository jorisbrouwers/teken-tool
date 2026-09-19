import { useEffect, useRef } from 'react'
import Konva from 'konva'
import { collectTechnicalGuideSegments } from './roofGuides.js'

// Eigen kleur per toepassing (bevestigd met de gebruiker) + het label dat
// vertelt wat de lijn betekent, klein en gecentreerd verder "naar binnen"
// t.o.v. de lijn (dezelfde kant als de verschuiving zelf — zie
// roofGuides.js/findInteriorNormal, dat leest generiek als "onder de lijn").
// Bewust geen lime/felgroen (#5eaf07) — dat is al de kleur van de bestaande
// hellingshoek-pill (.measurement-label-roof in Canvas.css), dus een ander
// groen om verwarring met die pill te voorkomen.
const HEIGHT_COLOR = '#2f9e44'   // <1,5m-hoogtelijn
const HEIGHT_LABEL = '1.5m'
const DEPTH_COLOR = '#9c36b5'    // diepte-hulplijn volgende verdieping
// "volgende verdieping" is verwarrend: de lijn staat getekend bij de
// verdieping waar je op dat moment aan het tekenen bent (die is verschoven
// naar de canvaspositie van díe verdieping, zie roofGuides.js), niet bij een
// "volgende" t.o.v. wat je ziet — vandaar gewoon wat de lijn zelf betekent.
const DEPTH_LABEL = 'snijpunt vloer'

const LABEL_FONT_PX = 11        // constante schermgrootte, zie de scale-tegencompensatie hieronder
const LABEL_GAP_SCREEN_PX = 12  // constante schermafstand tussen lijn en labelmidden
// Uitgezoomd: label weg als de hulplijn op het scherm korter is dan dit (zelfde
// idee als HeightGuideLabels.jsx, maar blijft langer zichtbaar). De lijn zelf blijft.
const MIN_SEGMENT_SCREEN_PX = 120

// Toont de technische hulplijnen (dak-gerelateerd, zie roofGuides.js) als een
// losse, gestippelde lijn + klein label — pure visuele/snap-hulp, niets nieuws
// wordt in de notitie opgeslagen. Zelfde rAF+laag-patroon als
// HingeDecorations.jsx/WallBoundaryOverlay.jsx, met één verbijzondering
// (performance-invariant 7): de dure vlak-detectie (collectTechnicalGuideSegments,
// via facesFromNodes) draait alléén als de INHOUD wijzigt (muur-attrs/floors),
// niet bij pan/zoom — de content-signatuur bevat daarom bewust GEEN
// stage-transform. Een losse, goedkope scale-check houdt alleen de
// label-tegenschaling/-afstand (constant in schermpixels) bij tijdens zoomen.
export default function RoofGuideOverlay({ stageRef, mainLayerRef, floors, faceAttributes, gebouwdelen, visible = false }) {
  const visibleRef = useRef(visible)
  visibleRef.current = visible
  const floorsRef = useRef(floors)
  floorsRef.current = floors
  const faceAttributesRef = useRef(faceAttributes)
  faceAttributesRef.current = faceAttributes
  const gebouwdelenRef = useRef(gebouwdelen)
  gebouwdelenRef.current = gebouwdelen

  useEffect(() => {
    let layer = null
    const shapes = new Map() // key -> { line, text, midX, midY, nx, ny }
    let rafId = null
    let prevContentSig = null
    let prevScale = null

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current

      if (!stage) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'roofGuideLayer' })
        stage.add(layer)
        layer.zIndex(1)
        // Zelfde reden als de andere overlays: expliciete CSS z-index nodig om
        // de frozen-canvas-volgorde tijdens navigatie te overroepen. Boven de
        // begrenzingskleur (7) én de lijn-gizmo-handles (7) — een hulplijn
        // moet altijd zichtbaar blijven, ook tijdens het slepen/snappen.
        layer.getCanvas()._canvas.style.zIndex = 8
      }

      if (!ml || !visibleRef.current) {
        if (prevContentSig !== 'hidden') {
          prevContentSig = 'hidden'
          for (const { line, text } of shapes.values()) { line.visible(false); text.visible(false) }
          layer.batchDraw()
        }
        rafId = requestAnimationFrame(tick)
        return
      }

      let shapesDirty = false

      // Goedkope content-signatuur — geen stage-transform, dus onaangeroerd
      // tijdens puur pannen/zoomen. Alleen de muren die daadwerkelijk
      // kandidaat zijn (roofCourses gezet) + de verdiepingenlijst.
      const parts = []
      for (const node of ml.getChildren()) {
        if (!node.attrs.isWall) continue
        const courses = node.attrs.roofCourses
        if (!Array.isArray(courses) || !courses.length) continue
        if (!node.id()) continue
        const pts = node.points()
        if (!pts || pts.length < 4) continue
        parts.push(`${node.id()}:${node.x()},${node.y()},${pts.join(',')},${node.attrs.roofBaseHeightM ?? 0},${JSON.stringify(courses)}`)
      }
      // partHeights mee in de signatuur: de hoogte van een gebouwdeel bepaalt waar
      // zijn diepte-hulplijn ligt, net zo goed als floor.heightM.
      const floorsSig = JSON.stringify((floorsRef.current ?? []).map(f => ({ id: f.id, heightM: f.heightM, ph: f.partHeights, rp: f.referencePoint })))
      // Een aard-wijziging (bv. een vlak van "<1,5m" naar "gebruiksruimte"
      // omzetten) kan de gekozen kant bij een gedeelde muur veranderen zonder
      // dat er iets aan de muur-geometrie zelf wijzigt — dus moet in de
      // signatuur zitten. Klein object, JSON.stringify is hier goedkoop genoeg.
      const aardSig = JSON.stringify(faceAttributesRef.current ?? {})
      const contentSig = `${parts.join(';')}|${floorsSig}|${aardSig}`

      if (contentSig !== prevContentSig) {
        prevContentSig = contentSig

        // Pas nu de duurdere vlak-detectie aanroepen — alleen bij een echte wijziging.
        const segments = collectTechnicalGuideSegments(ml, floorsRef.current ?? [], faceAttributesRef.current, gebouwdelenRef.current)
        const seen = new Map(segments.map(seg => [seg.key, seg]))

        for (const [key, seg] of seen) {
          // De hoek-diagonaal ("hip", zie roofGuides.js) krijgt geen eigen
          // label — puur een visuele/snap-lijn, geen dakdata van zichzelf.
          const hasLabel = seg.kind !== 'height-corner'

          let entry = shapes.get(key)
          if (!entry) {
            const line = new Konva.Line({
              strokeWidth: 1, strokeScaleEnabled: false, dash: [5, 4],
              opacity: 0.8, listening: false, perfectDrawEnabled: false,
            })
            const text = new Konva.Text({
              fontSize: LABEL_FONT_PX, fontStyle: '500', listening: false, perfectDrawEnabled: false,
            })
            layer.add(line)
            layer.add(text)
            entry = { line, text }
            shapes.set(key, entry)
          }
          const color = seg.kind === 'depth' ? DEPTH_COLOR : HEIGHT_COLOR
          const label = seg.kind === 'depth' ? DEPTH_LABEL : HEIGHT_LABEL

          entry.line.stroke(color)
          entry.line.points([seg.x1, seg.y1, seg.x2, seg.y2])
          entry.line.visible(true)

          entry.hasLabel = hasLabel
          entry.segLen = Math.hypot(seg.x2 - seg.x1, seg.y2 - seg.y1)
          if (hasLabel) {
            entry.text.text(label)
            entry.text.fill(color)
            entry.midX = (seg.x1 + seg.x2) / 2
            entry.midY = (seg.y1 + seg.y2) / 2
            entry.nx = seg.nx
            entry.ny = seg.ny

            // Evenwijdig aan de lijn i.p.v. altijd horizontaal — anders vallen
            // twee dicht bij elkaar liggende verticale hulplijnen (bv. twee
            // gevels van dezelfde ruimte) samen tot overlappende horizontale
            // tekst. Genormaliseerd naar [-90, 90] zodat het label nooit
            // ondersteboven/gespiegeld komt te staan.
            let angleDeg = Math.atan2(seg.y2 - seg.y1, seg.x2 - seg.x1) * 180 / Math.PI
            if (angleDeg > 90 || angleDeg < -90) angleDeg += 180
            entry.text.rotation(angleDeg)
          }
        }

        for (const [key, entry] of [...shapes]) {
          if (!seen.has(key)) {
            entry.line.destroy()
            entry.text.destroy()
            shapes.delete(key)
          }
        }
        shapesDirty = true
        prevScale = null // dwingt de label-herpositionering hieronder ook nu al af
      }

      // Labelgrootte + -afstand constant in schermpixels houden — goedkoop
      // (geen vlak-detectie), dus prima om bij elke zoom-wijziging te draaien.
      const scale = stage.scaleX() || 1
      if (scale !== prevScale) {
        prevScale = scale
        const invScale = 1 / scale
        const gap = LABEL_GAP_SCREEN_PX * invScale
        for (const entry of shapes.values()) {
          const showLabel = entry.hasLabel && entry.segLen * scale >= MIN_SEGMENT_SCREEN_PX
          entry.text.visible(showLabel)
          if (!showLabel) continue
          entry.text.scale({ x: invScale, y: invScale })
          entry.text.offsetX(entry.text.width() / 2)
          entry.text.offsetY(entry.text.height() / 2)
          entry.text.position({ x: entry.midX + entry.nx * gap, y: entry.midY + entry.ny * gap })
        }
        shapesDirty = true
      }

      if (shapesDirty) layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      shapes.clear()
    }
  }, [stageRef, mainLayerRef])

  return null
}
