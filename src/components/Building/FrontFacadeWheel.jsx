import { DEFAULT_FRONT_FACADE_SCREEN_ANGLE } from './buildingDefaults.js'
import {
  DIRECTIONS, CX, CY, R_LABEL, ROTATE_TRANSITION, VIEWBOX, norm360, polar, wedgePath, useWheelRotation,
} from './wheelGeometry.js'
import './Building.css'

// Voorgevel-wiel: staat naast het oriëntatiewiel en deelt EXACT dezelfde
// rotatie (afgeleid van `northAngle`) — de N/O/Z/W-labels draaien dus altijd
// mee met de oriëntatie, dit wiel draait nooit onafhankelijk.
//
// Wat de gebruiker hier instelt is de WIJZER, niet de wielstand: `value` is de
// schermrichting waarin de voorgevel op de tekening staat (0 = boven,
// 90 = rechts, 180 = onder, 270 = links). Default 180 = onderkant canvas, wat
// de bestaande conventie exact reproduceert. Een taartpunt aantikken verplaatst
// de wijzer naar de schermpositie van díe punt; verander je daarna het
// oriëntatiewiel, dan blijft de wijzer op zijn schermplek staan (alleen de
// kompas-betekenis eronder schuift mee).
//
// Blender leidt de kompasrichting van de voorgevel af als
// northAngle + (value - 180); zie BLENDER_EXPORT_PLAN.md.

export default function FrontFacadeWheel({ northAngle = 180, value = DEFAULT_FRONT_FACADE_SCREEN_ANGLE, onChange }) {
  const rotation = useWheelRotation(northAngle)
  // Kompashoek van de taartpunt die de wijzer nu aanwijst — puur voor de
  // highlight, zodat je ziet welke windrichting de voorgevel op wijst.
  const activeAngle = norm360(value + northAngle - 180)

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
                  className={`north-wheel-wedge${activeAngle === angle ? ' active' : ''}`}
                  onClick={() => onChange(norm360(angle + 180 - northAngle))}
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
        <g style={{ transform: `rotate(${value - 180}deg)`, transformOrigin: '50px 42px', transition: ROTATE_TRANSITION }}>
          <polygon points="50,92 44,80 56,80" className="north-wheel-pointer" />
        </g>
      </svg>
    </div>
  )
}
