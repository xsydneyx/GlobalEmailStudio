import type { Location } from '../types.js'

export const locations: Location[] = [
  {
    id: 'berlin-de',
    city: 'Berlin',
    storeName: 'Global Market Mitte',
    country: 'Germany',
    language: 'de',
    currency: 'EUR',
    timezone: 'Europe/Berlin',
    overrides: {
      subject: 'Willkommen bei {storeName} in {city}',
    },
  },
  {
    id: 'copenhagen-dk',
    city: 'Copenhagen',
    storeName: 'Global Market Nørreport',
    country: 'Denmark',
    language: 'da',
    currency: 'DKK',
    timezone: 'Europe/Copenhagen',
  },
  {
    id: 'london-uk',
    city: 'London',
    storeName: 'Global Market Soho',
    country: 'United Kingdom',
    language: 'en',
    currency: 'GBP',
    timezone: 'Europe/London',
  },
  {
    id: 'new-york-us',
    city: 'New York',
    storeName: 'Global Market Manhattan',
    country: 'United States',
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
  },
  {
    id: 'munich-de',
    city: 'Munich',
    storeName: 'Global Market Zentrum',
    country: 'Germany',
    language: 'de',
    currency: 'EUR',
    timezone: 'Europe/Berlin',
  },
]
