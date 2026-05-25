import { useEffect, useRef, useCallback, useState, forwardRef, useImperativeHandle } from 'react'
import Konva from 'konva'

// Extra hit area (px) around strokes for tap-to-select and eraser detection.
// Larger = easier to tap thin lines; smaller = more precise eraser.
const HIT_MARGIN = 8


import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../../math/svgPath.js'
import { INPUT_CONFIG } from '../../platform/inputConfig.js'
import { usePersistence } from './usePersistence.js'
import { useHistory } from './useHistory.js'
import { useGrid } from './useGrid.js'
import { evaluateExpression } from '../../math/mathEval.js'
import { deserializeLayer, serializeNodes } from './konvaSerialize.js'
import { liveSnapshotCache } from './usePersistence.js'
import { getNote, updateNoteSettings } from '../../db/db.js'
import CropOverlay from './CropOverlay.jsx'
import Minimap from '../Minimap/Minimap.jsx'
import './Canvas.css'

const CanvasView = forwardRef(function CanvasView(
  { note, activeTool, penColor, penSize, opacity, strokeStyle, pressureSensitive, onInputDetected, shouldCenter, onCopy, onSelectionChange, snapEnabled = true },
  ref
) {
  // ─── DOM + Konva refs ───────────────────────────────────────────────────────
  const wrapperRef = useRef(null)
  const gridCanvasRef = useRef(null)
  const konvaContainerRef = useRef(null)
  const drawCanvasRef = useRef(null)   // raw canvas for in-progress freehand
  const stageRef = useRef(null)
  const mainLayerRef = useRef(null)
  const drawingLayerRef = useRef(null)
  const transformerRef = useRef(null)

  // ─── Prop refs (always current inside effects/callbacks) ────────────────────
  const penColorRef = useRef(penColor)
  const penSizeRef = useRef(penSize)
  const opacityRef = useRef(opacity)
  const strokeStyleRef = useRef(strokeStyle)
  const pressureSensitiveRef = useRef(pressureSensitive)
  const activeToolRef = useRef(activeTool)
  const onInputDetectedRef = useRef(onInputDetected)
  penColorRef.current = penColor
  penSizeRef.current = penSize
  opacityRef.current = opacity
  strokeStyleRef.current = strokeStyle
  pressureSensitiveRef.current = pressureSensitive
  activeToolRef.current = activeTool
  onInputDetectedRef.current = onInputDetected

  // ─── Floating toolbar state ─────────────────────────────────────────────────
  const toolbarDivRef = useRef(null)
  const toolbarTargetRef = useRef(null)
  const [imageLocked, setImageLocked] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [deleteHolding, setDeleteHolding] = useState(false)
  const deleteTimerRef = useRef(null)
  const [minimapVersion, setMinimapVersion] = useState(0)
  const [cropMode, setCropMode] = useState(false)
  const cropNodeRef = useRef(null)
  const cropSavedRotationRef = useRef(0)
  const cropSavedFlipRef = useRef({ x: 1, y: 1 })
  const [cropImageRect, setCropImageRect] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [cropRect, setCropRect] = useState({ left: 0, top: 0, right: 0, bottom: 0 })

  const showGrid = note.settings?.background === 'grid'

  const onSelectionChangeRef = useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange
  const snapEnabledRef = useRef(snapEnabled)
  snapEnabledRef.current = snapEnabled
  useEffect(() => { onSelectionChangeRef.current?.(selectedType !== null) }, [selectedType])

  // ─── History + persistence ──────────────────────────────────────────────────
  const history = useHistory(mainLayerRef, transformerRef)
  const historyPushRef = useRef(null)
  historyPushRef.current = history.pushState
  const persistenceScheduleRef = useRef(null)
  usePersistence(mainLayerRef, note.id, persistenceScheduleRef)

  function scheduleSnapshot() {
    persistenceScheduleRef.current?.()
    setMinimapVersion(v => v + 1)
  }

  // Survives Effect 3 re-runs (which reset local closure vars) so onClick doesn't
  // clear a selection that was just applied by a rubber-band drag.
  const justRubberBandedRef = useRef(false)
  const justHandledTapRef   = useRef(false)

  // ─── Toolbar positioning ────────────────────────────────────────────────────
  const positionAndShowToolbar = useCallback((node) => {
    const div   = toolbarDivRef.current
    const stage = stageRef.current
    const tr    = transformerRef.current
    if (!div || !node || !stage) return
    toolbarTargetRef.current = node
    const isImage = !!node.attrs.isImage
    setSelectedType(isImage ? 'image' : 'other')
    setImageLocked(!!node.attrs.isLocked)
    // Images get their own rotate buttons — hide the transformer rotation handle.
    if (tr) tr.rotateEnabled(!isImage)
    // getClientRect() is container-relative; position:fixed needs viewport coords.
    const r   = node.getClientRect()
    const box = stage.container().getBoundingClientRect()
    div.style.left = `${box.left + r.x + r.width / 2}px`
    div.style.top  = `${box.top + r.y - 48}px`
    div.style.display = 'flex'
  }, [])

  const hideToolbar = useCallback(() => {
    toolbarTargetRef.current = null
    setSelectedType(null)
    setImageLocked(false)
    if (toolbarDivRef.current) toolbarDivRef.current.style.display = 'none'
    // Restore rotation handle when deselecting.
    const tr = transformerRef.current
    if (tr) tr.rotateEnabled(true)
  }, [])

  // Toolbar boven de transformer bounding box voor multi-selectie.
  const positionToolbarAtTransformer = useCallback(() => {
    const div = toolbarDivRef.current
    const stage = stageRef.current
    const tr = transformerRef.current
    if (!div || !stage || !tr || !tr.nodes().length) return
    toolbarTargetRef.current = null
    setSelectedType('multi')
    setImageLocked(false)
    tr.rotateEnabled(true) // multi-selection keeps the rotation handle
    const r = tr.getClientRect()
    const box = stage.container().getBoundingClientRect()
    div.style.left = `${box.left + r.x + r.width / 2}px`
    div.style.top  = `${box.top + r.y - 48}px`
    div.style.display = 'flex'
  }, [])

  // ───────────────────────────────────────────────────────────────────────────
  // EFFECT 1 — Konva Stage initialisation (runs once per note)
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = konvaContainerRef.current
    if (!wrapper || !container) return

    const stage = new Konva.Stage({ container, width: wrapper.clientWidth, height: wrapper.clientHeight })
    const mainLayer   = new Konva.Layer()
    const drawingLayer = new Konva.Layer({ listening: false })
    stage.add(mainLayer)
    stage.add(drawingLayer)
    stageRef.current = stage
    mainLayerRef.current = mainLayer
    drawingLayerRef.current = drawingLayer

    const transformer = new Konva.Transformer({
      rotateEnabled: true,
      keepRatio: false,
      borderStroke: '#1971c2',
      borderStrokeWidth: 1,
      anchorSize: 25,
      anchorStroke: '#1971c2',
      anchorFill: '#fff',
      anchorCornerRadius: 22,   // fully circular
      padding: 16,
    })
    mainLayer.add(transformer)
    transformerRef.current = transformer

    function resizeDrawCanvas(dc, w, h) {
      const dpr = window.devicePixelRatio || 1
      dc.width  = w * dpr
      dc.height = h * dpr
      dc.style.width  = w + 'px'
      dc.style.height = h + 'px'
    }

    const ro = new ResizeObserver(() => {
      stage.width(wrapper.clientWidth)
      stage.height(wrapper.clientHeight)
      const dc = drawCanvasRef.current
      if (dc) resizeDrawCanvas(dc, wrapper.clientWidth, wrapper.clientHeight)
    })
    ro.observe(wrapper)

    // Herbereken canvas-afmetingen bij browser-zoom (devicePixelRatio verandert dan mee)
    const onDprChange = () => {
      const dc = drawCanvasRef.current
      if (dc) resizeDrawCanvas(dc, wrapper.clientWidth, wrapper.clientHeight)
    }
    const dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    dprQuery.addEventListener('change', onDprChange)
    const dc = drawCanvasRef.current
    if (dc) resizeDrawCanvas(dc, wrapper.clientWidth, wrapper.clientHeight)

    // Capture shouldCenter at effect-run time (not reactive — intentional).
    const capturedShouldCenter = shouldCenter

    // Load snapshot: in-memory cache first (always current within a session),
    // then fall back to IndexedDB for first load or after page reload.
    function afterLoad() {
      // Apply saved zoom/pan immediately so the stage is positioned correctly
      // for operations (e.g. paste) that happen before the settle timeout below.
      if (!capturedShouldCenter) {
        const zoom = note.settings?.zoom
        const pan  = note.settings?.pan
        if (zoom) stage.scale({ x: zoom, y: zoom })
        if (pan)  stage.position(pan)
        if (zoom || pan) stage.batchDraw()
      }

      setTimeout(() => {
        if (cancelled) return
        // Old snapshots may have been saved with culled (visible:false) nodes — reset them all.
        mainLayer.getChildren().forEach(n => {
          if (n.getClassName() !== 'Transformer') n.visible(true)
        })
        history.reset()
        if (capturedShouldCenter) {
          // User explicitly opened this note — center on content.
          const nodes = mainLayer.getChildren().filter(n => n.getClassName() !== 'Transformer')
          if (!nodes.length) return
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
          nodes.forEach(n => {
            const r = n.getClientRect({ relativeTo: stage })
            minX = Math.min(minX, r.x)
            minY = Math.min(minY, r.y)
            maxX = Math.max(maxX, r.x + r.width)
            maxY = Math.max(maxY, r.y + r.height)
          })
          const pad   = 60
          const viewW = stage.width()
          const viewH = stage.height()
          const scale = Math.min((viewW - pad * 2) / (maxX - minX), (viewH - pad * 2) / (maxY - minY), 3)
          const cx = (minX + maxX) / 2
          const cy = (minY + maxY) / 2
          const newX = viewW / 2 - cx * scale
          const newY = viewH / 2 - cy * scale
          stage.scale({ x: scale, y: scale })
          stage.position({ x: newX, y: newY })
          stage.batchDraw()
          updateNoteSettings(note.id, { ...note.settings, zoom: scale, pan: { x: newX, y: newY } })
        } else {
          stage.batchDraw()
        }
        setMinimapVersion(v => v + 1)
      }, 150)
    }

    let cancelled = false
    const cached = liveSnapshotCache.get(note.id)
    if (cached) {
      deserializeLayer(cached, mainLayer)
      afterLoad()
    } else {
      getNote(note.id).then(fresh => {
        if (cancelled) return
        if (fresh?.snapshot) {
          deserializeLayer(fresh.snapshot, mainLayer)
          afterLoad()
        } else {
          history.reset()
        }
      })
    }

    return () => {
      cancelled = true
      ro.disconnect()
      dprQuery.removeEventListener('change', onDprChange)
      stage.destroy()
      stageRef.current = null
      mainLayerRef.current = null
      drawingLayerRef.current = null
      transformerRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id])

  // Shared eraser logic used by Effect 2 (pen eraser button) and Effect 3.
  // Dense grid sampling with getIntersection gives pixel-accurate hit testing:
  // freehand Path fills match the ink polygon exactly, stroked shapes only hit
  // their border (no fill on committed shapes), so hollow interiors are ignored.
  function eraseAtContainerPos(containerPos, mainLayer, transformer) {
    const R = 8  // eraser radius in container/screen pixels
    const STEP = 3
    const toDestroy = new Set()
    for (let dy = -R; dy <= R; dy += STEP) {
      for (let dx = -R; dx <= R; dx += STEP) {
        if (dx * dx + dy * dy > R * R) continue
        const hit = mainLayer.getIntersection({ x: containerPos.x + dx, y: containerPos.y + dy })
        if (hit && hit.getClassName() !== 'Transformer' && !hit.attrs.isImage) {
          toDestroy.add(hit)
        }
      }
    }
    let erased = false
    for (const node of toDestroy) {
      if (node.getLayer()) { node.destroy(); erased = true }
    }
    if (erased) {
      transformer?.nodes([])
      mainLayer.batchDraw()
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // EFFECT 2 — Raw pointer events
  //
  // Responsibility: pen-eraser detection, input-type notification, touch
  // pan/zoom, mouse alt-drag pan. Everything else is left to Konva (Effect 3).
  //
  // Touch is ALWAYS intercepted here so Konva never sees touch events.
  // Selection via touch is handled manually in onPointerUp (tap detection).
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = konvaContainerRef.current
    if (!container) return

    const touchPointers = new Map()
    let lastPinchDist = null
    let lastPinchMid = null
    let lastInputType = null
    let mousePanning = false
    let lastMousePos = { x: 0, y: 0 }
    let wheelRestoreTimer = null
    let navActive = false        // true while any navigation gesture is in progress
    let savedSelection = []     // transformer nodes saved at nav start, restored at nav end
    let dragRaf       = null   // RAF token for image-drag redraws
    let lastDrawPos   = null   // stage position at nav start (CSS transform baseline)
    let lastDrawScale = null   // stage scale at nav start

    // Frozen snapshot canvas: at startNav we GPU-blit the Konva canvas into this
    // element and apply CSS transforms to it. The live Konva canvas is hidden below
    // the overlay so it can redraw freely without causing double-shift artifacts.
    const frozenCanvas = document.createElement('canvas')
    frozenCanvas.style.cssText =
      'position:absolute;top:0;left:0;pointer-events:none;display:none;transform-origin:0 0'
    container.appendChild(frozenCanvas)

    // CSS transform that maps the frozen nav-start bitmap to the current stage state.
    // Called synchronously on every pointer/wheel event — no RAF lag.
    function applyNavTransform() {
      if (!lastDrawPos || !lastDrawScale) return
      const stage = stageRef.current
      if (!stage) return
      const pos = stage.position(), scale = stage.scaleX()
      const s  = scale / lastDrawScale
      const tx = pos.x - lastDrawPos.x * s
      const ty = pos.y - lastDrawPos.y * s
      frozenCanvas.style.transform = `matrix(${s},0,0,${s},${tx},${ty})`
    }

    function scheduleImageDragDraw() {
      if (dragRaf) return
      dragRaf = requestAnimationFrame(() => {
        dragRaf = null
        mainLayerRef.current?.batchDraw()
      })
    }

    // Double-tap detection state (touch/finger only)
    let lastTapTime   = 0
    let lastTapClient = null   // { x, y } of the previous tap

    // 1-finger touch image drag state
    let touchDragNode = null      // selected image being dragged with 1 finger
    let touchDragStageStart = null
    let touchDragNodeOrigin = null
    let touchDragMoved = false
    let twoFingerActive = false   // true once 2 fingers were active; blocks leftover-finger pan

    // Transformer handle touch resize state.
    // When a touch lands near a handle we let the event pass through to Konva
    // (no stopImmediatePropagation) so its built-in resize/rotate logic fires.
    let touchResizePointerId = null

    function notifyInputType(type) {
      if (type !== lastInputType) {
        lastInputType = type
        onInputDetectedRef.current?.(type)
      }
    }

    function getContainerPos(clientX, clientY) {
      const box = container.getBoundingClientRect()
      return { x: clientX - box.left, y: clientY - box.top }
    }

    function clientToStageCoord(clientX, clientY) {
      const stage = stageRef.current
      if (!stage) return { x: 0, y: 0 }
      const box = container.getBoundingClientRect()
      return {
        x: (clientX - box.left - stage.x()) / stage.scaleX(),
        y: (clientY - box.top  - stage.y()) / stage.scaleY(),
      }
    }

    // Returns the transformer anchor under containerPos, or null.
    // Uses a rectangular test that matches Konva's actual anchor rect so the two
    // hit systems stay in sync: our function detects the anchor AND Konva's canvas
    // hit-detection also finds it, which is required for resize to start.
    // A small PADDING handles sub-pixel rounding between the two systems.
    function findTouchedAnchor(containerPos) {
      const tr = transformerRef.current
      if (!tr || !tr.nodes().length) return null
      const PADDING = 6  // px buffer around the visual anchor rect
      for (const anchor of tr.getChildren()) {
        const r = anchor.getClientRect()
        if (
          containerPos.x >= r.x - PADDING && containerPos.x <= r.x + r.width  + PADDING &&
          containerPos.y >= r.y - PADDING && containerPos.y <= r.y + r.height + PADDING
        ) {
          return anchor
        }
      }
      return null
    }

    function doErase(clientX, clientY) {
      const stage = stageRef.current
      const mainLayer = mainLayerRef.current
      const transformer = transformerRef.current
      if (!stage || !mainLayer) return
      const pos = getContainerPos(clientX, clientY)
      eraseAtContainerPos(pos, mainLayer, transformer)
    }

    function updateAnchorSize(scale) {
      const tr = transformerRef.current
      if (tr) tr.anchorSize(Math.max(10, Math.min(22, 22 / scale)))
    }

    function savePanZoom() {
      const stage = stageRef.current
      if (!stage) return
      updateNoteSettings(note.id, {
        ...note.settings,
        zoom: stage.scaleX(),
        pan: { x: stage.x(), y: stage.y() },
      })
    }

    // Smooth animated pan+zoom to a target stage position and scale.
    // Uses the frozenCanvas overlay so the canvas stays crisp during the animation.
    function animateNav(targetX, targetY, targetScale, duration = 280) {
      const stage = stageRef.current
      if (!stage) return
      startNav()
      const x0 = stage.x(), y0 = stage.y(), s0 = stage.scaleX()
      const t0 = performance.now()
      function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
      function frame(now) {
        const t = Math.min((now - t0) / duration, 1)
        const e = ease(t)
        const s = s0 + (targetScale - s0) * e
        stage.scale({ x: s, y: s })
        stage.position({ x: x0 + (targetX - x0) * e, y: y0 + (targetY - y0) * e })
        updateAnchorSize(s)
        applyNavTransform()
        if (t < 1) {
          requestAnimationFrame(frame)
        } else {
          endNav()
          savePanZoom()
        }
      }
      requestAnimationFrame(frame)
    }

    // Deselect everything at navigation start so Konva never calls getClientRect()
    // on selected nodes during batchDraw() while panning/zooming.
    // Also disable draggable on all nodes: Konva's internal drag system registers
    // pointermove listeners on the window (outside our capture interceptor's reach)
    // which can move draggable nodes during pinch even though we stop the events at
    // the container level. Setting draggable(false) prevents this completely.
    // Selection + toolbar are fully restored when navigation ends.
    function startNav() {
      if (navActive) return
      navActive = true
      const stage = stageRef.current
      const tr = transformerRef.current
      if (tr) {
        savedSelection = tr.nodes().slice()
        tr.nodes([])
      }
      // Capture the stage state as the initial CSS-transform baseline.
      // (Konva just drew at this position, so the baseline is correct.)
      if (stage) {
        lastDrawPos   = { ...stage.position() }
        lastDrawScale = stage.scaleX()
      }
      const layer = mainLayerRef.current
      if (layer) {
        layer.getChildren().forEach(n => {
          if (n.getClassName() !== 'Transformer') n.draggable(false)
        })
        // GPU-blit the current Konva canvas into the frozen snapshot overlay.
        // drawImage() is a GPU copy and completes in microseconds regardless of
        // how many strokes are rendered.
        const src = layer.getCanvas()._canvas
        frozenCanvas.width = src.width
        frozenCanvas.height = src.height
        frozenCanvas.style.width = src.style.width || src.width + 'px'
        frozenCanvas.style.height = src.style.height || src.height + 'px'
        frozenCanvas.getContext('2d').drawImage(src, 0, 0)
        src.style.visibility = 'hidden'
        frozenCanvas.style.display = ''
        // Suppress Konva auto-redraws: the overlay hides the live canvas, so
        // redraws waste CPU. Stage state is still updated for the grid RAF loop.
        layer.batchDraw = () => {}
      }
      if (toolbarDivRef.current) toolbarDivRef.current.style.display = 'none'
    }

    function endNav() {
      if (!navActive) return
      navActive = false
      const tr = transformerRef.current
      const layer = mainLayerRef.current
      if (tr && savedSelection.length) {
        // Filter out nodes that were destroyed while navigating.
        const stillAlive = savedSelection.filter(n => n.getStage() !== null)
        tr.nodes(stillAlive)
        savedSelection = []
      }
      lastDrawPos   = null
      lastDrawScale = null
      // Restore correct draggable state based on current tool.
      if (layer) {
        const canDrag = activeToolRef.current === 'select'
        layer.getChildren().forEach(n => {
          if (n.getClassName() === 'Transformer') return
          if (n.attrs.isImage) n.draggable(!n.attrs.isLocked && canDrag)
          else n.draggable(canDrag)
        })
      }
      if (layer) {
        delete layer.batchDraw          // restore Konva's normal batchDraw
        layer.draw()                    // redraw at current stage state (synchronous)
        layer.getCanvas()._canvas.style.visibility = ''  // restore live canvas
        frozenCanvas.style.display = 'none'
        frozenCanvas.style.transform  = ''
      }
      // Reposition toolbar: single-node target takes precedence, otherwise
      // reposition for multi-selection if transformer still has nodes.
      if (toolbarTargetRef.current?.getStage()) {
        positionAndShowToolbar(toolbarTargetRef.current)
      } else if ((transformerRef.current?.nodes().length ?? 0) > 1) {
        positionToolbarAtTransformer()
      }
    }

    function getTwoFingerInfo() {
      const pts = Array.from(touchPointers.values())
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
      const mid  = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
      return { dist, mid }
    }

    function onPointerDown(e) {
      // ── Pen eraser button ──────────────────────────────────────────────
      if (e.pointerType === 'pen' && (e.button === 5 || (e.buttons & 32))) {
        notifyInputType('pen-eraser')
        e.stopImmediatePropagation()
        doErase(e.clientX, e.clientY)
        return
      }

      // ── Pen tip ────────────────────────────────────────────────────────
      if (e.pointerType === 'pen') {
        notifyInputType('pen')
        return // Let Konva handle pen-tip events (Effect 3)
      }

      // ── Touch ──────────────────────────────────────────────────────────
      if (e.pointerType === 'touch') {
        notifyInputType('touch')
        e.preventDefault() // always prevent browser scroll/zoom

        // Register the pointer first so touchPointers.size reflects the new total.
        touchPointers.set(e.pointerId, {
          x: e.clientX, y: e.clientY,
          startX: e.clientX, startY: e.clientY,
        })

        if (touchPointers.size === 1) {
          // First finger: check if it lands on a transformer anchor.
          // The pointer stays in touchPointers so that a second finger can
          // switch to pinch instead of being blocked by touchResizePointerId.
          const anchorHitPos = getContainerPos(e.clientX, e.clientY)
          const anchor = findTouchedAnchor(anchorHitPos)
          if (anchor) {
            touchResizePointerId = e.pointerId
            // Do NOT stopImmediatePropagation — Konva must see this event.
            return
          }

          e.stopImmediatePropagation()
          // Reset gesture state for a fresh 1-finger interaction.
          twoFingerActive = false
          touchDragNode = null
          touchDragMoved = false
          // If in select mode, check whether the finger lands on a currently-selected,
          // non-locked image. If so, dragging moves the image instead of panning.
          if (activeToolRef.current === 'select') {
            const tr = transformerRef.current
            const selected = tr?.nodes() ?? []
            if (selected.length > 0) {
              const pos = getContainerPos(e.clientX, e.clientY)
              for (const node of selected) {
                if (!node.attrs.isImage || node.attrs.isLocked) continue
                const r = node.getClientRect()
                if (pos.x >= r.x && pos.x <= r.x + r.width &&
                    pos.y >= r.y && pos.y <= r.y + r.height) {
                  touchDragNode = node
                  touchDragStageStart = clientToStageCoord(e.clientX, e.clientY)
                  touchDragNodeOrigin = { x: node.x(), y: node.y() }
                  break
                }
              }
            }
          }
        } else if (touchPointers.size === 2) {
          // Second finger joins: always switch to pan/pinch, even when the first
          // finger is mid-resize on an anchor (cancel the resize).
          e.stopImmediatePropagation()
          touchResizePointerId = null // cancel any ongoing single-finger resize
          twoFingerActive = true
          if (touchDragNode && touchDragMoved) {
            positionAndShowToolbar(touchDragNode)
            historyPushRef.current?.()
            persistenceScheduleRef.current?.()
          }
          touchDragNode = null
          touchDragMoved = false
          startNav()
          const info = getTwoFingerInfo()
          lastPinchDist = info.dist
          lastPinchMid  = { ...info.mid }
        } else {
          // 3+ fingers: just block.
          e.stopImmediatePropagation()
        }
        return
      }

      // ── Mouse alt-drag / middle-button pan ─────────────────────────────
      if (e.pointerType === 'mouse' && (e.altKey || e.button === 1)) {
        mousePanning = true
        lastMousePos = { x: e.clientX, y: e.clientY }
        startNav()
        e.stopImmediatePropagation()
        return
      }
    }

    function onPointerMove(e) {
      // ── Pen eraser held ────────────────────────────────────────────────
      if (e.pointerType === 'pen' && (e.buttons & 32)) {
        e.stopImmediatePropagation()
        const events = e.getCoalescedEvents?.() ?? [e]
        for (const ce of events) doErase(ce.clientX, ce.clientY)
        return
      }

      // ── Touch drag / pinch ─────────────────────────────────────────────
      if (e.pointerType === 'touch') {
        // Single-finger resize: let the anchor pointer through to Konva.
        if (e.pointerId === touchResizePointerId && touchPointers.size === 1) { e.preventDefault(); return }
        if (!touchPointers.has(e.pointerId)) return
        e.stopImmediatePropagation()
        e.preventDefault()
        const prev = touchPointers.get(e.pointerId)
        touchPointers.set(e.pointerId, { ...prev, x: e.clientX, y: e.clientY })

        const stage = stageRef.current
        if (!stage) return

        if (touchPointers.size === 1 && !twoFingerActive) {
          if (touchDragNode) {
            // Move the selected image with 1 finger — no pan.
            const sc = clientToStageCoord(e.clientX, e.clientY)
            touchDragNode.position({
              x: touchDragNodeOrigin.x + sc.x - touchDragStageStart.x,
              y: touchDragNodeOrigin.y + sc.y - touchDragStageStart.y,
            })
            touchDragMoved = true
            if (toolbarDivRef.current) toolbarDivRef.current.style.display = 'none'
            scheduleImageDragDraw()
          } else {
            // Normal 1-finger pan.
            const moved = Math.hypot(e.clientX - prev.startX, e.clientY - prev.startY)
            if (moved >= 12) {
              startNav()
              stage.position({
                x: stage.x() + e.clientX - prev.x,
                y: stage.y() + e.clientY - prev.y,
              })
              applyNavTransform()
                          }
          }
        } else if (touchPointers.size === 2) {
          // 2-finger pan + pinch — startNav already called in onPointerDown.
          const info = getTwoFingerInfo()
          if (lastPinchDist !== null) {
            const scaleFactor = info.dist / lastPinchDist
            const newZoom = Math.min(Math.max(stage.scaleX() * scaleFactor, 0.1), 10)
            const box = container.getBoundingClientRect()
            const midOnStage = {
              x: (info.mid.x - box.left - stage.x()) / stage.scaleX(),
              y: (info.mid.y - box.top  - stage.y()) / stage.scaleY(),
            }
            stage.scale({ x: newZoom, y: newZoom })
            stage.position({
              x: info.mid.x - box.left - midOnStage.x * newZoom + (lastPinchMid ? info.mid.x - lastPinchMid.x : 0),
              y: info.mid.y - box.top  - midOnStage.y * newZoom + (lastPinchMid ? info.mid.y - lastPinchMid.y : 0),
            })
            updateAnchorSize(newZoom)
            applyNavTransform()
                      }
          lastPinchDist = info.dist
          lastPinchMid  = { ...info.mid }
        }
        return
      }

      // ── Mouse pan ──────────────────────────────────────────────────────
      if (mousePanning) {
        const stage = stageRef.current
        if (stage) {
          stage.position({
            x: stage.x() + e.clientX - lastMousePos.x,
            y: stage.y() + e.clientY - lastMousePos.y,
          })
          applyNavTransform()
                  }
        lastMousePos = { x: e.clientX, y: e.clientY }
      }
    }

    function onPointerUp(e) {
      // ── Touch tap / pan end ────────────────────────────────────────────
      if (e.pointerType === 'touch') {
        // Single-finger resize end: let Konva handle, then clear resize state.
        if (e.pointerId === touchResizePointerId && touchPointers.size === 1) {
          touchResizePointerId = null
          touchPointers.delete(e.pointerId)
          e.preventDefault()
          // transformend in Effect 3 pushes history and repositions the toolbar.
          return
        }
        e.stopImmediatePropagation()
        e.preventDefault()
        const ptr = touchPointers.get(e.pointerId)
        touchPointers.delete(e.pointerId)
        lastPinchDist = null
        lastPinchMid  = null

        if (ptr && touchPointers.size === 0) {
          // Commit image drag if the image actually moved.
          if (touchDragNode && touchDragMoved) {
            const tr = transformerRef.current
            tr?.nodes([touchDragNode])
            mainLayerRef.current?.batchDraw()
            positionAndShowToolbar(touchDragNode)
            historyPushRef.current?.()
            persistenceScheduleRef.current?.()
            touchDragNode = null
            touchDragMoved = false
            twoFingerActive = false
            savePanZoom()
            return
          }
          touchDragNode = null
          touchDragMoved = false
          twoFingerActive = false

          endNav() // restore selection + toolbar
          const moved = Math.hypot(e.clientX - ptr.startX, e.clientY - ptr.startY)
          // Skip tap detection after a multi-finger gesture (twoFingerActive was just cleared
          // but we detect the gesture via navActive having been true during the gesture).
          // Use the moved threshold: multi-finger gestures always move > 12 px total.
          if (moved < 12) {
            // ── Double-tap detection (finger only) ──────────────────────────
            const now = Date.now()
            const tapDist = lastTapClient
              ? Math.hypot(e.clientX - lastTapClient.x, e.clientY - lastTapClient.y)
              : Infinity
            if (now - lastTapTime < 350 && tapDist < 40) {
              // Double-tap: navigate to the tapped location.
              lastTapTime   = 0
              lastTapClient = null
              const stage = stageRef.current
              const cont  = stage?.container()
              if (stage && cont) {
                const pos = getContainerPos(e.clientX, e.clientY)
                const mainLayer = mainLayerRef.current
                // Hit-test: check normal nodes, then locked images manually.
                let hit = mainLayer?.getIntersection(pos)
                if (!hit || hit.getClassName() === 'Transformer') {
                  const children = mainLayer?.getChildren() ?? []
                  for (let i = children.length - 1; i >= 0; i--) {
                    const n = children[i]
                    if (!n.attrs.isLocked) continue
                    const r = n.getClientRect()
                    if (pos.x >= r.x && pos.x <= r.x + r.width &&
                        pos.y >= r.y && pos.y <= r.y + r.height) { hit = n; break }
                  }
                }
                const cW = cont.clientWidth, cH = cont.clientHeight
                const sc = stage.scaleX()
                if (hit && hit.getClassName() !== 'Transformer' && hit.attrs.isImage) {
                  // Zoom to fit the image with margin.
                  const rect = hit.getClientRect()
                  const MARGIN = 1.5
                  const targetScale = Math.max(0.1, Math.min(10,
                    Math.min(cW / (rect.width  / sc * MARGIN),
                             cH / (rect.height / sc * MARGIN))
                  ))
                  const imgCX = (rect.x + rect.width  / 2 - stage.x()) / sc
                  const imgCY = (rect.y + rect.height / 2 - stage.y()) / sc
                  animateNav(cW / 2 - imgCX * targetScale, cH / 2 - imgCY * targetScale, targetScale)
                } else {
                  // Center canvas on the tapped point, keep current zoom.
                  const stCoord = clientToStageCoord(e.clientX, e.clientY)
                  animateNav(cW / 2 - stCoord.x * sc, cH / 2 - stCoord.y * sc, sc)
                }
              }
              savePanZoom()
              return
            }
            // Record this tap for potential double-tap detection next time.
            lastTapTime   = now
            lastTapClient = { x: e.clientX, y: e.clientY }

            // ── Single tap: manual hit-test and selection ────────────────────
            // Locked images have listening:false so getIntersection skips them;
            // we check them manually via bounding-box after the normal hit test.
            const pos = getContainerPos(e.clientX, e.clientY)
            const mainLayer  = mainLayerRef.current
            const transformer = transformerRef.current
            let hit = mainLayer?.getIntersection(pos)

            if (!hit || hit.getClassName() === 'Transformer') {
              // Fall back to manual bounding-box check for locked images.
              const children = mainLayer?.getChildren() ?? []
              for (let i = children.length - 1; i >= 0; i--) {
                const n = children[i]
                if (!n.attrs.isLocked) continue
                const r = n.getClientRect()
                if (pos.x >= r.x && pos.x <= r.x + r.width &&
                    pos.y >= r.y && pos.y <= r.y + r.height) {
                  hit = n
                  break
                }
              }
            }

            if (hit && hit.getClassName() !== 'Transformer') {
              if (hit.attrs.isLocked) {
                positionAndShowToolbar(hit)
              } else {
                transformer?.nodes([hit])
                mainLayer.batchDraw()
                positionAndShowToolbar(hit)
              }
            } else {
              transformer?.nodes([])
              mainLayer?.batchDraw()
              hideToolbar()
            }
          }
          savePanZoom()
        }
        return
      }

      // ── Mouse pan end ──────────────────────────────────────────────────
      if (mousePanning) {
        mousePanning = false
        endNav()
        savePanZoom()
      }
    }

    function onWheel(e) {
      e.preventDefault()
      const stage = stageRef.current
      if (!stage) return
      startNav()
      clearTimeout(wheelRestoreTimer)
      wheelRestoreTimer = setTimeout(() => {
        endNav()
        savePanZoom()
      }, 150)

      const scaleBy  = 1.15
      const oldScale = stage.scaleX()
      const box = container.getBoundingClientRect()
      const ptr = { x: e.clientX - box.left, y: e.clientY - box.top }
      const newScale = e.deltaY < 0
        ? Math.min(oldScale * scaleBy, 10)
        : Math.max(oldScale / scaleBy, 0.1)
      stage.scale({ x: newScale, y: newScale })
      stage.position({
        x: ptr.x - (ptr.x - stage.x()) * (newScale / oldScale),
        y: ptr.y - (ptr.y - stage.y()) * (newScale / oldScale),
      })
      updateAnchorSize(newScale)
      applyNavTransform()
    }

    container.addEventListener('pointerdown',  onPointerDown, { capture: true })
    container.addEventListener('pointermove',  onPointerMove, { capture: true })
    container.addEventListener('pointerup',    onPointerUp,   { capture: true })
    container.addEventListener('pointercancel',onPointerUp,   { capture: true })
    container.addEventListener('wheel',        onWheel,       { passive: false })

    return () => {
      container.removeEventListener('pointerdown',  onPointerDown, { capture: true })
      container.removeEventListener('pointermove',  onPointerMove, { capture: true })
      container.removeEventListener('pointerup',    onPointerUp,   { capture: true })
      container.removeEventListener('pointercancel',onPointerUp,   { capture: true })
      container.removeEventListener('wheel',        onWheel,       { passive: false })
      clearTimeout(wheelRestoreTimer)
      if (container.contains(frozenCanvas)) container.removeChild(frozenCanvas)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id, positionAndShowToolbar, hideToolbar, positionToolbarAtTransformer])

  // ───────────────────────────────────────────────────────────────────────────
  // EFFECT 3 — Konva drawing / selection events
  //
  // Pen tip and mouse events reach Konva because Effect 2 does NOT intercept
  // them. Touch events are always intercepted in Effect 2, so we check
  // e.evt.pointerType === 'touch' at the top of every handler and bail early.
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const stage        = stageRef.current
    const mainLayer    = mainLayerRef.current
    const drawingLayer = drawingLayerRef.current
    const transformer  = transformerRef.current
    if (!stage || !mainLayer || !drawingLayer || !transformer) return

    // Convert stage.getPointerPosition() (container-relative) to stage-space coords.
    function stagePos() {
      const p = stage.getPointerPosition()
      if (!p) return { x: 0, y: 0 }
      return {
        x: (p.x - stage.x()) / stage.scaleX(),
        y: (p.y - stage.y()) / stage.scaleY(),
      }
    }

    // Convert raw client coordinates to stage-space coords.
    // Used for coalesced/predicted events which don't go through Konva's pointer tracking.
    function clientToStage(clientX, clientY) {
      const box = stage.container().getBoundingClientRect()
      return {
        x: (clientX - box.left - stage.x()) / stage.scaleX(),
        y: (clientY - box.top  - stage.y()) / stage.scaleY(),
      }
    }

    // ── Freehand / shape / selection state (local to this effect) ──────────
    let freehandPoints      = []    // accumulated [x, y, pressure] points
    let shapePreview        = null  // temporary shape on drawingLayer
    let shapeStart          = { x: 0, y: 0 }
    let snapIndicator       = null  // dashed snap indicator line on drawingLayer
    let selecting           = false
    let selStart            = { x: 0, y: 0 }
    let erasing             = false
    let rafId               = null  // pending requestAnimationFrame for live stroke
    let lastRawEvent        = null  // most recent pointerrawupdate event (for getPredictedEvents)
    let rawUpdateActive     = false // true once pointerrawupdate fires → skip pointermove collection
    let draggingNodes       = false // manual drag of selected nodes via bounding-box click
    let dragOriginPos       = { x: 0, y: 0 }
    let dragNodeOrigins     = []    // [{ node, x, y }] snapshot at drag start
    let dragSavedNodes      = []    // full transformer selection, restored after drag
    const justRubberBanded  = justRubberBandedRef // ref — survives Effect 3 re-runs
    const justHandledTap    = justHandledTapRef

    function scheduleRenderLiveStroke() {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        // Aantal voorspelde punten: 0 = geen vooruitlopen (stabiel), hoger = responsiever maar kans op uitschieten.
        // Typisch bruikbaar bereik: 1–3. Aanpassen als tekenen spastisch aanvoelt.
        const PREDICTED_POINTS = 1
        const predicted = []
        // Op iOS/Safari zijn predicted events onstabiel en worden overgeslagen.
        // Op Windows/Chromium werken ze correct (pointerrawupdate + getPredictedEvents).
        if (INPUT_CONFIG.usePredictedEvents && lastRawEvent?.getPredictedEvents) {
          for (const ce of lastRawEvent.getPredictedEvents().slice(0, PREDICTED_POINTS)) {
            const p = clientToStage(ce.clientX, ce.clientY)
            const raw = pressureSensitiveRef.current ? (ce.pressure ?? 0.5) : 0.5
            predicted.push([p.x, p.y, Math.pow(raw, INPUT_CONFIG.pressureExponentRender)])
          }
        }
        renderLiveStroke(predicted)
      })
    }

    // Rubber-band selection rectangle
    const selRect = new Konva.Rect({
      fill: 'rgba(0,120,215,0.12)', stroke: '#0078d4', strokeWidth: 1,
      visible: false, listening: false,
    })
    drawingLayer.add(selRect)

    // ── Live freehand rendering (raw Canvas 2D — no Konva overhead) ────────
    // desynchronized:true lets the GPU composite the canvas without waiting for
    // the next CPU frame, shaving up to one full frame of display latency.
    function getCtx() {
      const canvas = drawCanvasRef.current
      return canvas ? canvas.getContext('2d', { desynchronized: true }) : null
    }

    function renderLiveStroke(predictedPts = []) {
      const canvas = drawCanvasRef.current
      const ctx = getCtx()
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const rawPts = predictedPts.length ? [...freehandPoints, ...predictedPts] : freehandPoints
      if (rawPts.length < 2) return

      // Normalize to screen space so perfect-freehand always works with realistic
      // coordinate magnitudes regardless of zoom level.
      const scale = stage.scaleX()
      const allPts = rawPts.map(([x, y, p]) => [x * scale, y * scale, p])

      const strokePoints = getStroke(allPts, {
        size: penSizeRef.current * 2 * scale,
        thinning: pressureSensitiveRef.current ? 0.75 : 0,
        smoothing: INPUT_CONFIG.smoothing,
        streamline: INPUT_CONFIG.streamline,
        simulatePressure: false,
      })
      if (!strokePoints.length) return

      const dpr = window.devicePixelRatio || 1
      ctx.save()
      // Points are already in screen space (content × scale), so only pan + dpr needed.
      ctx.setTransform(dpr, 0, 0, dpr, stage.x() * dpr, stage.y() * dpr)
      ctx.fillStyle = penColorRef.current
      ctx.globalAlpha = opacityRef.current / 100

      ctx.beginPath()
      const [x0, y0] = strokePoints[0]
      ctx.moveTo(x0, y0)
      for (let i = 1; i < strokePoints.length - 1; i++) {
        const [ax, ay] = strokePoints[i]
        const [bx, by] = strokePoints[i + 1]
        ctx.quadraticCurveTo(ax, ay, (ax + bx) / 2, (ay + by) / 2)
      }
      const [lx, ly] = strokePoints[strokePoints.length - 1]
      ctx.lineTo(lx, ly)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    function clearLiveCanvas() {
      const canvas = drawCanvasRef.current
      const ctx = getCtx()
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    // ── Text helpers ────────────────────────────────────────────────────────
    function startTextEdit(textNode) {
      textNode.hide()
      mainLayer.batchDraw()
      const scale    = stage.scaleX()
      const r        = textNode.getClientRect()
      const fontSize = textNode.fontSize() * scale

      const ta = document.createElement('textarea')
      ta.value = textNode.text()
      Object.assign(ta.style, {
        position:   'fixed',
        left:       `${r.x}px`,
        top:        `${r.y}px`,
        minWidth:   '120px',
        minHeight:  `${fontSize + 8}px`,
        fontSize:   `${fontSize}px`,
        fontFamily: textNode.fontFamily() || 'sans-serif',
        color:      textNode.fill(),
        opacity:    textNode.opacity(),
        background: 'rgba(255,255,255,0.92)',
        border:     '1.5px solid #1971c2',
        borderRadius: '3px',
        padding:    '2px 4px',
        outline:    'none',
        resize:     'both',
        zIndex:     '200',
        lineHeight: '1.3',
      })
      document.body.appendChild(ta)
      ta.focus()
      ta.select()

      ta.addEventListener('input', () => {
        const evaluated = evaluateExpression(ta.value)
        if (evaluated !== ta.value) ta.value = evaluated
        textNode.text(ta.value)
        mainLayer.batchDraw()
      })
      ta.addEventListener('blur', () => {
        if (ta.value.trim() === '') {
          textNode.destroy()
        } else {
          textNode.text(ta.value)
          textNode.show()
        }
        ta.remove()
        mainLayer.batchDraw()
        history.pushState()
        scheduleSnapshot()
      })
      ta.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') ta.blur()
        ev.stopPropagation() // prevent Delete from triggering canvas delete
      })
    }

    function createText(pos) {
      const textNode = new Konva.Text({
        x: pos.x, y: pos.y,
        text: '',
        fontSize: 18,
        fill: penColorRef.current,
        opacity: opacityRef.current / 100,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        draggable: false,
      })
      mainLayer.add(textNode)
      mainLayer.batchDraw()
      startTextEdit(textNode)
    }

    // ── Erase at container-relative position ────────────────────────────────
    function doEraseAtContainerPos(pos) {
      eraseAtContainerPos(pos, mainLayer, transformer)
    }

    // ── Commit helpers ──────────────────────────────────────────────────────
    function commitFreehand() {
      clearLiveCanvas()
      if (freehandPoints.length < 2) { freehandPoints = []; return }

      const style = strokeStyleRef.current
      let node
      if (style === 'dashed' || style === 'dotted') {
        const sw = penSizeRef.current
        node = new Konva.Line({
          points: freehandPoints.flatMap(([x, y]) => [x, y]),
          stroke: penColorRef.current,
          strokeWidth: sw * 2,
          hitStrokeWidth: Math.max(sw * 4, HIT_MARGIN),
          opacity: opacityRef.current / 100,
          dash: style === 'dashed' ? [sw * 4, sw * 6] : [0.001, sw * 6],
          // Catmull-Rom spline: verdeelt het dash-patroon over een gladde curve
          // in plaats van ruwe polyline-segmenten → consistente stippel/streepafstand.
          tension: 0.5,
          lineCap: 'round',
          lineJoin: 'round',
          draggable: false,
          perfectDrawEnabled: false,
          shadowForStrokeEnabled: false,
        })
      } else {
        // Normalize to screen space so perfect-freehand works well at any zoom level.
        const sc = stage.scaleX()
        const scaledPts = freehandPoints.map(([x, y, p]) => [x * sc, y * sc, p])
        const pathData = getSvgPathFromStroke(getStroke(scaledPts, {
          size: penSizeRef.current * 2 * sc,
          thinning: pressureSensitiveRef.current ? 0.75 : 0,
          smoothing: INPUT_CONFIG.smoothing,
          streamline: INPUT_CONFIG.streamline,
          simulatePressure: false,
        }))
        if (pathData) {
          node = new Konva.Path({
            data: pathData,
            scaleX: 1 / sc,
            scaleY: 1 / sc,
            fill: penColorRef.current,
            hitStrokeWidth: HIT_MARGIN,
            opacity: opacityRef.current / 100,
            draggable: false,
            perfectDrawEnabled: false,
            shadowForStrokeEnabled: false,
          })
        }
      }
      if (node) { mainLayer.add(node); transformer.moveToTop() }
      freehandPoints = []
      mainLayer.batchDraw()
      history.pushState()
      scheduleSnapshot()
    }

    function commitShape() {
      if (!shapePreview) return
      snapIndicator?.destroy()
      snapIndicator = null
      const cls = shapePreview.getClassName()
      // Strip transparent fill so the hit canvas only covers the stroke border.
      // Without this, getIntersection fires inside a hollow Rect/Ellipse.
      const fillOverride = (cls === 'Rect' || cls === 'Ellipse' || (cls === 'Line' && shapePreview.closed())) ? { fill: null, fillEnabled: false } : {}
      const clone = shapePreview.clone({ listening: true, draggable: false, ...fillOverride })
      shapePreview.destroy()
      shapePreview = null
      drawingLayer.batchDraw()
      mainLayer.add(clone)
      transformer.moveToTop()
      mainLayer.batchDraw()
      history.pushState()
      scheduleSnapshot()
    }

    // ── Konva stage event handlers ──────────────────────────────────────────
    function onPointerDown(e) {
      if (e.evt.pointerType === 'touch') return // handled in Effect 2
      const tool = activeToolRef.current
      const pos  = stagePos() // stage-space coords (corrects for pan/zoom)

      // If the pen lands on a transformer anchor, let the transformer handle
      // the resize/rotate — do not start drawing.
      if (e.target !== stage && e.target.getParent?.() === transformer) return

      if (tool === 'eraser') {
        erasing = true
        doEraseAtContainerPos(stage.getPointerPosition())
        return
      }

      if (tool === 'pen') {
        const raw = pressureSensitiveRef.current ? (e.evt.pressure ?? 0.5) : 0.5
        freehandPoints = [[pos.x, pos.y, Math.pow(raw, INPUT_CONFIG.pressureExponentDown)]]
        rawUpdateActive = false // reset so pointerrawupdate can re-engage this stroke
        return
      }

      if (['rect', 'circle', 'line', 'arrow', 'lshape', 'triangle'].includes(tool)) {
        shapeStart = pos
        const color = penColorRef.current
        const sw    = penSizeRef.current
        const op    = opacityRef.current / 100
        const style = strokeStyleRef.current
        const dash  = style === 'dashed' ? [sw * 4, sw * 6] : style === 'dotted' ? [0.001, sw * 6] : undefined
        const hsw   = Math.max(sw * 4, HIT_MARGIN)
        const base  = { stroke: color, strokeWidth: sw * 2, opacity: op, listening: false, hitStrokeWidth: hsw, perfectDrawEnabled: false, shadowForStrokeEnabled: false, ...(dash ? { dash, lineCap: 'round', lineJoin: 'round' } : {}) }
        if (tool === 'rect') {
          shapePreview = new Konva.Rect({ x: pos.x, y: pos.y, width: 0, height: 0, fill: 'transparent', ...base })
        } else if (tool === 'circle') {
          shapePreview = new Konva.Ellipse({ x: pos.x, y: pos.y, radiusX: 0, radiusY: 0, fill: 'transparent', ...base })
        } else if (tool === 'line') {
          shapePreview = new Konva.Line({ points: [pos.x, pos.y, pos.x, pos.y], ...base })
        } else if (tool === 'arrow') {
          shapePreview = new Konva.Arrow({ points: [pos.x, pos.y, pos.x, pos.y], fill: color, pointerLength: sw * 4, pointerWidth: sw * 4, ...base })
        } else if (tool === 'lshape') {
          shapePreview = new Konva.Line({ points: [pos.x, pos.y, pos.x, pos.y, pos.x, pos.y], lineCap: 'round', lineJoin: 'round', ...base })
        } else if (tool === 'triangle') {
          shapePreview = new Konva.Line({ points: [pos.x, pos.y, pos.x, pos.y, pos.x, pos.y], closed: true, fill: 'transparent', lineJoin: 'round', ...base })
        }
        if (shapePreview) drawingLayer.add(shapePreview)
        return
      }

      if (tool === 'select') {
        // If a locked image toolbar is showing, dismiss it immediately so the user
        // can start rubber-band or click freely without a dedicated deselect step.
        if (toolbarTargetRef.current?.attrs?.isLocked) {
          hideToolbar()
          toolbarTargetRef.current = null
        }

        const trNodes = transformer.nodes()

        // Click inside the transformer bounding box → drag all selected nodes.
        // Also triggers when clicking directly on a selected node in a multi-selection
        // (otherwise Konva's built-in drag moves only that one node).
        const targetInSelection = trNodes.length > 1 && trNodes.includes(e.target)
        if (trNodes.length > 0 && (e.target === stage || targetInSelection)) {
          const cp  = stage.getPointerPosition() // container-relative, matches getClientRect()
          const box = transformer.getClientRect()
          if (cp && cp.x >= box.x && cp.x <= box.x + box.width &&
                    cp.y >= box.y && cp.y <= box.y + box.height) {
            dragSavedNodes  = [...trNodes]
            draggingNodes   = true
            dragOriginPos   = pos // stage-space
            dragNodeOrigins = trNodes
              .filter(n => !n.attrs.isLocked)
              .map(n => ({ node: n, x: n.x(), y: n.y() }))
            // Prevent Konva's built-in drag on the clicked node so it moves with the group.
            if (targetInSelection) e.target.draggable(false)
            // Hide the Transformer during drag — avoids per-frame getClientRect()
            // calls on all selected nodes (expensive for complex paths).
            transformer.nodes([])
            return
          }
        }

        // Start rubber-band on any empty-area click (or click on stroke with mouse).
        // selRect stays hidden until the drag exceeds 3px so single-clicks still
        // go through onClick for normal single-node selection.
        if (!draggingNodes) {
          selecting = true
          selStart = pos
          selRect.setAttrs({ x: pos.x, y: pos.y, width: 0, height: 0, visible: false })
          drawingLayer.batchDraw()
        }
      }
    }

    function onPointerMove(e) {
      if (e.evt.pointerType === 'touch') return
      const tool = activeToolRef.current
      const pos  = stagePos() // stage-space coords (corrects for pan/zoom)

      if (draggingNodes) {
        const dx = pos.x - dragOriginPos.x
        const dy = pos.y - dragOriginPos.y
        dragNodeOrigins.forEach(({ node, x, y }) => node.position({ x: x + dx, y: y + dy }))
        mainLayer.batchDraw()
        // Toolbar repositioning is deferred to pointerup — calling it here
        // would trigger getClientRect() on every move event.
        return
      }

      if (tool === 'eraser' && erasing) {
        // Use coalesced events so fast strokes don't skip over thin nodes.
        const box = stage.container().getBoundingClientRect()
        const events = e.evt.getCoalescedEvents?.() ?? [e.evt]
        for (const ce of events) {
          doEraseAtContainerPos({ x: ce.clientX - box.left, y: ce.clientY - box.top })
        }
        return
      }

      if (tool === 'pen' && freehandPoints.length) {
        // On Chromium (Surface/Windows), pointerrawupdate already collected these
        // points at native rate. Skip here to avoid duplicates.
        if (!rawUpdateActive) {
          const nativeEvents = e.evt.getCoalescedEvents?.() ?? [e.evt]
          for (const ce of nativeEvents) {
            const p = clientToStage(ce.clientX, ce.clientY)
            const raw = pressureSensitiveRef.current ? (ce.pressure ?? 0.5) : 0.5
            freehandPoints.push([p.x, p.y, Math.pow(raw, INPUT_CONFIG.pressureExponentDown)])
          }
          lastRawEvent = e.evt
          scheduleRenderLiveStroke()
        }
        return
      }

      if (shapePreview) {
        const dx = pos.x - shapeStart.x
        const dy = pos.y - shapeStart.y
        if (tool === 'rect') {
          shapePreview.setAttrs({
            x: dx < 0 ? pos.x : shapeStart.x,
            y: dy < 0 ? pos.y : shapeStart.y,
            width: Math.abs(dx), height: Math.abs(dy),
          })
        } else if (tool === 'circle') {
          shapePreview.setAttrs({
            x: shapeStart.x + dx / 2,
            y: shapeStart.y + dy / 2,
            radiusX: Math.abs(dx) / 2,
            radiusY: Math.abs(dy) / 2,
          })
        } else if (tool === 'line' || tool === 'arrow') {
          let endX = pos.x, endY = pos.y
          const rdx = pos.x - shapeStart.x, rdy = pos.y - shapeStart.y
          const angle = Math.atan2(rdy, rdx)
          const snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
          const SNAP_RAD = 3 * Math.PI / 180
          const isSnapping = snapEnabledRef.current && Math.abs(angle - snappedAngle) < SNAP_RAD
          if (isSnapping) {
            const len = Math.hypot(rdx, rdy)
            endX = shapeStart.x + Math.cos(snappedAngle) * len
            endY = shapeStart.y + Math.sin(snappedAngle) * len
          }
          shapePreview.points([shapeStart.x, shapeStart.y, endX, endY])
          if (isSnapping) {
            // Extend indicator to full canvas edges in the snapped direction
            const sc = Math.cos(snappedAngle), ss = Math.sin(snappedAngle)
            const sc2 = stage.scaleX()
            const left   = (-stage.x()) / sc2
            const right  = (stage.width()  - stage.x()) / sc2
            const top    = (-stage.y()) / sc2
            const bottom = (stage.height() - stage.y()) / sc2
            const ts = []
            if (Math.abs(sc) > 1e-9) { ts.push((left  - shapeStart.x) / sc); ts.push((right - shapeStart.x) / sc) }
            if (Math.abs(ss) > 1e-9) { ts.push((top   - shapeStart.y) / ss); ts.push((bottom - shapeStart.y) / ss) }
            const tMin = Math.min(...ts), tMax = Math.max(...ts)
            const p1x = shapeStart.x + tMin * sc, p1y = shapeStart.y + tMin * ss
            const p2x = shapeStart.x + tMax * sc, p2y = shapeStart.y + tMax * ss
            if (!snapIndicator) {
              snapIndicator = new Konva.Line({
                stroke: '#1971c2', strokeWidth: 1, strokeScaleEnabled: false,
                dash: [6, 5], opacity: 0.55, listening: false, perfectDrawEnabled: false,
              })
              drawingLayer.add(snapIndicator)
            }
            snapIndicator.points([p1x, p1y, p2x, p2y])
          } else {
            snapIndicator?.destroy()
            snapIndicator = null
          }
        } else if (tool === 'lshape') {
          const dx = Math.abs(pos.x - shapeStart.x)
          const dy = Math.abs(pos.y - shapeStart.y)
          const mid = dx >= dy
            ? [pos.x, shapeStart.y]   // horizontal first, then vertical to cursor
            : [shapeStart.x, pos.y]   // vertical first, then horizontal to cursor
          shapePreview.points([shapeStart.x, shapeStart.y, ...mid, pos.x, pos.y])
        } else if (tool === 'triangle') {
          const left   = dx < 0 ? pos.x : shapeStart.x
          const right  = dx < 0 ? shapeStart.x : pos.x
          const top    = dy < 0 ? pos.y : shapeStart.y
          const bottom = dy < 0 ? shapeStart.y : pos.y
          shapePreview.points([(left + right) / 2, top, right, bottom, left, bottom])
        }
        drawingLayer.batchDraw()
        return
      }

      if (selecting) {
        const sw = Math.abs(pos.x - selStart.x)
        const sh = Math.abs(pos.y - selStart.y)
        const nowVisible = sw > 3 || sh > 3
        if (nowVisible && !selRect.visible()) {
          transformer.nodes([])
          hideToolbar()
        }
        selRect.setAttrs({
          x: Math.min(selStart.x, pos.x),
          y: Math.min(selStart.y, pos.y),
          width: sw, height: sh,
          visible: nowVisible,
        })
        drawingLayer.batchDraw()
      }
    }

    function onPointerUp(e) {
      if (e.evt.pointerType === 'touch') return
      const tool = activeToolRef.current

      if (draggingNodes) {
        draggingNodes = false
        transformer.nodes(dragSavedNodes)
        // Restore draggable — may have been disabled to block Konva's built-in drag.
        const canDrag = activeToolRef.current === 'select'
        dragSavedNodes.forEach(n => {
          if (n.getClassName() === 'Transformer') return
          n.draggable(n.attrs.isImage ? (!n.attrs.isLocked && canDrag) : canDrag)
        })
        mainLayer.batchDraw()
        const target = toolbarTargetRef.current
        if (target) positionAndShowToolbar(target)
        history.pushState()
        scheduleSnapshot()
        return
      }

      if (tool === 'eraser' && erasing) {
        erasing = false
        history.pushState()
        scheduleSnapshot()
        return
      }
      if (tool === 'pen' && freehandPoints.length)    { commitFreehand(); return }
      if (['rect','circle','line','arrow','lshape','triangle'].includes(tool)) { commitShape(); return }

      if (selecting) {
        selecting = false
        selRect.visible(false)
        drawingLayer.batchDraw()
        // Convert selRect (content-space) to container pixels so it matches
        // getClientRect() which includes the stage transform.
        const scale = stage.scaleX()
        const selBox = {
          x:      selRect.x() * scale + stage.x(),
          y:      selRect.y() * scale + stage.y(),
          width:  selRect.width()  * scale,
          height: selRect.height() * scale,
        }
        if (selBox.width > 5 && selBox.height > 5) {
          const selected = mainLayer.getChildren().filter(n => {
            if (n.getClassName() === 'Transformer') return false
            if (n.attrs.isLocked) return false
            const nodeBox = n.getClientRect()
            if (!Konva.Util.haveIntersection(selBox, nodeBox)) return false
            // Hollow shapes: reject if the entire selection sits inside the unfilled
            // interior — the stroke border must be touched to count as a hit.
            const cls = n.getClassName()
            if (cls === 'Rect' || cls === 'Ellipse') {
              const sw = n.strokeWidth() * scale
              const inner = {
                x: nodeBox.x + sw,
                y: nodeBox.y + sw,
                width:  Math.max(0, nodeBox.width  - sw * 2),
                height: Math.max(0, nodeBox.height - sw * 2),
              }
              if (
                inner.width > 0 && inner.height > 0 &&
                selBox.x >= inner.x && selBox.y >= inner.y &&
                selBox.x + selBox.width  <= inner.x + inner.width &&
                selBox.y + selBox.height <= inner.y + inner.height
              ) return false
            }
            return true
          })
          transformer.nodes(selected)
          mainLayer.batchDraw()
          if (selected.length === 1) positionAndShowToolbar(selected[0])
          else if (selected.length > 1) positionToolbarAtTransformer()
          if (selected.length > 0) justRubberBanded.current = true
        } else {
          // Small movement = tap: handle selection/deselection directly.
          // This covers pen/mouse jitter where Konva may not fire 'click'.
          const cp = stage.getPointerPosition()
          if (cp) {
            let hit = mainLayer.getIntersection(cp)
            // Locked images have listening:false — check them manually.
            if (!hit || hit.getClassName() === 'Transformer') {
              const children = mainLayer.getChildren()
              for (let i = children.length - 1; i >= 0; i--) {
                const n = children[i]
                if (!n.attrs.isLocked) continue
                const r = n.getClientRect()
                if (cp.x >= r.x && cp.x <= r.x + r.width &&
                    cp.y >= r.y && cp.y <= r.y + r.height) {
                  hit = n; break
                }
              }
            }
            if (!hit || hit.getClassName() === 'Transformer') {
              transformer.nodes([])
              mainLayer.batchDraw()
              hideToolbar()
            } else if (hit.attrs.isLocked) {
              transformer.nodes([])
              mainLayer.batchDraw()
              // Toggle: if this locked image was already showing its toolbar, deselect.
              // This prevents a failed rubber-band attempt (< 5px) from re-showing the toolbar.
              if (toolbarTargetRef.current === hit) {
                hideToolbar()
                toolbarTargetRef.current = null
              } else {
                positionAndShowToolbar(hit)
              }
            } else if (hit.attrs.isImage && transformer.nodes().includes(hit)) {
              // Already-selected image: toggle off.
              transformer.nodes([])
              mainLayer.batchDraw()
              hideToolbar()
            } else {
              transformer.nodes([hit])
              mainLayer.batchDraw()
              positionAndShowToolbar(hit)
            }
            justHandledTap.current = true
          }
        }
      }
    }

    function onClick(e) {
      if (e.evt.pointerType === 'touch') return
      const tool = activeToolRef.current
      const hit  = e.target

      if (tool === 'text') {
        if (hit === stage) {
          createText(stagePos())
        } else if (hit.getClassName() === 'Text') {
          startTextEdit(hit)
        }
        return
      }

      if (tool === 'select') {
        // Skip if onPointerUp already handled this tap (pen jitter workaround).
        if (justHandledTap.current) { justHandledTap.current = false; return }
        // Skip if we just applied rubber-band selection.
        if (justRubberBanded.current) { justRubberBanded.current = false; return }
        if (hit === stage) {
          // A locked image has listening:false so Konva reports stage as the hit target.
          // Manually check if a locked image sits under the pointer before clearing.
          const cp = stage.getPointerPosition()
          if (cp) {
            const children = mainLayer.getChildren()
            for (let i = children.length - 1; i >= 0; i--) {
              const n = children[i]
              if (!n.attrs.isLocked) continue
              const r = n.getClientRect()
              if (cp.x >= r.x && cp.x <= r.x + r.width && cp.y >= r.y && cp.y <= r.y + r.height) {
                transformer.nodes([])
                mainLayer.batchDraw()
                if (toolbarTargetRef.current === n) {
                  hideToolbar()
                  toolbarTargetRef.current = null
                } else {
                  positionAndShowToolbar(n)
                }
                return
              }
            }
          }
          transformer.nodes([])
          mainLayer.batchDraw()
          hideToolbar()
          return
        }
        if (hit.getClassName() === 'Transformer') return
        if (hit.attrs.isLocked) {
          transformer.nodes([])
          mainLayer.batchDraw()
          if (toolbarTargetRef.current === hit) {
            hideToolbar()
            toolbarTargetRef.current = null
          } else {
            positionAndShowToolbar(hit)
          }
          return
        }
        if (hit.attrs.isImage && transformer.nodes().includes(hit)) {
          // Toggle: click on already-selected image deselects it.
          transformer.nodes([])
          mainLayer.batchDraw()
          hideToolbar()
          return
        }
        transformer.nodes([hit])
        mainLayer.batchDraw()
        positionAndShowToolbar(hit)
      }
    }

    function onDblClick(e) {
      if (e.evt.pointerType === 'touch') return
      const hit = e.target
      if (hit.getClassName() === 'Text') startTextEdit(hit)
    }

    // Lock aspect ratio when any image is in the selection; free for other shapes.
    transformer.on('transformstart', () => {
      const hasImage = transformer.nodes().some(n => n.getClassName() === 'Image')
      transformer.keepRatio(hasImage)
    })

    // Reposition toolbar after transform / drag
    transformer.on('transformstart', () => {
      transformer.nodes().forEach(node => {
        if (node.attrs.isImage) return
        node.setAttr('_origSw', node.strokeWidth())
      })
    })

    // Keep strokeWidth visually constant while handles are dragged.
    transformer.on('transform', () => {
      transformer.nodes().forEach(node => {
        if (node.attrs.isImage) return
        const origSw = node.getAttr('_origSw')
        if (origSw == null) return
        const s = Math.sqrt(Math.abs(node.scaleX()) * Math.abs(node.scaleY()))
        if (s > 0) node.strokeWidth(origSw / s)
      })
    })

    transformer.on('transformend', () => {
      transformer.nodes().forEach(node => {
        if (node.attrs.isImage) return  // images: keep scale as-is
        // Restore original strokeWidth before baking geometry (compensated value was only visual).
        const origSw = node.getAttr('_origSw')
        if (origSw != null) { node.strokeWidth(origSw); node.setAttr('_origSw', null) }
        const sx = node.scaleX(), sy = node.scaleY()
        if (Math.abs(sx - 1) < 1e-6 && Math.abs(sy - 1) < 1e-6) return
        const cls = node.getClassName()
        if (cls === 'Rect') {
          node.setAttrs({ width: node.width() * sx, height: node.height() * sy, scaleX: 1, scaleY: 1 })
        } else if (cls === 'Ellipse') {
          node.setAttrs({ radiusX: node.radiusX() * sx, radiusY: node.radiusY() * sy, scaleX: 1, scaleY: 1 })
        } else if (cls === 'Line' || cls === 'Arrow') {
          const pts = node.points()
          node.setAttrs({ points: pts.map((v, i) => v * (i % 2 === 0 ? sx : sy)), scaleX: 1, scaleY: 1 })
        }
      })
      history.pushState()
      scheduleSnapshot()
      const target = toolbarTargetRef.current
      if (target) positionAndShowToolbar(target)
    })
    mainLayer.on('dragend', ev => {
      history.pushState()
      scheduleSnapshot()
      if (toolbarTargetRef.current === ev.target) positionAndShowToolbar(ev.target)
    })

    // pointerrawupdate fires at native device rate (~240 Hz on Surface Pen),
    // before the browser coalesces events into pointermove. Chromium-only.
    // Collecting points here and skipping pointermove gives maximum input fidelity.
    function onPointerRawUpdate(e) {
      if (e.pointerType !== 'pen') return
      if (activeToolRef.current !== 'pen') return
      if (!freehandPoints.length) return // only during an active stroke
      rawUpdateActive = true
      const p = clientToStage(e.clientX, e.clientY)
      const raw = pressureSensitiveRef.current ? (e.pressure ?? 0.5) : 0.5
      freehandPoints.push([p.x, p.y, Math.pow(raw, 2.5)])
      lastRawEvent = e
      scheduleRenderLiveStroke()
    }

    const container = stage.container()
    container.addEventListener('pointerrawupdate', onPointerRawUpdate, { capture: true, passive: true })

    stage.on('pointerdown', onPointerDown)
    stage.on('pointermove', onPointerMove)
    stage.on('pointerup',   onPointerUp)
    stage.on('click',       onClick)
    stage.on('dblclick',    onDblClick)

    return () => {
      container.removeEventListener('pointerrawupdate', onPointerRawUpdate, { capture: true })
      stage.off('pointerdown', onPointerDown)
      stage.off('pointermove', onPointerMove)
      stage.off('pointerup',   onPointerUp)
      stage.off('click',       onClick)
      stage.off('dblclick',    onDblClick)
      transformer.off('transformstart')
      transformer.off('transform')
      transformer.off('transformend')
      mainLayer.off('dragend')
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null }
      selRect.destroy()
      clearLiveCanvas()
      shapePreview?.destroy()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id, positionAndShowToolbar, hideToolbar, positionToolbarAtTransformer, history])

  // ───────────────────────────────────────────────────────────────────────────
  // EFFECT 4a — Deselect when switching away from select tool
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTool === 'select') return
    const tr = transformerRef.current
    const ml = mainLayerRef.current
    if (!tr || !tr.nodes().length) return
    tr.nodes([])
    hideToolbar()
    ml?.batchDraw()
  }, [activeTool, hideToolbar])

  // EFFECT 4 — Cursor and draggable state
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const stage     = stageRef.current
    const mainLayer = mainLayerRef.current
    if (!stage || !mainLayer) return

    const dotCursor = "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12'><circle cx='6' cy='6' r='3.5' fill='black' stroke='white' stroke-width='1.5'/></svg>\") 6 6, crosshair"
    const cursors = { select: 'default', pen: dotCursor, eraser: 'cell', text: 'text', rect: 'crosshair', circle: 'crosshair', line: 'crosshair', arrow: 'crosshair', lshape: 'crosshair' }
    stage.container().style.cursor = cursors[activeTool] ?? 'default'

    const canDrag = activeTool === 'select'
    mainLayer.getChildren().forEach(node => {
      if (node.getClassName() === 'Transformer') return
      if (node.attrs.isImage) {
        node.draggable(!node.attrs.isLocked && canDrag)
      } else {
        node.draggable(canDrag)
      }
    })
  }, [activeTool])

  // ───────────────────────────────────────────────────────────────────────────
  // EFFECT 5 — Keyboard shortcuts
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) history.redo()
        else history.undo()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); history.redo() }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const tag = document.activeElement?.tagName
        if (tag === 'TEXTAREA' || tag === 'INPUT') return
        const mainLayer  = mainLayerRef.current
        const transformer = transformerRef.current
        if (!mainLayer || !transformer) return
        e.preventDefault()
        const nodes = transformer.nodes()
        transformer.nodes([])
        nodes.forEach(n => n.destroy())
        mainLayer.batchDraw()
        hideToolbar()
        history.pushState()
        scheduleSnapshot()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [history, hideToolbar])

  // ─── Toolbar action handlers ────────────────────────────────────────────────
  function handleLockToggle() {
    const node      = toolbarTargetRef.current
    const mainLayer = mainLayerRef.current
    const transformer = transformerRef.current
    if (!node || !mainLayer) return
    if (node.attrs.isLocked) {
      // Unlock: restore listening so Konva can select/drag it again.
      node.setAttrs({ isLocked: false, draggable: activeToolRef.current === 'select', listening: true })
      transformer?.nodes([node])
    } else {
      // Lock: disable listening so the image is fully transparent to pointer events.
      // Tap detection for locked images is handled manually in Effect 2.
      node.setAttrs({ isLocked: true, draggable: false, listening: false })
      transformer?.nodes([])
    }
    mainLayer.batchDraw()
    positionAndShowToolbar(node)
    history.pushState()
    scheduleSnapshot()
  }

  // Returns true when the image's local X-axis is screen-vertical (90° or 270°).
  // In that orientation the user's visual "horizontal" maps to the node's Y-axis,
  // so flip H and flip V buttons must swap their underlying operations.
  function isOrthoRotated(node) {
    const rot = ((node.rotation() % 360) + 360) % 360
    return (rot > 45 && rot < 135) || (rot > 225 && rot < 315)
  }

  // Apply horizontal flip in the node's LOCAL space (negates scaleX).
  function applyFlipX(node) {
    const oldSx = node.scaleX()
    const θ = node.rotation() * Math.PI / 180
    node.scaleX(-oldSx)
    node.x(node.x() + node.width() * oldSx * Math.cos(θ))
    node.y(node.y() + node.width() * oldSx * Math.sin(θ))
  }

  // Apply vertical flip in the node's LOCAL space (negates scaleY).
  function applyFlipY(node) {
    const oldSy = node.scaleY()
    const θ = node.rotation() * Math.PI / 180
    node.scaleY(-oldSy)
    node.x(node.x() - node.height() * oldSy * Math.sin(θ))
    node.y(node.y() + node.height() * oldSy * Math.cos(θ))
  }

  // Rotate image 90° clockwise around its visual center.
  function handleRotate() {
    const node = toolbarTargetRef.current
    const mainLayer = mainLayerRef.current
    if (!node || !mainLayer) return
    const sx = node.scaleX(), sy = node.scaleY()
    const w  = node.width() * sx, h = node.height() * sy
    const θ  = node.rotation() * Math.PI / 180
    const cx = node.x() + (w * Math.cos(θ) - h * Math.sin(θ)) / 2
    const cy = node.y() + (w * Math.sin(θ) + h * Math.cos(θ)) / 2
    const newθ = θ + Math.PI / 2
    node.rotation(node.rotation() + 90)
    node.x(cx - (w * Math.cos(newθ) - h * Math.sin(newθ)) / 2)
    node.y(cy - (w * Math.sin(newθ) + h * Math.cos(newθ)) / 2)
    mainLayer.batchDraw()
    positionAndShowToolbar(node)
    history.pushState()
    scheduleSnapshot()
  }

  // Flip visually horizontal (mirror about vertical screen axis).
  // When rotated 90°/270° the local X-axis is screen-vertical, so we flip Y instead.
  function handleFlipH() {
    const node = toolbarTargetRef.current
    const mainLayer = mainLayerRef.current
    if (!node || !mainLayer) return
    if (isOrthoRotated(node)) applyFlipY(node)
    else                       applyFlipX(node)
    mainLayer.batchDraw()
    positionAndShowToolbar(node)
    history.pushState()
    scheduleSnapshot()
  }

  // Flip visually vertical (mirror about horizontal screen axis).
  // When rotated 90°/270° the local Y-axis is screen-horizontal, so we flip X instead.
  function handleFlipV() {
    const node = toolbarTargetRef.current
    const mainLayer = mainLayerRef.current
    if (!node || !mainLayer) return
    if (isOrthoRotated(node)) applyFlipX(node)
    else                       applyFlipY(node)
    mainLayer.batchDraw()
    positionAndShowToolbar(node)
    history.pushState()
    scheduleSnapshot()
  }

  function handleStartCrop() {
    const node = toolbarTargetRef.current
    const stage = stageRef.current
    if (!node || !stage) return

    // Temporarily reset rotation and flip so crop overlay and math are axis-aligned.
    const savedRotation = node.rotation()
    const savedScaleX = node.scaleX()
    const savedScaleY = node.scaleY()
    cropSavedRotationRef.current = savedRotation
    cropSavedFlipRef.current = { x: savedScaleX < 0 ? -1 : 1, y: savedScaleY < 0 ? -1 : 1 }

    if (savedRotation !== 0 || savedScaleX < 0 || savedScaleY < 0) {
      const θ   = savedRotation * Math.PI / 180
      // Signed scale gives signed w/h — center formula works correctly for all combinations
      const w   = node.width()  * savedScaleX
      const h   = node.height() * savedScaleY
      const cx  = node.x() + (w * Math.cos(θ) - h * Math.sin(θ)) / 2
      const cy  = node.y() + (w * Math.sin(θ) + h * Math.cos(θ)) / 2
      const wAbs = Math.abs(w), hAbs = Math.abs(h)
      node.rotation(0)
      node.scaleX(Math.abs(savedScaleX))
      node.scaleY(Math.abs(savedScaleY))
      node.x(cx - wAbs / 2)
      node.y(cy - hAbs / 2)
      mainLayerRef.current.batchDraw()
    }

    cropNodeRef.current = node
    const box  = stage.container().getBoundingClientRect()
    const rect = node.getClientRect()
    setCropImageRect({ x: box.left + rect.x, y: box.top + rect.y, w: rect.width, h: rect.height })
    setCropRect({ left: 0, top: 0, right: rect.width, bottom: rect.height })
    if (toolbarDivRef.current) toolbarDivRef.current.style.display = 'none'
    setCropMode(true)
  }

  function applyCrop() {
    const node  = cropNodeRef.current
    const stage = stageRef.current
    if (!node || !stage) return
    const img      = node.attrs.image
    const rect     = node.getClientRect()
    const displayW = rect.width
    const displayH = rect.height
    const srcW     = node.cropWidth()  || img.naturalWidth
    const srcH     = node.cropHeight() || img.naturalHeight
    const offX     = node.cropX() || 0
    const offY     = node.cropY() || 0
    const ratioX   = srcW / displayW
    const ratioY   = srcH / displayH
    const { left, top, right, bottom } = cropRect
    node.setAttrs({
      cropX:      offX + left * ratioX,
      cropY:      offY + top  * ratioY,
      cropWidth:  (right - left)  * ratioX,
      cropHeight: (bottom - top)  * ratioY,
      width:      node.width()  * (right - left)  / displayW,
      height:     node.height() * (bottom - top)  / displayH,
      x:          node.x() + left / stage.scaleX(),
      y:          node.y() + top  / stage.scaleY(),
    })
    // Restore rotation and flip that were reset in handleStartCrop.
    const savedRotation = cropSavedRotationRef.current
    const savedFlip     = cropSavedFlipRef.current
    if (savedRotation !== 0 || savedFlip.x < 0 || savedFlip.y < 0) {
      const θ          = savedRotation * Math.PI / 180
      const absScaleX  = node.scaleX(), absScaleY = node.scaleY()  // positive after normalization
      const w          = node.width() * absScaleX
      const h          = node.height() * absScaleY
      const cx         = node.x() + w / 2
      const cy         = node.y() + h / 2
      const finalScaleX = savedFlip.x * absScaleX
      const finalScaleY = savedFlip.y * absScaleY
      node.rotation(savedRotation)
      node.scaleX(finalScaleX)
      node.scaleY(finalScaleY)
      const wS = node.width() * finalScaleX
      const hS = node.height() * finalScaleY
      node.x(cx - (wS * Math.cos(θ) - hS * Math.sin(θ)) / 2)
      node.y(cy - (wS * Math.sin(θ) + hS * Math.cos(θ)) / 2)
    }
    cropSavedRotationRef.current = 0
    cropSavedFlipRef.current = { x: 1, y: 1 }
    mainLayerRef.current.batchDraw()
    historyPushRef.current?.()
    scheduleSnapshot()
    setCropMode(false)
    cropNodeRef.current = null
  }

  function cancelCrop() {
    const node          = cropNodeRef.current
    const savedRotation = cropSavedRotationRef.current
    const savedFlip     = cropSavedFlipRef.current
    if (node && (savedRotation !== 0 || savedFlip.x < 0 || savedFlip.y < 0)) {
      const θ          = savedRotation * Math.PI / 180
      const absScaleX  = node.scaleX(), absScaleY = node.scaleY()
      const w          = node.width() * absScaleX
      const h          = node.height() * absScaleY
      const cx         = node.x() + w / 2
      const cy         = node.y() + h / 2
      const finalScaleX = savedFlip.x * absScaleX
      const finalScaleY = savedFlip.y * absScaleY
      node.rotation(savedRotation)
      node.scaleX(finalScaleX)
      node.scaleY(finalScaleY)
      const wS = node.width() * finalScaleX
      const hS = node.height() * finalScaleY
      node.x(cx - (wS * Math.cos(θ) - hS * Math.sin(θ)) / 2)
      node.y(cy - (wS * Math.sin(θ) + hS * Math.cos(θ)) / 2)
      mainLayerRef.current.batchDraw()
    }
    cropSavedRotationRef.current = 0
    cropSavedFlipRef.current = { x: 1, y: 1 }
    setCropMode(false)
    cropNodeRef.current = null
  }

  function handleDeletePointerDown(e) {
    e.preventDefault()
    setDeleteHolding(true)
    deleteTimerRef.current = setTimeout(() => {
      setDeleteHolding(false)
      const node      = toolbarTargetRef.current
      const mainLayer = mainLayerRef.current
      const transformer = transformerRef.current
      if (!node || !mainLayer) return
      transformer?.nodes([])
      node.destroy()
      mainLayer.batchDraw()
      hideToolbar()
      history.pushState()
      scheduleSnapshot()
    }, 700)
  }

  function handleDeletePointerUp() {
    setDeleteHolding(false)
    if (deleteTimerRef.current) { clearTimeout(deleteTimerRef.current); deleteTimerRef.current = null }
  }

  function handleDeleteClick() {
    const mainLayer  = mainLayerRef.current
    const transformer = transformerRef.current
    if (!mainLayer) return
    const nodes = [...(transformer?.nodes() ?? [])]
    if (toolbarTargetRef.current && !nodes.includes(toolbarTargetRef.current)) nodes.push(toolbarTargetRef.current)
    transformer?.nodes([])
    nodes.forEach(n => n.destroy())
    mainLayer.batchDraw()
    hideToolbar()
    history.pushState()
    scheduleSnapshot()
  }

  function handleCopy() {
    const transformer = transformerRef.current
    const nodes = [...(transformer?.nodes() ?? [])]
    if (toolbarTargetRef.current && !nodes.includes(toolbarTargetRef.current)) nodes.push(toolbarTargetRef.current)
    if (!nodes.length) return
    onCopy?.(serializeNodes(nodes))
  }

  function handleDuplicate() {
    const mainLayer  = mainLayerRef.current
    const transformer = transformerRef.current
    if (!mainLayer) return

    const nodes = [...(transformer?.nodes() ?? [])]
    if (toolbarTargetRef.current && !nodes.includes(toolbarTargetRef.current)) nodes.push(toolbarTargetRef.current)
    if (!nodes.length) return

    const offset = 20
    const newNodes = nodes.map(n => {
      const clone = n.clone()
      clone.x(n.x() + offset)
      clone.y(n.y() + offset)
      if (clone.attrs.isImage) {
        clone.setAttrs({ isLocked: false, listening: true, draggable: true })
        mainLayer.add(clone)
        clone.moveToBottom()
        transformer?.moveToTop()
      } else {
        clone.draggable(true)
        mainLayer.add(clone)
      }
      return clone
    })

    transformer?.moveToTop()
    transformer?.nodes(newNodes)
    if (newNodes.length === 1) positionAndShowToolbar(newNodes[0])
    else positionToolbarAtTransformer()
    mainLayer.batchDraw()
    history.pushState()
    scheduleSnapshot()
  }

  // ─── Expose API via ref ─────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    getStage: () => stageRef.current,
    getMainLayer: () => mainLayerRef.current,
    undo: history.undo,
    redo: history.redo,
    copySelection: handleCopy,
    addImage: (konvaImageNode) => {
      const mainLayer  = mainLayerRef.current
      const transformer = transformerRef.current
      if (!mainLayer) return
      mainLayer.add(konvaImageNode)
      konvaImageNode.moveToBottom()
      transformer?.moveToTop()
      mainLayer.batchDraw()
      transformer?.nodes([konvaImageNode])
      positionAndShowToolbar(konvaImageNode)
      scheduleSnapshot()
    },
    pasteNodes: (data) => {
      const mainLayer  = mainLayerRef.current
      const transformer = transformerRef.current
      const stage      = stageRef.current
      if (!mainLayer || !data?.length || !stage) return

      // Compute centroid of pasted nodes in content-space.
      // Lines/arrows store their coordinates in attrs.points (absolute) with x=0,y=0,
      // so we must include point coordinates, not just x/y/width/height.
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      data.forEach(({ attrs }) => {
        const nx = attrs.x ?? 0, ny = attrs.y ?? 0
        if (attrs.points?.length >= 2) {
          for (let i = 0; i < attrs.points.length - 1; i += 2) {
            const px = nx + attrs.points[i], py = ny + attrs.points[i + 1]
            minX = Math.min(minX, px); maxX = Math.max(maxX, px)
            minY = Math.min(minY, py); maxY = Math.max(maxY, py)
          }
        } else {
          const w = attrs.width ?? 0, h = attrs.height ?? 0
          minX = Math.min(minX, nx); maxX = Math.max(maxX, nx + w)
          minY = Math.min(minY, ny); maxY = Math.max(maxY, ny + h)
        }
      })
      const srcCx = (minX + maxX) / 2
      const srcCy = (minY + maxY) / 2
      const scale = stage.scaleX()
      const viewCx = (stage.width()  / 2 - stage.x()) / scale
      const viewCy = (stage.height() / 2 - stage.y()) / scale
      const dx = viewCx - srcCx, dy = viewCy - srcCy

      const newNodes = []
      data.forEach(({ type, attrs }) => {
        const newAttrs = { ...attrs, x: (attrs.x ?? 0) + dx, y: (attrs.y ?? 0) + dy }
        if (type === 'Image') {
          const img = new Image()
          img.onload = () => {
            const node = new Konva.Image({ ...newAttrs, image: img, isLocked: false, listening: true, draggable: true })
            mainLayer.add(node)
            node.moveToBottom()
            transformer?.moveToTop()
            mainLayer.batchDraw()
          }
          img.src = attrs.src
        } else {
          const Cls = Konva[type]
          if (!Cls) return
          const node = new Cls({ ...newAttrs, draggable: false })
          mainLayer.add(node)
          newNodes.push(node)
        }
      })

      transformer?.moveToTop()
      if (newNodes.length) {
        transformer?.nodes(newNodes)
        if (newNodes.length === 1) positionAndShowToolbar(newNodes[0])
        else positionToolbarAtTransformer()
      }
      mainLayer.batchDraw()
      history.pushState()
      scheduleSnapshot()
    },
    centerToContent: () => {
      const stage     = stageRef.current
      const mainLayer = mainLayerRef.current
      if (!stage || !mainLayer) return
      const nodes = mainLayer.getChildren().filter(n => n.getClassName() !== 'Transformer')
      if (!nodes.length) return

      // Bounding box of all content in stage-space coordinates.
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      nodes.forEach(n => {
        const r = n.getClientRect({ relativeTo: stage })
        minX = Math.min(minX, r.x)
        minY = Math.min(minY, r.y)
        maxX = Math.max(maxX, r.x + r.width)
        maxY = Math.max(maxY, r.y + r.height)
      })

      const pad    = 60
      const viewW  = stage.width()
      const viewH  = stage.height()
      const scale  = Math.min(
        (viewW - pad * 2) / (maxX - minX),
        (viewH - pad * 2) / (maxY - minY),
        3,
      )
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      const newX = viewW / 2 - cx * scale
      const newY = viewH / 2 - cy * scale
      stage.scale({ x: scale, y: scale })
      stage.position({ x: newX, y: newY })
      stage.batchDraw()
      updateNoteSettings(note.id, { ...note.settings, zoom: scale, pan: { x: newX, y: newY } })
    },
  }))

  useGrid(wrapperRef, gridCanvasRef, stageRef, showGrid)

  // ─── JSX ───────────────────────────────────────────────────────────────────
  return (
    <div ref={wrapperRef} className="canvas-wrapper">
      <canvas ref={gridCanvasRef} className="canvas-grid-layer" />
      <div ref={konvaContainerRef} className="canvas-konva-layer" />
      <canvas ref={drawCanvasRef} className="canvas-draw-layer" />

      {cropMode && (
        <CropOverlay
          imageRect={cropImageRect}
          cropRect={cropRect}
          onChange={setCropRect}
          onConfirm={applyCrop}
          onCancel={cancelCrop}
        />
      )}

      <Minimap stageRef={stageRef} mainLayerRef={mainLayerRef} version={minimapVersion} />

      <div ref={toolbarDivRef} className="object-toolbar">
        {selectedType === 'image' && (
          <button
            className={`object-toolbar-btn${imageLocked ? ' locked' : ''}`}
            title={imageLocked ? 'Ontgrendelen' : 'Vergrendelen'}
            onClick={handleLockToggle}
          >
            {imageLocked ? (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="9" width="12" height="9" rx="1.5" />
                <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="9" width="12" height="9" rx="1.5" />
                <path d="M7 9V6.5a3 3 0 0 1 6 0" />
              </svg>
            )}
          </button>
        )}

        {selectedType === 'image' && !imageLocked && (
          <>
            <button className="object-toolbar-btn" title="90° met de klok mee draaien" onClick={handleRotate}>
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4a7 7 0 0 1 10 2" />
                <polyline points="16 2.5 16 7 11.5 7" />

                <path d="M14 16a7 7 0 0 1-10-2" />
                <polyline points="4 17.5 4 13 8.5 13" />
              </svg>
            </button>
            <button className="object-toolbar-btn" title="Horizontaal spiegelen" onClick={handleFlipH}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="10" y1="3" x2="10" y2="17" strokeDasharray="2 2.5" />
                <polyline points="7 7 3 10 7 13" />
                <polyline points="13 7 17 10 13 13" />
              </svg>
            </button>
            <button className="object-toolbar-btn" title="Verticaal spiegelen" onClick={handleFlipV}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="10" x2="17" y2="10" strokeDasharray="2 2.5" />
                <polyline points="7 7 10 3 13 7" />
                <polyline points="7 13 10 17 13 13" />
              </svg>
            </button>
            <button className="object-toolbar-btn" title="Bijsnijden" onClick={handleStartCrop}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2v13h13" />
                <path d="M15 18V5H2" />
              </svg>
            </button>
          </>
        )}

        <button className="object-toolbar-btn" title="Dupliceren" onClick={handleDuplicate}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="7" width="9" height="9" rx="1.5" />
            <path d="M4 13V4h9" />
          </svg>
        </button>

        {selectedType === 'image' ? (
          <button
            className={`object-toolbar-btn delete-btn${deleteHolding ? ' holding' : ''}`}
            title="Ingedrukt houden om te verwijderen"
            onPointerDown={handleDeletePointerDown}
            onPointerUp={handleDeletePointerUp}
            onPointerLeave={handleDeletePointerUp}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10M8 9.5v4M12 9.5v4" />
            </svg>
          </button>
        ) : (
          <button
            className="object-toolbar-btn delete-btn"
            title="Verwijderen"
            onClick={handleDeleteClick}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10M8 9.5v4M12 9.5v4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
})

export default CanvasView
