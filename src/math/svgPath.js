// Converts perfect-freehand output (array of [x,y] pairs) to a smooth SVG path.
// Uses quadratic Bézier curves (Q) through consecutive midpoints for smooth rounding.
export function getSvgPathFromStroke(points) {
  if (!points.length) return ''

  const d = points.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...points[0], 'Q']
  )

  d.push('Z')
  return d.join(' ')
}
