import 'styled-components'
import type { DesignSystemTheme } from './themes/types'

declare module 'styled-components' {
  export interface DefaultTheme extends DesignSystemTheme {}
}
