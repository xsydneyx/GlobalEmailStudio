import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { getTheme, GlobalStyle } from '../src/design-system'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={getTheme('default')}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
