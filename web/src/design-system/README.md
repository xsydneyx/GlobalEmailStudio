# Design system

Token-based UI: themes, global styles, and components. Built for scale and accessibility.

## Structure

- **themes/** — Theme definitions (default, light, dark). Semantic color roles; shared spacing, radii, typography.
- **global-styles/** — Base layout, typography, `:focus-visible` rings, `prefers-reduced-motion`.
- **components/** — One folder per component. Each folder contains the component (e.g. `Button/Button.tsx`), and where applicable its Storybook files colocated (`Button.definition.tsx`, `Button.stories.tsx`). Barrel `components/index.ts` re-exports all for a single import path.

## Components

Exported from `design-system` (see `components/index.ts`):

- **Controls:** Button, Input, Textarea, Select, Label, Checkbox, Chip
- **Layout:** Container, Header, Main, TabBar, Tab, TabPanel, TabStepArrow, Panel, ControlsRow, Stack, Columns
- **Typography:** Title, Subtitle, Tagline, SmallMuted, SmallSubtle, InlineMuted, PanelTitle, MonoBlock
- **Surfaces:** Card

## Themes

- **default** — Warm cream/tan (original palette).
- **light** — Neutral grays, high contrast.
- **dark** — Dark background, light text.

Use `getTheme(themeId)` and pass to `ThemeProvider`. Toggle in app via theme switcher (state in store).

## Accessibility

- **Focus:** `:focus-visible` only; high-contrast ring from `theme.colors.focusRing`. Outline never removed for keyboard/screen reader.
- **Motion:** `prefers-reduced-motion: reduce` respected (animations/transitions minimized).
- **Contrast:** Themes use WCAG AA–aligned semantic colors where required.

## Usage

```ts
import { getTheme, GlobalStyle, Button, THEME_IDS_LIST } from './design-system'
```
