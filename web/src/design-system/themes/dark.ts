import type { DesignSystemTheme } from './types'
import { tokens } from './tokens'

/**
 * Dark theme: dark gray background, light text.
 * WCAG AA compliant; reduced brightness for comfort in low light.
 */
export const darkTheme: DesignSystemTheme = {
  colors: {
    appBg: '#1D1D1F',
    panelBg: '#2C2C2E',
    panelBorder: '#48484A',
    text: '#F5F5F7',
    muted: '#A1A1A6',
    subtle: '#636366',
    inputBg: '#2C2C2E',
    inputBorder: '#48484A',
    accent: '#0A84FF',
    accentText: '#FFFFFF',
    borderSubtle: '#48484A',
    surfaceOverlay: 'rgba(44, 44, 46, 0.72)',
    accentMuted: 'rgba(10, 132, 255, 0.2)',
    accentMutedBorder: '#0A84FF',
    successBg: 'rgba(48, 209, 88, 0.18)',
    successBorder: '#30D158',
    warnBg: 'rgba(255, 149, 0, 0.2)',
    warnBorder: '#FF9F0A',
    focusRing: '#0A84FF',
  },
  radii: tokens.radii,
  space: tokens.space,
  font: tokens.font,
  shadow: {
    panel: '0 2px 12px rgba(0, 0, 0, 0.35)',
  },
  a11y: tokens.a11y,
}
