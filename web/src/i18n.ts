import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { appContent } from './EmailStudio.content'
import { templatesContent } from './tabs/templates/TemplatePage.content'
import { locationsContent } from './tabs/locations/LocationsPage.content'
import { previewContent } from './tabs/preview/PreviewPage.content'
import type { LocaleCode } from './state/locale.types'

/** Keys like "en.main", "de.templates" so t(`${uiLocale}.main`) returns that locale's object */
const translation = {
  'en.main': appContent.en.main,
  'de.main': appContent.de.main,
  'da.main': appContent.da.main,
  'en.templates': templatesContent.en,
  'de.templates': templatesContent.de,
  'da.templates': templatesContent.da,
  'en.locations': locationsContent.en,
  'de.locations': locationsContent.de,
  'da.locations': locationsContent.da,
  'en.preview': previewContent.en,
  'de.preview': previewContent.de,
  'da.preview': previewContent.da,
} as const

const resources: Record<LocaleCode, { translation: typeof translation }> = {
  en: { translation },
  de: { translation },
  da: { translation },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  returnObjects: true,
  interpolation: { escapeValue: false },
})

export default i18n
