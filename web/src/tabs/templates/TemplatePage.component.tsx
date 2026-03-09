import { useTranslation } from 'react-i18next'
import { useEmailStudioStore } from '../../state/appStore'
import type { EmailTemplate, LocaleCode } from '../../state/appStore'
import { Button, Input, Label, Textarea } from '../../design-system'
import type { TemplatesContentByLocale } from './TemplatePage.content'
import { getCountText } from './TemplatePage.content'
import { getDisplayContentForSelection } from './TemplatePage.util'
import {
  Block,
  Cell,
  Count,
  DetailsCard,
  H3,
  List,
  ListItem,
  Muted,
  Row,
  SaveSuccessMessage,
  Section,
  TemplateButton,
  TemplateId,
  TemplateName,
  TwoCol,
} from './TemplatePage.style'

export interface TemplatePageProps {
  uiLocale: LocaleCode
  templates: EmailTemplate[]
  onSaveAndTranslate: () => Promise<void>
  isSaving: boolean
  saveError: string | null
  /** Number of markets translated on last success; show success message when set. */
  saveSuccessCount: number | null
}

export const TemplatePage = ({
  uiLocale,
  templates,
  onSaveAndTranslate,
  isSaving,
  saveError,
  saveSuccessCount,
}: TemplatePageProps) => {
  const { selectedTemplateId, selectTemplate, campaignContent, setCampaignContent } =
    useEmailStudioStore()
  const { t } = useTranslation()
  const content = t(`${uiLocale}.templates`, { returnObjects: true }) as unknown as TemplatesContentByLocale
  const { heading, detailsTitle, noSelection, subjectBase, bodyBase, placeholderHelp, draftNote, saveButton, saveButtonSaving, saveSuccess } = content
  const { subject: subjectValue, body: bodyValue } = getDisplayContentForSelection(
    templates,
    selectedTemplateId,
    campaignContent,
  )

  return (
    <Section>
      <Block>
        <Row>
          <H3>{heading}</H3>
          <Count>{getCountText(content, templates.length)}</Count>
        </Row>
        <List>
          {templates.map((tpl) => (
            <ListItem key={tpl.id}>
              <TemplateButton
                type="button"
                onClick={() => selectTemplate(tpl.id)}
                $active={tpl.id === selectedTemplateId}
              >
                <TemplateId>{tpl.id}</TemplateId>
                <TemplateName>{tpl.name}</TemplateName>
              </TemplateButton>
            </ListItem>
          ))}
        </List>
      </Block>

      <DetailsCard>
        <Label>{detailsTitle}</Label>
        {draftNote && <Muted>{draftNote}</Muted>}
        {templates.length === 0 || !selectedTemplateId ? (
          <Muted>{noSelection}</Muted>
        ) : (
          <Section>
            <TwoCol>
              <Cell>
                <Label>{subjectBase}</Label>
                <Input
                  type="text"
                  value={subjectValue}
                  onChange={(e) =>
                    setCampaignContent({
                      subject: e.target.value || undefined,
                    })
                  }
                  aria-label={subjectBase}
                />
              </Cell>
              <Cell>
                <Label>{bodyBase}</Label>
                <Textarea
                  rows={8}
                  value={bodyValue}
                  onChange={(e) =>
                    setCampaignContent({
                      body: e.target.value || undefined,
                    })
                  }
                  aria-label={bodyBase}
                />
              </Cell>
            </TwoCol>
            <Muted>{placeholderHelp}</Muted>
            <Block>
              <Button
                type="button"
                onClick={onSaveAndTranslate}
                disabled={isSaving}
                aria-label={saveButton}
              >
                {isSaving ? saveButtonSaving : saveButton}
              </Button>
              {saveError && <Muted>{saveError}</Muted>}
              {saveSuccessCount !== null && (
                <SaveSuccessMessage role="status">
                  {saveSuccess.replace('{{count}}', String(saveSuccessCount))}
                </SaveSuccessMessage>
              )}
            </Block>
          </Section>
        )}
      </DetailsCard>
    </Section>
  )
}
