/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useEmailStudioData, useTimedDismiss, useSaveAndTranslate } from './EmailStudio.hooks'
import { useEmailStudioStore } from './state/appStore'

vi.mock('./api/data', () => ({
  getSession: vi.fn(),
}))

vi.mock('./api/translateDraft', () => ({
  translateDraftToLocations: vi.fn(),
}))

const { getSession } = await import('./api/data')
const { translateDraftToLocations } = await import('./api/translateDraft')

const templates = [
  { id: 't1', name: 'T1', subject: 'Hello', body: 'Welcome to {storeName}.' },
]
const locations = [
  {
    id: 'loc1',
    city: 'Berlin',
    storeName: 'Store',
    country: 'DE',
    language: 'de',
    currency: 'EUR',
    timezone: 'Europe/Berlin',
  },
]

describe('useEmailStudioData', () => {
  beforeEach(() => {
    vi.mocked(getSession).mockReset()
    useEmailStudioStore.setState({
      selectedTemplateId: null,
      selectedLocationIds: [],
    })
  })

  it('loads session on mount and sets default selections', async () => {
    const session = {
      templates: [{ id: 't1', name: 'T1', subject: 'S', body: 'B' }],
      locations: [
        {
          id: 'loc1',
          city: 'Berlin',
          storeName: 'Store',
          country: 'DE',
          language: 'de',
          currency: 'EUR',
          timezone: 'Europe/Berlin',
        },
      ],
    }
    vi.mocked(getSession).mockResolvedValue(session)

    const { result } = renderHook(() => useEmailStudioData())

    expect(result.current.dataLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.dataLoading).toBe(false)
    })

    expect(result.current.dataError).toBeNull()
    expect(result.current.templates).toEqual(session.templates)
    expect(result.current.locations).toEqual(session.locations)
    expect(useEmailStudioStore.getState().selectedTemplateId).toBe('t1')
    expect(useEmailStudioStore.getState().selectedLocationIds).toEqual(['loc1'])
  })

  it('sets dataError when getSession throws', async () => {
    vi.mocked(getSession).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useEmailStudioData())

    await waitFor(() => {
      expect(result.current.dataLoading).toBe(false)
    })

    expect(result.current.dataError).toBe('Network error')
    expect(result.current.templates).toEqual([])
    expect(result.current.locations).toEqual([])
  })

  it('updateLocationOverrides updates location overrides', async () => {
    const session = {
      templates: [],
      locations: [
        {
          id: 'loc1',
          city: 'Berlin',
          storeName: 'Store',
          country: 'DE',
          language: 'de',
          currency: 'EUR',
          timezone: 'Europe/Berlin',
        },
      ],
    }
    vi.mocked(getSession).mockResolvedValue(session)

    const { result } = renderHook(() => useEmailStudioData())

    await waitFor(() => {
      expect(result.current.dataLoading).toBe(false)
    })

    result.current.updateLocationOverrides('loc1', { subject: 'Custom subject' })

    await waitFor(() => {
      const loc = result.current.locations.find((l) => l.id === 'loc1')
      expect(loc?.overrides?.subject).toBe('Custom subject')
    })
  })
})

describe('useTimedDismiss', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls setValue(null) after delay when value is non-null', () => {
    const setValue = vi.fn()
    renderHook(() => useTimedDismiss(5, setValue, 4000))

    expect(setValue).not.toHaveBeenCalled()
    vi.advanceTimersByTime(4000)
    expect(setValue).toHaveBeenCalledTimes(1)
    expect(setValue).toHaveBeenCalledWith(null)
  })

  it('does not call setValue when value is null', () => {
    const setValue = vi.fn()
    renderHook(() => useTimedDismiss(null, setValue, 4000))

    vi.advanceTimersByTime(4000)
    expect(setValue).not.toHaveBeenCalled()
  })

  it('does not call setValue after unmount before delay', () => {
    const setValue = vi.fn()
    const { unmount } = renderHook(() => useTimedDismiss(5, setValue, 4000))

    unmount()
    vi.advanceTimersByTime(4000)
    expect(setValue).not.toHaveBeenCalled()
  })
})

describe('useSaveAndTranslate', () => {
  beforeEach(() => {
    vi.mocked(translateDraftToLocations).mockReset()
    useEmailStudioStore.setState({
      campaignContent: {},
      translatedContent: {},
      selectedTemplateId: 't1',
    })
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => useSaveAndTranslate(templates, locations))

    expect(result.current.translateLoading).toBe(false)
    expect(result.current.translateError).toBeNull()
    expect(result.current.translateSuccessCount).toBeNull()
    expect(typeof result.current.onSaveAndTranslate).toBe('function')
  })

  it('sets translateError when subject and body are empty', async () => {
    useEmailStudioStore.setState({ campaignContent: {}, selectedTemplateId: null })

    const { result } = renderHook(() => useSaveAndTranslate(templates, locations))

    await act(async () => {
      await result.current.onSaveAndTranslate()
    })

    expect(result.current.translateError).toBe('Add subject or body on this step, then save.')
    expect(translateDraftToLocations).not.toHaveBeenCalled()
  })

  it('sets translateError when no locations', async () => {
    useEmailStudioStore.setState({ campaignContent: { subject: 'Hi', body: 'Body' } })

    const { result } = renderHook(() => useSaveAndTranslate(templates, []))

    await act(async () => {
      await result.current.onSaveAndTranslate()
    })

    expect(result.current.translateError).toBe('No markets loaded.')
    expect(translateDraftToLocations).not.toHaveBeenCalled()
  })

  it('calls translateDraftToLocations and sets translated content on success', async () => {
    useEmailStudioStore.setState({ campaignContent: { subject: 'Hi', body: 'Body' } })

    const translations = {
      loc1: { subject: 'Translated subject', body: 'Translated body' },
    }
    vi.mocked(translateDraftToLocations).mockResolvedValue(translations)

    const { result } = renderHook(() => useSaveAndTranslate(templates, locations))

    await act(async () => {
      await result.current.onSaveAndTranslate()
    })

    expect(translateDraftToLocations).toHaveBeenCalledWith('Hi', 'Body', locations)
    expect(useEmailStudioStore.getState().translatedContent).toEqual(translations)
    expect(result.current.translateLoading).toBe(false)
    expect(result.current.translateError).toBeNull()
    expect(result.current.translateSuccessCount).toBe(1)
  })

  it('uses template default when campaign content is empty but template has subject/body', async () => {
    useEmailStudioStore.setState({ campaignContent: {} })

    vi.mocked(translateDraftToLocations).mockResolvedValue({})

    const { result } = renderHook(() => useSaveAndTranslate(templates, locations))

    await act(async () => {
      await result.current.onSaveAndTranslate()
    })

    expect(translateDraftToLocations).toHaveBeenCalledWith('Hello', 'Welcome to {storeName}.', locations)
  })

  it('sets translateError when translateDraftToLocations throws', async () => {
    useEmailStudioStore.setState({ campaignContent: { subject: 'Hi', body: 'Body' } })

    vi.mocked(translateDraftToLocations).mockRejectedValue(new Error('API rate limit'))

    const { result } = renderHook(() => useSaveAndTranslate(templates, locations))

    await act(async () => {
      await result.current.onSaveAndTranslate()
    })

    expect(result.current.translateError).toBe('API rate limit')
    expect(result.current.translateLoading).toBe(false)
  })
})
