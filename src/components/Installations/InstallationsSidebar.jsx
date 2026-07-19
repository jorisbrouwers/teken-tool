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

  return (
    <div className="installations-panel">
      <div className="installations-grid">
        {installations.length === 0 && (
          <div className="installations-empty">Nog geen installaties toegevoegd.</div>
        )}
        {installations.map(inst => {
          const options = TYPE_OPTIONS[inst.kind]
          const singleFixedOption = options.length === 1
          return (
            <div className={`installations-card installations-card--${inst.kind}`} key={inst.id}>
              <div className="installations-card-header">
                <span className="installations-kind-label">{KIND_LABELS[inst.kind]}</span>
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
    </div>
  )
}
