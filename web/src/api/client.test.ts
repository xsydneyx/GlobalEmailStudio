/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiGet, apiPost, isApiConfigured } from './client'

const apiUrlKey = 'VITE_API_URL'
const originalUrl = (import.meta.env as Record<string, unknown>)[apiUrlKey]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
  ;(import.meta.env as Record<string, unknown>)[apiUrlKey] = 'http://localhost:3001'
})

afterEach(() => {
  vi.unstubAllGlobals()
  ;(import.meta.env as Record<string, unknown>)[apiUrlKey] = originalUrl
})

describe('isApiConfigured', () => {
  it('returns false when VITE_API_URL is not set', () => {
    ;(import.meta.env as Record<string, unknown>)[apiUrlKey] = ''
    expect(isApiConfigured()).toBe(false)
  })

  it('returns true when VITE_API_URL is set', () => {
    expect(isApiConfigured()).toBe(true)
  })
})

describe('apiGet', () => {
  it('throws when VITE_API_URL is not set', async () => {
    ;(import.meta.env as Record<string, unknown>)[apiUrlKey] = ''
    await expect(apiGet('/session')).rejects.toThrow('VITE_API_URL is not set')
  })

  it('builds URL from base and path and returns JSON', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ templates: [], locations: [] }),
    } as Response)

    const result = await apiGet<{ templates: unknown[] }>('/session')

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/session',
      expect.objectContaining({
        method: 'GET',
        headers: { Accept: 'application/json' },
      }),
    )
    expect(result).toEqual({ templates: [], locations: [] })
  })

  it('normalizes base URL without trailing slash', async () => {
    ;(import.meta.env as Record<string, unknown>)[apiUrlKey] = 'http://localhost:3001/'
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as Response)

    await apiGet('/session')

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/session', expect.any(Object))
  })

  it('throws with message when response is not ok and body is JSON', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve(JSON.stringify({ message: 'Database error' })),
    } as Response)

    await expect(apiGet('/session')).rejects.toThrow('Database error')
  })

  it('throws with generic message when response is HTML (e.g. 404 page)', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: () => Promise.resolve('<!DOCTYPE html><html>...</html>'),
    } as Response)

    await expect(apiGet('/session')).rejects.toThrow(
      "Request reached a server that doesn't have this endpoint",
    )
  })
})

describe('apiPost', () => {
  it('throws when VITE_API_URL is not set', async () => {
    ;(import.meta.env as Record<string, unknown>)[apiUrlKey] = ''
    await expect(apiPost('/send', {})).rejects.toThrow('VITE_API_URL is not set')
  })

  it('sends POST with JSON body and correct headers', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: '123' }),
    } as Response)

    const result = await apiPost<{ id: string }>('/send', { templateId: 't1', locationIds: ['l1'] })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/send',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ templateId: 't1', locationIds: ['l1'] }),
      }),
    )
    expect(result).toEqual({ id: '123' })
  })

  it('throws with error message when response is not ok', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      text: () => Promise.resolve(JSON.stringify({ error: 'Invalid payload' })),
    } as Response)

    await expect(apiPost('/send', {})).rejects.toThrow('Invalid payload')
  })
})
