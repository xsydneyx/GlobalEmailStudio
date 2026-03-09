/** API response shapes aligned with frontend (EmailTemplate, Location). */

export interface EmailTemplate {
  id: string
  name: string
  i18nKey?: string
  subject: string
  body: string
}

export interface Location {
  id: string
  city: string
  storeName: string
  country: string
  language: string
  currency: string
  timezone: string
  overrides?: {
    subject?: string
    body?: string
  }
}

export interface SessionPayload {
  templates: EmailTemplate[]
  locations: Location[]
}
