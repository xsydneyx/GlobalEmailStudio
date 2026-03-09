/**
 * API client for Global Email Studio backend.
 * Base URL from VITE_API_URL; required for the app to load data (getSession throws when unset).
 */

const getBaseUrl = (): string => {
  const url = (import.meta.env.VITE_API_URL as string | undefined)?.trim()
  return url ?? ''
}

/**
 * GET a JSON endpoint. Throws on non-OK with a short message.
 */
export const apiGet = async <T>(path: string): Promise<T> => {
  const base = getBaseUrl()
  if (!base) {
    throw new Error('VITE_API_URL is not set')
  }
  const url = path.startsWith('http') ? path : `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    const text = await res.text()
    if (text.trimStart().startsWith('<!') || text.trimStart().startsWith('<')) {
      throw new Error(
        'Request reached a server that doesn\'t have this endpoint. Ensure the API server is running (e.g. npm run dev in server/) and VITE_API_URL in web/.env is set to http://localhost:3001.',
      )
    }
    let message: string
    try {
      const json = JSON.parse(text) as { message?: string; error?: string }
      message = json.message ?? json.error ?? res.statusText
    } catch {
      message = text || res.statusText
    }
    throw new Error(message || `Request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

/**
 * POST JSON to an endpoint. Throws on non-OK with a short message.
 */
export const apiPost = async <T>(path: string, body: unknown): Promise<T> => {
  const base = getBaseUrl()
  if (!base) {
    throw new Error('VITE_API_URL is not set')
  }
  const url = path.startsWith('http') ? path : `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    if (text.trimStart().startsWith('<!') || text.trimStart().startsWith('<')) {
      throw new Error(
        'Request reached a server that doesn\'t have this endpoint. Ensure the API server is running (e.g. npm run dev in server/) and VITE_API_URL in web/.env is set to http://localhost:3001.',
      )
    }
    let message: string
    try {
      const json = JSON.parse(text) as { message?: string; error?: string }
      message = json.message ?? json.error ?? res.statusText
    } catch {
      message = text || res.statusText
    }
    throw new Error(message || `Request failed (${res.status})`)
  }
  return res.json() as Promise<T>
}

/** True when the app is configured to use the real API. */
export const isApiConfigured = (): boolean => getBaseUrl().length > 0
