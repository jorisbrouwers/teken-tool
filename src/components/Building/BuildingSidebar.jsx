import NorthWheel from './NorthWheel.jsx'
import FrontFacadeWheel from './FrontFacadeWheel.jsx'
import { generateUUID } from '../../db/db.js'
import '../common/common.css'
import './Building.css'

// Herexporteren zodat bestaande imports (App.jsx) ongewijzigd blijven werken —
// de daadwerkelijke, DOM-vrije definities staan in buildingDefaults.js zodat
// exportBlender.js ze kan hergebruiken zonder deze JSX/CSS mee te slepen.
export {
  DEFAULT_FLOOR_NAMES, seedFloors, DEFAULT_NORTH_ANGLE, DEFAULT_FRONT_FACADE_SCREEN_ANGLE,
} from './buildingDefaults.js'

export default function BuildingSidebar({
  floors, onFloorsChange, northAngle, onNorthAngleChange,
  frontFacadeScreenAngle, onFrontFacadeScreenAngleChange,
  linkingFloorId, onStartLinking, onResetReferencePoint,
}) {
  function handleHeightChange(id, value) {
    const heightM = value === '' ? null : Number(value)
    onFloorsChange(floors.map(f => f.id === id ? { ...f, heightM } : f))
  }

  // Vrije opmerking bij de hoogte ("nok", "plat dak", "incl vloer") — puur
  // context voor de gebruiker; exportBlender.js kiest zijn velden expliciet
  // en neemt dit dus niet mee.
  function handleNoteChange(id, value) {
    onFloorsChange(floors.map(f => f.id === id ? { ...f, heightNote: value } : f))
  }

  function handleAddFloor() {
    // De eerste 3 rijen (kelder/souterrain/begane grond) tellen niet mee in de
    // nummering — dit gaat ervan uit dat de 6 standaardrijen nooit verwijderd
    // worden (er is bewust geen verwijderknop, zie het datamodel-idee: lege
    // hoogte = genegeerd), dus floors.length is een stabiele basis.
    const nextNumber = floors.length - 2
    onFloorsChange([...floors, { id: generateUUID(), name: `${nextNumber}e verdieping`, heightM: null, referencePoint: null }])
  }

  const floorsWithHeight = floors.filter(f => f.heightM != null && f.heightM !== '')

  return (
    <div className="building-panel">
      <div className="building-disclaimer">
        Eigenschappen voor de Blender-export. Alleen relevant als
        je die gebruikt.
      </div>

      <div className="building-section">
        <div className="building-section-title">Hoogte per verdieping</div>
        {floors.map((f, i) => (
          // Divider tussen de ondergrondse rijen (kelder/souterrain) en de
          // begane grond — index-gebaseerd, zelfde aanname als handleAddFloor.
          <div
            className={`building-floor-row${i === 2 ? ' building-floor-row--ground' : ''}`}
            key={f.id}
          >
            <span className={`building-floor-name${f.heightM == null || f.heightM === '' ? ' empty' : ''}`}>
              {f.name}
            </span>
            <input
              type="number"
              step="0.01"
              placeholder="—"
              className="building-floor-height"
              value={f.heightM ?? ''}
              onChange={e => handleHeightChange(f.id, e.target.value)}
              onFocus={e => e.target.select()}
            />
            <span className="building-floor-height-unit">m</span>
            <input
              type="text"
              placeholder="opmerking"
              className="building-floor-note"
              value={f.heightNote ?? ''}
              onChange={e => handleNoteChange(f.id, e.target.value)}
            />
          </div>
        ))}
        <button className="btn btn-secondary building-add-floor-btn" onClick={handleAddFloor}>
          + Verdieping toevoegen
        </button>
      </div>

      <div className="building-section">
        <div className="building-section-title">Referentiepunten (XY-uitlijning)</div>
        {floorsWithHeight.length === 0 && (
          <div className="building-ref-empty">Geef eerst een verdieping een hoogte.</div>
        )}
        {floorsWithHeight.length > 0 && (
          <div className="building-ref-hint">
            Klik Koppel bij een verdieping en tik dan een hoekpunt aan op het
            canvas (muur-tool).
          </div>
        )}
        {floorsWithHeight.map(f => (
          <div className="building-ref-row" key={f.id}>
            <span className="building-ref-name">{f.name}</span>
            {f.referencePoint ? (
              <>
                <span className="building-ref-value">X {f.referencePoint.x} · Y {f.referencePoint.y}</span>
                <button
                  className="building-ref-reset-btn"
                  title="Referentiepunt wissen"
                  onClick={() => onResetReferencePoint(f.id)}
                >
                  ✕
                </button>
              </>
            ) : (
              <button
                className={`btn btn-secondary building-ref-link-btn${linkingFloorId === f.id ? ' active' : ''}`}
                onClick={() => onStartLinking(f.id)}
              >
                {linkingFloorId === f.id ? 'Tik een hoek aan…' : 'Koppel'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="building-section">
        <div className="building-section-title">Oriëntatie</div>
        <div className="orientation-wheels">
          <div className="orientation-wheel-col">
            <NorthWheel value={northAngle} onChange={onNorthAngleChange} />
            <div className="orientation-wheel-caption">Oriëntatie</div>
          </div>
          <div className="orientation-wheel-col">
            <FrontFacadeWheel
              northAngle={northAngle}
              value={frontFacadeScreenAngle}
              onChange={onFrontFacadeScreenAngleChange}
            />
            <div className="orientation-wheel-caption">Voorgevel</div>
          </div>
        </div>
      </div>
    </div>
  )
}
