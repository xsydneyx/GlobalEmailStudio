/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { isTranslateConfigured, translateDraftWithGoogle } from './translateGoogle'

const GOOGLE_TRANSLATE_BASE = 'https://translation.googleapis.com/language/translate/v2'

const envKey = 'VITE_GOOGLE_TRANSLATE_API_KEY'
const originalKey = (import.meta.env as Record<string, unknown>)[envKey]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
  ;(import.meta.env as Record<string, unknown>)[envKey] = 'test-key'
})

afterEach(() => {
  vi.unstubAllGlobals()
  ;(import.meta.env as Record<string, unknown>)[envKey] = originalKey
})

describe('isTranslateConfigured', () => {
  it('returns false when API key is not set', () => {
    ;(import.meta.env as Record<string, unknown>)[envKey] = ''
    expect(isTranslateConfigured()).toBe(false)
  })

  it('returns true when API key is set', () => {
    expect(isTranslateConfigured()).toBe(true)
  })
})

describe('translateDraftWithGoogle', () => {
  it('throws when API key is not set', async () => {
    ;(import.meta.env as Record<string, unknown>)[envKey] = ''
    await expect(
      translateDraftWithGoogle({
        subject: 'Hi',
        body: 'Body',
        targets: [{ locationId: 'loc1', language: 'de' }],
      }),
    ).rejects.toThrow('Translation not configured')
  })

  it('throws when subject and body are both empty', async () => {
    await expect(
      translateDraftWithGoogle({
        subject: '',
        body: '   ',
        targets: [{ locationId: 'loc1', language: 'de' }],
      }),
    ).rejects.toThrow('Subject and body cannot both be empty')
  })

  it('throws when targets is empty', async () => {
    await expect(
      translateDraftWithGoogle({
        subject: 'Hi',
        body: 'Body',
        targets: [],
      }),
    ).rejects.toThrow('targets must be a non-empty array')
  })

  it('calls fetch with correct URL and body and returns translated content per location', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            translations: [
              { translatedText: 'Translated subject' },
              { translatedText: 'Translated body' },
            ],
          },
        }),
    } as Response)

    const result = await translateDraftWithGoogle({
      subject: 'Hello',
      body: 'Welcome',
      targets: [
        { locationId: 'loc1', language: 'de' },
        { locationId: 'loc2', language: 'de' },
      ],
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      `${GOOGLE_TRANSLATE_BASE}?key=test-key`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: ['Hello', 'Welcome'],
          target: 'de',
          format: 'text',
        }),
      }),
    )
    expect(result).toEqual({
      loc1: { subject: 'Translated subject', body: 'Translated body' },
      loc2: { subject: 'Translated subject', body: 'Translated body' },
    })
  })

  it('groups targets by language and makes one request per language', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              translations: [{ translatedText: 'DE sub' }, { translatedText: 'DE body' }],
            },
          }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {
              translations: [{ translatedText: 'FR sub' }, { translatedText: 'FR body' }],
            },
          }),
      } as Response)

    const result = await translateDraftWithGoogle({
      subject: 'Hi',
      body: 'Text',
      targets: [
        { locationId: 'a', language: 'de' },
        { locationId: 'b', language: 'de' },
        { locationId: 'c', language: 'fr' },
      ],
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ q: ['Hi', 'Text'], target: 'de', format: 'text' }),
      }),
    )
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ q: ['Hi', 'Text'], target: 'fr', format: 'text' }),
      }),
    )
    expect(result).toEqual({
      a: { subject: 'DE sub', body: 'DE body' },
      b: { subject: 'DE sub', body: 'DE body' },
      c: { subject: 'FR sub', body: 'FR body' },
    })
  })

  it('uses empty string for subject or body when only one is provided', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            translations: [{ translatedText: '.' }, { translatedText: 'Only body' }],
          },
        }),
    } as Response)

    const result = await translateDraftWithGoogle({
      subject: '',
      body: 'Body only',
      targets: [{ locationId: 'loc1', language: 'de' }],
    })

    expect(result.loc1).toEqual({ subject: '', body: 'Only body' })
    expect(JSON.parse(mockFetch.mock.calls[0]![1]!.body as string).q).toEqual(['.', 'Body only'])
  })

  it('throws with API error message when response is not ok', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      text: () =>
        Promise.resolve(
          JSON.stringify({ error: { message: 'API key not valid. Please pass a valid API key.' } }),
        ),
    } as Response)

    await expect(
      translateDraftWithGoogle({
        subject: 'Hi',
        body: 'Body',
        targets: [{ locationId: 'loc1', language: 'de' }],
      }),
    ).rejects.toThrow('API key not valid')
  })

  it('throws with response text when error response is not JSON', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve('Server error'),
    } as Response)

    await expect(
      translateDraftWithGoogle({
        subject: 'Hi',
        body: 'Body',
        targets: [{ locationId: 'loc1', language: 'de' }],
      }),
    ).rejects.toThrow('Server error')
  })
})
