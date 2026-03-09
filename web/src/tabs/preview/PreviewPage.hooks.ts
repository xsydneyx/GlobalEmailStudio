import { useCallback, useMemo, useState } from 'react'
import { useEmailStudioStore } from '../../state/appStore'
import type { EmailTemplate, Location } from '../../state/appStore'
import { resolveTemplate } from '../../utils/templatesResolver.utils'

export interface ResolveOptions {
  campaignContent: { subject?: string; body?: string }
}

export interface PreviewItem {
  location: Location
  email: { subject: string; body: string }
}

export interface SentEmail {
  locationId: string
  subject: string
  body: string
}

export const usePreviewPage = (
  templates: EmailTemplate[],
  locations: Location[],
) => {
  const { campaignContent, translatedContent, selectedTemplateId, selectedLocationIds } =
    useEmailStudioStore()
  const [sent, setSent] = useState<SentEmail[] | null>(null)

  const activeTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId) ?? null,
    [templates, selectedTemplateId],
  )
  const activeLocations = useMemo(
    () => locations.filter((l) => selectedLocationIds.includes(l.id)),
    [locations, selectedLocationIds],
  )

  const resolveOptions = useMemo(
    () => ({ campaignContent, translatedContent }),
    [campaignContent, translatedContent],
  )

  const previews = useMemo<PreviewItem[]>(() => {
    if (!activeTemplate) return []
    return activeLocations.map((loc) => ({
      location: loc,
      email: resolveTemplate(activeTemplate, loc, resolveOptions),
    }))
  }, [activeTemplate, activeLocations, resolveOptions])

  const handleSend = useCallback(() => {
    if (!activeTemplate || activeLocations.length === 0) return

    const payload: SentEmail[] = activeLocations.map((loc) => {
      const email = resolveTemplate(activeTemplate, loc, resolveOptions)
      return {
        locationId: loc.id,
        subject: email.subject,
        body: email.body,
      }
    })

    // Simulate: in a real system this would POST to an API
    // eslint-disable-next-line no-console
    console.log('Simulated geo-targeted send', {
      templateId: activeTemplate.id,
      count: payload.length,
      emails: payload,
    })
    setSent(payload)
  }, [activeTemplate, activeLocations, resolveOptions])

  const disabled = !activeTemplate || activeLocations.length === 0

  return {
    activeTemplate,
    activeLocations,
    previews,
    handleSend,
    sent,
    disabled,
  }
}
