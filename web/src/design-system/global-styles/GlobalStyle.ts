import { createGlobalStyle } from 'styled-components'

/**
 * Global styles for the design system.
 * - Base layout and typography
 * - Accessible focus (focus-visible only, high-contrast ring)
 * - Respects prefers-reduced-motion
 * Theme is injected by ThemeProvider (DefaultTheme).
 */
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    /* Respect user motion preference for animations (e.g. future transitions) */
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.appBg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font.body};
    line-height: 1.5;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100%;
  }

  /* Focus visible: keyboard/screen-reader only; high-contrast ring. Never remove focus outline. */
  :focus {
    outline: none;
  }

  :focus-visible {
    outline: ${({ theme }) => theme.a11y.focusRingWidth} solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: ${({ theme }) => theme.a11y.focusRingOffset};
  }

  /* Ensure interactive elements get focus ring when focused by keyboard */
  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: ${({ theme }) => theme.a11y.focusRingWidth} solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: ${({ theme }) => theme.a11y.focusRingOffset};
  }

  a {
    color: inherit;
  }

  button, input, textarea, select {
    font: inherit;
  }

  pre {
    margin: 0;
    font-family: ${({ theme }) => theme.font.mono};
  }
`
