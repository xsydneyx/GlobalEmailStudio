/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePreviewPage } from './PreviewPage.hooks'
import { useEmailStudioStore } from '../../state/appStore'

const templates = [
  { id: 'welcome', name: 'Welcome', subject: 'Hi {storeName}', body: 'Body' },
]
const locations = [
  {
    id: 'berlin',
    city: 'Berlin',
    storeName: 'Store',
    country: 'DE',
    language: 'de',
    currency: 'EUR',
    timezone: 'Europe/Berlin',
  },
]

describe('usePreviewPage', () => {
  beforeEach(() => {
    useEmailStudioStore.setState({
      selectedTemplateId: 'welcome',
      selectedLocationIds: ['berlin'],
      campaignContent: {},
    })
  })

  it('returns previews for selected template and locations', () => {
    const { result } = renderHook(() => usePreviewPage(templates, locations))

    expect(result.current.activeTemplate?.id).toBe('welcome')
    expect(result.current.activeLocations).toHaveLength(1)
    expect(result.current.previews).toHaveLength(1)
    expect(result.current.previews[0].location.id).toBe('berlin')
    expect(result.current.previews[0].email.subject).toContain('Store')
    expect(result.current.disabled).toBe(false)
    expect(result.current.sent).toBeNull()
  })

  it('handleSend sets sent with resolved payload', () => {
    const { result } = renderHook(() => usePreviewPage(templates, locations))

    act(() => {
      result.current.handleSend()
    })

    expect(result.current.sent).toHaveLength(1)
    expect(result.current.sent![0].locationId).toBe('berlin')
    expect(result.current.sent![0].subject).toBeDefined()
    expect(result.current.sent![0].body).toBeDefined()
  })

  it('returns empty previews and disabled when no template selected', () => {
    useEmailStudioStore.setState({ selectedTemplateId: null })
    const { result } = renderHook(() => usePreviewPage(templates, locations))

    expect(result.current.activeTemplate).toBeNull()
    expect(result.current.previews).toEqual([])
    expect(result.current.disabled).toBe(true)

    act(() => {
      result.current.handleSend()
    })
    expect(result.current.sent).toBeNull()
  })
})
