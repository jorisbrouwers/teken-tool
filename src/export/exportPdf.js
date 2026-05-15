import { jsPDF } from 'jspdf'

const GRID_SIZE  = 25     // must match useGrid.js
const MARGIN     = 40     // whitespace around content, in stage-space units
const MAX_LONG   = 8000   // max output pixels on the longest side

export async function exportPdf(note, stage, showGrid) {
  const mainLayer = stage.getLayers()[0]
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

  // Capture Konva layers into an offscreen canvas
  const konvaCanvas = stage.toCanvas({
    x: canvasCropX,
    y: canvasCropY,
    width: canvasCropW,
    height: canvasCropH,
    pixelRatio,
  })

  // Composite in correct layer order: white background → grid → Konva content.
  // Grid is drawn before Konva so drawings appear on top of grid lines.
  // White fill is required before JPEG encoding (JPEG has no alpha channel).
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

  const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.85)
  const orientation = outputW >= outputH ? 'landscape' : 'portrait'
  const pdf = new jsPDF({ orientation, unit: 'px', format: [outputW, outputH] })
  pdf.addImage(dataUrl, 'JPEG', 0, 0, outputW, outputH)
  pdf.save(`notitie_${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}.pdf`)
}
