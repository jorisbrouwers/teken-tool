import { DEFAULT_NORTH_ANGLE } from './buildingDefaults.js'
import {
  DIRECTIONS, CX, CY, R_LABEL, ROTATE_TRANSITION, VIEWBOX, polar, wedgePath, useWheelRotation,
} from './wheelGeometry.js'
import './Building.css'

// 8-richtingen windrichting-wiel: klikbare taartpunten (geen sleep-interactie
// nodig — simpeler, geen pointer-drag/hoekberekening). Na een klik draait het
// hele wiel (CSS-transform op de <g>) zodat de gekozen richting naar beneden
// wijst, consistent met de conventie dat de voorgevel meestal naar de
// onderkant van het canvas wordt getekend. De vaste wijzer staat BUITEN de
// cirkel en markeert die "onderkant canvas"-positie. Voor het geval de
// voorgevel níet naar beneden getekend is, staat er een tweede wiel naast:
// FrontFacadeWheel. Gedempte kleuren + zachte schaduw (zie Building.css) —
// dit is een rustig instrument, geen call-to-action.

export default function NorthWheel({ value = DEFAULT_NORTH_ANGLE, onChange }) {
  const rotation = useWheelRotation(value)

  return (
    <div className="north-wheel-wrap">
      <svg viewBox={VIEWBOX} className="north-wheel-svg">
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50px 42px', transition: ROTATE_TRANSITION }}>
          {DIRECTIONS.map(({ angle, label }) => {
            const labelPos = polar(R_LABEL, angle)
            return (
              <g key={angle}>
                <path
                  d={wedgePath(angle - 22.5, angle + 22.5)}
                  className={`north-wheel-wedge${value === angle ? ' active' : ''}`}
                  onClick={() => onChange(angle)}
                />
                <text
                  x={labelPos.x} y={labelPos.y}
                  className="north-wheel-label"
                  style={{
                    transform: `rotate(${-rotation}deg)`,
                    transformOrigin: `${labelPos.x}px ${labelPos.y}px`,
                    transition: ROTATE_TRANSITION,
                  }}
                >
                  {label}
                </text>
              </g>
            )
          })}
        </g>
        <circle cx={CX} cy={CY} r="3" className="north-wheel-pivot" />
        <polygon points="50,92 44,80 56,80" className="north-wheel-pointer" />
      </svg>
    </div>
  )
}
