import 'styled-components'
import { theme  } from '../global/theme/theme'

export type ThemeType = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeType {}
}
