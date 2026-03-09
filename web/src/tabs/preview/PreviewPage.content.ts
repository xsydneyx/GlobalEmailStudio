import type { LocaleCode } from '../../state/appStore'

export type PreviewContentByLocale = {
  heading: string
  subtitle: string
  sendButtonOne: string
  sendButtonOther: string
  noTemplate: string
  noMarkets: string
  override: string
  hqDefault: string
  subject: string
  body: string
  successTitleOne: string
  successTitleOther: string
  successHint: string
}

export const previewContent: Record<LocaleCode, PreviewContentByLocale> = {
  en: {
    heading: 'Preview & send',
    subtitle:
      'Resolve placeholders per market, then simulate a geo-targeted send.',
    sendButtonOne: 'Send to {{count}} market',
    sendButtonOther: 'Send to {{count}} markets',
    noTemplate: 'Select a template to enable preview and send.',
    noMarkets:
      'No markets selected. Include at least one market to preview and send.',
    override: 'Override',
    hqDefault: 'HQ default',
    subject: 'Subject',
    body: 'Body',
    successTitleOne: 'Simulated send complete for {{count}} market.',
    successTitleOther: 'Simulated send complete for {{count}} markets.',
    successHint:
      'Inspect the browser console for the payload you would post to an API.',
  },
  de: {
    heading: 'Vorschau & Versand',
    subtitle:
      'Platzhalter pro Markt auflösen und einen geo-targeted Versand simulieren.',
    sendButtonOne: 'An {{count}} Markt senden',
    sendButtonOther: 'An {{count}} Märkte senden',
    noTemplate: 'Wählen Sie eine Vorlage, um Vorschau und Versand zu aktivieren.',
    noMarkets: 'Keine Märkte ausgewählt. Mindestens einen Markt einbeziehen.',
    override: 'Anpassung',
    hqDefault: 'HQ-Standard',
    subject: 'Betreff',
    body: 'Text',
    successTitleOne: 'Simulierter Versand für {{count}} Markt abgeschlossen.',
    successTitleOther: 'Simulierter Versand für {{count}} Märkte abgeschlossen.',
    successHint:
      'In der Browser-Konsole finden Sie die Nutzlast für einen API-Aufruf.',
  },
  da: {
    heading: 'Forhåndsvisning & afsend',
    subtitle:
      'Udfyld pladsholdere pr. marked og simulér en geo-målrettet afsendelse.',
    sendButtonOne: 'Send til {{count}} marked',
    sendButtonOther: 'Send til {{count}} markeder',
    noTemplate: 'Vælg en skabelon for at aktivere forhåndsvisning og afsend.',
    noMarkets: 'Ingen markeder valgt. Inkluder mindst ét marked.',
    override: 'Tilsidesættelse',
    hqDefault: 'HQ-standard',
    subject: 'Emne',
    body: 'Brødtekst',
    successTitleOne: 'Simuleret afsendelse for {{count}} marked gennemført.',
    successTitleOther: 'Simuleret afsendelse for {{count}} markeder gennemført.',
    successHint:
      'Se browserkonsollen for den payload, du ville sende til en API.',
  },
}

export const getSendButtonText = (c: PreviewContentByLocale, count: number): string => {
  const template = count === 1 ? c.sendButtonOne : c.sendButtonOther
  return template.replace('{{count}}', String(count))
}

export const getSuccessTitleText = (c: PreviewContentByLocale, count: number): string => {
  const template = count === 1 ? c.successTitleOne : c.successTitleOther
  return template.replace('{{count}}', String(count))
}
