import { useCallback, useEffect, useState } from 'react'
import { getSession, type SessionData } from './api/data'
import { translateDraftToLocations } from './api/translateDraft'
import { useEmailStudioStore } from './state/appStore'
import type { EmailTemplate, Location, LocationId } from './state/appStore'

/**
 * Clears the value after delayMs when it becomes non-null. Cleans up timeout on unmount or when value changes.
 */
export const useTimedDismiss = <T>(
  value: T | null,
  setValue: (v: T | null) => void,
  delayMs: number,
): void => {
  useEffect(() => {
    if (value === null) return
    const id = window.setTimeout(() => setValue(null), delayMs)
    return () => window.clearTimeout(id)
  }, [value, setValue, delayMs])
}

export const useEmailStudioData = () => {
  const [data, setData] = useState<SessionData | null>(null)
  const [dataLoading, setDataLoading] = useState(false)
  const [dataError, setDataError] = useState<string | null>(null)

  const templates = data?.templates ?? []
  const locations = data?.locations ?? []

  const loadInitialData = useCallback(async () => {
    setDataLoading(true)
    setDataError(null)
    try {
      const session = await getSession()
      setData(session)
      useEmailStudioStore.getState().setDefaultSelectionsFromData(
        session.templates,
        session.locations,
      )
    } catch (err) {
      setDataError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setDataLoading(false)
    }
  }, [])

  const updateLocationOverrides = useCallback(
    (id: LocationId, overrides: Location['overrides']) => {
      setData((prev) =>
        prev
          ? {
              ...prev,
              locations: prev.locations.map((loc) =>
                loc.id === id ? { ...loc, overrides: { ...loc.overrides, ...overrides } } : loc,
              ),
            }
          : null,
      )
    },
    [],
  )

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  return {
    data,
    dataLoading,
    dataError,
    templates,
    locations,
    loadInitialData,
    updateLocationOverrides,
  }
}

export const useSaveAndTranslate = (templates: EmailTemplate[], locations: Location[]) => {
  const { campaignContent, setTranslatedContent } = useEmailStudioStore()
  const [translateLoading, setTranslateLoading] = useState(false)
  const [translateError, setTranslateError] = useState<string | null>(null)
  const [translateSuccessCount, setTranslateSuccessCount] = useState<number | null>(null)
  useTimedDismiss(translateSuccessCount, setTranslateSuccessCount, 4000)

  const onSaveAndTranslate = useCallback(async () => {
    const subject = campaignContent.subject?.trim() ?? ''
    const body = campaignContent.body?.trim() ?? ''
    const selectedTemplateId = useEmailStudioStore.getState().selectedTemplateId
    const template = templates.find((t) => t.id === selectedTemplateId)
    const draftSubject = (subject || template?.subject) ?? ''
    const draftBody = (body || template?.body) ?? ''
    if (!draftSubject && !draftBody) {
      setTranslateError('Add subject or body on this step, then save.')
      return
    }
    if (locations.length === 0) {
      setTranslateError('No markets loaded.')
      return
    }
    setTranslateError(null)
    setTranslateSuccessCount(null)
    setTranslateLoading(true)
    try {
      const translations = await translateDraftToLocations(draftSubject, draftBody, locations)
      setTranslatedContent(translations)
      setTranslateSuccessCount(locations.length)
    } catch (err) {
      setTranslateError(err instanceof Error ? err.message : 'Translation failed.')
    } finally {
      setTranslateLoading(false)
    }
  }, [campaignContent.subject, campaignContent.body, templates, locations, setTranslatedContent])

  return {
    onSaveAndTranslate,
    translateLoading,
    translateError,
    translateSuccessCount,
  }
}
