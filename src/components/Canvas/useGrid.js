import { useEffect, useRef } from 'react'

// Base grid spacing in stage-space units (pixels at 1:1 zoom).
// Lines are drawn at this fixed real-world interval — just like OneNote.
const GRID_SIZE = 25

export function useGrid(canvasWrapperRef, gridCanvasRef, stageRef, showGrid) {
  const animFrameRef = useRef(null)

  useEffect(() => {
    const gridCanvas = gridCanvasRef.current
    if (!gridCanvas) return

    function drawGrid() {
      const stage = stageRef.current
      const ctx = gridCanvas.getContext('2d')
      const w = gridCanvas.width
      const h = gridCanvas.height

      ctx.clearRect(0, 0, w, h)
      if (!showGrid) return

      const zoom = stage ? stage.scaleX() : 1
      const panX = stage ? stage.x() : 0
      const panY = stage ? stage.y() : 0

      // Grid cell size in screen pixels: fixed real-world size × zoom.
      const step = GRID_SIZE * zoom

      // Line thickness scales with zoom so lines feel "real":
      // thin when zoomed out, thicker when zoomed in — same as OneNote.
      const lineWidth = Math.max(0.4, Math.min(zoom * 0.6, 1.5))

      ctx.beginPath()
      ctx.strokeStyle = '#d0d0d0'
      ctx.lineWidth = lineWidth

      const startX = ((panX % step) + step) % step
      const startY = ((panY % step) + step) % step

      for (let x = startX; x < w; x += step) {
        ctx.moveTo(Math.round(x) + 0.5, 0)
        ctx.lineTo(Math.round(x) + 0.5, h)
      }
      for (let y = startY; y < h; y += step) {
        ctx.moveTo(0, Math.round(y) + 0.5)
        ctx.lineTo(w, Math.round(y) + 0.5)
      }
      ctx.stroke()
    }

    function resize() {
      const wrapper = canvasWrapperRef.current
      if (!wrapper) return
      gridCanvas.width = wrapper.clientWidth
      gridCanvas.height = wrapper.clientHeight
      drawGrid()
    }

    const ro = new ResizeObserver(resize)
    if (canvasWrapperRef.current) ro.observe(canvasWrapperRef.current)
    resize()

    function tick() {
      drawGrid()
      animFrameRef.current = requestAnimationFrame(tick)
    }
    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [canvasWrapperRef, gridCanvasRef, stageRef, showGrid])
}
