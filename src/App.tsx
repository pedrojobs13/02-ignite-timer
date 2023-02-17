import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesContextProvider } from './context/CyclesContext'
import { Router } from './Router'

import { GlobalStyle } from './styles/global'
import { defaultheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
