import type { CampaignContent, EmailTemplate } from '../../state/appStore'

export interface DefaultContent {
  subject: string
  body: string
}

/**
 * Gets the default subject/body for the selected template, or null if not found.
 */
export const getDefaultContentForTemplate = (
  templates: EmailTemplate[],
  selectedTemplateId: string | null,
): DefaultContent | null => {
  if (!selectedTemplateId) return null
  const tpl = templates.find((t) => t.id === selectedTemplateId)
  if (!tpl) return null
  return { subject: tpl.subject, body: tpl.body }
}

/**
 * Resolves the subject and body to display in the campaign template form.
 * Uses campaign-level content when set, otherwise falls back to the template default.
 */
export const getDisplayContent = (
  campaignContent: CampaignContent,
  defaultContent: DefaultContent,
): { subject: string; body: string } => {
  const subject =
    campaignContent.subject !== undefined
      ? campaignContent.subject
      : defaultContent.subject
  const body =
    campaignContent.body !== undefined
      ? campaignContent.body
      : defaultContent.body
  return { subject, body }
}

/**
 * Resolves subject and body for the form: selected template default merged with campaign
 * overrides, or empty strings when no template is selected.
 */
export const getDisplayContentForSelection = (
  templates: EmailTemplate[],
  selectedTemplateId: string | null,
  campaignContent: CampaignContent,
): { subject: string; body: string } => {
  const defaultContent = getDefaultContentForTemplate(templates, selectedTemplateId)
  return defaultContent
    ? getDisplayContent(campaignContent, defaultContent)
    : { subject: '', body: '' }
}
