import { getPillCssStyle } from '../Canvas/pillStyle.js'
import './SettingsPanel.css'

export default function SettingsPanel({
  showGrid, onToggleGrid,
  showPillsInPdf, onTogglePillsInPdf,
  showZonesInPdf, onToggleZonesInPdf,
  showHinges, onToggleHinges,
  pillColor, onPillColorChange,
  pillOpacity, onPillOpacityChange,
  pillFontSize, onPillFontSizeChange,
  pillTextColor, onPillTextColorChange,
  onClose, onReset,
}) {
  const fontSize = typeof pillFontSize === 'number' ? pillFontSize : 12
  const pillPreviewStyle = getPillCssStyle({ pillColor, pillOpacity, pillFontSize, pillTextColor })

  return (
    <div className="settings-backdrop" onPointerDown={onClose}>
      <div className="settings-panel" onPointerDown={e => e.stopPropagation()}>
        <div className="settings-header">
          <span className="settings-title">Instellingen</span>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">
          <div className="settings-section-label">Canvas</div>

          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Rasterachtergrond</span>
              <span className="settings-row-desc">Raster tonen op het canvas</span>
            </div>
            <button
              className={`settings-toggle${showGrid ? ' on' : ''}`}
              onClick={onToggleGrid}
              aria-label={showGrid ? 'Uitschakelen' : 'Inschakelen'}
            />
          </div>

          <div className="settings-section-label" style={{ marginTop: 4 }}>Maataanduidingen</div>

          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Maat-pills in PDF</span>
              <span className="settings-row-desc">Maat-pills meenemen bij PDF-export</span>
            </div>
            <button
              className={`settings-toggle${showPillsInPdf ? ' on' : ''}`}
              onClick={onTogglePillsInPdf}
              aria-label={showPillsInPdf ? 'Uitschakelen' : 'Inschakelen'}
            />
          </div>

          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Zones in PDF</span>
              <span className="settings-row-desc">Klimatiseringszones inkleuren bij PDF-export</span>
            </div>
            <button
              className={`settings-toggle${showZonesInPdf ? ' on' : ''}`}
              onClick={onToggleZonesInPdf}
              aria-label={showZonesInPdf ? 'Uitschakelen' : 'Inschakelen'}
            />
          </div>

          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Scharnieren</span>
              <span className="settings-row-desc">Verbindingspunten altijd zichtbaar</span>
            </div>
            <button
              className={`settings-toggle${showHinges ? ' on' : ''}`}
              onClick={onToggleHinges}
              aria-label={showHinges ? 'Uitschakelen' : 'Inschakelen'}
            />
          </div>

          <div className="settings-section-label" style={{ marginTop: 4 }}>Opmaak pill</div>

          <div className="settings-row">
            <span className="settings-row-label">Achtergrondkleur</span>
            <div className="settings-color-row">
              <input
                type="color"
                className="settings-color-input"
                value={pillColor}
                onChange={e => onPillColorChange(e.target.value)}
              />
              <span className="settings-color-hex">{pillColor}</span>
            </div>
          </div>

          <div className="settings-row">
            <span className="settings-row-label">Tekstkleur</span>
            <div className="settings-color-row">
              <input
                type="color"
                className="settings-color-input"
                value={pillTextColor}
                onChange={e => onPillTextColorChange(e.target.value)}
              />
              <span className="settings-color-hex">{pillTextColor}</span>
            </div>
          </div>

          <div className="settings-row settings-row-col">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="settings-row-label">Achtergrond transparantie</span>
              <span className="settings-row-desc">
                {pillOpacity === 0 ? 'Alleen tekst' : `${pillOpacity}%`}
              </span>
            </div>
            <input
              type="range"
              className="settings-slider"
              min={0} max={100} step={5}
              value={pillOpacity}
              onChange={e => onPillOpacityChange(Number(e.target.value))}
            />
          </div>

          <div className="settings-row settings-row-col">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="settings-row-label">Tekstgrootte</span>
              <span className="settings-row-desc">{fontSize}px</span>
            </div>
            <input
              type="range"
              className="settings-slider"
              min={2} max={20} step={1}
              value={fontSize}
              onChange={e => onPillFontSizeChange(Number(e.target.value))}
            />
          </div>

          <div className="settings-row settings-pill-preview-row">
            <span className="settings-row-label" style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Voorbeeld</span>
            <span className="settings-pill-preview" style={pillPreviewStyle}>
              3.50 m
            </span>
          </div>

          <div className="settings-reset-row">
            <button className="settings-reset-btn" onClick={onReset}>
              Herstel standaardinstellingen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
