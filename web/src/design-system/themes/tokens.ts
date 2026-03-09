/**
 * Shared design tokens that do not vary by theme.
 * Spacing, radii, and typography scales stay consistent for visual rhythm.
 */
export const tokens = {
  radii: {
    sm: '10px',
    md: '12px',
    lg: '16px',
    pill: '999px',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
  },
  font: {
    body: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"`,
    mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  },
  a11y: {
    focusRingWidth: '2px',
    focusRingOffset: '2px',
  },
} as const
