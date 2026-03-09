import type { EmailTemplate } from '../types.js'

export const templates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome to your local store',
    i18nKey: 'email.welcome',
    subject: 'Welcome to {storeName} in {city}',
    body: `Hi {storeName} customer in {city},

We are excited to welcome you to our local community. Today is {date}, a great day to discover your new store.

Best,
Global Retail HQ`,
  },
  {
    id: 'sale',
    name: 'Weekend sale announcement',
    i18nKey: 'email.sale',
    subject: 'This weekend at {storeName}, {city}',
    body: `Hello from {storeName} in {city},

We are running a special weekend event starting on {date}. Visit your local store for tailored offers.

Cheers,
Global Retail HQ`,
  },
  {
    id: 'holiday',
    name: 'Holiday opening hours',
    i18nKey: 'email.holiday',
    subject: 'Holiday hours for {storeName} ({city})',
    body: `Dear customer in {city},

Our holiday opening hours for {storeName} have been adjusted as of {date}. Check our website for your local schedule.

Warm wishes,
Global Retail HQ`,
  },
]
