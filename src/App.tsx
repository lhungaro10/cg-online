import { ThemeProvider } from 'styled-components'
import { theme } from './global/theme/theme'
import { GlobalStyles } from './global/theme/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
