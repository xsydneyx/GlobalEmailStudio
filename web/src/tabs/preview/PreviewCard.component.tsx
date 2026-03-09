import type { Location } from '../../state/appStore'
import { Card, Chip, Label } from '../../design-system'
import type { PreviewContentByLocale } from './PreviewPage.content'
import {
  Block,
  Body,
  BodyFieldBlock,
  CardHeader,
  CardTitleBlock,
  EmailFieldBlock,
  Meta,
  Store,
  StoreCity,
  Subject,
} from './PreviewPage.style'

export type PreviewCardContent = Pick<
  PreviewContentByLocale,
  'override' | 'hqDefault' | 'subject' | 'body'
>

export interface PreviewCardProps {
  location: Location
  email: { subject: string; body: string }
  content: PreviewCardContent
}

export const PreviewCard = ({ location, email, content }: PreviewCardProps) => {
  const { override, hqDefault, subject, body } = content
  const hasOverrides = Boolean(
    location.overrides?.subject || location.overrides?.body,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitleBlock>
          <Store>
            {location.storeName} <StoreCity>({location.city})</StoreCity>
          </Store>
          <Meta>
            {location.country} · {location.language.toUpperCase()} ·{' '}
            {location.currency}
          </Meta>
        </CardTitleBlock>
        {hasOverrides ? (
          <Chip $tone="warn">{override}</Chip>
        ) : (
          <Chip>{hqDefault}</Chip>
        )}
      </CardHeader>

      <Block>
        <EmailFieldBlock>
          <Label>{subject}</Label>
          <Subject>{email.subject}</Subject>
        </EmailFieldBlock>
        <BodyFieldBlock>
          <Label>{body}</Label>
          <Body>{email.body}</Body>
        </BodyFieldBlock>
      </Block>
    </Card>
  )
}
