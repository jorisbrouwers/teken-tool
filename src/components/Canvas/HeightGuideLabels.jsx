import { useEffect } from 'react'
import Konva from 'konva'

const LABEL_TEXT = '1.5m'
const LABEL_COLOR = '#1d1d1d'
const LABEL_FONT_PX = 11        // constante schermgrootte (zelfde als RoofGuideOverlay.jsx)
const LABEL_GAP_SCREEN_PX = 10  // constante schermafstand tussen lijn en labelmidden
// De maat-pill (MeasurementLabels.jsx) staat midden op de lijn — het label
// schuift daarom langs de lijn opzij, naast de pill.
const LABEL_ALONG_SCREEN_PX = 50
const MIN_SEGMENT_SCREEN_PX = 140 // korter op het scherm → geen label (past niet naast de pill)

// Vast "1.5m"-label bij elke ingetekende 1,5m-lijn (attr `heightGuide: 'edge'`,
// gezet door "1,5m-lijnen intekenen" in CanvasView.jsx) — altijd zichtbaar,
// los van de technische-hulplijnen-toggle (RoofGuideOverlay.jsx toont alleen
// de live berekende lijnen). Label aan de binnenkant: `heightGuideSide` (+1 =
// links van ep0→ep1) is relatief t.o.v. de lijnrichting opgeslagen, dus klopt
// ook na verslepen of maatinvoer. Zelfde rAF+signature-patroon als
// WallBoundaryOverlay.jsx (performance-invariant 7).
export default function HeightGuideLabels({ stageRef, mainLayerRef }) {
  useEffect(() => {
    let layer = null
    const texts = new Map() // wallId -> Konva.Text
    let rafId = null
    let prevSig = null

    function tick() {
      const stage = stageRef.current
      const ml = mainLayerRef.current
      if (!stage || !ml) {
        rafId = requestAnimationFrame(tick)
        return
      }

      if (!layer) {
        layer = new Konva.Layer({ listening: false, name: 'heightGuideLabelLayer' })
        stage.add(layer)
        layer.zIndex(1)
        // Expliciete CSS z-index, zelfde reden als de andere overlays
        // (frozen-canvas-volgorde tijdens navigatie).
        layer.getCanvas()._canvas.style.zIndex = 7
      }

      const scale = stage.scaleX() || 1
      const w = stage.width(), h = stage.height()
      const transform = stage.getAbsoluteTransform()
      const seen = new Map() // wallId -> { ax, ay, bx, by, side }

      for (const node of ml.getChildren()) {
        if (node.attrs.heightGuide !== 'edge' || node._culled || !node.id()) continue
        const pts = node.points()
        if (!pts || pts.length !== 4) continue
        const ax = node.x() + pts[0], ay = node.y() + pts[1]
        const bx = node.x() + pts[2], by = node.y() + pts[3]
        if (Math.hypot(bx - ax, by - ay) * scale < MIN_SEGMENT_SCREEN_PX) continue
        const spA = transform.point({ x: ax, y: ay })
        const spB = transform.point({ x: bx, y: by })
        const onScreen = (spA.x >= 0 && spA.x <= w && spA.y >= 0 && spA.y <= h)
          || (spB.x >= 0 && spB.x <= w && spB.y >= 0 && spB.y <= h)
        if (!onScreen) continue
        seen.set(node.id(), { ax, ay, bx, by, side: node.attrs.heightGuideSide ?? 1 })
      }

      const sig = `${stage.x()},${stage.y()},${scale}|` +
        [...seen.entries()].map(([id, s]) => `${id}:${s.ax},${s.ay},${s.bx},${s.by},${s.side}`).join(';')
      if (sig === prevSig) {
        rafId = requestAnimationFrame(tick)
        return
      }
      prevSig = sig

      const invScale = 1 / scale
      const gap = LABEL_GAP_SCREEN_PX * invScale
      for (const [id, s] of seen) {
        let text = texts.get(id)
        if (!text) {
          text = new Konva.Text({
            text: LABEL_TEXT, fontSize: LABEL_FONT_PX, fontStyle: '500', fill: LABEL_COLOR,
            listening: false, perfectDrawEnabled: false,
          })
          layer.add(text)
          texts.set(id, text)
        }
        const dx = s.bx - s.ax, dy = s.by - s.ay
        const len = Math.hypot(dx, dy)
        const ux = dx / len, uy = dy / len
        const nx = -uy * s.side, ny = ux * s.side
        // Evenwijdig aan de lijn, nooit ondersteboven (zie RoofGuideOverlay.jsx).
        let angleDeg = Math.atan2(dy, dx) * 180 / Math.PI
        if (angleDeg > 90 || angleDeg < -90) angleDeg += 180
        text.rotation(angleDeg)
        text.scale({ x: invScale, y: invScale })
        text.offsetX(text.width() / 2)
        text.offsetY(text.height() / 2)
        const along = LABEL_ALONG_SCREEN_PX * invScale
        text.position({
          x: (s.ax + s.bx) / 2 + nx * gap - ux * along,
          y: (s.ay + s.by) / 2 + ny * gap - uy * along,
        })
      }
      for (const [id, text] of [...texts]) {
        if (!seen.has(id)) { text.destroy(); texts.delete(id) }
      }

      layer.batchDraw()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      if (layer) layer.destroy()
      texts.clear()
    }
  }, [stageRef, mainLayerRef])

  return null
}
