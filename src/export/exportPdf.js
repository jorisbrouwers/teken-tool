import { jsPDF } from 'jspdf'
import { hexToRgb, getPdfFontSize } from '../components/Canvas/pillStyle.js'
import { withCulledVisible } from '../components/Canvas/viewportCulling.js'

const GRID_SIZE  = 25     // must match useGrid.js
const MARGIN     = 40     // whitespace around content, in stage-space units
const MAX_LONG   = 8000   // max output pixels on the longest side

export async function exportPdf(note, stage, mainLayer, showGrid, showPillsInPdf = false, pillStyle, showHinges = true, showZonesInPdf = false) {
  const nodes = mainLayer.getChildren().filter(n => n.getClassName() !== 'Transformer')

  if (nodes.length === 0) {
    alert('Het canvas is leeg — niets om te exporteren.')
    return
  }

  // Bounding box in stage-space (zoom-independent, same coord system as node positions)
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  nodes.forEach(node => {
    const r = node.getClientRect({ relativeTo: stage })
    minX = Math.min(minX, r.x)
    minY = Math.min(minY, r.y)
    maxX = Math.max(maxX, r.x + r.width)
    maxY = Math.max(maxY, r.y + r.height)
  })

  // Crop region in stage-space, with margin
  const cropSX = minX - MARGIN
  const cropSY = minY - MARGIN
  const cropSW = (maxX - minX) + MARGIN * 2
  const cropSH = (maxY - minY) + MARGIN * 2

  // Output pixel dimensions: target 3 output px per stage unit, capped at MAX_LONG
  const targetScale = Math.min(3, MAX_LONG / Math.max(cropSW, cropSH))
  const outputW = Math.round(cropSW * targetScale)
  const outputH = Math.round(cropSH * targetScale)

  // Convert crop to canvas-pixel space for stage.toCanvas()
  // canvas_px = stage_coord * zoom + stage.position
  const zoom = stage.scaleX()
  const canvasCropX = cropSX * zoom + stage.x()
  const canvasCropY = cropSY * zoom + stage.y()
  const canvasCropW = cropSW * zoom
  const canvasCropH = cropSH * zoom
  const pixelRatio  = outputW / canvasCropW

  // Capture Konva layers into an offscreen canvas. Culled (off-screen) nodes
  // must be temporarily visible: the PDF covers the full content area.
  // stage.toCanvas() rastert alle layers (incl. de zone-vullaag, indien
  // aanwezig) — de zichtbaarheid daarvan wordt hier onafhankelijk van de
  // live canvas-toggle (showZones) tijdelijk op de export-keuze gezet.
  const zoneLayer = stage.findOne('.zoneFillLayer')
  const prevZoneVisible = zoneLayer?.visible()
  if (zoneLayer) zoneLayer.visible(showZonesInPdf)
  // De live "1.5m"-labels (HeightGuideLabels.jsx) zijn scherm-gebonden (alleen
  // on-screen, constante schermgrootte) — hier niet meerasteren, maar
  // hieronder apart tekenen via drawHeightGuideLabels.
  const guideLabelLayer = stage.findOne('.heightGuideLabelLayer')
  const prevGuideLabelVisible = guideLabelLayer?.visible()
  if (guideLabelLayer) guideLabelLayer.visible(false)
  // Technische hulplijnen (RoofGuideOverlay.jsx) zijn een tekenhulp, nooit
  // mee in de PDF — ook niet als de toggle aan staat.
  const roofGuideLayer = stage.findOne('.roofGuideLayer')
  const prevRoofGuideVisible = roofGuideLayer?.visible()
  if (roofGuideLayer) roofGuideLayer.visible(false)

  const konvaCanvas = withCulledVisible(mainLayer, () => stage.toCanvas({
    x: canvasCropX,
    y: canvasCropY,
    width: canvasCropW,
    height: canvasCropH,
    pixelRatio,
  }))

  if (zoneLayer) zoneLayer.visible(prevZoneVisible)
  if (guideLabelLayer) guideLabelLayer.visible(prevGuideLabelVisible)
  if (roofGuideLayer) roofGuideLayer.visible(prevRoofGuideVisible)

  // Composite in correct layer order: white background → grid → Konva content.
  const finalCanvas = document.createElement('canvas')
  finalCanvas.width  = outputW
  finalCanvas.height = outputH
  const ctx = finalCanvas.getContext('2d')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, outputW, outputH)

  if (showGrid) {
    ctx.beginPath()
    ctx.strokeStyle = '#d0d0d0'
    ctx.lineWidth = 2
    const firstNX = Math.floor(cropSX / GRID_SIZE)
    const firstNY = Math.floor(cropSY / GRID_SIZE)
    for (let n = firstNX; n * GRID_SIZE < cropSX + cropSW; n++) {
      const ex = (n * GRID_SIZE - cropSX) * targetScale
      if (ex < 0 || ex > outputW) continue
      ctx.moveTo(Math.round(ex) + 0.5, 0)
      ctx.lineTo(Math.round(ex) + 0.5, outputH)
    }
    for (let n = firstNY; n * GRID_SIZE < cropSY + cropSH; n++) {
      const ey = (n * GRID_SIZE - cropSY) * targetScale
      if (ey < 0 || ey > outputH) continue
      ctx.moveTo(0, Math.round(ey) + 0.5)
      ctx.lineTo(outputW, Math.round(ey) + 0.5)
    }
    ctx.stroke()
  }

  ctx.drawImage(konvaCanvas, 0, 0, outputW, outputH)

  if (showPillsInPdf) {
    drawMeasurementPills(ctx, nodes, cropSX, cropSY, targetScale, pillStyle)
  }
  drawHeightGuideLabels(ctx, nodes, cropSX, cropSY, targetScale, pillStyle, showPillsInPdf)

  const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.85)
  const orientation = outputW >= outputH ? 'landscape' : 'portrait'
  const pdf = new jsPDF({ orientation, unit: 'px', format: [outputW, outputH] })
  pdf.addImage(dataUrl, 'JPEG', 0, 0, outputW, outputH)
  pdf.save(`notitie_${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}.pdf`)
}

// Vast "1.5m"-label bij elke ingetekende 1,5m-lijn — altijd, net als op het
// canvas (zie HeightGuideLabels.jsx voor de plaatsing: aan de binnenkant,
// `heightGuideSide` +1 = links van ep0→ep1). Staan er maat-pills in de PDF
// (showPills), dan schuift het label langs de lijn opzij naast de pill;
// past het er niet naast (kort stuk, of een grote tekening waar de pill klein
// is t.o.v. de pagina), dan midden op de lijn, verder naar binnen dan de pill.
//
// Grootte zoals de pills: een vaste verhouding t.o.v. de tekening (niet de
// pagina — die is zo groot als de tekening, dus paginavaste tekst is bij een
// kleine tekening piepklein en bij een grote enorm), afgeleid van de
// pill-lettergrootte, ook als de pills zelf niet in de PDF staan.
const PDF_LABEL_TO_PILL_RATIO = 0.7
function drawHeightGuideLabels(ctx, nodes, cropSX, cropSY, targetScale, pillStyle, showPills) {
  const pillFontSize = Math.round(getPdfFontSize(pillStyle?.pillFontSize ?? 12) * targetScale)
  const fontSize = Math.max(1, Math.round(pillFontSize * PDF_LABEL_TO_PILL_RATIO))
  const gap = fontSize
  const margin = 4 * targetScale
  ctx.save()
  ctx.fillStyle = '#1d1d1d'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Pill-breedte om naast te gaan staan (zelfde maten als drawMeasurementPills).
  const pillPadX = Math.round(6 * targetScale)
  const pillPadY = Math.round(3 * targetScale)

  for (const node of nodes) {
    if (node.attrs.heightGuide !== 'edge') continue
    const pts = node.points()
    if (!pts || pts.length !== 4) continue
    const ax = (node.x() + pts[0] - cropSX) * targetScale, ay = (node.y() + pts[1] - cropSY) * targetScale
    const bx = (node.x() + pts[2] - cropSX) * targetScale, by = (node.y() + pts[3] - cropSY) * targetScale
    const dx = bx - ax, dy = by - ay
    const len = Math.hypot(dx, dy)
    if (len < 1) continue
    const ux = dx / len, uy = dy / len
    const side = node.attrs.heightGuideSide ?? 1
    const nx = -uy * side, ny = ux * side

    ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`
    const labelW = ctx.measureText('1.5m').width
    let along = 0, perp = gap
    if (showPills) {
      ctx.font = `bold ${pillFontSize}px system-ui, -apple-system, sans-serif`
      const pillW = ctx.measureText((len / targetScale / GRID_SIZE).toFixed(2)).width + pillPadX * 2
      ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`
      along = pillW / 2 + margin + labelW / 2
      if (len / 2 < along + labelW / 2) {
        along = 0
        perp = Math.max(gap, (pillFontSize + pillPadY * 2) / 2 + margin + fontSize / 2)
      }
    }
    if (len < labelW) continue // lijnstuk korter dan het label zelf

    const px = (ax + bx) / 2 + nx * perp - ux * along
    const py = (ay + by) / 2 + ny * perp - uy * along
    let angle = Math.atan2(dy, dx)
    if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI // nooit ondersteboven
    ctx.save()
    ctx.translate(px, py)
    ctx.rotate(angle)
    ctx.fillText('1.5m', 0, 0)
    ctx.restore()
  }
  ctx.restore()
}

// Draw measurement pills for Line/Arrow nodes with exactly 4 points,
// mirroring the logic in MeasurementLabels.jsx.
function drawMeasurementPills(ctx, nodes, cropSX, cropSY, targetScale, pillStyle) {
  const { pillColor = '#1971c2', pillOpacity = 100, pillFontSize = 12, pillTextColor = '#ffffff' } = pillStyle ?? {}
  const fontSize = Math.round(getPdfFontSize(pillFontSize) * targetScale)
  const padX     = Math.round(6 * targetScale)
  const padY     = Math.round(3 * targetScale)
  const alpha    = pillOpacity / 100
  const noFill   = pillOpacity === 0
  const { r: cr, g: cg, b: cb } = hexToRgb(pillColor)
  const { r: tr, g: tg, b: tb } = hexToRgb(pillTextColor)

  ctx.save()
  ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'

  for (const node of nodes) {
    if (!node.attrs.isWall) continue  // alleen lijnsysteem-segmenten krijgen een pill
    const cls = node.getClassName()
    if ((cls !== 'Line' && cls !== 'Arrow') || node.points().length !== 4) continue
    const id = node.id()
    if (!id) continue

    const pts      = node.points()
    const lengthPx = Math.hypot(pts[2] - pts[0], pts[3] - pts[1])
    if (lengthPx < 1) continue

    const mx = node.x() + (pts[0] + pts[2]) / 2
    const my = node.y() + (pts[1] + pts[3]) / 2
    const px = (mx - cropSX) * targetScale
    const py = (my - cropSY) * targetScale

    const lengthM = (lengthPx / GRID_SIZE).toFixed(2)
    const text    = `${lengthM}`
    const textW   = ctx.measureText(text).width
    const w       = textW + padX * 2
    const h       = fontSize + padY * 2
    const rad     = h / 2

    if (!noFill) {
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
      ctx.beginPath()
      ctx.roundRect(px - w / 2, py - h / 2, w, h, rad)
      ctx.fill()
    }

    ctx.fillStyle = `rgb(${tr},${tg},${tb})`
    ctx.fillText(text, px, py)
  }

  ctx.restore()
}
