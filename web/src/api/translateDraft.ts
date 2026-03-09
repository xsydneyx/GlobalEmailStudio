import type { Location } from '../state/appStore'
import type { TranslatedContent } from '../state/appStore'
import { translateDraftWithGoogle } from './translateGoogle'

/**
 * Translate draft subject and body to each location's language by calling
 * Google Cloud Translation API directly from the client (data layer → third-party service).
 * Returns per-location translated content for the Markets tab.
 */
export const translateDraftToLocations = async (
  subject: string,
  body: string,
  locations: Location[],
): Promise<TranslatedContent> => {
  const targets = locations.map((loc) => ({
    locationId: loc.id,
    language: loc.language,
  }))
  return translateDraftWithGoogle({
    subject: subject.trim(),
    body: body.trim(),
    targets,
  })
}
