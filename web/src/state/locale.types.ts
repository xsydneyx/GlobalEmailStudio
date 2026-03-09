const LOCALE_CODES = ['en', 'de', 'da'] as const
export type LocaleCode = (typeof LOCALE_CODES)[number]

export const LOCALE_EN: LocaleCode = LOCALE_CODES[0]
export const LOCALE_DE: LocaleCode = LOCALE_CODES[1]
export const LOCALE_DA: LocaleCode = LOCALE_CODES[2]

export const LOCALE_CODES_LIST = LOCALE_CODES
