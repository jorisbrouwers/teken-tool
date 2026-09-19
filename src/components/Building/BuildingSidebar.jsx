import { useState } from 'react'
import NorthWheel from './NorthWheel.jsx'
import FrontFacadeWheel from './FrontFacadeWheel.jsx'
import { generateUUID } from '../../db/db.js'
import {
  getFloorHeight, setFloorHeight, floorHasAnyHeight, mainGebouwdeelId, GROUND_FLOOR_INDEX,
} from './buildingDefaults.js'
import '../common/common.css'
import './Building.css'

// Herexporteren zodat bestaande imports (App.jsx) ongewijzigd blijven werken —
// de daadwerkelijke, DOM-vrije definities staan in buildingDefaults.js zodat
// exportBlender.js ze kan hergebruiken zonder deze JSX/CSS mee te slepen.
export {
  DEFAULT_FLOOR_NAMES, seedFloors, DEFAULT_NORTH_ANGLE, DEFAULT_FRONT_FACADE_SCREEN_ANGLE,
  seedGebouwdelen,
} from './buildingDefaults.js'

// Naam-invoer voor een gebouwdeel/constructie. Bewust géén window.prompt():
// die is op een tablet onhandig (verschijnt buiten de app-context, en de
// on-screen toetsenbord-afhandeling verschilt per platform).
function InlineNameInput({ value = '', placeholder, onCommit, onCancel }) {
  const [text, setText] = useState(value)
  function commit() {
    const trimmed = text.trim()
    if (trimmed) onCommit(trimmed)
    else onCancel()
  }
  return (
    <div className="building-inline-name">
      <input
        autoFocus
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') onCancel()
        }}
      />
      <button className="building-inline-ok" onClick={commit} title="Opslaan">✓</button>
      <button className="building-inline-cancel" onClick={onCancel} title="Annuleren">✕</button>
    </div>
  )
}

export default function BuildingSidebar({
  floors, onFloorsChange, northAngle, onNorthAngleChange,
  frontFacadeScreenAngle, onFrontFacadeScreenAngleChange,
  linkingFloorId, onStartLinking, onResetReferencePoint,
  showReferencePoints = false, onToggleReferencePoints,
  gebouwdelen = [], onGebouwdelenChange, onGebouwdeelDelete,
  constructies = [], onConstructiesChange, onConstructieDelete,
}) {
  const mainId = mainGebouwdeelId(gebouwdelen)
  // Welk gebouwdeel-tabblad open staat. Valt terug op het hoofdgebouwdeel als
  // het actieve deel net verwijderd is.
  const [activeGebouwdeelId, setActiveGebouwdeelId] = useState(mainId)
  const activeId = gebouwdelen.some(g => g.id === activeGebouwdeelId) ? activeGebouwdeelId : mainId
  const [addingGebouwdeel, setAddingGebouwdeel] = useState(false)
  const [renamingGebouwdeelId, setRenamingGebouwdeelId] = useState(null)
  const [addingConstructie, setAddingConstructie] = useState(false)
  const [renamingConstructieId, setRenamingConstructieId] = useState(null)

  function handleHeightChange(id, value) {
    // Altijd op 2 decimalen (cm) afgerond — meer precisie is bij een
    // verdiepingshoogte schijnnauwkeurigheid. Via de "e2"-notatie i.p.v.
    // `* 100`: 2.805 * 100 = 280.4999… zou anders naar 2.80 afronden.
    const n = Number(value)
    const heightM = value === '' || !Number.isFinite(n) ? null : Math.round(Number(`${n}e2`)) / 100
    onFloorsChange(floors.map(f => f.id === id
      ? setFloorHeight(f, activeId, gebouwdelen, { heightM })
      : f))
  }

  // Vrije opmerking bij de hoogte ("nok", "plat dak", "incl vloer") — puur
  // context voor de gebruiker; exportBlender.js kiest zijn velden expliciet
  // en neemt dit dus niet mee.
  function handleNoteChange(id, value) {
    onFloorsChange(floors.map(f => f.id === id
      ? setFloorHeight(f, activeId, gebouwdelen, { heightNote: value })
      : f))
  }

  function handleAddFloor() {
    // De eerste 3 rijen (kelder/souterrain/begane grond) tellen niet mee in de
    // nummering — dit gaat ervan uit dat de 6 standaardrijen nooit verwijderd
    // worden (er is bewust geen verwijderknop, zie het datamodel-idee: lege
    // hoogte = genegeerd), dus floors.length is een stabiele basis.
    const nextNumber = floors.length - GROUND_FLOOR_INDEX
    onFloorsChange([...floors, { id: generateUUID(), name: `${nextNumber}e verdieping`, heightM: null, referencePoint: null }])
  }

  function handleAddGebouwdeel(name) {
    const id = generateUUID()
    onGebouwdelenChange([...gebouwdelen, { id, name }])
    setActiveGebouwdeelId(id)
    setAddingGebouwdeel(false)
  }

  function handleRenameGebouwdeel(id, name) {
    onGebouwdelenChange(gebouwdelen.map(g => g.id === id ? { ...g, name } : g))
    setRenamingGebouwdeelId(null)
  }

  // Verwijderen gaat via App.jsx: daar worden in één settings-write ook de
  // partHeights van alle verdiepingen en de vlak-toewijzingen opgeruimd.
  function handleDeleteGebouwdeel(g) {
    if (!window.confirm(`"${g.name}" verwijderen? De hoogtes en de toewijzing van vlakken aan dit gebouwdeel gaan verloren.`)) return
    if (activeId === g.id) setActiveGebouwdeelId(mainId)
    onGebouwdeelDelete?.(g.id)
  }

  function handleAddConstructie(name) {
    onConstructiesChange([...constructies, { id: generateUUID(), name }])
    setAddingConstructie(false)
  }

  function handleRenameConstructie(id, name) {
    onConstructiesChange(constructies.map(c => c.id === id ? { ...c, name } : c))
    setRenamingConstructieId(null)
  }

  function handleDeleteConstructie(c) {
    if (!window.confirm(`"${c.name}" verwijderen? Muren met deze constructie vallen terug op "geen".`)) return
    onConstructieDelete?.(c.id)
  }

  const floorsWithHeight = floors.filter(floorHasAnyHeight)
  const activeGebouwdeel = gebouwdelen.find(g => g.id === activeId)

  return (
    <div className="building-panel">
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

      <div className="building-section">
        <div className="building-section-title">Hoogtes</div>

        {/* Altijd een tabstrip, ook met alleen het hoofdhuis, met "+" om een
            gebouwdeel toe te voegen. Elk tabblad heeft zijn eigen hoogtes, en
            een leeg veld betekent "dit gebouwdeel bestaat niet op deze
            verdieping". Zie BLENDER_EXPORT_PLAN.md, blok "Gebouwdelen en
            constructies". */}
        {gebouwdelen.length > 0 && (
          <div className="building-tabs">
            {gebouwdelen.map(g => (
              <button
                key={g.id}
                className={`building-tab${g.id === activeId ? ' active' : ''}`}
                onClick={() => setActiveGebouwdeelId(g.id)}
                onDoubleClick={() => setRenamingGebouwdeelId(g.id)}
                title={g.id === mainId ? g.name : `${g.name} — dubbelklik om te hernoemen`}
              >
                {g.name}
              </button>
            ))}
            <button
              className="building-tab building-tab-add"
              onClick={() => setAddingGebouwdeel(true)}
              title="Gebouwdeel toevoegen"
            >
              +
            </button>
          </div>
        )}

        {addingGebouwdeel && (
          <InlineNameInput
            placeholder="Naam, bv. Aanbouw"
            onCommit={handleAddGebouwdeel}
            onCancel={() => setAddingGebouwdeel(false)}
          />
        )}
        {renamingGebouwdeelId && (
          <InlineNameInput
            value={gebouwdelen.find(g => g.id === renamingGebouwdeelId)?.name ?? ''}
            onCommit={name => handleRenameGebouwdeel(renamingGebouwdeelId, name)}
            onCancel={() => setRenamingGebouwdeelId(null)}
          />
        )}

        {/* Beheer-regel van het actieve, niet-hoofd gebouwdeel: hernoemen en
            verwijderen horen niet in de tab zelf (te klein voor een pen). */}
        {gebouwdelen.length > 1 && activeGebouwdeel && activeGebouwdeel.id !== mainId && (
          <div className="building-tab-actions">
            <button onClick={() => setRenamingGebouwdeelId(activeGebouwdeel.id)}>Hernoemen</button>
            <button className="danger" onClick={() => handleDeleteGebouwdeel(activeGebouwdeel)}>Verwijderen</button>
          </div>
        )}

        {floors.map((f, i) => {
          const { heightM, heightNote } = getFloorHeight(f, activeId, gebouwdelen)
          return (
            // Divider tussen de ondergrondse rijen (kelder/souterrain) en de
            // begane grond — index-gebaseerd, zelfde aanname als handleAddFloor.
            <div
              className={`building-floor-row${i === GROUND_FLOOR_INDEX ? ' building-floor-row--ground' : ''}`}
              key={f.id}
            >
              <span className={`building-floor-name${heightM == null || heightM === '' ? ' empty' : ''}`}>
                {f.name}
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="—"
                className="building-floor-height"
                value={heightM ?? ''}
                onChange={e => handleHeightChange(f.id, e.target.value)}
                onFocus={e => e.target.select()}
              />
              <span className="building-floor-height-unit">m</span>
              <input
                type="text"
                placeholder="opmerking"
                className="building-floor-note"
                value={heightNote ?? ''}
                onChange={e => handleNoteChange(f.id, e.target.value)}
              />
            </div>
          )
        })}
        <button className="btn btn-secondary building-add-floor-btn" onClick={handleAddFloor}>
          + Verdieping toevoegen
        </button>
      </div>

      <div className="building-section">
        <div className="building-section-title building-section-title--with-btn">
          Referentiepunten
          <button
            className={`building-title-eye-btn${showReferencePoints ? ' active' : ''}`}
            title={showReferencePoints ? 'Gekoppelde hoeken verbergen' : 'Gekoppelde hoeken tonen op het canvas'}
            onClick={onToggleReferencePoints}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 10s3-5.5 8.5-5.5S18.5 10 18.5 10s-3 5.5-8.5 5.5S1.5 10 1.5 10z" />
              <circle cx="10" cy="10" r="2.5" />
              {!showReferencePoints && <path d="M3 17L17 3" />}
            </svg>
          </button>
        </div>
        <div className="building-ref-hint">
          Ten behoeve van de Blender export.
        </div>
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

      {/* Constructies: alleen een naam, per MUUR toegewezen (huis-knop in de
          object-toolbar). Geen hoogtes, dus bewust géén tabblad hierboven —
          het splitst alleen de m²-berekening in Blender. */}
      <div className="building-section">
        <div className="building-section-title">Constructies</div>
        {constructies.length === 0 && !addingConstructie && (
          <div className="building-ref-empty">
            Voor een muur die anders is geïsoleerd. Toe te wijzen
            via de huis-knop bij een geselecteerde muur.
          </div>
        )}
        {constructies.map(c => (
          <div className="building-constructie-row" key={c.id}>
            {renamingConstructieId === c.id ? (
              <InlineNameInput
                value={c.name}
                onCommit={name => handleRenameConstructie(c.id, name)}
                onCancel={() => setRenamingConstructieId(null)}
              />
            ) : (
              <>
                <span
                  className="building-constructie-name"
                  onDoubleClick={() => setRenamingConstructieId(c.id)}
                  title="Dubbelklik om te hernoemen"
                >
                  {c.name}
                </span>
                <button
                  className="building-ref-reset-btn"
                  title="Constructie verwijderen"
                  onClick={() => handleDeleteConstructie(c)}
                >
                  ✕
                </button>
              </>
            )}
          </div>
        ))}
        {addingConstructie ? (
          <InlineNameInput
            placeholder="Naam, bv. Linkergevel 5cm steenwol"
            onCommit={handleAddConstructie}
            onCancel={() => setAddingConstructie(false)}
          />
        ) : (
          <button className="building-add-part-btn" onClick={() => setAddingConstructie(true)}>
            + Constructie
          </button>
        )}
      </div>
    </div>
  )
}
