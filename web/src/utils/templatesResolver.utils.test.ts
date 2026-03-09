import { describe, it, expect } from 'vitest'
import { resolveTemplate } from './templatesResolver.utils'
import type { EmailTemplate, Location } from '../state/appStore'

const template: EmailTemplate = {
  id: 'welcome',
  name: 'Welcome',
  subject: 'Welcome to {storeName} in {city}',
  body: 'Today is {date}. Visit us at {storeName}, {city}, {country}.',
}

const location: Location = {
  id: 'loc1',
  city: 'Berlin',
  storeName: 'Store Alpha',
  country: 'DE',
  language: 'en',
  currency: 'EUR',
  timezone: 'Europe/Berlin',
}

describe('resolveTemplate', () => {
  it('replaces storeName, city, country placeholders', () => {
    const fixedDate = new Date('2025-03-09T12:00:00Z')
    const result = resolveTemplate(template, location, { date: fixedDate })

    expect(result.subject).toBe('Welcome to Store Alpha in Berlin')
    expect(result.body).toContain('Visit us at Store Alpha, Berlin, DE.')
  })

  it('formats date in location language and timezone', () => {
    const fixedDate = new Date('2025-03-09T12:00:00Z')
    const result = resolveTemplate(template, location, { date: fixedDate })

    // Europe/Berlin in March 2025: 12:00 UTC = 13:00 local; date part is 9 March 2025
    const expectedDateFormatted = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Berlin',
    }).format(fixedDate)
    expect(result.body).toContain(`Today is ${expectedDateFormatted}.`)
  })

  it('uses current date when options.date is not provided', () => {
    const result = resolveTemplate(template, location, {})
    expect(result.subject).toBe('Welcome to Store Alpha in Berlin')
    expect(result.body).toMatch(/Today is .+\. Visit us at/)
  })

  it('leaves unknown placeholders unchanged', () => {
    const tpl: EmailTemplate = {
      ...template,
      subject: 'Hello {storeName} and {unknown}',
      body: 'Body',
    }
    const result = resolveTemplate(tpl, location, {})
    expect(result.subject).toBe('Hello Store Alpha and {unknown}')
  })

  it('uses location overrides when set', () => {
    const locWithOverrides: Location = {
      ...location,
      overrides: {
        subject: 'Custom subject for Berlin',
        body: 'Custom body.',
      },
    }
    const result = resolveTemplate(template, locWithOverrides, {})

    expect(result.subject).toBe('Custom subject for Berlin')
    expect(result.body).toBe('Custom body.')
  })

  it('uses translated content as default when no overrides and translated exists', () => {
    const result = resolveTemplate(template, location, {
      translatedContent: {
        loc1: {
          subject: 'Translated subject',
          body: 'Translated body with {city}.',
        },
      },
    })

    expect(result.subject).toBe('Translated subject')
    expect(result.body).toBe('Translated body with Berlin.')
  })

  it('uses campaign content as default when no overrides and no translated for location', () => {
    const result = resolveTemplate(template, location, {
      campaignContent: {
        subject: 'Campaign subject',
        body: 'Campaign body in {city}.',
      },
    })

    expect(result.subject).toBe('Campaign subject')
    expect(result.body).toBe('Campaign body in Berlin.')
  })

  it('falls back to template default when no overrides, translated, or campaign', () => {
    const result = resolveTemplate(template, location, {})

    expect(result.subject).toBe('Welcome to Store Alpha in Berlin')
    expect(result.body).toContain('Visit us at Store Alpha, Berlin, DE.')
  })

  it('prefers location overrides over translated and campaign', () => {
    const locWithOverrides: Location = {
      ...location,
      overrides: { subject: 'Override wins' },
    }
    const result = resolveTemplate(template, locWithOverrides, {
      campaignContent: { subject: 'Campaign', body: 'Campaign body' },
      translatedContent: {
        loc1: { subject: 'Translated', body: 'Translated body' },
      },
    })

    expect(result.subject).toBe('Override wins')
    expect(result.body).toBe('Translated body') // override has no body, so translated
  })
})
