import './i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppErrorBoundary } from './AppErrorBoundary'
import EmailStudio from './EmailStudio'
import { ThemeProvider } from 'styled-components'
import { getTheme, GlobalStyle } from './design-system'
import { useEmailStudioStore } from './state/appStore'

const Root = () => {
  const themeId = useEmailStudioStore((s) => s.themeId)
  const theme = getTheme(themeId)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <EmailStudio />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <Root />
    </AppErrorBoundary>
  </StrictMode>,
)
