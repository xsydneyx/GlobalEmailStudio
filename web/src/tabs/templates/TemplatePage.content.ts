import type { LocaleCode } from '../../state/appStore'

export type TemplatesContentByLocale = {
  heading: string
  countOne: string
  countOther: string
  detailsTitle: string
  noSelection: string
  draftNote: string
  subjectBase: string
  bodyBase: string
  placeholderHelp: string
  saveButton: string
  saveButtonSaving: string
  saveSuccess: string
}

export const templatesContent: Record<LocaleCode, TemplatesContentByLocale> = {
  en: {
    heading: 'Templates',
    countOne: '{{count}} template',
    countOther: '{{count}} templates',
    detailsTitle: 'Template details',
    noSelection:
      'No template selected. Choose one above to inspect subject and body placeholders.',
    draftNote:
      'Type your draft in any language. Save to translate it to each market\'s language; then review and override on the Markets tab if needed.',
    subjectBase: 'Subject',
    bodyBase: 'Body',
    placeholderHelp:
      'Placeholders like {storeName}, {city}, and {date} are filled per market (store name, city, local date).',
    saveButton: 'Save & translate for markets',
    saveButtonSaving: 'Translating…',
    saveSuccess: 'Translated for {{count}} markets. Check the Markets tab to review or edit.',
  },
  de: {
    heading: 'Vorlagen',
    countOne: '{{count}} Vorlage',
    countOther: '{{count}} Vorlagen',
    detailsTitle: 'Vorlagendetails',
    noSelection:
      'Keine Vorlage gewählt. Wählen Sie oben eine, um Betreff und Text mit Platzhaltern zu prüfen.',
    draftNote:
      'Geben Sie Ihren Entwurf in beliebiger Sprache ein. Speichern übersetzt in die Sprache jedes Marktes; prüfen und ggf. unter Märkte anpassen.',
    subjectBase: 'Betreff',
    bodyBase: 'Text',
    placeholderHelp:
      'Platzhalter wie {storeName}, {city} und {date} werden pro Markt ausgefüllt.',
    saveButton: 'Speichern & für Märkte übersetzen',
    saveButtonSaving: 'Übersetzen…',
    saveSuccess: 'Für {{count}} Märkte übersetzt. Unter Märkte prüfen oder anpassen.',
  },
  da: {
    heading: 'Skabeloner',
    countOne: '{{count}} skabelon',
    countOther: '{{count}} skabeloner',
    detailsTitle: 'Skabelondetaljer',
    noSelection:
      'Ingen skabelon valgt. Vælg en ovenfor for at se emne og brødtekst med pladsholdere.',
    draftNote:
      'Skriv din kladde på et hvilket som helst sprog. Gem for at oversætte til hvert markeds sprog; gennemse og tilsidesæt under Markeder om nødvendigt.',
    subjectBase: 'Emne',
    bodyBase: 'Brødtekst',
    placeholderHelp:
      'Pladsholdere som {storeName}, {city} og {date} udfyldes pr. marked.',
    saveButton: 'Gem og oversæt for markeder',
    saveButtonSaving: 'Oversætter…',
    saveSuccess: 'Oversat for {{count}} markeder. Tjek Markeder for at gennemse eller redigere.',
  },
}

export const getCountText = (c: TemplatesContentByLocale, count: number): string => {
  const template = count === 1 ? c.countOne : c.countOther
  return template.replace('{{count}}', String(count))
}
