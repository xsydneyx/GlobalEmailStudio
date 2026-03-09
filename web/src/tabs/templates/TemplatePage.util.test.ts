import { describe, it, expect } from 'vitest'
import {
  getDefaultContentForTemplate,
  getDisplayContent,
  getDisplayContentForSelection,
} from './TemplatePage.util'

describe('getDefaultContentForTemplate', () => {
  const templates = [
    { id: 'a', name: 'A', subject: 'Subject A', body: 'Body A' },
    { id: 'b', name: 'B', subject: 'Subject B', body: 'Body B' },
  ]

  it('returns null when selectedTemplateId is null', () => {
    expect(getDefaultContentForTemplate(templates, null)).toBeNull()
  })

  it('returns null when no template matches selectedTemplateId', () => {
    expect(getDefaultContentForTemplate(templates, 'c')).toBeNull()
  })

  it('returns default content when template is found', () => {
    const result = getDefaultContentForTemplate(templates, 'b')
    expect(result).toEqual({ subject: 'Subject B', body: 'Body B' })
  })
})

describe('getDisplayContent', () => {
  const defaultContent = {
    subject: 'Welcome to {storeName} in {city}',
    body: 'Hi there,\n\nThanks for joining.',
  }

  it('returns default subject and body when campaign content is empty', () => {
    const result = getDisplayContent({}, defaultContent)
    expect(result.subject).toBe(defaultContent.subject)
    expect(result.body).toBe(defaultContent.body)
  })

  it('returns campaign subject when set, default body when not set', () => {
    const result = getDisplayContent(
      { subject: 'Custom subject' },
      defaultContent,
    )
    expect(result.subject).toBe('Custom subject')
    expect(result.body).toBe(defaultContent.body)
  })

  it('returns default subject when not set, campaign body when set', () => {
    const result = getDisplayContent(
      { body: 'Custom body text' },
      defaultContent,
    )
    expect(result.subject).toBe(defaultContent.subject)
    expect(result.body).toBe('Custom body text')
  })

  it('returns campaign subject and body when both set', () => {
    const result = getDisplayContent(
      { subject: 'My subject', body: 'My body' },
      defaultContent,
    )
    expect(result.subject).toBe('My subject')
    expect(result.body).toBe('My body')
  })

  it('uses campaign value when empty string (falsy but defined)', () => {
    const result = getDisplayContent(
      { subject: '', body: '' },
      defaultContent,
    )
    expect(result.subject).toBe('')
    expect(result.body).toBe('')
  })
})

describe('getDisplayContentForSelection', () => {
  const templates = [
    { id: 'a', name: 'A', subject: 'Subject A', body: 'Body A' },
    { id: 'b', name: 'B', subject: 'Subject B', body: 'Body B' },
  ]

  it('returns empty strings when no template is selected', () => {
    const result = getDisplayContentForSelection(templates, null, {})
    expect(result).toEqual({ subject: '', body: '' })
  })

  it('returns empty strings when selectedTemplateId does not match', () => {
    const result = getDisplayContentForSelection(templates, 'c', {})
    expect(result).toEqual({ subject: '', body: '' })
  })

  it('returns template default when template is selected and campaign is empty', () => {
    const result = getDisplayContentForSelection(templates, 'b', {})
    expect(result).toEqual({ subject: 'Subject B', body: 'Body B' })
  })

  it('returns campaign overrides merged with template default when template is selected', () => {
    const result = getDisplayContentForSelection(templates, 'b', {
      subject: 'Custom subject',
    })
    expect(result).toEqual({ subject: 'Custom subject', body: 'Body B' })
  })
})
