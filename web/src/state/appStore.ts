import { create } from 'zustand'
import { type ThemeId, THEME_DEFAULT } from '../design-system/themes/types'
import {
  type LocaleCode,
  LOCALE_EN,
} from './locale.types'

export type { LocaleCode } from './locale.types'

export type TemplateId = string
export type LocationId = string

export interface EmailTemplate {
  id: TemplateId
  name: string
  /** Optional key for future use (e.g. CMS-driven translations). Not used in resolution. */
  i18nKey?: string
  /** Default subject used for all markets unless overridden per location. */
  subject: string
  /** Default body used for all markets unless overridden per location. */
  body: string
}

export interface Location {
  id: LocationId
  city: string
  storeName: string
  country: string
  language: LocaleCode
  currency: string
  timezone: string
  overrides?: {
    subject?: string
    body?: string
  }
}

/** Campaign-level content in default language; when set, used as source before template default. */
export interface CampaignContent {
  subject?: string
  body?: string
}

/** Per-location translated content from "Save & translate" on the Template step. */
export type TranslatedContent = Record<LocationId, { subject: string; body: string }>

/** UI and selection state only. Async data (templates, locations) lives in the shell and is passed as props. */
interface AppState {
  selectedTemplateId: TemplateId | null
  selectedLocationIds: LocationId[]
  uiLocale: LocaleCode
  campaignContent: CampaignContent
  /** Filled when user clicks Save on Template step; used as default per location on Markets tab. */
  translatedContent: TranslatedContent
  themeId: ThemeId
  setThemeId: (id: ThemeId) => void
  setUiLocale: (locale: LocaleCode) => void
  selectTemplate: (id: TemplateId) => void
  toggleLocationSelection: (id: LocationId) => void
  selectAllLocations: (ids: LocationId[]) => void
  clearLocationSelection: () => void
  setCampaignContent: (content: Partial<CampaignContent>) => void
  setTranslatedContent: (content: TranslatedContent) => void
  /** Set default template and location selections when none are set (one store update). */
  setDefaultSelectionsFromData: (templates: EmailTemplate[], locations: Location[]) => void
}

export const useEmailStudioStore = create<AppState>((set, get) => ({
  selectedTemplateId: null,
  selectedLocationIds: [],
  uiLocale: LOCALE_EN,
  campaignContent: {},
  translatedContent: {},
  themeId: THEME_DEFAULT,
  setThemeId: (id) => set({ themeId: id }),
  setUiLocale: (locale) => set({ uiLocale: locale }),

  selectTemplate: (id) => set({ selectedTemplateId: id }),
  setTranslatedContent: (content) => set({ translatedContent: content }),


  toggleLocationSelection: (id) => {
    const current = get().selectedLocationIds
    if (current.includes(id)) {
      set({ selectedLocationIds: current.filter((x) => x !== id) })
    } else {
      set({ selectedLocationIds: [...current, id] })
    }
  },

  selectAllLocations: (ids) => set({ selectedLocationIds: ids }),
  clearLocationSelection: () => set({ selectedLocationIds: [] }),

  setDefaultSelectionsFromData: (templates, locations) => {
    set((state) => ({
      selectedTemplateId: state.selectedTemplateId ?? templates[0]?.id ?? null,
      selectedLocationIds:
        state.selectedLocationIds.length > 0
          ? state.selectedLocationIds
          : locations.map((loc) => loc.id),
    }))
  },

  setCampaignContent: (content) => {
    set((state) => ({
      campaignContent: { ...state.campaignContent, ...content },
    }))
  },
}))

