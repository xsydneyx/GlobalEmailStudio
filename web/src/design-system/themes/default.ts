import type { DesignSystemTheme } from './types'
import { tokens } from './tokens'

/**
 * Default theme: warm cream/tan palette.
 * Original app palette; WCAG AA contrast where required.
 */
export const defaultTheme: DesignSystemTheme = {
  colors: {
    appBg: '#F3EED7',
    panelBg: '#DFD6A4',
    panelBorder: '#321F12',
    text: '#321F12',
    muted: '#808249',
    subtle: '#A15D66',
    inputBg: 'rgba(223, 214, 164, 0.75)',
    inputBorder: '#321F12',
    accent: '#A15D66',
    accentText: '#F3EED7',
    borderSubtle: '#321F12',
    surfaceOverlay: 'rgba(243, 238, 215, 0.55)',
    accentMuted: 'rgba(161, 93, 102, 0.1)',
    accentMutedBorder: '#321F12',
    successBg: 'rgba(128, 130, 73, 0.12)',
    successBorder: '#321F12',
    warnBg: 'rgba(225, 180, 161, 0.25)',
    warnBorder: '#321F12',
    focusRing: '#A15D66',
  },
  radii: tokens.radii,
  space: tokens.space,
  font: tokens.font,
  shadow: {
    panel: '0 1px 0 rgba(50, 31, 18, 0.06)',
  },
  a11y: tokens.a11y,
}
