import { isIOS } from './detect.js'

// Platform-specifieke input-configuratie.
// Alle niet-iOS waarden zijn exact gelijk aan de vorige hardcoded getallen in CanvasView.jsx,
// zodat het gedrag op Windows/Surface volledig ongewijzigd blijft.
export const INPUT_CONFIG = isIOS
  ? {
      // Apple Pencil heeft een ander druk-profiel dan de Surface Pen.
      // Exponent 2.5 maakt lichte aanrakingen vrijwel onzichtbaar op Apple Pencil;
      // 1.0 laat de lijndikte direct de gemeten druk volgen.
      pressureExponentDown:   1.0,
      pressureExponentRender: 1.0,
      // Safari geeft onstabiele predicted events terug die streken laten teleporteren.
      usePredictedEvents:     false,
      // Hogere streamline compenseert de lagere event-frequentie op Safari
      // (geen pointerrawupdate → ~60 Hz i.p.v. ~240 Hz op Chromium).
      streamline:             0.65,
      smoothing:              0.5,
    }
  : {
      // Windows / Surface Pen — ongewijzigde hardcoded waarden uit CanvasView.jsx
      pressureExponentDown:   2.5,
      pressureExponentRender: 1.5,
      usePredictedEvents:     true,
      streamline:             0.5,
      smoothing:              0.5,
    }
