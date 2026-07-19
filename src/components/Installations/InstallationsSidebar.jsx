import { generateUUID } from '../../db/db.js'
import '../common/common.css'
import './Installations.css'

export const KIND_LABELS = {
  verwarming: 'Verwarming',
  koeling: 'Koeling',
}

// Per soort de mogelijke installatietypes — dit bepaalt de dropdown-opties.
// Koeling heeft (vooralsnog) maar één type, dat daarom automatisch gekozen
// wordt en niet aanpasbaar is (grijze/disabled dropdown, net als in Uniec
// waar sommige velden vast liggen).
export const TYPE_OPTIONS = {
  verwarming: [
    { value: 'warmtepomp', label: 'Warmtepomp' },
    { value: 'cv_ketel', label: 'CV-ketel' },
    { value: 'kachel_elektrisch', label: 'Kachel elektrisch' },
    { value: 'kachel_gas', label: 'Kachel gas' },
    { value: 'clv', label: 'Centrale luchtverwarming' },
  ],
  koeling: [
    { value: 'airco', label: 'Airco' },
  ],
}

const KIND_OPTIONS = Object.keys(KIND_LABELS)

export function typeLabel(kind, type) {
  if (!type) return '[LEEG]'
  return TYPE_OPTIONS[kind].find(t => t.value === type)?.label ?? type
}

// Volgnummer binnen dezelfde soort (array-volgorde), voor auto-nummering:
// Verwarming 1, Verwarming 2, Koeling 1, ... — installaties hebben verder
// geen eigen naam (zie datamodel: alleen kind + type).
export function installationNumber(installations, inst) {
  return installations.filter(i => i.kind === inst.kind).findIndex(i => i.id === inst.id) + 1
}

export function installationLabel(installations, inst) {
  return `${KIND_LABELS[inst.kind]} ${installationNumber(installations, inst)}`
}

// Label voor de toewijzing-dropdown: puur het type (bv. "Airco", "CV-ketel"),
// zonder "Verwarming N"-voorvoegsel — dat voegt weinig toe zolang er maar één
// installatie van die soort is. Zodra er 2+ installaties van dezelfde soort
// bestaan (ongeacht of het type overeenkomt), krijgen ze allemaal een
// volgnummer als "N. Type" — bv. "1. Warmtepomp" / "2. CV-ketel", of
// "1. Airco" / "2. Airco" — zodat ze in de lijst als een genummerde reeks
// herkenbaar zijn, net als "Verwarming N" in de installaties-sidebar.
export function dropdownLabel(installations, inst) {
  const label = typeLabel(inst.kind, inst.type)
  const sameKind = installations.filter(i => i.kind === inst.kind)
  if (sameKind.length <= 1) return label
  return `${installationNumber(installations, inst)}. ${label}`
}

export default function InstallationsSidebar({ installations, onChange }) {
  function handleAddKind(kind) {
    // Beide soorten krijgen een zinnig default-type i.p.v. leeg beginnen:
    // koeling heeft er toch maar één, en CV-ketel is verreweg het meest voorkomende
    // verwarmingstype. "[LEEG]" blijft als optie bestaan voor eventuele oudere data.
    const type = kind === 'koeling' ? TYPE_OPTIONS.koeling[0].value : 'cv_ketel'
    onChange([...installations, { id: generateUUID(), kind, type }])
  }

  function handleTypeChange(id, type) {
    onChange(installations.map(inst => inst.id === id ? { ...inst, type } : inst))
  }

  function handleDelete(id) {
    onChange(installations.filter(inst => inst.id !== id))
  }

  // Alleen voor weergave: eerst alle verwarming, dan alle koeling, ongeacht op
  // welk moment ze zijn toegevoegd. De onderliggende opslagvolgorde (en dus de
  // auto-nummering, die per soort filtert) blijft ongemoeid.
  const sortedInstallations = [...installations].sort((a, b) => KIND_OPTIONS.indexOf(a.kind) - KIND_OPTIONS.indexOf(b.kind))

  return (
    <div className="installations-panel">
      <div className="installations-add-row">
        {KIND_OPTIONS.map(kind => (
          <button
            key={kind}
            className="btn btn-primary installations-add-btn"
            onClick={() => handleAddKind(kind)}
          >
            + {KIND_LABELS[kind]}
          </button>
        ))}
      </div>

      <div className="installations-grid">
        {installations.length === 0 && (
          <div className="installations-empty">Nog geen installaties toegevoegd.</div>
        )}
        {sortedInstallations.map(inst => {
          const options = TYPE_OPTIONS[inst.kind]
          const singleFixedOption = options.length === 1
          return (
            <div className={`installations-card installations-card--${inst.kind}`} key={inst.id}>
              <div className="installations-card-header">
                <span className="installations-kind-label">{installationLabel(installations, inst)}</span>
                <button
                  className="installations-delete-btn"
                  title="Verwijderen"
                  onClick={() => handleDelete(inst.id)}
                >
                  ✕
                </button>
              </div>
              <select
                className="installations-type-select"
                value={inst.type ?? ''}
                disabled={singleFixedOption}
                onChange={e => handleTypeChange(inst.id, e.target.value)}
              >
                {!inst.type && <option value="">[LEEG]</option>}
                {options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}
