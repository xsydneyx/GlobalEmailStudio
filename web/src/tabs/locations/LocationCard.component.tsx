import type { Location } from '../../state/appStore'
import { Card, Checkbox, Input, Label, Textarea } from '../../design-system'
import type { MarketsContentByLocale } from './LocationsPage.content'
import {
  CardTitleBlock,
  CardTop,
  Field,
  FieldBlock,
  Meta,
  Store,
  StoreCity,
  UseLabel,
} from './LocationsPage.style'

/** Content fields used by the card (subset of MarketsContentByLocale). */
export type LocationCardContent = Pick<
  MarketsContentByLocale,
  | 'include'
  | 'subjectOverride'
  | 'bodyOverride'
  | 'placeholderSubject'
  | 'placeholderBody'
>

export interface LocationCardProps {
  location: Location
  selected: boolean
  /** Display value for subject: override ?? translated ?? '' */
  subjectDisplay: string
  /** Display value for body: override ?? translated ?? '' */
  bodyDisplay: string
  content: LocationCardContent
  onToggleSelection: () => void
  onOverridesChange: (overrides: Location['overrides']) => void
}

export const LocationCard = ({
  location: loc,
  selected,
  subjectDisplay,
  bodyDisplay,
  content,
  onToggleSelection,
  onOverridesChange,
}: LocationCardProps) => {
  const {
    include,
    subjectOverride,
    bodyOverride,
    placeholderSubject,
    placeholderBody,
  } = content

  return (
    <Card $selected={selected}>
      <CardTop>
        <CardTitleBlock>
          <Store>
            {loc.storeName} <StoreCity>({loc.city})</StoreCity>
          </Store>
          <Meta>
            {loc.country} · {loc.language.toUpperCase()} · {loc.currency} ·{' '}
            {loc.timezone}
          </Meta>
        </CardTitleBlock>

        <UseLabel>
          <Checkbox
            checked={selected}
            onChange={onToggleSelection}
            aria-label={include}
          />
          {include}
        </UseLabel>
      </CardTop>

      <FieldBlock>
        <Field>
          <Label>{subjectOverride}</Label>
          <Input
            type="text"
            placeholder={placeholderSubject}
            value={subjectDisplay}
            onChange={(e) =>
              onOverridesChange({ subject: e.target.value || undefined })
            }
          />
        </Field>
      </FieldBlock>

      <FieldBlock>
        <Field>
          <Label>{bodyOverride}</Label>
          <Textarea
            rows={4}
            placeholder={placeholderBody}
            value={bodyDisplay}
            onChange={(e) =>
              onOverridesChange({ body: e.target.value || undefined })
            }
          />
        </Field>
      </FieldBlock>
    </Card>
  )
}
