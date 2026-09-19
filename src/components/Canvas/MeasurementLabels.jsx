import { useEffect, useRef } from 'react'
import { GRID_SIZE } from './useGrid.js'
import { getPillCssStyle } from './pillStyle.js'

// Uitgezoomd verbergen: een pill op een muur die op het scherm te kort is valt
// over de muur heen en maakt de tekening onleesbaar (zelfde idee als het
// "1.5m"-label in HeightGuideLabels.jsx). De pill van de geselecteerde muur
// (LineGizmo) blijft altijd staan.
//
// Zoomgrens per muur via een curve i.p.v. een vaste schermlengte: bij een
// vaste lengte schaalt de grens 1-op-1 met de muurlengte (2 m verdwijnt al bij
// 2× zo weinig uitzoomen als 4 m), wat korte muren te vroeg en lange te laat
// laat verdwijnen. Afgesteld met twee ankerpunten — "een korte muur (SHORT)
// verdwijnt onder zoom X, een lange (LONG) onder zoom Y" — met een
// machtscurve ertussen (en daarbuiten doorgetrokken):
//   minZoom = SHORT_ZOOM × (SHORT_LENGTH / lengte)^p
// waarbij p zo gekozen is dat de curve door beide ankerpunten gaat.
// Hogere zoom = verdwijnt eerder (minder ver uitzoomen nodig).
const PILL_HIDE_SHORT = { lengthM: 2, zoom: 1.41 }
const PILL_HIDE_LONG = { lengthM: 6, zoom: 0.9 }
const PILL_HIDE_EXPONENT = Math.log(PILL_HIDE_SHORT.zoom / PILL_HIDE_LONG.zoom)
  / Math.log(PILL_HIDE_LONG.lengthM / PILL_HIDE_SHORT.lengthM)
function pillMinZoom(lengthM) {
  return PILL_HIDE_SHORT.zoom * Math.pow(PILL_HIDE_SHORT.lengthM / lengthM, PILL_HIDE_EXPONENT)
}

export default function MeasurementLabels({ mainLayerRef, stageRef, skipNodeId, suppressRef, onPillClick, showPills = true, showRoofPills = false, pillStyle, editModeActive = false }) {
  const containerRef    = useRef(null)
  const labelMapRef     = useRef(new Map())
  // Tweede pill onder de maat-pill: dakhelling(en) van het dak boven dit
  // segment. Eigen vaste opmaak (zie .measurement-label-roof) — bewust NIET
  // gekoppeld aan de pillStyle-instelling van de maat-pill.
  const roofLabelMapRef = useRef(new Map())
  const rafRef          = useRef(null)
  const onPillClickRef  = useRef(onPillClick)
  onPillClickRef.current = onPillClick
  const showPillsRef    = useRef(showPills)
  showPillsRef.current  = showPills
  // Dak-pill (goothoogte/helling) hoort bij de technische hulplijnen, niet
  // bij de maat-pill-toggle — eigen zichtbaarheid.
  const showRoofPillsRef = useRef(showRoofPills)
  showRoofPillsRef.current = showRoofPills
  const pillStyleRef    = useRef(pillStyle)
  pillStyleRef.current  = pillStyle
  // In edit mode moeten pillen "doorzichtig" zijn voor de pointer: anders
  // vangt de pill een pendown weg die eigenlijk bedoeld is om de muur
  // eronder te slepen (body-drag begint immers al bij pointerdown, niet pas
  // bij een los click-event dat de pill zelf afhandelt).
  const editModeActiveRef = useRef(editModeActive)
  editModeActiveRef.current = editModeActive

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function tick() {
      const layer = mainLayerRef.current
      const stage = stageRef.current
      const showMain = showPillsRef.current
      const showRoof = showRoofPillsRef.current
      if (suppressRef?.current || (!showMain && !showRoof)) {
        labelMapRef.current.forEach(el => { el.style.visibility = 'hidden' })
        roofLabelMapRef.current.forEach(el => { el.style.visibility = 'hidden' })
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      if (layer && stage) {
        const box       = stage.container().getBoundingClientRect()
        const transform = stage.getAbsoluteTransform()
        const seenIds   = new Set()
        const seenRoofIds = new Set()

        for (const node of layer.getChildren()) {
          if (!node.attrs.isWall) continue  // alleen lijnsysteem-segmenten krijgen een pill
          const cls = node.getClassName()
          if ((cls !== 'Line' && cls !== 'Arrow') || node.points().length !== 4) continue
          const id = node.id()
          if (!id) continue              // snap/align indicators have no user id
          if (id === skipNodeId) continue
          // Geculed = tijdens navigatie nog niet herteked (frozen-canvas
          // mechanisme) — de pill zou anders los van zijn muur zweven totdat
          // endNav de echte inhoud bijwerkt.
          if (node._culled) continue

          const pts      = node.points()
          const lengthPx = Math.hypot(pts[2] - pts[0], pts[3] - pts[1])
          if (lengthPx < 1) continue  // skip collapsed / zero-length segments
          const mx      = node.x() + (pts[0] + pts[2]) / 2
          const my      = node.y() + (pts[1] + pts[3]) / 2
          const sp      = transform.point({ x: mx, y: my })
          const x       = box.left + sp.x
          const y       = box.top  + sp.y
          // Pills zijn position:fixed en ontsnappen daardoor aan het
          // overflow:hidden van canvas-wrapper (dat clipt alleen het canvas
          // zelf) — buiten de viewport dus zelf verbergen.
          if (x < box.left || x > box.right || y < box.top || y > box.bottom) continue
          if (stage.scaleX() < pillMinZoom(lengthPx / GRID_SIZE)) continue

          if (showMain) {
            seenIds.add(id)

            const lengthM = (lengthPx / GRID_SIZE).toFixed(2)
            const text    = `${lengthM}`

            let el = labelMapRef.current.get(id)
            if (!el) {
              el = document.createElement('span')
              el.className = 'measurement-label-global'
              el.style.cursor = 'pointer'
              el.addEventListener('click', (e) => {
                e.stopPropagation()
                onPillClickRef.current?.(id)
              })
              container.appendChild(el)
              labelMapRef.current.set(id, el)
          }
          const ps = getPillCssStyle(pillStyleRef.current)
          el.style.background = ps.background
          el.style.color      = ps.color
          el.style.fontSize   = ps.fontSize
          if (ps.boxShadow !== undefined) el.style.boxShadow = ps.boxShadow
          el.style.visibility = ''
          el.style.left    = x + 'px'
          el.style.top     = y + 'px'
          el.textContent   = text
          // In edit mode: 'none' zodat pointerdown door de pill heen valt
          // naar de muur eronder (body-drag) i.p.v. door de pill zelf
          // afgevangen te worden.
          el.style.pointerEvents = editModeActiveRef.current ? 'none' : 'auto'
          }

          // Dak-pill: alleen bij een muur met dak (roofCourses). Toont de
          // goothoogte + de helling(en): "2.60m, 45°" of "2.60m, 70°, 25°"
          // (gebroken kap). Goothoogte is het roofBaseHeightM-veld zoals
          // ingevuld — geen nok-berekening (die volgt pas uit het skeleton in
          // Blender). Vaste opmaak, display-only (geen pointer-events).
          const courses = Array.isArray(node.attrs.roofCourses) ? node.attrs.roofCourses : null
          let rel = roofLabelMapRef.current.get(id)
          if (showRoof && courses && courses.length) {
            seenRoofIds.add(id)
            if (!rel) {
              rel = document.createElement('span')
              rel.className = 'measurement-label-roof'
              container.appendChild(rel)
              roofLabelMapRef.current.set(id, rel)
            }
            const baseM = Number(node.attrs.roofBaseHeightM) || 0
            const parts = courses.map(c => `${c?.angleDeg ?? 0}°`)
            if (baseM > 0) parts.unshift(`${baseM.toFixed(2)}m`)  // goothoogte 0 = niets tonen
            rel.textContent    = parts.join(', ')
            // Van de muuras af verschuiven i.p.v. bovenop de zwarte lijn (de
            // pill heeft geen fill → overlap = onleesbaar). Loodrechte normaal,
            // consistent naar onderen gekanteld (en bij een bijna-verticale
            // muur naar rechts), plus een extra omlaag-duw die groeit naarmate
            // de muur verticaler staat — zo blijft 'ie bij een horizontale muur
            // netjes eronder en gaat 'ie bij een verticale muur schuin
            // rechtsonder, niet pal naast (op hoogte van de maat-pill).
            let nX = -(pts[3] - pts[1]) / lengthPx
            let nY =  (pts[2] - pts[0]) / lengthPx
            if (nY < -1e-6 || (Math.abs(nY) < 1e-6 && nX < 0)) { nX = -nX; nY = -nY }
            rel.style.left     = (x + nX * 18) + 'px'
            rel.style.top      = (y + nY * 18 + (1 - nY) * 16) + 'px'
            rel.style.visibility = ''
          }
        }

        for (const [id, el] of [...labelMapRef.current]) {
          if (!seenIds.has(id)) {
            el.remove()
            labelMapRef.current.delete(id)
          }
        }
        for (const [id, el] of [...roofLabelMapRef.current]) {
          if (!seenRoofIds.has(id)) {
            el.remove()
            roofLabelMapRef.current.delete(id)
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      labelMapRef.current.forEach(el => el.remove())
      labelMapRef.current.clear()
      roofLabelMapRef.current.forEach(el => el.remove())
      roofLabelMapRef.current.clear()
    }
  }, [mainLayerRef, stageRef, skipNodeId])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    />
  )
}
