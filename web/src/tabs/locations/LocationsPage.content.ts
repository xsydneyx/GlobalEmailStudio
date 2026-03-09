import type { LocaleCode } from '../../state/appStore'

export type MarketsContentByLocale = {
  empty: string
  heading: string
  subtitle: string
  selected: string
  subjectOverride: string
  bodyOverride: string
  placeholderSubject: string
  placeholderBody: string
  include: string
}

export const locationsContent: Record<LocaleCode, MarketsContentByLocale> = {
  en: {
    empty: 'Markets are loaded from mock data when you open the Templates panel.',
    heading: 'Markets',
    subtitle: 'Manage per-market overrides for subject and body.',
    selected: '{{count}} of {{total}} selected',
    subjectOverride: 'Subject override',
    bodyOverride: 'Body override',
    placeholderSubject: 'Override or leave empty to use translated/default',
    placeholderBody: 'Override or leave empty to use translated/default',
    include: 'Include',
  },
  de: {
    empty: 'Märkte werden aus Mock-Daten geladen, sobald Sie den Vorlagen-Bereich öffnen.',
    heading: 'Märkte',
    subtitle: 'Anpassungen für Betreff und Text pro Markt verwalten.',
    selected: '{{count}} von {{total}} ausgewählt',
    subjectOverride: 'Betreff-Anpassung',
    bodyOverride: 'Text-Anpassung',
    placeholderSubject: 'Anpassen oder leer für übersetzt/Standard',
    placeholderBody: 'Anpassen oder leer für übersetzt/Standard',
    include: 'Einbeziehen',
  },
  da: {
    empty: 'Markeder hentes fra mock-data, når du åbner Skabeloner-panelet.',
    heading: 'Markeder',
    subtitle: 'Administrer tilsidesættelser for emne og brødtekst pr. marked.',
    selected: '{{count}} af {{total}} valgt',
    subjectOverride: 'Emne-tilsidesættelse',
    bodyOverride: 'Brødtekst-tilsidesættelse',
    placeholderSubject: 'Tilsidesæt eller tom = oversat/standard',
    placeholderBody: 'Tilsidesæt eller tom = oversat/standard',
    include: 'Inkluder',
  },
}

export const getSelectedText = (
  c: MarketsContentByLocale,
  count: number,
  total: number
): string =>
  c.selected.replace('{{count}}', String(count)).replace('{{total}}', String(total))
