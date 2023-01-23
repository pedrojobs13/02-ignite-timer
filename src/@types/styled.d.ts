import { DefaultTheme } from 'styled-components'

import { defaultheme } from '../styles/themes/default'

type ThemeType = typeof defaultheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
