import { useState } from 'react'
import { TemplatePage, LocationsPage, PreviewPage } from './tabs'
import { useEmailStudioStore } from './state/appStore'
import { useEmailStudioData, useSaveAndTranslate } from './EmailStudio.hooks'
import {
  Container,
  ControlsRow,
  Header,
  Main,
  Select,
  Subtitle,
  Tab,
  TabBar,
  TabPanel,
  TabStepArrow,
  Tagline,
  Title,
  Button,
  SmallMuted,
  SmallSubtle,
  InlineMuted,
  Stack,
  THEME_DEFAULT,
  THEME_LIGHT,
  THEME_DARK,
} from './design-system'
import type { ThemeId } from './design-system'
import { LOCALE_EN, LOCALE_DE, LOCALE_DA } from './state/locale.types'
import type { AppContentByLocale } from './EmailStudio.content'
import type { LocaleCode } from './state/appStore'
import { useTranslation } from 'react-i18next'
import {
  type AppTab,
  TAB_TEMPLATE,
  TAB_MARKETS,
  TAB_PREVIEW,
} from './tabs'

export const EmailStudio = () => {
  const { uiLocale, setUiLocale, themeId, setThemeId } = useEmailStudioStore()
  const [activeTab, setActiveTab] = useState<AppTab>(TAB_TEMPLATE)

  const {
    dataLoading,
    dataError,
    templates,
    locations,
    loadInitialData,
    updateLocationOverrides,
  } = useEmailStudioData()

  const {
    onSaveAndTranslate,
    translateLoading,
    translateError,
    translateSuccessCount,
  } = useSaveAndTranslate(templates, locations)

  const { t } = useTranslation()
  const main = t(`${uiLocale}.main`, { returnObjects: true }) as AppContentByLocale['main']
  const { tagline, title, subtitle, theme, themeDefault, themeLight, themeDark, language, panels, loading, loadError } = main

  return (
    <Container>
      <Header>
        <div>
          <Tagline>{tagline}</Tagline>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
        <ControlsRow>
          <InlineMuted>{theme}</InlineMuted>
          <Select
            value={themeId}
            onChange={(e) => setThemeId(e.target.value as ThemeId)}
            aria-label={theme}
          >
            <option value={THEME_DEFAULT}>{themeDefault}</option>
            <option value={THEME_LIGHT}>{themeLight}</option>
            <option value={THEME_DARK}>{themeDark}</option>
          </Select>
          <InlineMuted>{language}</InlineMuted>
          <Select
            value={uiLocale}
            onChange={(e) => setUiLocale(e.target.value as LocaleCode)}
            aria-label={language}
          >
            <option value={LOCALE_EN}>EN</option>
            <option value={LOCALE_DE}>DE</option>
            <option value={LOCALE_DA}>DA</option>
          </Select>
        </ControlsRow>
      </Header>

      {dataLoading ? (
        <Main>
          <SmallMuted>{loading}</SmallMuted>
        </Main>
      ) : dataError ? (
        <Main>
          <Stack>
            <SmallSubtle>{loadError}</SmallSubtle>
            <Button type="button" onClick={() => loadInitialData()}>
              Retry
            </Button>
          </Stack>
        </Main>
      ) : (
        <>
          <TabBar role="tablist" aria-label={panels.template + ', ' + panels.markets + ', ' + panels.preview}>
            <Tab
              id="tab-template"
              type="button"
              role="tab"
              aria-selected={activeTab === TAB_TEMPLATE}
              aria-controls="tabpanel-main"
              $active={activeTab === TAB_TEMPLATE}
              onClick={() => setActiveTab(TAB_TEMPLATE)}
            >
              {panels.template}
            </Tab>
            <TabStepArrow aria-hidden>›</TabStepArrow>
            <Tab
              id="tab-markets"
              type="button"
              role="tab"
              aria-selected={activeTab === TAB_MARKETS}
              aria-controls="tabpanel-main"
              $active={activeTab === TAB_MARKETS}
              onClick={() => setActiveTab(TAB_MARKETS)}
            >
              {panels.markets}
            </Tab>
            <TabStepArrow aria-hidden>›</TabStepArrow>
            <Tab
              id="tab-preview"
              type="button"
              role="tab"
              aria-selected={activeTab === TAB_PREVIEW}
              aria-controls="tabpanel-main"
              $active={activeTab === TAB_PREVIEW}
              onClick={() => setActiveTab(TAB_PREVIEW)}
            >
              {panels.preview}
            </Tab>
          </TabBar>

          <Main>
            <TabPanel id="tabpanel-main" role="tabpanel" aria-labelledby={activeTab === TAB_TEMPLATE ? 'tab-template' : activeTab === TAB_MARKETS ? 'tab-markets' : 'tab-preview'}>
              {activeTab === TAB_TEMPLATE && (
                <TemplatePage
                  uiLocale={uiLocale}
                  templates={templates}
                  onSaveAndTranslate={onSaveAndTranslate}
                  isSaving={translateLoading}
                  saveError={translateError}
                  saveSuccessCount={translateSuccessCount}
                />
              )}
              {activeTab === TAB_MARKETS && (
                <LocationsPage
                  uiLocale={uiLocale}
                  locations={locations}
                  updateLocationOverrides={updateLocationOverrides}
                />
              )}
              {activeTab === TAB_PREVIEW && (
                <PreviewPage uiLocale={uiLocale} templates={templates} locations={locations} />
              )}
            </TabPanel>
          </Main>
        </>
      )}
    </Container>
  )
}

export default EmailStudio
