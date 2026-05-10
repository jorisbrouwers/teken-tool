import { jsPDF } from 'jspdf'

const MARGIN = 40

export async function exportPdf(note, stage) {
  const mainLayer = stage.getLayers()[0]
  const nodes = mainLayer.getChildren().filter(n => n.getClassName() !== 'Transformer')

  if (nodes.length === 0) {
    alert('Het canvas is leeg — niets om te exporteren.')
    return
  }

  // Bounding box of all content in client coordinates
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  nodes.forEach(node => {
    const r = node.getClientRect()
    minX = Math.min(minX, r.x)
    minY = Math.min(minY, r.y)
    maxX = Math.max(maxX, r.x + r.width)
    maxY = Math.max(maxY, r.y + r.height)
  })

  const contentWidth = maxX - minX
  const contentHeight = maxY - minY

  // Convert client rect to stage coordinates for the crop
  const scale = stage.scaleX()
  const box = stage.container().getBoundingClientRect()
  const cropX = (minX - box.left - stage.x()) / scale
  const cropY = (minY - box.top  - stage.y()) / scale
  const cropW = contentWidth / scale
  const cropH = contentHeight / scale

  const dataUrl = stage.toDataURL({
    x: cropX,
    y: cropY,
    width: cropW,
    height: cropH,
    pixelRatio: 2,
    mimeType: 'image/png',
  })

  const pdfWidth = contentWidth + MARGIN * 2
  const pdfHeight = contentHeight + MARGIN * 2
  const orientation = pdfWidth >= pdfHeight ? 'landscape' : 'portrait'

  const pdf = new jsPDF({ orientation, unit: 'px', format: [pdfWidth, pdfHeight] })
  pdf.addImage(dataUrl, 'PNG', MARGIN, MARGIN, contentWidth, contentHeight)
  pdf.save(`${note.title.replace(/[^a-z0-9_\-. ]/gi, '_')}.pdf`)
}
