import './SettingsPanel.css'

export default function SettingsPanel({ showPills, onTogglePills, showPillsInPdf, onTogglePillsInPdf, onClose }) {
  return (
    <div className="settings-backdrop" onPointerDown={onClose}>
      <div className="settings-panel" onPointerDown={e => e.stopPropagation()}>
        <div className="settings-header">
          <span className="settings-title">Instellingen</span>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">
          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Maataanduidingen</span>
              <span className="settings-row-desc">Toon de maat-pills bij lijnen en pijlen</span>
            </div>
            <button
              className={`settings-toggle${showPills ? ' on' : ''}`}
              onClick={onTogglePills}
              aria-label={showPills ? 'Uitschakelen' : 'Inschakelen'}
            />
          </div>
          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Maataanduidingen in PDF</span>
              <span className="settings-row-desc">Neem de maat-pills mee bij PDF-export</span>
            </div>
            <button
              className={`settings-toggle${showPillsInPdf ? ' on' : ''}`}
              onClick={onTogglePillsInPdf}
              aria-label={showPillsInPdf ? 'Uitschakelen' : 'Inschakelen'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
