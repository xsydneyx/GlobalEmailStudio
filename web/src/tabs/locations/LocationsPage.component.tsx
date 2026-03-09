import { useEmailStudioStore } from '../../state/appStore'
import type { Location, LocationId, LocaleCode } from '../../state/appStore'
import { SmallMuted } from '../../design-system'
import { useTranslation } from 'react-i18next'
import type { MarketsContentByLocale } from './LocationsPage.content'
import { getSelectedText } from './LocationsPage.content'
import { LocationCard } from './LocationCard.component'
import {
  Badge,
  Grid,
  H3,
  HeaderRow,
  HeaderTitleGroup,
  Sub,
  Wrapper,
} from './LocationsPage.style'

export interface LocationsPageProps {
  uiLocale: LocaleCode
  locations: Location[]
  updateLocationOverrides: (id: LocationId, overrides: Location['overrides']) => void
}

export const LocationsPage = ({
  uiLocale,
  locations,
  updateLocationOverrides,
}: LocationsPageProps) => {
  const { selectedLocationIds, toggleLocationSelection, translatedContent } =
    useEmailStudioStore()
  const { t } = useTranslation()
  const content = t(`${uiLocale}.locations`, { returnObjects: true }) as unknown as MarketsContentByLocale
  const { heading, subtitle, empty } = content

  if (locations.length === 0) {
    return <SmallMuted>{empty}</SmallMuted>
  }

  return (
    <Wrapper>
      <HeaderRow>
        <HeaderTitleGroup>
          <H3>{heading}</H3>
          <Sub>{subtitle}</Sub>
        </HeaderTitleGroup>
        <Badge>
          {getSelectedText(content, selectedLocationIds.length, locations.length)}
        </Badge>
      </HeaderRow>

      <Grid>
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc}
            selected={selectedLocationIds.includes(loc.id)}
            subjectDisplay={
              loc.overrides?.subject ?? translatedContent[loc.id]?.subject ?? ''
            }
            bodyDisplay={
              loc.overrides?.body ?? translatedContent[loc.id]?.body ?? ''
            }
            content={content}
            onToggleSelection={() => toggleLocationSelection(loc.id)}
            onOverridesChange={(overrides) => updateLocationOverrides(loc.id, overrides)}
          />
        ))}
      </Grid>
    </Wrapper>
  )
}
