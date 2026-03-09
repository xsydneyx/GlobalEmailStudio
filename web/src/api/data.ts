import type { EmailTemplate, Location } from '../state/appStore'
import { apiGet, isApiConfigured } from './client'

export interface SessionData {
  templates: EmailTemplate[]
  locations: Location[]
}

/**
 * Fetch templates and locations from the API (GET /session).
 * Requires VITE_API_URL to be set; otherwise throws.
 */
export const getSession = async (): Promise<SessionData> => {
  if (!isApiConfigured()) {
    throw new Error('API not configured. Set VITE_API_URL and start the server.')
  }
  return apiGet<SessionData>('/session')
}
