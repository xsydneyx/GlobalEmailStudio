import type { DesignSystemTheme, ThemeId } from './types'
import { defaultTheme } from './default'
import { lightTheme } from './light'
import { darkTheme } from './dark'

export type { DesignSystemTheme, ThemeId } from './types'
export { THEME_DEFAULT, THEME_LIGHT, THEME_DARK, THEME_IDS_LIST } from './types'
export { tokens } from './tokens'

const themes: Record<ThemeId, DesignSystemTheme> = {
  default: defaultTheme,
  light: lightTheme,
  dark: darkTheme,
}

export const getTheme = (id: ThemeId): DesignSystemTheme => themes[id]

export const themesMap = themes
