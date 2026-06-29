// Fallback voor opgeslagen s/m/l waarden
const LEGACY_PX  = { s: 10, m: 12, l: 15 }
const LEGACY_PDF = { s: 7,  m: 9,  l: 12 }

export function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function resolveFontSize(pillFontSize, legacy) {
  if (typeof pillFontSize === 'number') return pillFontSize
  return legacy[pillFontSize] ?? legacy.m
}

// Returns inline CSS style object for HTML pill elements
export function getPillCssStyle(pillStyle) {
  const { pillColor = '#1971c2', pillOpacity = 100, pillFontSize = 12, pillTextColor = '#ffffff' } = pillStyle ?? {}
  const fontSize = resolveFontSize(pillFontSize, LEGACY_PX)
  const alpha    = pillOpacity / 100
  const noFill   = pillOpacity === 0
  const { r, g, b } = hexToRgb(pillColor)
  return {
    background: noFill ? 'transparent' : `rgba(${r},${g},${b},${alpha})`,
    color:      pillTextColor,
    fontSize:   `${fontSize}px`,
    boxShadow:  noFill ? 'none' : undefined,
  }
}

// Returns font size in stage units for PDF rendering
export function getPdfFontSize(pillFontSize) {
  return Math.round(resolveFontSize(pillFontSize, LEGACY_PDF) * 0.83)
}
