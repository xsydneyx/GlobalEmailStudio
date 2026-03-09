import type { LocaleCode } from './state/appStore'

export type AppContentByLocale = {
  main: {
    tagline: string
    title: string
    subtitle: string
    language: string
    theme: string
    themeDefault: string
    themeLight: string
    themeDark: string
    panels: { template: string; markets: string; preview: string }
    loading: string
    loadError: string
  }
}

export const appContent: Record<LocaleCode, AppContentByLocale> = {
  en: {
    main: {
      tagline: 'Local Campaign Email Studio',
      title: 'Global Email Template Studio',
      subtitle:
        'Design a single campaign email and localize it per market (language, timezone, placeholders).',
      language: 'Interface',
      theme: 'Theme',
      themeDefault: 'Default',
      themeLight: 'Light',
      themeDark: 'Dark',
      panels: {
        template: 'Campaign template',
        markets: 'Markets & overrides',
        preview: 'Localized preview & send',
      },
      loading: 'Loading…',
      loadError: 'Failed to load data. Please try again.',
    },
  },
  de: {
    main: {
      tagline: 'Lokales Kampagnen-E-Mail-Studio',
      title: 'Globales E-Mail-Vorlagenstudio',
      subtitle:
        'Entwerfen Sie eine Kampagnen-E-Mail und lokalisieren Sie sie pro Markt (Sprache, Zeitzone, Platzhalter).',
      language: 'Oberfläche',
      theme: 'Design',
      themeDefault: 'Standard',
      themeLight: 'Hell',
      themeDark: 'Dunkel',
      panels: {
        template: 'Kampagnenvorlage',
        markets: 'Märkte & Anpassungen',
        preview: 'Lokalisierte Vorschau & Versand',
      },
      loading: 'Laden…',
      loadError: 'Daten konnten nicht geladen werden. Bitte erneut versuchen.',
    },
  },
  da: {
    main: {
      tagline: 'Lokalt kampagne-e-mail-studio',
      title: 'Globalt e-mail skabelonstudio',
      subtitle:
        'Design én kampagne-e-mail og lokaliser den pr. marked (sprog, tidszone, pladsholdere).',
      language: 'Grænseflade',
      theme: 'Tema',
      themeDefault: 'Standard',
      themeLight: 'Lys',
      themeDark: 'Mørk',
      panels: {
        template: 'Kampagnes skabelon',
        markets: 'Markeder & tilsidesættelser',
        preview: 'Lokaliseret forhåndsvisning & afsend',
      },
      loading: 'Indlæser…',
      loadError: 'Kunne ikke indlæse data. Prøv igen.',
    },
  },

}
