import { useEffect, useRef } from 'react'
import Konva from 'konva'
import { detectFaces, faceHash } from './roomGraph.js'

const HATCH_COLOR = '#1d1d1d'
const HATCH_OPACITY = 0.28
const HATCH_SPACING_SCREEN_PX = 9 // loodrechte afstand tussen twee arceerlijnen
const HATCH_WIDTH_SCREEN_PX = 0.75
const DETECT_INTERVAL_MS = 250

// Dunne diagonale arcering over elk vlak met aard "<1,5m" — altijd zichtbaar,
// los van de zones-toggle (ZoneFillOverlay.jsx), zodat direct te zien is welk
// deel van een ruimte niet meetelt voor het gebruiksoppervlak. Zelfde
// rAF+signature-patroon als ZoneFillOverlay.jsx (performance-invariant 7):
// eigen laag, alleen een redraw als de signatuur wijzigt. Vlak-detectie draait
// alleen als er überhaupt een "<1,5m"-vlak bestaat.
//
// Lijnafstand en -dikte zijn constant in SCHERM-pixels (tegengeschaald met de
// stage-zoom) — anders wordt de arcering bij inzoomen grof en bij uitzoomen
// een grijze vlek. Eén Konva.Shape voor alle vlakken: per vlak clippen op de
// polygoon en daarbinnen de lijnen over de bounding box trekken.
export default function LowHeadroomHatch({ stageRef, mainLayerRef, faceAttributes, suppressRef }) {
  const faceAttributesRef = useRef(faceAttributes)
  faceAttributesRef.current = faceAttributes

  useEffect(() => {
    let layer = null
    let shape = null
    let polygons = [] // [[{x,y}, ...], ...]
    let rafId = null
    let prevSig = null
    let polySig = ''
    let lastFa = null
    let lastDetect = -Infinity

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current
      if (!stage || !ml) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'lowHeadroomHatchLayer' })
        stage.add(layer)
        layer.zIndex(1)
        // Expliciete CSS z-index, zelfde reden als ZoneFillOverlay.jsx
        // (frozen-canvas-volgorde tijdens navigatie) — net boven de zone-vulling.
        layer.getCanvas()._canvas.style.zIndex = 6
        shape = new Konva.Shape({
          listening: false, perfectDrawEnabled: false,
          sceneFunc(ctx, s) {
            const scale = s.getAbsoluteScale().x || 1
            const step = HATCH_SPACING_SCREEN_PX * Math.SQRT2 / scale
            ctx.setAttr('strokeStyle', HATCH_COLOR)
            ctx.setAttr('globalAlpha', HATCH_OPACITY)
            ctx.setAttr('lineWidth', HATCH_WIDTH_SCREEN_PX / scale)
            for (const verts of polygons) {
              let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
              for (const v of verts) {
                if (v.x < minX) minX = v.x
                if (v.x > maxX) maxX = v.x
                if (v.y < minY) minY = v.y
                if (v.y > maxY) maxY = v.y
              }
              ctx.save()
              ctx.beginPath()
              verts.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)))
              ctx.closePath()
              ctx.clip()
              // Lijnen x + y = c ("/"-richting). c op een vast raster (veelvoud
              // van step) zodat aangrenzende stroken naadloos op elkaar aansluiten.
              ctx.beginPath()
              const cStart = Math.floor((minX + minY) / step) * step
              for (let c = cStart; c <= maxX + maxY; c += step) {
                ctx.moveTo(c - maxY, maxY)
                ctx.lineTo(c - minY, minY)
              }
              ctx.stroke()
              ctx.restore()
            }
          },
        })
        layer.add(shape)
      }

      const fa = faceAttributesRef.current ?? {}
      const anyLow = Object.values(fa).some(a => a?.aard === '<1.5m')
      // Tijdens het slepen van een hinge: laatst getekende stand laten staan
      // (zie wallEditActiveRef in CanvasView.jsx).
      if (anyLow && suppressRef?.current) {
        rafId = requestAnimationFrame(tick)
        return
      }

      // Vlak-detectie hooguit elke DETECT_INTERVAL_MS (geometrie verandert
      // alleen via losse acties; een hinge-drag is hierboven al bevroren) —
      // een pan/zoom hertekent de gecachte polygonen zonder opnieuw te detecteren.
      const now = performance.now()
      if (fa !== lastFa || now - lastDetect > DETECT_INTERVAL_MS) {
        lastFa = fa
        lastDetect = now
        const lowFaces = anyLow
          ? detectFaces(ml).filter(f => fa[faceHash(f)]?.aard === '<1.5m')
          : []
        polygons = lowFaces.map(f => f.vertices)
        polySig = polygons.map(vs => vs.map(v => `${Math.round(v.x)},${Math.round(v.y)}`).join(';')).join('|')
      }
      const sig = `${stage.x()},${stage.y()},${stage.scaleX()}|${polySig}`

      if (sig !== prevSig) {
        prevSig = sig
        shape.visible(polygons.length > 0)
        layer.batchDraw()
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      polygons = []
    }
  }, [stageRef, mainLayerRef, suppressRef])

  return null
}
