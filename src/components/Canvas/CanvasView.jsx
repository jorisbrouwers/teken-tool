import { useEffect, useRef, useCallback, useState, forwardRef, useImperativeHandle } from 'react'
import Konva from 'konva'

// Extra hit area (px) around strokes for tap-to-select and eraser detection.
// Larger = easier to tap thin lines; smaller = more precise eraser.
const HIT_MARGIN = 8

// Muur-tool: schermpixels waarbinnen tekenen bij een bestaand eindpunt begint
// (ketting) of eindigt (las) — zelfde waarde als LineGizmo's endpoint-snap.
const WALL_EP_SNAP_SCREEN_PX = 30
// Muur-tool: schermpixels waarbinnen vertex-uitlijning kikt — zelfde als LineGizmo.
const WALL_ALIGN_SNAP_SCREEN_PX = 20
// Muur-tool: hoek-snap-tolerantie (45°-veelvouden), zelfde als lijn/pijl-tool.
const SNAP_RAD_WALL = 3 * Math.PI / 180
// Muur-tool: wereld-afstand (stage-eenheden, zoom-onafhankelijk) die overschreden
// moet worden voordat pointerdown→pointerup als "tekenen" geldt i.p.v. een tik
// (selecteren/deselecteren). 0,5 m voorkomt dat pen-jitter bij een tik per ongeluk
// een kort muursegment tekent.
const WALL_DRAW_THRESHOLD_STAGE = 0.5 * GRID_SIZE
// Kalibratie-tool: ondergrens voor de getekende lijnlengte (stage-eenheden,
// zoom-onafhankelijk) — voorkomt een absurde schaalfactor bij een bijna-nul-
// lengte lijn (bv. een trilling van de pen zonder echte sleep).
const MIN_CALIBRATION_LINE_STAGE = 0.15 * GRID_SIZE

// crypto.randomUUID() requires a secure context (https/localhost).
// This fallback works over plain http (e.g. local network IP).
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

// Zet de object-toolbar op (left, top) — left is het middelpunt (CSS translateX(-50%))
// — en klem hem binnen het canvas-vlak zodat hij nooit off-screen staat. `top`
// is altijd de positie ONDER de selectie; is daar niet genoeg ruimte voor, dan
// klemt hij simpelweg tegen de onderrand van het canvas (blijft dus onder de
// selectie "plakken" i.p.v. naar boven te springen — dat zou de gizmo's blokkeren).
function placeToolbar(div, box, left, top) {
  div.style.display = 'flex'  // vóór het meten: offsetWidth/Height van display:none is 0
  const m = 8
  const w = div.offsetWidth
  const h = div.offsetHeight
  left = Math.min(Math.max(left, box.left + w / 2 + m), box.right - w / 2 - m)
  top  = Math.min(Math.max(top, box.top + m), box.bottom - h - m)
  div.style.left = `${left}px`
  div.style.top  = `${top}px`
}

// Snapt de hoek van een lijn naar horizontaal/verticaal/45°-veelvouden (3°
// tolerantie). Gedeeld door de lijn/pijl-tool en de kalibratielijn — de
// kalibratielijn mag NIET aan muur-eindpunten/uitlijning snappen (dat is een
// aparte, muur-specifieke snap in wallGraph.js), alleen aan deze hoeken.
function snapLineAngle(startPos, pos, enabled) {
  const dx = pos.x - startPos.x, dy = pos.y - startPos.y
  const angle = Math.atan2(dy, dx)
  const snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
  const SNAP_RAD = 3 * Math.PI / 180
  const isSnapping = enabled && Math.abs(angle - snappedAngle) < SNAP_RAD
  if (!isSnapping) return { x: pos.x, y: pos.y, isSnapping: false, snappedAngle }
  const len = Math.hypot(dx, dy)
  return { x: startPos.x + Math.cos(snappedAngle) * len, y: startPos.y + Math.sin(snappedAngle) * len, isSnapping: true, snappedAngle }
}


import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../../math/svgPath.js'
import { INPUT_CONFIG } from '../../platform/inputConfig.js'
import { usePersistence } from './usePersistence.js'
import { useHistory } from './useHistory.js'
import { useGrid, GRID_SIZE } from './useGrid.js'
import { evaluateExpression } from '../../math/mathEval.js'
import { deserializeLayer, serializeNodes, normalizeSnapshot } from './konvaSerialize.js'
import { getConns, connsAttr, addConn, removeConn, collectHierarchyVertices, collectSnapVertices, findWallEndpointNear, closestPointOnSegment } from './wallGraph.js'
import { getPillCssStyle } from './pillStyle.js'
import { applyViewportCulling } from './viewportCulling.js'
import { liveSnapshotCache } from './usePersistence.js'
import { getNote, updateNoteSettings } from '../../db/db.js'
import CropOverlay from './CropOverlay.jsx'
import CalibrateDialog from '../common/CalibrateDialog.jsx'
import Minimap from '../Minimap/Minimap.jsx'
import LineGizmo from './LineGizmo.jsx'
import MeasurementLabels from './MeasurementLabels.jsx'
import HingeDecorations from './HingeDecorations.jsx'
import { COLORS } from '../StylePanel/StylePanel.jsx'
import './Canvas.css'

const CanvasView = forwardRef(function CanvasView(
  { note, activeTool, onToolSelect, penColor, penSize, opacity, strokeStyle, pressureSensitive, onInputDetected, shouldCenter, onCopy, onSelectionChange, snapEnabled = true, showPills = true, pillStyle, showHinges = true },
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
  const [selectedColor, setSelectedColor] = useState(null)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [deleteHolding, setDeleteHolding] = useState(false)
  const deleteTimerRef = useRef(null)
  const [minimapVersion, setMinimapVersion] = useState(0)
  const [cropMode, setCropMode] = useState(false)
  const cropNodeRef = useRef(null)
  const cropSavedRotationRef = useRef(0)
  const cropSavedFlipRef = useRef({ x: 1, y: 1 })
  const [cropImageRect, setCropImageRect] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [cropRect, setCropRect] = useState({ left: 0, top: 0, right: 0, bottom: 0 })

  // ─── Kalibratie-tool state (schaal afbeelding op basis van werkelijke afstand) ──
  // null = uit, 'drawing' = wacht op de kalibratielijn, 'value' = modal open.
  const [calibratePhase, setCalibratePhase] = useState(null)
  const calibratePhaseRef = useRef(null)
  calibratePhaseRef.current = calibratePhase
  const calibrateNodeRef = useRef(null)
  // { startPt, endPt, previewLine } — gedeeld tussen Effect 2 (nav-annulering)
  // en Effect 3 (tekenen), vandaar een ref i.p.v. een lokale closure-variabele.
  const calibDrawRef = useRef(null)

  // ─── Line gizmo state ───────────────────────────────────────────────────────
  const [lineGizmoNode, setLineGizmoNode] = useState(null)
  const lineGizmoNodeRef = useRef(null)
  const [lineGizmoVersion, setLineGizmoVersion] = useState(0)
  const suppressMeasureRef  = useRef(false)
  const bodyXAlignRef       = useRef(null)   // pink vertical guide during body drag
  const bodyYAlignRef       = useRef(null)   // pink horizontal guide during body drag
  const gizmoAutoEditRef    = useRef(false)  // when true, LineGizmo opens edit mode on mount

  function setGizmoNode(node) {
    lineGizmoNodeRef.current = node
    setLineGizmoNode(node)
  }

  function isSingleLinear(node) {
    if (!node) return false
    const cls = node.getClassName()
    return (cls === 'Line' || cls === 'Arrow') && node.points().length === 4
  }

  // Muur = lijnsysteem-segment (gizmo, pills, scharnieren, verbindingen).
  // Sinds snapshot-formaat 2 expliciet gemarkeerd; oud materiaal krijgt de
  // markering bij het inladen (normalizeSnapshot).
  function isWallSegment(node) {
    return isSingleLinear(node) && !!node.attrs.isWall
  }

  // Centrale plek voor "mag Konva deze node native slepen?" — gebruikt overal
  // waar draggable-state (her)berekend wordt (Effect 4, nav-restore, touch-
  // restore, ...) zodat het niet op vijf plekken los kan raken. Antwoord is
  // vrijwel altijd nee: afbeeldingen/vormen/streken bewegen uitsluitend via
  // ons eigen gizmo-bbox-systeem (dragNodeOrigins), nooit via Konva-native
  // dragging — zo kan niets versleept worden zonder het eerst te selecteren.
  // Muren zijn de uitzondering (mainLayer's dragmove-handler doet daar de
  // buur-rek-logica via een echte Konva-drag), maar ook dan alléén het
  // segment dat al geselecteerd is via de gizmo.
  function computeDraggable(node, tool) {
    if (node.getClassName() === 'Transformer') return false
    if (node.attrs.isLocked) return false
    if (isWallSegment(node)) {
      return (tool === 'select' || tool === 'wall') && node === lineGizmoNodeRef.current
    }
    return false
  }

  const showGrid = note.settings?.background === 'grid'

  const onSelectionChangeRef = useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange
  const snapEnabledRef = useRef(snapEnabled)
  snapEnabledRef.current = snapEnabled
  const pillStyleRef = useRef(pillStyle)
  pillStyleRef.current = pillStyle
  useEffect(() => { onSelectionChangeRef.current?.(selectedType !== null) }, [selectedType])

  // ─── History + persistence ──────────────────────────────────────────────────
  const history = useHistory(mainLayerRef, transformerRef)
  const historyPushRef = useRef(null)
  historyPushRef.current = history.pushState
  const persistenceScheduleRef = useRef(null)
  const persistenceFlushRef    = useRef(null)
  const deferredDrawRef        = useRef(null)
  const animateNavRef = useRef(null)
  const centerToContentRef = useRef(null)
  // performance.now() van de laatste pen/gum-activiteit. Achtergrondtaken die
  // O(volledige notitie) zijn (persistence-save, minimap-render) wachten tot
  // dit >1,5 s geleden is, zodat ze nooit midden in een streek de peninvoer
  // blokkeren. Timestamp i.p.v. boolean: kan nooit "aan" blijven hangen.
  const penActivityRef = useRef(0)
  usePersistence(mainLayerRef, note.id, persistenceScheduleRef, persistenceFlushRef, penActivityRef)

  function scheduleSnapshot() {
    persistenceScheduleRef.current?.()
    setMinimapVersion(v => v + 1)
  }

  // Breaks connections on adjacent nodes then destroys each node.
  // Returns true if the active gizmo node was deleted or had a connection cleared
  // (caller must then either call hideToolbar() or setLineGizmoVersion()).
  function disconnectAndDestroy(nodesToDelete, layer) {
    const gizmoNode = lineGizmoNodeRef.current
    let gizmoAffected = false
    for (const node of nodesToDelete) {
      for (let ep = 0; ep < 2; ep++) {
        for (const conn of getConns(node, ep)) {
          const peer = layer.findOne(`#${conn.id}`)
          if (!peer) continue
          removeConn(peer, conn.ep, node.id(), ep)
          if (peer === gizmoNode) gizmoAffected = true
        }
      }
      if (node === gizmoNode) gizmoAffected = true
      node.destroy()
    }
    return gizmoAffected
  }

  // Splitst host op (splitX, splitY) in twee nieuwe muren die samen de oorspronkelijke
  // geometrie en stijl behouden; externe verbindingen van host worden herbedraad naar
  // de juiste helft, en de helften worden onderling verbonden (het nieuwe T-punt).
  // Host wordt vernietigd. Gebruikt voor mid-segment-aftakking (5.2) — vereist de
  // graad-N-verbindingslijsten uit Fase 1, want het T-punt heeft straks drie muren.
  function splitWallAt(host, splitX, splitY, layer) {
    const pts = host.points()
    const hx = host.x(), hy = host.y()
    const ep0Abs = { x: hx + pts[0], y: hy + pts[1] }
    const ep1Abs = { x: hx + pts[2], y: hy + pts[3] }
    const cls = host.getClassName()
    const shared = {
      stroke: host.stroke(), strokeWidth: host.strokeWidth(), opacity: host.opacity(),
      hitStrokeWidth: host.hitStrokeWidth(), listening: true, draggable: false,
      perfectDrawEnabled: false, shadowForStrokeEnabled: false, isWall: true,
      lineCap: host.lineCap(), lineJoin: host.lineJoin(),
      ...(host.dash()?.length ? { dash: host.dash() } : {}),
      ...(cls === 'Arrow' ? { fill: host.fill(), pointerLength: host.pointerLength(), pointerWidth: host.pointerWidth() } : {}),
    }
    // Buitenhoek (ep0Abs) blijft bij maatbewerking het anker; T-punt (ep1) beweegt —
    // dat is voor halfA toevallig al de bestaande default (ep0 vast).
    const halfA = new Konva[cls]({ id: generateId(), x: ep0Abs.x, y: ep0Abs.y, points: [0, 0, splitX - ep0Abs.x, splitY - ep0Abs.y], ...shared })
    // Voor halfB is het net andersom: ep0 is hier het T-punt, ep1 de buitenhoek —
    // de default moet dus omgekeerd worden zodat de buitenhoek ook hier vast blijft.
    const halfB = new Konva[cls]({ id: generateId(), x: splitX, y: splitY, points: [0, 0, ep1Abs.x - splitX, ep1Abs.y - splitY], ...shared })
    halfB._measureAnchorEp = 1

    layer.add(halfA)
    layer.add(halfB)

    for (const conn of getConns(host, 0)) {
      const peer = layer.findOne(`#${conn.id}`)
      if (!peer) continue
      removeConn(peer, conn.ep, host.id(), 0)
      addConn(peer, conn.ep, halfA, 0)
    }
    for (const conn of getConns(host, 1)) {
      const peer = layer.findOne(`#${conn.id}`)
      if (!peer) continue
      removeConn(peer, conn.ep, host.id(), 1)
      addConn(peer, conn.ep, halfB, 1)
    }
    addConn(halfA, 1, halfB, 0)

    host.destroy()
    return { halfA, halfB }
  }

  function handleLineEndpointDragMove(nodeId, endpointIndex, absX, absY) {
    const layer = mainLayerRef.current
    if (!layer) return
    const node = layer.findOne(`#${nodeId}`)
    if (!node) return
    // Only pull the directly connected endpoints — no chain propagation.
    // Body drag (dragmove on the line itself) handles full-chain propagation.
    let moved = false
    for (const conn of getConns(node, endpointIndex)) {
      const connNode = layer.findOne(`#${conn.id}`)
      if (!connNode) continue
      const pts = connNode.points().slice()
      pts[conn.ep * 2]     = absX - connNode.x()
      pts[conn.ep * 2 + 1] = absY - connNode.y()
      connNode.points(pts)
      moved = true
    }
    if (moved) layer.batchDraw()
  }

  function handleLineEndpointDragEnd() {
    historyPushRef.current?.()
    scheduleSnapshot()
  }

  function handleMeasureConfirm(meters, nodeOverride) {
    const node = nodeOverride ?? lineGizmoNodeRef.current
    const layer = mainLayerRef.current
    if (!node || !layer || meters <= 0) return
    // Ankerpunt (5.2): welk eindpunt vast blijft staan en welk verschuift. Standaard
    // ep0 (zoals altijd); een vers gesplitste helft waarvan het T-punt op ep0 zit
    // krijgt _measureAnchorEp=1 (buitenhoek als anker) — zie splitWallAt. Tikken op
    // het andere endpoint tijdens bewerken wisselt dit (LineGizmo).
    const anchorEp = node._measureAnchorEp ?? 0
    const moveEp = 1 - anchorEp
    const anchorIdx = anchorEp * 2, moveIdx = moveEp * 2
    const pts = node.points()
    const angle = Math.atan2(pts[moveIdx + 1] - pts[anchorIdx + 1], pts[moveIdx] - pts[anchorIdx])
    const newLen = meters * GRID_SIZE
    const newPts = pts.slice()
    newPts[moveIdx]     = pts[anchorIdx] + Math.cos(angle) * newLen
    newPts[moveIdx + 1] = pts[anchorIdx + 1] + Math.sin(angle) * newLen
    node.points(newPts)
    // Stretch the adjacent segment's endpoint at the moving side to follow the new
    // position — same as endpoint drag does. A whole-body shift of the neighbour
    // would break closed loops (it moves the node connected back to the anchor away
    // from its own anchor).
    for (const conn of getConns(node, moveEp)) {
      const connNode = layer.findOne(`#${conn.id}`)
      if (!connNode) continue
      const connPts = connNode.points().slice()
      connPts[conn.ep * 2]     = (node.x() + newPts[moveIdx])     - connNode.x()
      connPts[conn.ep * 2 + 1] = (node.y() + newPts[moveIdx + 1]) - connNode.y()
      connNode.points(connPts)
    }
    layer.batchDraw()
    historyPushRef.current?.()
    scheduleSnapshot()
    // In de muur-tool is het primaire doel doortekenen; na een maatinvoer
    // (vaak vlak na het tekenen van het segment zelf) direct deselecteren zodat
    // de volgende pen-down meteen weer tekent, zonder eerst te moeten aftikken.
    if (activeToolRef.current === 'wall' && lineGizmoNodeRef.current === node) hideToolbar()
  }

  // Een pill die op (vrijwel) 0 gezet wordt, betekent "verwijder dit segment" —
  // anders blijft er een onzichtbare nul-lengte muur over (LineGizmo.confirmMeasure).
  function handleMeasureDelete(nodeOverride) {
    const node = nodeOverride ?? lineGizmoNodeRef.current
    const layer = mainLayerRef.current
    if (!node || !layer) return
    disconnectAndDestroy([node], layer)
    layer.batchDraw()
    hideToolbar()
    history.pushState()
    scheduleSnapshot()
  }

  function handleLineEndpointSnap(sourceNodeId, draggedEp, targetNodeId, targetEp) {
    const layer = mainLayerRef.current
    if (!layer) return
    const node = layer.findOne(`#${sourceNodeId}`)
    const targetNode = layer.findOne(`#${targetNodeId}`)
    if (!node || !targetNode) return

    // If the node collapsed to zero length, remove it and weld all its former
    // peers (plus the snap target) pairwise together so the chain stays intact.
    const pts = node.points()
    if (Math.hypot(pts[2] - pts[0], pts[3] - pts[1]) < 0.5) {
      const sideDragged = [...getConns(node, draggedEp), { id: targetNodeId, ep: targetEp }]
      const sideOther   = getConns(node, 1 - draggedEp)
      for (let ep = 0; ep < 2; ep++) {
        for (const conn of getConns(node, ep)) {
          const peer = layer.findOne(`#${conn.id}`)
          if (peer) removeConn(peer, conn.ep, node.id(), ep)
        }
      }
      for (const a of sideDragged) {
        for (const b of sideOther) {
          if (a.id === b.id) continue
          const an = layer.findOne(`#${a.id}`)
          const bn = layer.findOne(`#${b.id}`)
          if (an && bn) addConn(an, a.ep, bn, b.ep)
        }
      }
      node.destroy()
      hideToolbar()
      layer.batchDraw()
      return
    }

    // Normal weld: the connection is added alongside any existing ones.
    // Verbindings-lijsten maken graad-N-hoekpunten mogelijk, dus een las hoeft
    // geen bestaande verbinding meer te verbreken ("stelen") zoals voorheen.
    addConn(node, draggedEp, targetNode, targetEp)
  }

  // Survives Effect 3 re-runs (which reset local closure vars) so onClick doesn't
  // clear a selection that was just applied by a rubber-band drag.
  const justRubberBandedRef      = useRef(false)
  const justHandledTapRef        = useRef(false)
  const justCommittedLinearRef   = useRef(false)
  const justDraggedNodeRef       = useRef(false)

  function handlePillClick(nodeId) {
    const node = mainLayerRef.current?.findOne(`#${nodeId}`)
    if (!node) return
    // In de muur-tool blijft de tool actief (niet hoeven wisselen om te bewerken).
    if (activeToolRef.current !== 'wall') onToolSelect?.('select')
    gizmoAutoEditRef.current = true
    positionAndShowToolbar(node)
  }

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
    setShowColorPicker(false)
    setSelectedColor(!isImage && node.getClassName() !== 'Text' ? getNodeColor(node) : null)
    // Walls get a custom gizmo instead of the transformer.
    if (isWallSegment(node)) {
      tr?.nodes([])
      setGizmoNode(node)
    } else {
      setGizmoNode(null)
    }
    // Images get their own rotate buttons — hide the transformer rotation handle.
    if (tr) tr.rotateEnabled(!isImage)
    // getClientRect() is container-relative; position:fixed needs viewport coords.
    // Anker = het geselecteerde object zelf (voor muren dus het segment, niet de
    // hele hiërarchie — die staat ingezoomd al snel buiten beeld). Voor een
    // niet-muur node mét actieve Transformer gebruiken we diens volledige
    // clientRect (incl. padding/anchors/rotatiegreep) zodat de toolbar er onder
    // altijd echt vrij van blijft — dezelfde aanpak als bij multi-selectie.
    const box = stage.container().getBoundingClientRect()
    const useTransformerRect = tr && !isWallSegment(node) && !node.attrs.isLocked && tr.nodes().includes(node)
    const r = useTransformerRect ? tr.getClientRect() : node.getClientRect()
    placeToolbar(div, box,
      box.left + r.x + r.width / 2,
      box.top + r.y + r.height + 8)
  }, [])

  const hideToolbar = useCallback(() => {
    toolbarTargetRef.current = null
    setSelectedType(null)
    setSelectedColor(null)
    setShowColorPicker(false)
    setImageLocked(false)
    setGizmoNode(null)
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
    setShowColorPicker(false)
    const firstColored = tr.nodes().find(n => !n.attrs.isImage && n.getClassName() !== 'Text')
    setSelectedColor(firstColored ? getNodeColor(firstColored) : null)
    tr.rotateEnabled(true) // multi-selection keeps the rotation handle
    const r = tr.getClientRect()
    const box = stage.container().getBoundingClientRect()
    placeToolbar(div, box,
      box.left + r.x + r.width / 2,
      box.top + r.y + r.height + 8)
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
      rotationSnaps: Array.from({ length: 36 }, (_, i) => i * 10),
      rotationSnapTolerance: 3,
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
          centerToContentRef.current?.()
        } else {
          // Cull off-screen content vóór de eerste draw; bij centreren doet
          // endNav dit al met de definitieve viewport.
          applyViewportCulling(stage, mainLayer)
          stage.batchDraw()
        }
        setMinimapVersion(v => v + 1)
      }, 150)
    }

    let cancelled = false
    const cached = liveSnapshotCache.get(note.id)
    if (cached) {
      deserializeLayer(normalizeSnapshot(cached), mainLayer)
      afterLoad()
    } else {
      getNote(note.id).then(fresh => {
        if (cancelled) return
        if (fresh?.snapshot) {
          // normalizeSnapshot migreert records van vóór het versieveld
          // (muur-markering + verbindings-lijsten) — zie konvaSerialize.js.
          deserializeLayer(normalizeSnapshot(fresh.snapshot), mainLayer)
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
      persistenceFlushRef.current?.()   // flush while the layer still exists
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
  // getIntersection werkt niet terwijl de layer niet luistert (pen-tool, zie
  // Effect 4) — herbouw de hit-canvas dan eenmalig voor deze ene test.
  function hitTestAt(mainLayer, pos) {
    if (!mainLayer || !pos) return null
    if (mainLayer.listening()) return mainLayer.getIntersection(pos)
    mainLayer.listening(true)
    mainLayer.drawHit()
    const hit = mainLayer.getIntersection(pos)
    mainLayer.listening(false)
    return hit
  }

  function eraseAtContainerPos(containerPos, mainLayer, transformer) {
    const R = 8  // eraser radius in container/screen pixels
    const STEP = 3
    penActivityRef.current = performance.now()
    // De pen-gomknop kan afgaan terwijl de pen-tool hit-detectie op de layer
    // heeft uitgezet — zet hem aan en herbouw de hit-canvas vóór het samplen.
    // Blijft aan tijdens de gum-gesture (elke destroy vereist een verse hit-
    // canvas); pointerup van de pen-gom zet hem weer uit.
    if (!mainLayer.listening()) {
      mainLayer.listening(true)
      mainLayer.drawHit()
    }
    const toDestroy = new Set()
    for (let dy = -R; dy <= R; dy += STEP) {
      for (let dx = -R; dx <= R; dx += STEP) {
        if (dx * dx + dy * dy > R * R) continue
        const hit = mainLayer.getIntersection({ x: containerPos.x + dx, y: containerPos.y + dy })
        if (hit && hit.getClassName() !== 'Transformer' && !hit.attrs.isImage && !hit.name()?.startsWith('lineGizmoHandle')) {
          toDestroy.add(hit)
        }
      }
    }
    const alive = [...toDestroy].filter(n => n.getLayer())
    if (alive.length) {
      const gizmoAffected = disconnectAndDestroy(alive, mainLayer)
      transformer?.nodes([])
      mainLayer.batchDraw()
      if (gizmoAffected) {
        if (lineGizmoNodeRef.current?.getLayer()) {
          // Gizmo node is alive but had a connection cleared — refresh fan buttons
          setLineGizmoVersion(v => v + 1)
        } else {
          hideToolbar()
        }
      }
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
    let penEraserDirty = false  // true after pen-eraser-button erase, until pointerup
    // true tussen pen-pointerdown en -up. Sommige Windows-digitizer/browser-
    // combinaties sturen voor dezelfde streek NAAST pointerdown/move/up ook nog
    // compat-touchstart/touchmove/touchend-events — stopNativeTouch (hieronder)
    // mag die dan niet blokkeren, anders mist Konva's eigen Transformer-anchor-
    // afhandeling (scale/rotate) events die alleen via de touch-familie binnenkomen.
    let penGestureActive = false
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

    // 1-finger touch content drag state — moves the current selection (any
    // node type, single or multi) the same way the mouse/pen path does via
    // dragNodeOrigins (Effect 3), since that state lives in a different
    // effect's closure and can't be shared directly.
    let touchDragNodes = null     // [{ node, x, y }] snapshot at drag start, or null
    let touchDragStageStart = null
    let touchDragMoved = false
    let twoFingerActive = false   // true once 2 fingers were active; blocks leftover-finger pan
    let touchDraggableFrozen = false  // true when we've pre-emptively set draggable(false) on nodes

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
    animateNavRef.current = animateNav

    function doCenterToContent() {
      const stage     = stageRef.current
      const mainLayer = mainLayerRef.current
      if (!stage || !mainLayer) return
      const nodes = mainLayer.getChildren().filter(n => n.getClassName() !== 'Transformer')
      if (!nodes.length) return

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      nodes.forEach(n => {
        const r = n.getClientRect({ relativeTo: stage })
        minX = Math.min(minX, r.x); minY = Math.min(minY, r.y)
        maxX = Math.max(maxX, r.x + r.width); maxY = Math.max(maxY, r.y + r.height)
      })

      const pad = 60, viewW = stage.width(), viewH = stage.height()
      const targetScale = Math.min((viewW - pad * 2) / (maxX - minX), (viewH - pad * 2) / (maxY - minY), 3)
      const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2
      const targetX = viewW / 2 - cx * targetScale
      const targetY = viewH / 2 - cy * targetScale

      // Animeer via het frozen-canvas mechanisme (CSS-transform per frame in
      // plaats van een volledige vector-redraw per frame); endNav doet daarna
      // de culling en savePanZoom schrijft dezelfde settings weg.
      animateNav(targetX, targetY, targetScale)
    }
    centerToContentRef.current = doCenterToContent

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
      // Een echte pan/zoom-gesture (niet een tik) annuleert een lopende
      // kalibratie-lijntekening — zo kan de gebruiker altijd terug zonder
      // fysiek toetsenbord (geen Escape op tablet).
      if (calibratePhaseRef.current === 'drawing') {
        // toolbarTargetRef blijft ongewijzigd (handleStartCalibrate verbergt
        // alleen de div) — endNav() hieronder herstelt 'm op de normale manier.
        calibDrawRef.current?.previewLine?.destroy()
        drawingLayerRef.current?.batchDraw()
        calibDrawRef.current = null
        calibrateNodeRef.current = null
        setCalibratePhase(null)
      }
      const stage = stageRef.current
      const tr = transformerRef.current
      if (tr) {
        const isLockedImg = n => n?.attrs?.isImage && n?.attrs?.isLocked
        // Locked images auto-deselect on any navigation — they're navigation anchors, not selections.
        savedSelection = tr.nodes().filter(n => !isLockedImg(n))
        if (isLockedImg(toolbarTargetRef.current)) toolbarTargetRef.current = null
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
        deferredDrawRef.current?.()
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
      touchDraggableFrozen = false
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
        const tool = activeToolRef.current
        layer.getChildren().forEach(n => n.draggable(computeDraggable(n, tool)))
      }
      if (layer) {
        delete layer.batchDraw          // restore Konva's normal batchDraw
        // Cull off-screen content vóór de post-nav draw, zodat die (en elke
        // volgende draw tot de volgende navigatie) alleen zichtbare nodes kost.
        // Geselecteerde nodes en de gizmo-lijn blijven altijd zichtbaar.
        const stageForCull = stageRef.current
        if (stageForCull) {
          const keep = new Set(transformerRef.current?.nodes() ?? [])
          if (lineGizmoNodeRef.current) keep.add(lineGizmoNodeRef.current)
          applyViewportCulling(stageForCull, layer, n => keep.has(n))
        }
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
      if (e.pointerType === 'pen') penGestureActive = true

      // ── Pen eraser button ──────────────────────────────────────────────
      if (e.pointerType === 'pen' && (e.button === 5 || (e.buttons & 32))) {
        notifyInputType('pen-eraser')
        e.stopImmediatePropagation()
        doErase(e.clientX, e.clientY)
        penEraserDirty = true
        return
      }

      // ── Pen tip ────────────────────────────────────────────────────────
      if (e.pointerType === 'pen') {
        notifyInputType('pen')
        // Niet-geselecteerde lijn-segmenten hebben draggable:false (zie
        // computeDraggable) en kunnen dus sowieso niet per ongeluk verschoven
        // worden met de pen — geen aparte hack hier meer nodig.
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
          touchDragNodes = null
          touchDragMoved = false
          // Check whether the finger lands on the current selection's bounding
          // box. If so, dragging moves the selected content instead of panning —
          // the one exception to "vinger = alleen navigeren". Geen
          // activeToolRef-check hier: notifyInputType('touch') hierboven heeft
          // de tool al naar 'select' gezet, maar die React-state-update is nog
          // niet in de ref doorgesijpeld op het allereerste contactmoment na een
          // andere tool — aanraking IMPLICEERT hier altijd select-gedrag, dus
          // checken op de (mogelijk nog stale) ref zou die eerste aanraking net
          // kunnen missen.
          // Muursegmenten worden hier bewust uitgesloten — die bewegen via hun
          // eigen gizmo (LineGizmo endpoint-drag), niet via dit generieke
          // selectie-sleepsysteem.
          const tr = transformerRef.current
          const selected = (tr?.nodes() ?? []).filter(n => !n.attrs.isLocked && !isWallSegment(n))
          if (selected.length > 0) {
            const pos = getContainerPos(e.clientX, e.clientY)
            const box = tr.getClientRect()
            if (pos.x >= box.x && pos.x <= box.x + box.width &&
                pos.y >= box.y && pos.y <= box.y + box.height) {
              touchDragNodes = selected.map(n => ({ node: n, x: n.x(), y: n.y() }))
              touchDragStageStart = clientToStageCoord(e.clientX, e.clientY)
            }
          }
          // Disable Konva drag on all non-selected nodes immediately so that if
          // this finger moves, Konva never starts dragging content on its own.
          // Selected nodes being dragged are excluded here because touchDragNodes
          // handles their movement manually. Draggable state is restored in
          // endNav() (pan/zoom case) or onPointerUp (tap case).
          if (!touchDragNodes) {
            touchDraggableFrozen = true
            mainLayerRef.current?.getChildren().forEach(n => {
              if (n.getClassName() !== 'Transformer') n.draggable(false)
            })
          }
        } else if (touchPointers.size === 2) {
          // Second finger joins: always switch to pan/pinch, even when the first
          // finger is mid-resize on an anchor (cancel the resize).
          e.stopImmediatePropagation()
          touchResizePointerId = null // cancel any ongoing single-finger resize
          twoFingerActive = true
          if (touchDragNodes && touchDragMoved) {
            if (touchDragNodes.length === 1) positionAndShowToolbar(touchDragNodes[0].node)
            else positionToolbarAtTransformer()
            historyPushRef.current?.()
            persistenceScheduleRef.current?.()
          }
          touchDragNodes = null
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
        penEraserDirty = true
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
          if (touchDragNodes) {
            // Move the selected content with 1 finger — no pan.
            const sc = clientToStageCoord(e.clientX, e.clientY)
            const dx = sc.x - touchDragStageStart.x
            const dy = sc.y - touchDragStageStart.y
            touchDragNodes.forEach(({ node, x, y }) => node.position({ x: x + dx, y: y + dy }))
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
      if (e.pointerType === 'pen') penGestureActive = false

      // ── Pen eraser lift ────────────────────────────────────────────────
      if (e.pointerType === 'pen' && penEraserDirty) {
        penEraserDirty = false
        // eraseAtContainerPos zette hit-detectie aan; in de pen-tool hoort die uit.
        if (activeToolRef.current === 'pen') mainLayerRef.current?.listening(false)
        historyPushRef.current?.()
        persistenceScheduleRef.current?.()
        return
      }

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
          // Commit content drag if the selection actually moved.
          if (touchDragNodes && touchDragMoved) {
            mainLayerRef.current?.batchDraw()
            if (touchDragNodes.length === 1) positionAndShowToolbar(touchDragNodes[0].node)
            else positionToolbarAtTransformer()
            historyPushRef.current?.()
            persistenceScheduleRef.current?.()
            touchDragNodes = null
            touchDragMoved = false
            twoFingerActive = false
            savePanZoom()
            return
          }
          touchDragNodes = null
          touchDragMoved = false
          twoFingerActive = false

          endNav() // restore selection + toolbar (also restores draggable when navActive was true)
          // If we froze draggable but navActive was never set (pure tap), endNav() was a
          // no-op so we must restore draggable state here.
          if (touchDraggableFrozen) {
            touchDraggableFrozen = false
            const layer = mainLayerRef.current
            const tool = activeToolRef.current
            layer?.getChildren().forEach(n => n.draggable(computeDraggable(n, tool)))
          }
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
                let hit = hitTestAt(mainLayer, pos)
                if (hit?.name()?.startsWith('lineGizmoHandle')) hit = null
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
            let hit = hitTestAt(mainLayer, pos)
            if (hit?.name()?.startsWith('lineGizmoHandle')) hit = null

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

    // Konva.Stage binds its OWN internal handlers to the native touchstart/
    // touchmove/touchend/touchcancel events (in parallel with pointerdown/
    // move/up/cancel — every touch input dispatches BOTH event families).
    // We already fully own pointer-event-based touch handling above and
    // never rely on Konva's synthetic pointerover/pointermove/click/tap
    // events for touch (Effect 3's onClick/onDblClick bail out for touch).
    // Left alone, Konva's touchmove-triggered _pointermove still runs on
    // every move sample (getBoundingClientRect + a getImageData hit-test)
    // and its touchend-triggered _pointerup still runs on every release
    // (another getImageData hit-test, right after endNav's full redraw) —
    // pure wasted main-thread work for the entire lifetime of every touch
    // gesture. Stop these native events here, before they reach Konva's
    // listener (bound to a descendant of `container`), the same way the
    // pointer events above are already intercepted.
    // Uitzondering: tijdens een actieve pen-streek NIET onderdrukken. Sommige
    // Windows-digitizer/browsercombinaties sturen voor pen-input naast
    // pointerdown/move/up óók compat-touchstart/move/end-events — Konva's
    // Transformer (scale/rotate-anchors) bleek daarvan afhankelijk te zijn op
    // die hardware, waardoor rescale/rotate met de pen faalde zodra deze
    // blanket-onderdrukking werd toegevoegd (echte losse vingertouch-gestures
    // blijven hierdoor onaangetast, want penGestureActive is dan altijd false).
    function stopNativeTouch(e) {
      if (penGestureActive) return
      e.stopImmediatePropagation()
    }
    container.addEventListener('touchstart',  stopNativeTouch, { capture: true })
    container.addEventListener('touchmove',   stopNativeTouch, { capture: true })
    container.addEventListener('touchend',    stopNativeTouch, { capture: true })
    container.addEventListener('touchcancel', stopNativeTouch, { capture: true })

    container.addEventListener('pointerdown',  onPointerDown, { capture: true })
    container.addEventListener('pointermove',  onPointerMove, { capture: true })
    container.addEventListener('pointerup',    onPointerUp,   { capture: true })
    container.addEventListener('pointercancel',onPointerUp,   { capture: true })
    container.addEventListener('wheel',        onWheel,       { passive: false })

    return () => {
      container.removeEventListener('touchstart',  stopNativeTouch, { capture: true })
      container.removeEventListener('touchmove',   stopNativeTouch, { capture: true })
      container.removeEventListener('touchend',    stopNativeTouch, { capture: true })
      container.removeEventListener('touchcancel', stopNativeTouch, { capture: true })
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
    let dragMoved           = false // pas true zodra de sleepafstand de tik-drempel overschrijdt
    let dragOriginPos       = { x: 0, y: 0 }
    let dragNodeOrigins     = []    // [{ node, x, y }] snapshot at drag start
    let dragSavedNodes      = []    // full transformer selection, restored after drag
    const justRubberBanded  = justRubberBandedRef  // ref — survives Effect 3 re-runs
    const justHandledTap    = justHandledTapRef
    const justCommittedLinear = justCommittedLinearRef
    const justDraggedNode   = justDraggedNodeRef

    // ── Muur-tool tekenstate (Fase 2) ───────────────────────────────────────
    // Tik-vs-sleep wordt pas beslist zodra de sleepafstand WALL_DRAW_THRESHOLD_STAGE
    // overschrijdt (wereld-eenheden, zoom-onafhankelijk) — pas dan verschijnen
    // preview-lijn en live pill; zo blijft een korte tik zonder visuele flits.
    // Preview + gidslijnen leven op drawingLayer/DOM en worden nooit aan mainLayer
    // toegevoegd — ze mogen dus nooit in een save terechtkomen.
    let wallDraw = null        // { startPt, startConn, endPt, endConn, previewLine, pillEl, hitNodeAtDown, moved }
    let wallAlignX = null      // pink vertical guide (drawingLayer)
    let wallAlignY = null      // pink horizontal guide (drawingLayer)
    let wallSnapIndicator = null // blue 45°-snap guide (drawingLayer)

    function createWallPillEl() {
      const el = document.createElement('div')
      el.className = 'line-gizmo-measure-label wall-draw-pill'
      el.style.pointerEvents = 'none'
      const ps = getPillCssStyle(pillStyleRef.current)
      el.style.background = ps.background
      el.style.color      = ps.color
      el.style.fontSize   = ps.fontSize
      if (ps.boxShadow !== undefined) el.style.boxShadow = ps.boxShadow
      wrapperRef.current?.appendChild(el)
      return el
    }

    function updateWallPillEl(el, midX, midY, lengthM) {
      const box = stage.container().getBoundingClientRect()
      const sp = stage.getAbsoluteTransform().point({ x: midX, y: midY })
      el.style.left = `${box.left + sp.x}px`
      el.style.top  = `${box.top + sp.y}px`
      el.textContent = lengthM.toFixed(2)
    }

    function removeWallGuides() {
      if (wallAlignX) { wallAlignX.destroy(); wallAlignX = null }
      if (wallAlignY) { wallAlignY.destroy(); wallAlignY = null }
      if (wallSnapIndicator) { wallSnapIndicator.destroy(); wallSnapIndicator = null }
    }

    // Zelfde snap-cascade als LineGizmo's endpoint-drag (las > uitlijning > hoek),
    // nu ook voor het tekenen van een geheel nieuwe muur: las- en hoek-snap werken
    // al vanaf de allereerste lijn; uitlijning scoped per 5.1 (eigen hiërarchie
    // altijd, andere hiërarchieën alleen on-screen — hier is dat sowieso leeg
    // zolang er geen ketting-startpunt is, want een verse losse muur heeft nog
    // geen "eigen hiërarchie" om off-screen in mee te nemen).
    function computeWallEndpoint(candX, candY, wd) {
      const anchorX = wd.startPt.x, anchorY = wd.startPt.y
      let cx = candX, cy = candY

      // 1. Las-snap (eindpunt-op-eindpunt) — gaat voor alles.
      const epSnapDist = WALL_EP_SNAP_SCREEN_PX / stage.scaleX()
      const weld = findWallEndpointNear(mainLayer, cx, cy, epSnapDist)
      if (weld) {
        removeWallGuides()
        drawingLayer.batchDraw()
        return { x: weld.x, y: weld.y, weldConn: { id: weld.node.id(), ep: weld.ep } }
      }

      // 2. Uitlijn-snap (roze gidslijnen), onafhankelijk per as.
      const alignDist = WALL_ALIGN_SNAP_SCREEN_PX / stage.scaleX()
      const ownStartNode = wd.startConn ? mainLayer.findOne(`#${wd.startConn.id}`) : null
      const vertices = collectSnapVertices(mainLayer, stage, ownStartNode, [])
      let snapX = null, snapY = null
      for (const v of vertices) {
        if (snapX === null && Math.abs(cx - v.x) < alignDist) snapX = v.x
        if (snapY === null && Math.abs(cy - v.y) < alignDist) snapY = v.y
        if (snapX !== null && snapY !== null) break
      }
      if (snapX !== null) cx = snapX
      if (snapY !== null) cy = snapY

      const sc = stage.scaleX()
      const left   = (-stage.x()) / sc, right  = (stage.width()  - stage.x()) / sc
      const top    = (-stage.y()) / sc, bottom = (stage.height() - stage.y()) / sc

      if (snapX !== null) {
        if (!wallAlignX) {
          wallAlignX = new Konva.Line({ stroke: '#e64980', strokeWidth: 1, strokeScaleEnabled: false, dash: [6, 5], opacity: 0.65, listening: false, perfectDrawEnabled: false })
          drawingLayer.add(wallAlignX)
        }
        wallAlignX.points([snapX, top, snapX, bottom])
      } else if (wallAlignX) { wallAlignX.destroy(); wallAlignX = null }
      if (snapY !== null) {
        if (!wallAlignY) {
          wallAlignY = new Konva.Line({ stroke: '#e64980', strokeWidth: 1, strokeScaleEnabled: false, dash: [6, 5], opacity: 0.65, listening: false, perfectDrawEnabled: false })
          drawingLayer.add(wallAlignY)
        }
        wallAlignY.points([left, snapY, right, snapY])
      } else if (wallAlignY) { wallAlignY.destroy(); wallAlignY = null }

      // 3. Hoek-snap (45°), gecombineerd met een eventueel al vastgelegde as.
      let isAngleSnapping = false, snappedAngle = 0
      const bothAxesLocked = snapX !== null && snapY !== null
      if (!bothAxesLocked && snapEnabledRef.current) {
        const dx = cx - anchorX, dy = cy - anchorY
        const angle = Math.atan2(dy, dx)
        snappedAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
        if (Math.abs(angle - snappedAngle) < SNAP_RAD_WALL) {
          isAngleSnapping = true
          const cosA = Math.cos(snappedAngle), sinA = Math.sin(snappedAngle)
          if (snapY !== null) {
            if (Math.abs(sinA) > 1e-9) { const len = (cy - anchorY) / sinA; cx = anchorX + cosA * len }
          } else if (snapX !== null) {
            if (Math.abs(cosA) > 1e-9) { const len = (cx - anchorX) / cosA; cy = anchorY + sinA * len }
          } else {
            const len = Math.hypot(dx, dy)
            cx = anchorX + cosA * len
            cy = anchorY + sinA * len
          }
        }
      }

      if (isAngleSnapping) {
        const sc2 = Math.cos(snappedAngle), ss2 = Math.sin(snappedAngle)
        const ts = []
        if (Math.abs(sc2) > 1e-9) { ts.push((left  - anchorX) / sc2); ts.push((right - anchorX) / sc2) }
        if (Math.abs(ss2) > 1e-9) { ts.push((top   - anchorY) / ss2); ts.push((bottom - anchorY) / ss2) }
        const tMin = Math.min(...ts), tMax = Math.max(...ts)
        if (!wallSnapIndicator) {
          wallSnapIndicator = new Konva.Line({ stroke: '#1971c2', strokeWidth: 1, strokeScaleEnabled: false, dash: [6, 5], opacity: 0.55, listening: false, perfectDrawEnabled: false })
          drawingLayer.add(wallSnapIndicator)
        }
        wallSnapIndicator.points([
          anchorX + tMin * sc2, anchorY + tMin * ss2,
          anchorX + tMax * sc2, anchorY + tMax * ss2,
        ])
      } else if (wallSnapIndicator) {
        wallSnapIndicator.destroy(); wallSnapIndicator = null
      }

      drawingLayer.batchDraw()
      return { x: cx, y: cy, weldConn: null }
    }

    function cancelWallDraw() {
      if (!wallDraw) return
      wallDraw.previewLine?.destroy()
      wallDraw.pillEl?.remove()
      removeWallGuides()
      drawingLayer.batchDraw()
      wallDraw = null
    }

    let batchRicId = null
    let batchToId  = null

    function deferBatchDraw() {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(batchRicId)
      clearTimeout(batchToId)
      const doIt = () => { batchRicId = null; batchToId = null; mainLayer.batchDraw() }
      if (typeof requestIdleCallback !== 'undefined') {
        batchRicId = requestIdleCallback(doIt, { timeout: 300 })
      } else {
        batchToId = setTimeout(doIt, 0)
      }
    }

    function flushDeferredBatch() {
      if (batchRicId === null && batchToId === null) return
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(batchRicId)
      clearTimeout(batchToId)
      batchRicId = null
      batchToId = null
      mainLayer.draw()
    }

    deferredDrawRef.current = flushDeferredBatch

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
      if (freehandPoints.length < 2) { freehandPoints = []; clearLiveCanvas(); return }

      const style = strokeStyleRef.current
      const isDashed = style === 'dashed' || style === 'dotted'
      if (isDashed) clearLiveCanvas()  // dashed live preview toont verkeerde vorm — direct wissen

      let node
      if (isDashed) {
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

      if (isDashed) {
        mainLayer.batchDraw()
      } else {
        // Keep live canvas visible until Konva has drawn → no flicker.
        // Check freehandPoints at draw time: if a new stroke has started, don't clear.
        const onDraw = () => { mainLayer.off('draw', onDraw); if (!freehandPoints.length) clearLiveCanvas() }
        mainLayer.on('draw', onDraw)
        deferBatchDraw()
      }

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
      const clone = shapePreview.clone({ listening: true, draggable: false, id: generateId(), ...fillOverride })
      shapePreview.destroy()
      shapePreview = null
      drawingLayer.batchDraw()
      mainLayer.add(clone)
      transformer.moveToTop()
      mainLayer.batchDraw()
      history.pushState()
      scheduleSnapshot()
      // After drawing any shape, auto-select it and switch to the select tool.
      // Sinds de muur-tool (Fase 2) is een met lijn/pijl getekend segment géén
      // muur meer — dat is nu een bewuste keuze via de muur-tool — dus dit
      // gedraagt zich verder als elke andere vorm (transformer, geen gizmo).
      if (isSingleLinear(clone)) {
        // A click without drag produces a near-zero-length line. Give it a
        // default horizontal length so it's visible and usable.
        const pts = clone.points()
        if (Math.hypot(pts[2] - pts[0], pts[3] - pts[1]) < 2) {
          clone.points([pts[0], pts[1], pts[0] + 2 * GRID_SIZE, pts[1]])
        }
      }
      transformer.nodes([clone])
      mainLayer.batchDraw()
      justCommittedLinearRef.current = true
      onToolSelect?.('select')
      positionAndShowToolbar(clone)
    }

    // ── Konva stage event handlers ──────────────────────────────────────────
    function onPointerDown(e) {
      if (e.evt.pointerType === 'touch') return // handled in Effect 2
      const tool = activeToolRef.current
      const pos  = stagePos() // stage-space coords (corrects for pan/zoom)

      // If the pen lands on a transformer anchor, let the transformer handle
      // the resize/rotate — do not start drawing.
      if (e.target !== stage && e.target.getParent?.() === transformer) return

      if (calibratePhaseRef.current === 'drawing') {
        calibDrawRef.current = { startPt: pos, endPt: pos, previewLine: null }
        return
      }

      if (tool === 'eraser') {
        erasing = true
        doEraseAtContainerPos(stage.getPointerPosition())
        return
      }

      if (tool === 'pen') {
        penActivityRef.current = performance.now()
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

      if (tool === 'wall') {
        const hit = e.target
        // Al geselecteerd (gizmo open) en de pen raakt precies dát segment:
        // laat Konva's eigen draggable (Effect 4) het body-slepen afhandelen.
        if (isWallSegment(hit) && hit === lineGizmoNodeRef.current) return
        if (hit?.name?.()?.startsWith('lineGizmoHandle')) return

        const epSnapDist = WALL_EP_SNAP_SCREEN_PX / stage.scaleX()
        const startCandidate = findWallEndpointNear(mainLayer, pos.x, pos.y, epSnapDist)
        let startPt = startCandidate ? { x: startCandidate.x, y: startCandidate.y } : pos

        // Mid-segment-aftakking (5.2): pen-down op de body van een ANDERE muur
        // (niet bij een bestaand hoekpunt — die snap heeft voorrang, zie hierboven)
        // splitst die muur straks bij commit op het geprojecteerde punt. Vereist
        // een echte sleep (moved); een tik selecteert gewoon de host (hitNodeAtDown).
        let splitHost = null
        if (!startCandidate && isWallSegment(hit) && hit !== lineGizmoNodeRef.current) {
          const hpts = hit.points()
          const hhx = hit.x(), hhy = hit.y()
          const ep0x = hhx + hpts[0], ep0y = hhy + hpts[1]
          const ep1x = hhx + hpts[2], ep1y = hhy + hpts[3]
          const proj = closestPointOnSegment(pos.x, pos.y, ep0x, ep0y, ep1x, ep1y)
          const distToEp0 = Math.hypot(proj.x - ep0x, proj.y - ep0y)
          const distToEp1 = Math.hypot(proj.x - ep1x, proj.y - ep1y)
          if (distToEp0 > epSnapDist && distToEp1 > epSnapDist) {
            splitHost = hit
            startPt = { x: proj.x, y: proj.y }
          }
        }

        // Preview-lijn/pill worden pas aangemaakt zodra de sleepafstand de
        // teken-drempel overschrijdt (zie onPointerMove) — zo geeft een tik geen
        // visuele flits van een kort lijntje.
        wallDraw = {
          startPt,
          startConn: startCandidate ? { id: startCandidate.node.id(), ep: startCandidate.ep } : null,
          splitHost,
          endPt: startPt, endConn: null,
          previewLine: null, pillEl: null,
          hitNodeAtDown: isWallSegment(hit) ? hit : null,
          moved: false,
        }
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
        // Ook bij een klik direct op een geselecteerde node — zowel bij multi-
        // selectie als bij een enkele node. We routeren dit altijd door ONS EIGEN
        // handmatige drag-systeem (dragNodeOrigins) i.p.v. Konva's ingebouwde
        // node-drag: die laatste blijkt niet betrouwbaar te reageren op pen-input
        // (bevestigd: pen-down op de inkt/afbeelding zelf deed niets, terwijl
        // pen-down op leeg canvas binnen de gizmo-bbox — dat liep al via dit
        // handmatige systeem — wél werkte).
        const targetInSelection = trNodes.length > 0 && trNodes.includes(e.target)
        if (trNodes.length > 0 && (e.target === stage || targetInSelection)) {
          const cp  = stage.getPointerPosition() // container-relative, matches getClientRect()
          const box = transformer.getClientRect()
          if (cp && cp.x >= box.x && cp.x <= box.x + box.width &&
                    cp.y >= box.y && cp.y <= box.y + box.height) {
            dragSavedNodes  = [...trNodes]
            draggingNodes   = true
            dragMoved       = false
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
        // Tik-drempel: pas verplaatsen zodra de sleepafstand >3 stage-eenheden is
        // (zelfde conventie als de rubber-band hieronder) — anders schuift een
        // simpele tik-om-te-selecteren de node al een fractie op door pen-jitter.
        if (!dragMoved && Math.hypot(dx, dy) <= 3) return
        dragMoved = true
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

      if (calibDrawRef.current) {
        const cd = calibDrawRef.current
        // Alleen horizontaal/verticaal/45°-snap (via snapLineAngle) — bewust GEEN
        // muur-endpoint/uitlijn-snap (findWallEndpointNear/collectSnapVertices):
        // de kalibratielijn hoort losstaand te zijn van het lijnsysteem.
        const snapped = snapLineAngle(cd.startPt, pos, snapEnabledRef.current)
        cd.endPt = { x: snapped.x, y: snapped.y }
        if (!cd.previewLine) {
          cd.previewLine = new Konva.Line({
            points: [cd.startPt.x, cd.startPt.y, snapped.x, snapped.y],
            stroke: '#e8590c', strokeWidth: 2, dash: [8, 6],
            listening: false, perfectDrawEnabled: false,
          })
          drawingLayer.add(cd.previewLine)
        } else {
          cd.previewLine.points([cd.startPt.x, cd.startPt.y, snapped.x, snapped.y])
        }
        // Bewust geen lengte-label: de lijn staat nog niet op schaal, een
        // getal ernaast zou de gebruiker alleen maar in verwarring brengen.
        drawingLayer.batchDraw()
        return
      }

      if (wallDraw) {
        const wd = wallDraw
        if (!wd.moved) {
          const dist = Math.hypot(pos.x - wd.startPt.x, pos.y - wd.startPt.y)
          if (dist > WALL_DRAW_THRESHOLD_STAGE) {
            wd.moved = true
            wd.previewLine = new Konva.Line({
              points: [wd.startPt.x, wd.startPt.y, wd.startPt.x, wd.startPt.y],
              stroke: penColorRef.current, strokeWidth: penSizeRef.current * 2,
              opacity: opacityRef.current / 100, lineCap: 'round',
              listening: false, perfectDrawEnabled: false,
            })
            drawingLayer.add(wd.previewLine)
            wd.pillEl = createWallPillEl()
          } else {
            return // nog onder de teken-drempel: behandel als (mogelijke) tik, niets tekenen
          }
        }

        const { x: endX, y: endY, weldConn } = computeWallEndpoint(pos.x, pos.y, wd)
        wd.endPt = { x: endX, y: endY }
        wd.endConn = weldConn
        wd.previewLine.points([wd.startPt.x, wd.startPt.y, endX, endY])
        drawingLayer.batchDraw()

        const lengthM = Math.hypot(endX - wd.startPt.x, endY - wd.startPt.y) / GRID_SIZE
        updateWallPillEl(wd.pillEl, (wd.startPt.x + endX) / 2, (wd.startPt.y + endY) / 2, lengthM)
        return
      }

      if (tool === 'pen' && freehandPoints.length) {
        penActivityRef.current = performance.now()
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
          const snapped = snapLineAngle(shapeStart, pos, snapEnabledRef.current)
          const { x: endX, y: endY, isSnapping, snappedAngle } = snapped
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
        // Deze nodes bewegen altijd via ons eigen gizmo-bbox-systeem, nooit via
        // Konva-native draggable (zie computeDraggable) — blijft dus false.
        const tool = activeToolRef.current
        dragSavedNodes.forEach(n => n.draggable(computeDraggable(n, tool)))
        mainLayer.batchDraw()
        const target = toolbarTargetRef.current
        if (target) positionAndShowToolbar(target)
        // Onder de tik-drempel is er geometrisch niets veranderd (zie
        // onPointerMove) — dan geen overbodige history-entry/save, en laat de
        // trailing click gewoon zijn normale (tik-)gedrag doen, bijv. de
        // bestaande "tik op al-geselecteerde afbeelding = deselecteren".
        if (dragMoved) {
          history.pushState()
          scheduleSnapshot()
          // De onderliggende native mousedown/mouseup zaten op hetzelfde canvas-
          // element, dus de browser vuurt hierna alsnog een 'click' op de
          // (verplaatste) node — zonder deze guard zou onClick's "tik op een
          // al-geselecteerde afbeelding = deselecteren"-toggle de zojuist
          // versleepte afbeelding meteen weer deselecteren.
          justDraggedNode.current = true
        }
        return
      }

      if (tool === 'eraser' && erasing) {
        erasing = false
        history.pushState()
        scheduleSnapshot()
        return
      }

      if (calibDrawRef.current) {
        const cd = calibDrawRef.current
        cd.previewLine?.destroy()
        drawingLayer.batchDraw()
        const len = Math.hypot(cd.endPt.x - cd.startPt.x, cd.endPt.y - cd.startPt.y)
        if (len < MIN_CALIBRATION_LINE_STAGE) {
          // Te kort om betrouwbaar te zijn — blijf in tekenmodus, laat opnieuw proberen.
          calibDrawRef.current = null
          return
        }
        calibDrawRef.current = { startPt: cd.startPt, endPt: cd.endPt, previewLine: null }
        setCalibratePhase('value')
        return
      }

      if (wallDraw) {
        const wd = wallDraw
        wallDraw = null
        wd.previewLine?.destroy()
        wd.pillEl?.remove()
        removeWallGuides()
        drawingLayer.batchDraw()

        if (!wd.moved) {
          // Tik zonder sleep: selecteert de muur waarop de tik begon (edit-toestand);
          // een tik op leeg canvas of een andere muur legt de selectie elders/leeg.
          if (wd.hitNodeAtDown) positionAndShowToolbar(wd.hitNodeAtDown)
          else if (lineGizmoNodeRef.current) hideToolbar()
          return
        }

        let endPt = wd.endPt
        let len = Math.hypot(endPt.x - wd.startPt.x, endPt.y - wd.startPt.y)
        if (len < 2) { endPt = { x: wd.startPt.x + 2 * GRID_SIZE, y: wd.startPt.y }; len = 2 * GRID_SIZE }

        const sw = penSizeRef.current
        const newNode = new Konva.Line({
          id: generateId(),
          points: [wd.startPt.x, wd.startPt.y, endPt.x, endPt.y],
          stroke: penColorRef.current, strokeWidth: sw * 2,
          hitStrokeWidth: Math.max(sw * 4, HIT_MARGIN),
          opacity: opacityRef.current / 100, lineCap: 'round',
          listening: true, draggable: false, perfectDrawEnabled: false,
          shadowForStrokeEnabled: false, isWall: true,
        })
        mainLayer.add(newNode)
        transformer.moveToTop()
        if (wd.splitHost && wd.splitHost.getLayer()) {
          // Mid-segment-aftakking: host wordt vervangen door twee helften die samen
          // de oorspronkelijke geometrie behouden; het T-punt verbindt beide helften
          // én de nieuwe muur (graad-3, mogelijk sinds de verbindings-lijsten uit Fase 1).
          const { halfA, halfB } = splitWallAt(wd.splitHost, wd.startPt.x, wd.startPt.y, mainLayer)
          addConn(halfA, 1, newNode, 0)
          addConn(halfB, 0, newNode, 0)
        } else if (wd.startConn) {
          const startNode = mainLayer.findOne(`#${wd.startConn.id}`)
          if (startNode) addConn(startNode, wd.startConn.ep, newNode, 0)
        }
        if (wd.endConn) {
          const endNode = mainLayer.findOne(`#${wd.endConn.id}`)
          if (endNode) addConn(endNode, wd.endConn.ep, newNode, 1)
        }
        mainLayer.batchDraw()
        history.pushState()
        scheduleSnapshot()
        // Terug naar "niets geselecteerd": de volgende pen-down bij dit eindpunt
        // tekent meteen de volgende schakel (kettingen), zonder tool te wisselen.
        transformer.nodes([])
        hideToolbar()
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
          // Expand selection: if 2+ linear segments are included, add all nodes
          // connected to them so the entire hierarchy is always selected as a unit.
          const linearSelected = selected.filter(n => isSingleLinear(n))
          let finalSelected = selected
          if (linearSelected.length >= 2) {
            const toSelect = new Set(selected)
            const expandNode = node => {
              for (let ep = 0; ep < 2; ep++) {
                for (const conn of getConns(node, ep)) {
                  const connNode = mainLayer.findOne(`#${conn.id}`)
                  if (connNode && !toSelect.has(connNode)) {
                    toSelect.add(connNode)
                    // Verbonden segmenten kunnen buiten beeld geculed zijn; ze
                    // worden nu onderdeel van de selectie en moeten meebewegen
                    // én zichtbaar zijn.
                    if (connNode._culled) { connNode.visible(true); connNode._culled = false }
                    expandNode(connNode)
                  }
                }
              }
            }
            linearSelected.forEach(expandNode)
            if (toSelect.size > selected.length) finalSelected = [...toSelect]
          }
          transformer.nodes(finalSelected)
          mainLayer.batchDraw()
          if (finalSelected.length === 1) positionAndShowToolbar(finalSelected[0])
          else if (finalSelected.length > 1) positionToolbarAtTransformer()
          if (selected.length > 0) justRubberBanded.current = true
        } else {
          // Small movement = tap: handle selection/deselection directly.
          // This covers pen/mouse jitter where Konva may not fire 'click'.
          const cp = stage.getPointerPosition()
          if (cp) {
            let hit = mainLayer.getIntersection(cp)
            if (hit?.name()?.startsWith('lineGizmoHandle')) hit = null
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
        // Skip if we just finished drawing a line/arrow (auto-selected in commitShape).
        if (justCommittedLinear.current) { justCommittedLinear.current = false; return }
        // Skip if we just finished a gizmo-bbox body-drag (the trailing native
        // click would otherwise toggle an already-selected image back off).
        if (justDraggedNode.current) { justDraggedNode.current = false; return }
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
      let hit = e.target
      // Tijdens de pen-tool staat hit-detectie op de layer uit en rapporteert
      // Konva altijd de stage als target — test dan zelf zodat dubbelklikken
      // op tekst blijft werken.
      if (hit === stage && !mainLayer.listening()) {
        hit = hitTestAt(mainLayer, stage.getPointerPosition()) ?? stage
      }
      if (hit.getClassName() === 'Text') startTextEdit(hit)
    }

    // Lock aspect ratio when any image is in the selection; free for other shapes.
    transformer.on('transformstart', () => {
      suppressMeasureRef.current = true
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
      suppressMeasureRef.current = false
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
    const BODY_ALIGN_SNAP_PX = 20
    function removeBodyAlignIndicators(layer) {
      if (bodyXAlignRef.current) { bodyXAlignRef.current.destroy(); bodyXAlignRef.current = null }
      if (bodyYAlignRef.current) { bodyYAlignRef.current.destroy(); bodyYAlignRef.current = null }
      layer?.batchDraw()
    }
    let lastDragPos = null
    mainLayer.on('dragstart', ev => {
      lastDragPos = { x: ev.target.x(), y: ev.target.y() }
    })
    mainLayer.on('dragmove', ev => {
      const target = ev.target
      if (!isWallSegment(target) || !lastDragPos) return
      const layer = mainLayerRef.current
      const stage = stageRef.current
      if (!layer || !stage) return

      // ── Vertex alignment snapping ───────────────────────────────────────
      const pts = target.points()
      const alignDist = BODY_ALIGN_SNAP_PX / (stage.scaleX() ?? 1)
      const excludeList = [
        { id: target.id(), ep: 0 }, { id: target.id(), ep: 1 },
        ...getConns(target, 0), ...getConns(target, 1),
      ]
      const verts = collectHierarchyVertices(target, layer, excludeList)

      const ep0x = target.x() + pts[0], ep0y = target.y() + pts[1]
      const ep1x = target.x() + pts[2], ep1y = target.y() + pts[3]

      let snapX = null, snapY = null
      for (const v of verts) {
        if (snapX === null) {
          if (Math.abs(ep0x - v.x) < alignDist)      snapX = { val: v.x, ptIdx: 0 }
          else if (Math.abs(ep1x - v.x) < alignDist) snapX = { val: v.x, ptIdx: 2 }
        }
        if (snapY === null) {
          if (Math.abs(ep0y - v.y) < alignDist)      snapY = { val: v.y, ptIdx: 1 }
          else if (Math.abs(ep1y - v.y) < alignDist) snapY = { val: v.y, ptIdx: 3 }
        }
        if (snapX !== null && snapY !== null) break
      }

      if (snapX !== null) target.x(snapX.val - pts[snapX.ptIdx])
      if (snapY !== null) target.y(snapY.val - pts[snapY.ptIdx])

      const sc = stage.scaleX()
      const stageLeft   = (-stage.x()) / sc
      const stageRight  = (stage.width()  - stage.x()) / sc
      const stageTop    = (-stage.y()) / sc
      const stageBottom = (stage.height() - stage.y()) / sc

      if (snapX !== null) {
        if (!bodyXAlignRef.current) {
          bodyXAlignRef.current = new Konva.Line({
            stroke: '#e64980', strokeWidth: 1, strokeScaleEnabled: false,
            dash: [6, 5], opacity: 0.65, listening: false, perfectDrawEnabled: false,
          })
          layer.add(bodyXAlignRef.current)
        }
        bodyXAlignRef.current.points([snapX.val, stageTop, snapX.val, stageBottom])
      } else if (bodyXAlignRef.current) {
        bodyXAlignRef.current.destroy(); bodyXAlignRef.current = null
      }

      if (snapY !== null) {
        if (!bodyYAlignRef.current) {
          bodyYAlignRef.current = new Konva.Line({
            stroke: '#e64980', strokeWidth: 1, strokeScaleEnabled: false,
            dash: [6, 5], opacity: 0.65, listening: false, perfectDrawEnabled: false,
          })
          layer.add(bodyYAlignRef.current)
        }
        bodyYAlignRef.current.points([stageLeft, snapY.val, stageRight, snapY.val])
      } else if (bodyYAlignRef.current) {
        bodyYAlignRef.current.destroy(); bodyYAlignRef.current = null
      }

      // ── Stretch connected endpoints ─────────────────────────────────────
      const delta = { x: target.x() - lastDragPos.x, y: target.y() - lastDragPos.y }
      if (delta.x !== 0 || delta.y !== 0) {
        // Only stretch the directly connected endpoints — don't propagate the
        // full chain. This lets the user reposition a single wall within the
        // hierarchy; adjacent walls deform to follow rather than all moving.
        const updatedPts = target.points()
        for (let i = 0; i < 2; i++) {
          const newAbsX = target.x() + updatedPts[i * 2]
          const newAbsY = target.y() + updatedPts[i * 2 + 1]
          for (const conn of getConns(target, i)) {
            const connNode = layer.findOne(`#${conn.id}`)
            if (!connNode) continue
            const connPts = connNode.points().slice()
            connPts[conn.ep * 2]     = newAbsX - connNode.x()
            connPts[conn.ep * 2 + 1] = newAbsY - connNode.y()
            connNode.points(connPts)
          }
        }
        layer.batchDraw()
        lastDragPos = { x: target.x(), y: target.y() }
      }
    })
    mainLayer.on('dragend', ev => {
      const target = ev.target
      lastDragPos = null
      removeBodyAlignIndicators(mainLayerRef.current)
      historyPushRef.current?.()
      scheduleSnapshot()
      if (toolbarTargetRef.current === target) positionAndShowToolbar(target)
    })

    // pointerrawupdate fires at native device rate (~240 Hz on Surface Pen),
    // before the browser coalesces events into pointermove. Chromium-only.
    // Collecting points here and skipping pointermove gives maximum input fidelity.
    function onPointerRawUpdate(e) {
      if (e.pointerType !== 'pen') return
      if (activeToolRef.current !== 'pen') return
      if (!freehandPoints.length) return // only during an active stroke
      rawUpdateActive = true
      penActivityRef.current = performance.now()
      // Ook pointerrawupdate wordt door de browser gecoalesced zodra de main
      // thread bezig is. Zonder getCoalescedEvents() gaan die tussenpunten
      // verloren en worden snel geschreven rondingen hoekig — steeds erger
      // naarmate de notitie voller (drukker) is.
      const coalesced = e.getCoalescedEvents?.()
      const events = coalesced?.length ? coalesced : [e]
      for (const ce of events) {
        const p = clientToStage(ce.clientX, ce.clientY)
        const raw = pressureSensitiveRef.current ? (ce.pressure ?? 0.5) : 0.5
        freehandPoints.push([p.x, p.y, Math.pow(raw, 2.5)])
      }
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
      mainLayer.off('dragmove')
      mainLayer.off('dragstart')
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null }
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(batchRicId)
      clearTimeout(batchToId)
      deferredDrawRef.current = null
      selRect.destroy()
      clearLiveCanvas()
      shapePreview?.destroy()
      cancelWallDraw()
      calibDrawRef.current?.previewLine?.destroy()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id, positionAndShowToolbar, hideToolbar, positionToolbarAtTransformer])

  // ───────────────────────────────────────────────────────────────────────────
  // EFFECT 4a — Deselect when switching away from select tool
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (activeTool === 'select') return
    const tr = transformerRef.current
    const ml = mainLayerRef.current
    if (!tr) return
    const hasSelection = tr.nodes().length > 0 || !!lineGizmoNodeRef.current
    if (!hasSelection) return
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
    const calibrateCursor = "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><line x1='10' y1='2' x2='10' y2='18' stroke='%23e8590c' stroke-width='2'/><line x1='2' y1='10' x2='18' y2='10' stroke='%23e8590c' stroke-width='2'/><circle cx='10' cy='10' r='3' fill='none' stroke='white' stroke-width='1.5'/></svg>\") 10 10, crosshair"
    const cursors = { select: 'default', pen: dotCursor, wall: dotCursor, eraser: 'cell', text: 'text', rect: 'crosshair', circle: 'crosshair', line: 'crosshair', arrow: 'crosshair', lshape: 'crosshair' }
    stage.container().style.cursor = calibratePhase === 'drawing' ? calibrateCursor : (cursors[activeTool] ?? 'default')

    mainLayer.getChildren().forEach(node => node.draggable(computeDraggable(node, activeTool)))

    // Hit-canvas tekenen verdubbelt de kosten van elke layer-draw. Tijdens de
    // pen-tool gebruikt niets hit-detectie (geen selectie, geen klik-targets);
    // consumers die hem tóch nodig hebben (pen-gomknop, dubbelklik op tekst,
    // vinger-tap) herbouwen hem lazy via hitTestAt/eraseAtContainerPos.
    const wantsHit = activeTool !== 'pen'
    if (mainLayer.listening() !== wantsHit) {
      mainLayer.listening(wantsHit)
      if (wantsHit) mainLayer.drawHit() // hit-canvas is verouderd na een pen-sessie
    }
  }, [activeTool, lineGizmoNode, calibratePhase])

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
        const trNodes   = transformer.nodes()
        const gizmoNode = lineGizmoNodeRef.current
        const allNodes  = gizmoNode && !trNodes.includes(gizmoNode)
          ? [...trNodes, gizmoNode]
          : trNodes
        if (!allNodes.length) return
        transformer.nodes([])
        disconnectAndDestroy(allNodes, mainLayer)
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
      // Unlock: restore listening zodat Konva 'm weer kan hit-testen/selecteren.
      // draggable blijft false — verplaatsen loopt via ons eigen gizmo-bbox-
      // systeem (computeDraggable), niet via Konva-native draggable.
      node.setAttrs({ isLocked: false, draggable: false, listening: true })
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

  // Start de kalibratie-tool: cursor wisselt meteen, geen modal totdat de lijn
  // getekend is (Effect 3/onPointerUp zet calibratePhase pas op 'value').
  function handleStartCalibrate() {
    const node = toolbarTargetRef.current
    if (!node) return
    calibrateNodeRef.current = node
    calibDrawRef.current = null
    if (toolbarDivRef.current) toolbarDivRef.current.style.display = 'none'
    setCalibratePhase('drawing')
  }

  function cancelCalibration() {
    calibDrawRef.current?.previewLine?.destroy()
    drawingLayerRef.current?.batchDraw()
    const node = calibrateNodeRef.current
    calibDrawRef.current = null
    calibrateNodeRef.current = null
    setCalibratePhase(null)
    if (node?.getStage()) positionAndShowToolbar(node)
  }

  // Schaalt de gekalibreerde afbeelding zodat de getekende lijn `meters` lang
  // is, om het visuele centrum (zelfde center-wiskunde als handleRotate).
  function applyCalibration(meters) {
    const node = calibrateNodeRef.current
    const mainLayer = mainLayerRef.current
    const draw = calibDrawRef.current
    if (!node || !mainLayer || !draw) { cancelCalibration(); return }
    const lengthPx = Math.hypot(draw.endPt.x - draw.startPt.x, draw.endPt.y - draw.startPt.y)
    const factor = (meters * GRID_SIZE) / lengthPx

    const sx = node.scaleX(), sy = node.scaleY()
    const w  = node.width() * sx, h = node.height() * sy
    const θ  = node.rotation() * Math.PI / 180
    const cx = node.x() + (w * Math.cos(θ) - h * Math.sin(θ)) / 2
    const cy = node.y() + (w * Math.sin(θ) + h * Math.cos(θ)) / 2
    const newW = w * factor, newH = h * factor

    node.scaleX(sx * factor)
    node.scaleY(sy * factor)
    node.x(cx - (newW * Math.cos(θ) - newH * Math.sin(θ)) / 2)
    node.y(cy - (newW * Math.sin(θ) + newH * Math.cos(θ)) / 2)

    mainLayer.batchDraw()
    positionAndShowToolbar(node)
    history.pushState()
    scheduleSnapshot()

    calibDrawRef.current = null
    calibrateNodeRef.current = null
    setCalibratePhase(null)
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
      disconnectAndDestroy([node], mainLayer)
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
    if (!nodes.length) return
    transformer?.nodes([])
    disconnectAndDestroy(nodes, mainLayer)
    mainLayer.batchDraw()
    hideToolbar()
    history.pushState()
    scheduleSnapshot()
  }

  function handleCopy() {
    const mainLayer = mainLayerRef.current
    const transformer = transformerRef.current
    const seedNodes = [...(transformer?.nodes() ?? [])]
    if (toolbarTargetRef.current && !seedNodes.includes(toolbarTargetRef.current)) seedNodes.push(toolbarTargetRef.current)
    if (!seedNodes.length) return

    // Expand to full hierarchy for any linear node, matching handleDuplicate behaviour.
    const toSerializeSet = new Set(seedNodes)
    for (const n of seedNodes) {
      if (!isSingleLinear(n) || !mainLayer) continue
      const vis = new Set()
      function walkH(node) {
        if (vis.has(node.id())) return
        vis.add(node.id())
        toSerializeSet.add(node)
        for (let ep = 0; ep < 2; ep++) {
          for (const conn of getConns(node, ep)) {
            const cn = mainLayer.findOne(`#${conn.id}`)
            if (cn) walkH(cn)
          }
        }
      }
      walkH(n)
    }
    onCopy?.(serializeNodes([...toSerializeSet]))
  }

  function handleDuplicate() {
    const mainLayer  = mainLayerRef.current
    const transformer = transformerRef.current
    if (!mainLayer) return

    const seedNodes = [...(transformer?.nodes() ?? [])]
    if (toolbarTargetRef.current && !seedNodes.includes(toolbarTargetRef.current)) seedNodes.push(toolbarTargetRef.current)
    if (!seedNodes.length) return

    // Expand to full hierarchy for any linear node in the selection.
    const toCloneSet = new Set(seedNodes)
    for (const n of seedNodes) {
      if (!isSingleLinear(n)) continue
      const vis = new Set()
      function walkH(node) {
        if (vis.has(node.id())) return
        vis.add(node.id())
        toCloneSet.add(node)
        for (let ep = 0; ep < 2; ep++) {
          for (const conn of getConns(node, ep)) {
            const cn = mainLayer.findOne(`#${conn.id}`)
            if (cn) walkH(cn)
          }
        }
      }
      walkH(n)
    }
    const nodesToClone = [...toCloneSet]

    // Build old-ID → new-ID remapping for every linear node to be cloned.
    const idMap = new Map()
    for (const n of nodesToClone) {
      if (isSingleLinear(n)) idMap.set(n.id(), generateId())
    }

    const offset = 20
    const newNodes = nodesToClone.map(n => {
      const clone = n.clone()
      clone.x(n.x() + offset)
      clone.y(n.y() + offset)
      if (isSingleLinear(n)) {
        clone.id(idMap.get(n.id()))
        for (let ep = 0; ep < 2; ep++) {
          // Remap to new IDs; entries whose peer isn't being cloned are severed.
          const remapped = getConns(n, ep)
            .filter(c => idMap.has(c.id))
            .map(c => ({ id: idMap.get(c.id), ep: c.ep }))
          clone.setAttr(connsAttr(ep), remapped.length ? remapped : undefined)
        }
      }
      if (clone.attrs.isImage) {
        // draggable blijft false — verplaatsen loopt via ons eigen gizmo-bbox-
        // systeem (computeDraggable); Effect 4 corrigeert eventuele muur-
        // uitzondering vanzelf zodra setGizmoNode hieronder de selectie zet.
        clone.setAttrs({ isLocked: false, listening: true, draggable: false })
        mainLayer.add(clone)
        clone.moveToBottom()
        transformer?.moveToTop()
      } else {
        clone.draggable(false)
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

  // ─── Object toolbar: color change ───────────────────────────────────────────
  function getNodeColor(node) {
    return node.getClassName() === 'Path' ? (node.fill() || null) : (node.stroke() || null)
  }

  function handleColorChange(hex) {
    const mainLayer   = mainLayerRef.current
    const transformer = transformerRef.current
    if (!mainLayer) return
    const nodes = toolbarTargetRef.current
      ? [toolbarTargetRef.current]
      : (transformer?.nodes() ?? []).filter(n => !n.attrs.isImage && n.getClassName() !== 'Text')
    if (!nodes.length) return
    nodes.forEach(n => {
      if (n.getClassName() === 'Path') n.fill(hex)
      else n.stroke(hex)
    })
    mainLayer.batchDraw()
    setSelectedColor(hex)
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

      // Build old-ID → new-ID remapping so pasted nodes get fresh IDs and
      // hierarchy connection attrs reference the new IDs instead of the originals.
      const idMap = new Map()
      data.forEach(({ attrs }) => { if (attrs.id) idMap.set(attrs.id, generateId()) })
      const remapConns = conns => {
        const remapped = (conns ?? [])
          .filter(c => idMap.has(c.id))
          .map(c => ({ id: idMap.get(c.id), ep: c.ep }))
        return remapped.length ? remapped : undefined
      }

      const newNodes = []
      data.forEach(({ type, attrs }) => {
        const newAttrs = {
          ...attrs,
          id:        idMap.get(attrs.id) ?? generateId(),
          x:         (attrs.x ?? 0) + dx,
          y:         (attrs.y ?? 0) + dy,
          _ep0conns: remapConns(attrs._ep0conns),
          _ep1conns: remapConns(attrs._ep1conns),
        }
        if (type === 'Image') {
          const img = new Image()
          img.onload = () => {
            const node = new Konva.Image({ ...newAttrs, image: img, isLocked: false, listening: true, draggable: false })
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
    centerToContent: () => centerToContentRef.current?.(),
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

      {calibratePhase === 'value' && (
        <CalibrateDialog onConfirm={applyCalibration} onCancel={cancelCalibration} />
      )}

      <Minimap stageRef={stageRef} mainLayerRef={mainLayerRef} version={minimapVersion} activityRef={penActivityRef} />

      <HingeDecorations
        stageRef={stageRef}
        mainLayerRef={mainLayerRef}
        editModeActive={!!lineGizmoNode}
        visible={showHinges}
      />

      <MeasurementLabels
        mainLayerRef={mainLayerRef}
        stageRef={stageRef}
        skipNodeId={lineGizmoNode?.id()}
        suppressRef={suppressMeasureRef}
        onPillClick={handlePillClick}
        showPills={showPills}
        pillStyle={pillStyle}
      />

      {lineGizmoNode && (
        <LineGizmo
          node={lineGizmoNode}
          stageRef={stageRef}
          mainLayerRef={mainLayerRef}
          onEndpointDragMove={handleLineEndpointDragMove}
          onEndpointDragEnd={handleLineEndpointDragEnd}
          onEndpointSnap={handleLineEndpointSnap}
          onMeasureConfirm={handleMeasureConfirm}
          onMeasureDelete={handleMeasureDelete}
          snapEnabledRef={snapEnabledRef}
          version={lineGizmoVersion}
          autoEditRef={gizmoAutoEditRef}
          showPills={showPills}
          pillStyle={pillStyle}
        />
      )}

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
            <button className="object-toolbar-btn" title="Schaal kalibreren" onClick={handleStartCalibrate}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="6" width="15" height="8" rx="1.2" transform="rotate(-30 10 10)" />
                <path d="M5.9 8.8 L7.1 7.6 M8.3 10.2 L9.5 9 M10.7 11.6 L11.9 10.4" transform="rotate(-30 10 10)" />
              </svg>
            </button>
          </>
        )}

        {selectedColor !== null && (
          <div className="object-toolbar-color-wrap">
            <button
              className="object-toolbar-color-btn"
              style={{ background: selectedColor }}
              title="Kleur wijzigen"
              onClick={() => setShowColorPicker(v => !v)}
            />
            {showColorPicker && (
              <div className="object-toolbar-color-picker">
                {COLORS.map(({ hex }) => (
                  <button
                    key={hex}
                    className={`object-toolbar-color-swatch${selectedColor === hex ? ' active' : ''}`}
                    style={{ background: hex }}
                    title={hex}
                    onClick={() => handleColorChange(hex)}
                  />
                ))}
              </div>
            )}
          </div>
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
