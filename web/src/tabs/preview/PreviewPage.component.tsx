import type { EmailTemplate, Location, LocaleCode } from '../../state/appStore'
import { Button, SmallMuted } from '../../design-system'
import { useTranslation } from 'react-i18next'
import type { PreviewContentByLocale } from './PreviewPage.content'
import { getSendButtonText, getSuccessTitleText } from './PreviewPage.content'
import { PreviewCard } from './PreviewCard.component'
import { usePreviewPage } from './PreviewPage.hooks'
import {
  H3,
  HeaderRow,
  HeaderTitleGroup,
  Placeholder,
  PreviewGrid,
  Sub,
  Success,
  SuccessHint,
  SuccessTitle,
  Wrapper,
} from './PreviewPage.style'

export interface PreviewPageProps {
  uiLocale: LocaleCode
  templates: EmailTemplate[]
  locations: Location[]
}

export const PreviewPage = ({ uiLocale, templates, locations }: PreviewPageProps) => {
  const { t } = useTranslation()
  const content = t(`${uiLocale}.preview`, { returnObjects: true }) as unknown as PreviewContentByLocale
  const { heading, subtitle, noTemplate, noMarkets, successHint } = content

  const {
    activeTemplate,
    activeLocations,
    previews,
    handleSend,
    sent,
    disabled,
  } = usePreviewPage(templates, locations)

  return (
    <Wrapper>
      {sent && sent.length > 0 && (
        <Success>
          <SuccessTitle>{getSuccessTitleText(content, sent.length)}</SuccessTitle>
          <SuccessHint>{successHint}</SuccessHint>
        </Success>
      )}
      <HeaderRow>
        <HeaderTitleGroup>
          <H3>{heading}</H3>
          <Sub>{subtitle}</Sub>
        </HeaderTitleGroup>
        <Button type="button" onClick={handleSend} disabled={disabled} $variant="primary">
          {getSendButtonText(content, activeLocations.length || 0)}
        </Button>
      </HeaderRow>

      {!activeTemplate ? (
        <Placeholder>
          <SmallMuted>{noTemplate}</SmallMuted>
        </Placeholder>
      ) : activeLocations.length === 0 ? (
        <Placeholder>
          <SmallMuted>{noMarkets}</SmallMuted>
        </Placeholder>
      ) : (
        <PreviewGrid>
          {previews.map(({ location, email }) => (
            <PreviewCard
              key={location.id}
              location={location}
              email={email}
              content={content}
            />
          ))}
        </PreviewGrid>
      )}
    </Wrapper>
  )
}
