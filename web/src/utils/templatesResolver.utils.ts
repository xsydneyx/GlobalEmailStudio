import type {
  CampaignContent,
  EmailTemplate,
  Location,
  LocationId,
  TranslatedContent,
} from '../state/appStore'

export interface ResolvedEmail {
  subject: string
  body: string
}

export interface ResolveOptions {
  date?: Date
  /** Campaign-level subject/body (draft). */
  campaignContent?: CampaignContent
  /** Per-location translated content from Save; used as default when present. */
  translatedContent?: TranslatedContent
}

const PLACEHOLDER_PATTERN = /\{(\w+)\}/g

/**
 * Resolves template + location + options to final subject/body.
 * Order: location overrides → translated content for this location (from Save) → draft/template default.
 */
export const resolveTemplate = (
  template: EmailTemplate,
  location: Location,
  options: ResolveOptions = {},
): ResolvedEmail => {
  const date = options.date ?? new Date()
  const campaignContent = options.campaignContent
  const translatedContent = options.translatedContent

  const payload: Record<string, string> = {
    storeName: location.storeName,
    city: location.city,
    country: location.country,
    date: new Intl.DateTimeFormat(location.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: location.timezone,
    }).format(date),
  }

  const applyPlaceholders = (input: string): string =>
    input.replace(PLACEHOLDER_PATTERN, (_match, key: string) => {
      if (payload[key] !== undefined) return payload[key]
      return `{${key}}`
    })

  const draftDefault = getDefaultContent(template, campaignContent)
  const translated = translatedContent?.[location.id as LocationId]
  const defaultForLocation = translated ?? draftDefault

  const subjectSource = location.overrides?.subject ?? defaultForLocation.subject
  const bodySource = location.overrides?.body ?? defaultForLocation.body

  return {
    subject: applyPlaceholders(subjectSource),
    body: applyPlaceholders(bodySource),
  }
}

/** Default content: campaign when set, else template subject/body. Same for all markets until overridden. */
const getDefaultContent = (
  template: EmailTemplate,
  campaignContent?: CampaignContent,
): { subject: string; body: string } => {
  const hasCampaignSubject =
    campaignContent?.subject !== undefined && campaignContent.subject.trim() !== ''
  const hasCampaignBody =
    campaignContent?.body !== undefined && campaignContent.body.trim() !== ''

  return {
    subject: hasCampaignSubject ? campaignContent!.subject! : template.subject,
    body: hasCampaignBody ? campaignContent!.body! : template.body,
  }
}
