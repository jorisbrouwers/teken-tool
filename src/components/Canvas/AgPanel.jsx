import { useEffect, useRef, useState } from 'react'
import { computeAgTotals } from './agCalculation.js'
import './AgPanel.css'

// Real-time gebruiksoppervlak-uitlezing, verborgen achter de "Technische
// hulplijnen"-toggle (zelfde gating als RoofGuideOverlay/roofGuides.js).
// Volgt het rAF-patroon van de andere overlays (HingeDecorations.jsx/
// ZoneFillOverlay.jsx): de berekening zelf is goedkoop genoeg om elke tick
// opnieuw te draaien, alleen de React-re-render wordt door een signature-
// vergelijking bewaakt (performance-invariant 7). suppressRef pauzeert de
// herberekening tijdens het slepen van een hinge/hiërarchie — anders
// flikkert de lijst mee met een kortstondig inconsistente muurgraaf, zelfde
// reden als ZoneFillOverlay.
export default function AgPanel({ mainLayerRef, noteRef, visible = false, suppressRef }) {
  const [totals, setTotals] = useState(null)
  const [panelTop, setPanelTop] = useState(null)

  useEffect(() => {
    if (!visible) return
    let prevSig = null
    let rafId

    function tick() {
      const mainLayer = mainLayerRef.current
      const note = noteRef.current
      if (mainLayer && note && !suppressRef?.current) {
        const result = computeAgTotals(note, mainLayer)
        const sig = JSON.stringify(result)
        if (sig !== prevSig) {
          prevSig = sig
          setTotals(result)
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [mainLayerRef, noteRef, visible, suppressRef])

  // Positioneren onder de altijd-zichtbare StylePanel (pen-paneel, rechtsboven)
  // — die heeft een vaste, tool-onafhankelijke hoogte, dus één meting bij het
  // zichtbaar worden volstaat (geen doorlopende rAF-meting nodig).
  useEffect(() => {
    if (!visible) return
    const el = document.querySelector('.style-panel')
    if (el) setPanelTop(el.getBoundingClientRect().bottom + 8)
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="ag-panel"
      style={panelTop != null ? { top: panelTop } : undefined}
      onPointerDown={e => e.stopPropagation()}
    >
      <div className="ag-panel-title">Gebruiksoppervlak</div>
      {!totals || totals.floors.length === 0 ? (
        <div className="ag-panel-empty">Nog geen verdieping gekoppeld</div>
      ) : (
        <>
          <div className="ag-panel-rows">
            {totals.floors.map(f => (
              <div className="ag-panel-row" key={f.floorId}>
                <span className="ag-panel-row-label">{f.name}</span>
                <span className="ag-panel-row-value">{f.areaM2.toFixed(2)} m²</span>
              </div>
            ))}
            <div className="ag-panel-row ag-panel-total">
              <span className="ag-panel-row-label">Totaal</span>
              <span className="ag-panel-row-value">{totals.grandTotal.toFixed(2)} m²</span>
            </div>
          </div>

          {totals.zones.length > 1 && totals.zones.map(zone => (
            <div className="ag-panel-zone" key={zone.key}>
              <div className="ag-panel-zone-label">{zone.label}</div>
              <div className="ag-panel-rows">
                {zone.floors.map(f => (
                  <div className="ag-panel-row" key={f.floorId}>
                    <span className="ag-panel-row-label">{f.name}</span>
                    <span className="ag-panel-row-value">{f.areaM2.toFixed(2)} m²</span>
                  </div>
                ))}
                <div className="ag-panel-row ag-panel-total">
                  <span className="ag-panel-row-label">Totaal</span>
                  <span className="ag-panel-row-value">{zone.total.toFixed(2)} m²</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
