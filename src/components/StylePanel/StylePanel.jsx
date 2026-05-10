import './StylePanel.css'

export const COLORS = [
  { hex: '#1d1d1d', light: false }, // Zwart
  { hex: '#9fa8b2', light: false }, // Grijs
  { hex: '#e085f4', light: false }, // Licht paars
  { hex: '#ae3ec9', light: false }, // Paars
  { hex: '#4465e9', light: false }, // Blauw
  { hex: '#4ba1f1', light: false }, // Lichtblauw
  { hex: '#f1ac4b', light: false }, // Geel/oranje
  { hex: '#e16919', light: false }, // Oranje
  { hex: '#099268', light: false }, // Groen
  { hex: '#4cb05e', light: false }, // Lichtgroen
  { hex: '#f87777', light: false }, // Roze
  { hex: '#e03131', light: false }, // Rood
]

export const SIZE_MAP = { xs: 0.75, s: 0.9, m: 2, l: 4 }

const SIZES = [
  { id: 'xs', dot: 2  },
  { id: 's',  dot: 4  },
  { id: 'm',  dot: 7  },
  { id: 'l',  dot: 11 },
]

// 4 gecombineerde pen-modi: elk stelt strokeStyle én pressureSensitive in
const PEN_MODES = [
  {
    id: 'pressure',
    title: 'Vrij tekenen met drukgevoeligheid',
    strokeStyle: 'freehand',
    pressureSensitive: true,
    icon: (
      <svg viewBox="0 0 24 16" fill="none">
        <path d="M1 11 C4 11,5 5,8 5 C11 5,12 11,15 11 C18 11,19 5,23 5"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'dashed',
    title: 'Streepjeslijn',
    strokeStyle: 'dashed',
    pressureSensitive: false,
    icon: (
      <svg viewBox="0 0 24 16" fill="none">
        <line x1="1" y1="8" x2="23" y2="8"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 3"/>
      </svg>
    ),
  },
  {
    id: 'dotted',
    title: 'Stippellijn',
    strokeStyle: 'dotted',
    pressureSensitive: false,
    icon: (
      <svg viewBox="0 0 24 16" fill="none">
        <line x1="1" y1="8" x2="23" y2="8"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 4"/>
      </svg>
    ),
  },
  {
    id: 'solid',
    title: 'Doorgetrokken lijn (vaste dikte)',
    strokeStyle: 'solid',
    pressureSensitive: false,
    icon: (
      <svg viewBox="0 0 24 16" fill="none">
        <line x1="1" y1="8" x2="23" y2="8"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function StylePanel({
  activeTool,
  penColor, setPenColor,
  opacity, setOpacity,
  penSizeCategory, setPenSizeCategory,
  strokeStyle, setStrokeStyle,
  pressureSensitive, setPressureSensitive,
}) {
  const activePenMode =
    strokeStyle === 'dashed' ? 'dashed' :
    strokeStyle === 'dotted' ? 'dotted' :
    pressureSensitive        ? 'pressure' : 'solid'

  function selectPenMode(mode) {
    setStrokeStyle(mode.strokeStyle)
    setPressureSensitive(mode.pressureSensitive)
  }

  return (
    <div className="style-panel">
      {/* Kleuren: 4×3 grid */}
      <div className="style-panel-colors">
        {COLORS.map(({ hex, light }) => (
          <button
            key={hex}
            className={`color-swatch${penColor === hex ? ' active' : ''}${light ? ' light' : ''}`}
            style={{ background: hex }}
            title={hex}
            onClick={() => setPenColor(hex)}
          />
        ))}
      </div>

      <div className="style-panel-sep" />

      {/* Opacity */}
      <div className="style-panel-opacity">
        <input
          type="range"
          min={0} max={100} step={1}
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="style-panel-slider"
        />
        <span className="style-panel-value">{opacity}%</span>
      </div>

      <div className="style-panel-sep" />

      {/* Grootte */}
      <div className="style-panel-sizes">
        {SIZES.map(({ id, dot }) => (
          <button
            key={id}
            className={`size-btn${penSizeCategory === id ? ' active' : ''}`}
            title={id.toUpperCase()}
            onClick={() => setPenSizeCategory(id)}
          >
            <div className="size-dot" style={{ width: dot, height: dot }} />
          </button>
        ))}
      </div>

      <div className="style-panel-sep" />

      {/* Lijnstijl / drukgevoeligheid */}
      <div className="style-panel-strokes">
        {PEN_MODES.map((mode) => (
          <button
            key={mode.id}
            className={`stroke-btn${activePenMode === mode.id ? ' active' : ''}`}
            title={mode.title}
            onClick={() => selectPenMode(mode)}
          >
            {mode.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
