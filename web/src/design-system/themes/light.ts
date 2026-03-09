import type { DesignSystemTheme } from './types'
import { tokens } from './tokens'

/**
 * Light theme: neutral grays, high contrast for readability.
 * WCAG AA compliant for text and interactive elements.
 */
export const lightTheme: DesignSystemTheme = {
  colors: {
    appBg: '#F5F5F7',
    panelBg: '#FFFFFF',
    panelBorder: '#D2D2D7',
    text: '#1D1D1F',
    muted: '#6E6E73',
    subtle: '#86868B',
    inputBg: '#FFFFFF',
    inputBorder: '#D2D2D7',
    accent: '#0071E3',
    accentText: '#FFFFFF',
    borderSubtle: '#D2D2D7',
    surfaceOverlay: 'rgba(255, 255, 255, 0.72)',
    accentMuted: 'rgba(0, 113, 227, 0.12)',
    accentMutedBorder: '#0071E3',
    successBg: 'rgba(48, 209, 88, 0.12)',
    successBorder: '#30D158',
    warnBg: 'rgba(255, 149, 0, 0.15)',
    warnBorder: '#FF9500',
    focusRing: '#0071E3',
  },
  radii: tokens.radii,
  space: tokens.space,
  font: tokens.font,
  shadow: {
    panel: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  a11y: tokens.a11y,
}
