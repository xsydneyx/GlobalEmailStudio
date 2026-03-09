const APP_TABS = ['template', 'markets', 'preview'] as const
export type AppTab = (typeof APP_TABS)[number]

export const TAB_TEMPLATE: AppTab = APP_TABS[0]
export const TAB_MARKETS: AppTab = APP_TABS[1]
export const TAB_PREVIEW: AppTab = APP_TABS[2]

export const APP_TAB_IDS = APP_TABS
