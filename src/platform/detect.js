// iPadOS 13+ identificeert zich als MacIntel met maxTouchPoints > 1 (geen 'iPad' in userAgent meer)
export const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
