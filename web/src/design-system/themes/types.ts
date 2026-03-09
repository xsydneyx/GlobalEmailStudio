/**
 * Design system theme type.
 * Semantic color roles support multiple themes (default, light, dark) and accessibility.
 * All themes implement this shape so components stay theme-agnostic.
 */
export interface DesignSystemTheme {
  colors: {
    /** Page background */
    appBg: string
    /** Panel/surface background */
    panelBg: string
    /** Panel/surface border */
    panelBorder: string
    /** Primary text (body, headings) */
    text: string
    /** Secondary/muted text */
    muted: string
    /** Tertiary/subtle text and icons */
    subtle: string
    /** Input background */
    inputBg: string
    /** Input and control border */
    inputBorder: string
    /** Brand/accent (buttons, links, focus) */
    accent: string
    /** Text on accent (e.g. primary button) */
    accentText: string
    /** Subtle borders (cards, dividers) */
    borderSubtle: string
    /** Overlay surfaces */
    surfaceOverlay: string
    /** Accent tint (highlights, badges) */
    accentMuted: string
    accentMutedBorder: string
    /** Success state */
    successBg: string
    successBorder: string
    /** Warning/caution state */
    warnBg: string
    warnBorder: string
    /** Focus ring (high contrast for a11y) */
    focusRing: string
  }
  radii: {
    sm: string
    md: string
    lg: string
    pill: string
  }
  space: {
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    8: string
  }
  font: {
    body: string
    mono: string
  }
  shadow: {
    panel: string
  }
  /** Accessibility: focus ring width (e.g. 2px). Used in global styles and components. */
  a11y: {
    focusRingWidth: string
    focusRingOffset: string
  }
}

const THEME_IDS = ['default', 'light', 'dark'] as const
export type ThemeId = (typeof THEME_IDS)[number]

export const THEME_DEFAULT: ThemeId = THEME_IDS[0]
export const THEME_LIGHT: ThemeId = THEME_IDS[1]
export const THEME_DARK: ThemeId = THEME_IDS[2]

export const THEME_IDS_LIST = THEME_IDS
