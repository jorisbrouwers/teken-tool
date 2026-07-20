import { useEffect, useRef } from 'react'
import Konva from 'konva'

const HINGE_RADIUS = 1.5  // content units (grid-based; 1 grid = 1 m)

export default function HingeDecorations({ stageRef, mainLayerRef, editModeActive, visible = true }) {
  const editModeActiveRef = useRef(editModeActive)
  editModeActiveRef.current = editModeActive
  const visibleRef = useRef(visible)
  visibleRef.current = visible

  useEffect(() => {
    let layer = null
    const circles = new Map()
    let rafId = null
    let prevSig = null   // signatuur van de laatst getekende toestand

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current

      // Stage nog niet beschikbaar — wacht een tick
      if (!stage) {
        rafId = requestAnimationFrame(tick)
        return
      }

      // Laag eenmalig aanmaken zodra stage beschikbaar is
      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'hingeLayer' })
        stage.add(layer)
        layer.zIndex(1)  // boven mainLayer, onder drawingLayer
        // ZoneFillOverlay zet zijn canvas op CSS z-index 5 (frozenCanvas-fix,
        // zie de toelichting daar) — dat overroept Konva's eigen DOM-volgorde
        // en zou de scharnieren daardoor altijd achter de vlak-vulling laten
        // vallen, ongeacht welke van de twee lagen het eerst gemount is. Zet
        // hier expliciet een hógere CSS z-index zodat scharnieren altijd vóór
        // de vulling staan.
        layer.getCanvas()._canvas.style.zIndex = 6
      }

      if (!ml || editModeActiveRef.current || !visibleRef.current) {
        if (prevSig !== 'hidden') {
          prevSig = 'hidden'
          for (const c of circles.values()) c.visible(false)
          layer.batchDraw()
        }
        rafId = requestAnimationFrame(tick)
        return
      }

      // Verzamel eerst de gewenste toestand en teken alleen als die afwijkt
      // van de vorige frame — anders kost deze loop elke frame een volledige
      // layer-redraw (full-screen clear op dpr²), ook tijdens schrijven.
      const seen = new Map()  // key -> { ax, ay }
      // _culled heeft een 200px marge (CULL_PAD in viewportCulling.js) zodat
      // content niet abrupt verdwijnt vlak buiten de rand — maar Konva's
      // canvas heeft alleen pixels voor exact stage.width()×height(), dus in
      // die marge is _culled soms al false terwijl er nog niets getekend is.
      // Extra live scherm-check (géén marge) sluit dat gat.
      const w = stage.width(), h = stage.height()
      const transform = stage.getAbsoluteTransform()

      for (const node of ml.getChildren()) {
        if (!node.attrs.isWall) continue  // alleen lijnsysteem-segmenten krijgen scharnieren
        const cls = node.getClassName()
        if (cls !== 'Line' && cls !== 'Arrow') continue
        if (!node.id()) continue
        // Geculed = tijdens navigatie nog niet herteked (frozen-canvas
        // mechanisme) — het scharnierpunt zou anders zichtbaar zijn vóórdat
        // de muur zelf weer getekend is.
        if (node._culled) continue
        const pts = node.points()
        if (!pts || pts.length < 4) continue

        for (let ep = 0; ep <= 1; ep++) {
          const ax = node.x() + pts[ep * 2]
          const ay = node.y() + pts[ep * 2 + 1]
          const sp = transform.point({ x: ax, y: ay })
          if (sp.x < 0 || sp.x > w || sp.y < 0 || sp.y > h) continue
          const key = `${Math.round(ax)}_${Math.round(ay)}`
          if (!seen.has(key)) seen.set(key, { ax, ay })
        }
      }

      // Stage-transform hoort in de signatuur: bij pan/zoom moet de laag
      // opnieuw getekend worden, ook al liggen de scharnieren stil.
      const sig = `${stage.x()},${stage.y()},${stage.scaleX()}|${[...seen.keys()].join(' ')}`
      if (sig === prevSig) {
        rafId = requestAnimationFrame(tick)
        return
      }
      prevSig = sig

      for (const [key, { ax, ay }] of seen) {
        let c = circles.get(key)
        if (!c) {
          c = new Konva.Circle({ fill: '#1d1d1d', listening: false, perfectDrawEnabled: false })
          layer.add(c)
          circles.set(key, c)
        }
        c.position({ x: ax, y: ay })
        c.radius(HINGE_RADIUS)
        c.visible(true)
      }

      for (const [key, c] of [...circles]) {
        if (!seen.has(key)) {
          c.destroy()
          circles.delete(key)
        }
      }

      layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      circles.clear()
    }
  }, [stageRef, mainLayerRef])

  return null
}
