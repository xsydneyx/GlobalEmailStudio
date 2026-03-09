/**
 * Direct client calls to Google Cloud Translation - Basic (v2) REST API.
 * Extends the data layer with a third-party service; API key is used in the
 * browser (restrict by HTTP referrer in Google Cloud Console for safety).
 *
 * @see https://cloud.google.com/translate/docs/reference/rest/v2/translate
 * @see https://cloud.google.com/translate/docs/basic/translating-text
 */

const GOOGLE_TRANSLATE_BASE = 'https://translation.googleapis.com/language/translate/v2'

const getApiKey = (): string => {
  const key = (import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY as string | undefined)?.trim()
  return key ?? ''
}

export const isTranslateConfigured = (): boolean => getApiKey().length > 0

interface TranslateInput {
  subject: string
  body: string
  /** List of { locationId, language }; we group by language and call Google once per language. */
  targets: Array<{ locationId: string; language: string }>
}

export type TranslatedContent = Record<string, { subject: string; body: string }>

/**
 * Translate draft subject and body to each target language by calling
 * Google Translation API v2 directly from the client (one request per language).
 */
export const translateDraftWithGoogle = async (input: TranslateInput): Promise<TranslatedContent> => {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error(
      'Translation not configured. Set VITE_GOOGLE_TRANSLATE_API_KEY in web/.env and restrict the key by HTTP referrer in Google Cloud Console.',
    )
  }

  const { subject, body, targets } = input
  const sub = String(subject ?? '').trim()
  const b = String(body ?? '').trim()

  if (!sub && !b) {
    throw new Error('Subject and body cannot both be empty.')
  }

  if (!Array.isArray(targets) || targets.length === 0) {
    throw new Error('targets must be a non-empty array of { locationId, language }.')
  }

  const results: TranslatedContent = {}

  // Group by language so we do one translate call per language
  const byLang = new Map<string, string[]>()
  for (const t of targets) {
    const id = String(t.locationId)
    const lang = String(t.language || 'en').toLowerCase()
    if (!byLang.has(lang)) byLang.set(lang, [])
    byLang.get(lang)!.push(id)
  }

  const textsToTranslate = [sub || '.', b || '.']
  const hasSubject = sub.length > 0
  const hasBody = b.length > 0

  for (const [lang, locationIds] of byLang) {
    try {
      const url = `${GOOGLE_TRANSLATE_BASE}?key=${encodeURIComponent(apiKey)}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: textsToTranslate,
          target: lang,
          format: 'text',
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        let message: string
        try {
          const json = JSON.parse(err) as { error?: { message?: string } }
          message = json.error?.message ?? err
        } catch {
          message = err || response.statusText
        }
        throw new Error(message || `Translation API error (${response.status})`)
      }

      const data = (await response.json()) as {
        data?: { translations?: Array<{ translatedText?: string }> }
      }
      const translations = data.data?.translations ?? []
      const translatedSubject = translations[0]?.translatedText ?? sub
      const translatedBody = translations[1]?.translatedText ?? b

      const finalSubject = hasSubject ? translatedSubject : ''
      const finalBody = hasBody ? translatedBody : ''

      for (const id of locationIds) {
        results[id] = { subject: finalSubject, body: finalBody }
      }
    } catch (e) {
      for (const id of locationIds) {
        results[id] = { subject: sub, body: b }
      }
      throw e
    }
  }

  return results
}
