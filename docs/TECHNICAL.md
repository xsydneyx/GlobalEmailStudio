# Global Email Studio — Technical Document

This document describes the project’s product function, architecture, and technical solutions. It is intended for engineers and technical reviewers.

**Related documentation**

- **[README](../README.md)** — Project overview, what it does, demos, principles
- **[SETUP.md](./SETUP.md)** — How to run the app locally, env vars, tests, Storybook
- **[REQUIREMENTS.md](./REQUIREMENTS.md)** — Product scope, data model, phased roadmap

**Summary.** Global Email Studio is a React + Node app that implements a three-step campaign authoring flow with per-market localization. Key technical choices:

- **Single session endpoint** for initial data; **Zustand** for selection, draft, and translated content; **hooks** for data loading, translation, and preview/send logic.
- **Resolution** is centralized in `templatesResolver.utils.ts` with a fixed content order and placeholder set; **date** is formatted per location language and timezone.
- **Translation** is optional and client-side (Google Cloud Translation); **send** is simulated (same resolution as preview; future: create SendBatch/SendItems).
- **Testing** focuses on hooks and resolution utilities with mocks; **design system** and **i18n** support theming and multi-language UI.

---

## 1. Project overview

**Global Email Studio** is a B2B campaign email authoring tool. Users design one campaign (subject and body) and localize it per market (store/location). The app demonstrates:

- A three-step authoring flow: choose template → configure markets → preview and send.
- Placeholder resolution so each market sees store-specific copy (e.g. `{storeName}`, `{city}`, `{date}` in local language and timezone).
- Machine translation (Google Cloud Translation) to generate per-market defaults from a single draft.
- A thin API boundary (Node/Express) and a React frontend with clear separation of UI, state, and domain logic.

The codebase is structured for clarity and testability: components render, hooks own behavior, and shared resolution/translation logic lives in utilities and is covered by tests.

---

## 2. Product function

### 2.1 User-facing features

| Feature | Description |
|--------|-------------|
| **Template step** | User selects one campaign template from a list. They see and edit the default subject and body (the “campaign draft”). Placeholders (`{storeName}`, `{city}`, `{date}`, `{country}`) are explained in the UI. **Save & translate** sends the draft to Google Cloud Translation and stores per-location translated subject/body for the Markets step. |
| **Markets step** | One card per location (store). User can include/exclude locations from the send. Each card shows subject and body: location overrides take precedence; if none, translated content from Save & translate (if any) or the campaign draft/template default is used. User can edit overrides per location. |
| **Preview & send** | For each included location, the app shows the final resolved subject and body (placeholders replaced with that location’s data; date in that location’s language and timezone). **Send** is simulated: the app computes the payload per location and logs it (and shows a success message). Future phases would create a `SendBatch` and `SendItem`s for a worker. |
| **UI preferences** | Theme (default / light / dark), UI language (EN, DE, DA), and template default language. No authentication in the current phase. |

### 2.2 Data flow (high level)

1. **Load** — On mount, the app calls `GET /session` once and receives `{ templates, locations }`. Templates and locations are stored in React state (see §4.2); the Zustand store is seeded with default selections (first template, all locations).
2. **Template step** — User edits campaign draft (subject/body) in the store. Optionally they click **Save & translate**: the client calls Google Cloud Translation with the draft and each location’s language, then writes the result into the store as `translatedContent` (keyed by location id).
3. **Markets step** — User toggles which locations are included and can set per-location overrides. Overrides are held in the same in-memory locations list used for the session (see §4.2).
4. **Preview** — For the selected template and included locations, the app runs the **resolution** algorithm (see §4.4) to produce final subject/body per location. The same algorithm is used for the simulated send payload.

### 2.3 Implemented data model (current phase)

- **EmailTemplate** — `id`, `name`, `subject`, `body`, optional `i18nKey`. Subject/body may contain placeholders.
- **Location** — `id`, `city`, `storeName`, `country`, `language`, `currency`, `timezone`, optional `overrides: { subject?, body? }`. Overrides are the per-location edits on the Markets step.
- **Campaign draft** — In-memory only: one `subject` and `body` (the “campaign content”) in the Zustand store. Applies as the default for all locations until a location has its own overrides or translated content.
- **Translated content** — In-memory only: after **Save & translate**, a map `LocationId → { subject, body }` in the store. Used as the default for each location on the Markets step when no override is set.

Resolution order for “which subject/body do we use for this location?” is fixed: **location overrides → translated content for that location → campaign draft → template default**. Then placeholders are replaced using that location’s fields and current date (see §4.4).

---

## 3. System architecture

### 3.1 High-level layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Web (Vite + React)                                              │
│  - EmailStudio shell: tabs, theme, locale, data loading          │
│  - Tabs: Template | Markets | Preview                            │
│  - API client → GET /session                                      │
│  - Google Cloud Translation (client-side, optional)               │
└───────────────────────────────┬─────────────────────────────────┘
                                 │ HTTP (VITE_API_URL)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  Server (Node + Express)                                         │
│  - GET /session  → { templates, locations }                      │
│  - GET /templates, GET /locations, GET /health                    │
│  - Mock seed data (no DB, no auth)                               │
└─────────────────────────────────────────────────────────────────┘
```

- **Single round-trip on load** — The frontend uses `GET /session` only; no separate calls for templates and locations.
- **Translation** — Handled entirely in the browser via the Google Cloud Translation API (API key in `VITE_GOOGLE_TRANSLATE_API_KEY`). The server does not perform or proxy translation.

### 3.2 Repository structure

```
GlobalEmailStudio/
├── docs/
│   ├── REQUIREMENTS.md   # Product scope, data model, phases
│   ├── SETUP.md          # How to run locally, env vars, tests, Storybook
│   └── TECHNICAL.md      # This document
├── server/               # Node API
│   ├── src/
│   │   ├── app.ts        # Express app, CORS, routes (exported for tests)
│   │   ├── index.ts      # Starts server (listen)
│   │   ├── routes/       # GET /templates, /locations, /session
│   │   ├── data/         # Mock templates and locations
│   │   └── types.ts      # Session payload types
│   ├── test/             # API route tests (supertest)
│   └── package.json
└── web/                  # React app
    ├── src/
    │   ├── api/          # client.ts, data.ts (getSession), translateDraft, translateGoogle
    │   ├── design-system/# Themed components and tokens
    │   ├── state/        # Zustand store (appStore), locale types
    │   ├── tabs/         # Template, Locations (Markets), Preview
    │   ├── utils/        # templatesResolver.utils.ts
    │   ├── EmailStudio.tsx, EmailStudio.hooks.ts
    │   ├── EmailStudio.content.ts, i18n.ts
    │   └── main.tsx
    ├── index.html
    └── package.json
```

---

## 4. Technical solutions

### 4.1 State management (Zustand)

All shared, session-scoped state lives in a single Zustand store (`state/appStore.ts`).

**In the store:**

- **Selection:** `selectedTemplateId`, `selectedLocationIds` (which locations are included).
- **Campaign draft:** `campaignContent: { subject?, body? }`.
- **Translated content:** `translatedContent: Record<LocationId, { subject, body }>` (filled by Save & translate).
- **UI:** `uiLocale`, `themeId`, and setters (`setUiLocale`, `setThemeId`, `selectTemplate`, `toggleLocationSelection`, `setCampaignContent`, `setTranslatedContent`, etc.).
- **Bootstrap:** `setDefaultSelectionsFromData(templates, locations)` — sets default template and “all locations selected” when the app has no selection yet.

**Not in the store:**

- **Templates and locations lists** — Fetched via `getSession()` and held in React state inside `useEmailStudioData` (see §4.2). Passed as props into tabs and hooks.
- **Per-location overrides** — Stored in the same in-memory `locations` array that `useEmailStudioData` maintains; `updateLocationOverrides(id, overrides)` merges overrides into that array. The server is not updated (no persistence in this phase).

This keeps the store small and focused on user choices and derived UI state; async data and its updates stay in the data hook.

### 4.2 Data loading and API client

- **Client** (`api/client.ts`) — Reads `VITE_API_URL`; exposes `apiGet<T>(path)` and `apiPost<T>(path, body)`. Non-OK responses throw with a short message. `isApiConfigured()` is true when the base URL is set.
- **Session** (`api/data.ts`) — `getSession()` calls `GET /session` and returns `{ templates, locations }`. Throws if `VITE_API_URL` is not set.
- **Usage** — `useEmailStudioData()` (in `EmailStudio.hooks.ts`):
  - On mount, calls `loadInitialData()` which calls `getSession()`, stores the result in local state, and calls `setDefaultSelectionsFromData(session.templates, session.locations)`.
  - Exposes `templates`, `locations`, `dataLoading`, `dataError`, `loadInitialData`, and `updateLocationOverrides`. Overrides are applied by updating the in-memory `locations` copy (no server call).

The app does not load templates or locations from the API unless `VITE_API_URL` is set; there is no in-memory fallback (the app shows an error).

### 4.3 Translation (Save & translate)

- **Entry point** — User clicks **Save & translate** on the Template step. `useSaveAndTranslate` (in `EmailStudio.hooks.ts`) builds the draft from campaign content and the selected template’s default, then calls `translateDraftToLocations(draftSubject, draftBody, locations)`.
- **API** — `api/translateDraft.ts` delegates to `api/translateGoogle.ts`, which calls the Google Cloud Translation REST API (v2) from the browser. One request per target language (locations are grouped by `language`). Requires `VITE_GOOGLE_TRANSLATE_API_KEY`; if missing, the API throws a clear error.
- **Result** — A `TranslatedContent` map (location id → `{ subject, body }`) is written to the store via `setTranslatedContent`. The Markets step uses this as the default when a location has no overrides. A success count is shown and auto-dismissed after 4 seconds (`useTimedDismiss`).

Validation before calling the API: at least one of draft subject or body must be non-empty, and locations list must be non-empty; otherwise an error message is set and the API is not called.

### 4.4 Template resolution (placeholders and content order)

**Module:** `utils/templatesResolver.utils.ts`

**Purpose:** Given a template, a location, and options (campaign content, translated content, optional date), produce the final `{ subject, body }` for that location with all placeholders replaced.

**Content source order (same for subject and body):**

1. **Location overrides** — If the location has `overrides.subject` / `overrides.body`, use them.
2. **Translated content** — Else if there is translated content for this location id, use it.
3. **Campaign draft or template default** — Else use campaign content if set (non-empty), otherwise the template’s subject/body.

**Placeholders:** The chosen subject and body strings are then passed through a single replace step. Supported placeholders:

- `{storeName}` → `location.storeName`
- `{city}` → `location.city`
- `{country}` → `location.country`
- `{date}` → current date formatted with `Intl.DateTimeFormat(location.language, { year: 'numeric', month: 'long', day: 'numeric', timeZone: location.timezone })`. The date is taken from `options.date` or `new Date()`.

Any `{word}` not in the payload is left as-is (e.g. `{unknown}` remains `{unknown}`). Pattern: `/\{(\w+)\}/g`.

**Usage:** Preview and simulated send both use `resolveTemplate(template, location, { campaignContent, translatedContent })` from `PreviewPage.hooks.ts`, so preview and send payloads are consistent.

### 4.5 UI structure: shell and tabs

- **Shell** (`EmailStudio.tsx`) — Renders header (tagline, title, theme and language dropdowns), tab bar (Template | Markets | Preview), and the active tab. Navigation is **tab state only** (no URL routes or react-router); the tab bar uses `role="tablist"` / `role="tab"` / `role="tabpanel"` for accessibility. It uses `useEmailStudioData()` for templates/locations/loading/error and overrides, and `useSaveAndTranslate(templates, locations)` for the translate handler and translate UI state. An **app-level error boundary** (`AppErrorBoundary`) catches render errors and shows a recovery message instead of a white screen. No direct API or resolution logic; it only wires hooks to presentational components.
- **Tabs:**
  - **Template** — Template list, campaign draft form (subject/body), placeholder help text, and **Save & translate** button. Uses store for `campaignContent`, `selectedTemplateId`, and `setCampaignContent`; display content for the form comes from `TemplatePage.util.ts` (template default merged with campaign draft).
  - **Markets (Locations)** — One card per location with include/exclude and optional subject/body overrides. Uses store for `selectedLocationIds`, `toggleLocationSelection`, `translatedContent`, and the hook’s `updateLocationOverrides`.
  - **Preview** — Uses `usePreviewPage(templates, locations)` to compute `previews` (each item: location + resolved email via `resolveTemplate`). Renders one preview card per included location and a **Send** button that runs the same resolution and logs the payload, then shows a success message (e.g. “Simulated send complete for N markets.”).

Tab-specific logic lives in colocated hooks (`PreviewPage.hooks.ts`, etc.); the shell stays thin.

### 4.6 Design system and theming

- **Location** — `design-system/`: shared components (Button, Card, Input, Select, etc.) and theme tokens.
- **Themes** — Tokens and theme objects for default, light, and dark. The active `themeId` is in the Zustand store; a theme provider (or equivalent) supplies the current theme to styled-components.
- **Storybook** — Used for design-system components so they can be developed and reviewed in isolation (`npm run storybook` in `web/`).

### 4.7 Internationalization (UI and template language)

- **UI strings** — i18next + react-i18next. Content is organized by locale (e.g. `en.main`, `en.templates`, `de.templates`). The active UI locale is `uiLocale` in the store; language switcher calls `setUiLocale`.
- **Template resolution** — The *template* subject/body are in a single default language in the mock data. The *date* in placeholders is formatted in each location’s `language` and `timezone` (see §4.4). Translated content from Save & translate is per-location language.

### 4.8 Testing

- **Runner:** Vitest; `@testing-library/react` for `renderHook` and component tests; jsdom.
- **Scope:**
  - **EmailStudio.hooks.test.ts** — `useEmailStudioData` (session load, error handling, `updateLocationOverrides`), `useTimedDismiss`, `useSaveAndTranslate` (validation, success path, API error, template default when campaign empty). API and translation are mocked.
  - **PreviewPage.hooks.test.ts** — `usePreviewPage` (previews derivation, simulated send payload, disabled state).
  - **TemplatePage.util.test.ts** — Helpers for template/default content and display content for the form.
  - **templatesResolver.utils.test.ts** — `resolveTemplate` (placeholders, date formatting, content order, overrides, translated content, unknown placeholders).
- **Pattern** — Colocated `*.hooks.test.ts` and `*.util.test.ts` next to the modules they test; shared resolution and hooks are tested in isolation with mocks.

---

## 5. Key modules and files

| Area | File(s) | Responsibility |
|------|---------|----------------|
| **Store** | `state/appStore.ts` | Zustand store: selection, campaign draft, translated content, UI locale/theme, all setters and `setDefaultSelectionsFromData`. |
| **Data** | `api/client.ts`, `api/data.ts` | API base URL, `apiGet`/`apiPost`, `getSession()`. |
| **Data hook** | `EmailStudio.hooks.ts` | `useEmailStudioData` (load session, hold templates/locations, `updateLocationOverrides`), `useTimedDismiss`, `useSaveAndTranslate`. |
| **Resolution** | `utils/templatesResolver.utils.ts` | `resolveTemplate(template, location, options)` — content order and placeholder replacement. |
| **Translation** | `api/translateDraft.ts`, `api/translateGoogle.ts` | `translateDraftToLocations` → Google Translation API; one request per language. |
| **Preview** | `tabs/preview/PreviewPage.hooks.ts` | `usePreviewPage`: active template/locations, `resolveTemplate` per location, `handleSend` (simulate send). |
| **Template form** | `tabs/templates/TemplatePage.util.ts` | `getDefaultContentForTemplate`, `getDisplayContent`, `getDisplayContentForSelection` for the campaign draft form. |
| **Server** | `server/src/routes/index.ts`, `server/src/data/*.ts` | GET /session (and /templates, /locations, /health); mock templates and locations. |

---

## 6. Environment and configuration

| Variable | Where | Purpose |
|----------|--------|---------|
| `VITE_API_URL` | web/.env | API base URL (e.g. `http://localhost:3001`). Required; app shows an error when unset. |
| `VITE_GOOGLE_TRANSLATE_API_KEY` | web/.env | Optional. When set, **Save & translate** calls Google Cloud Translation from the client. Restrict the key by HTTP referrer in Google Cloud Console. |
| `PORT` | server | Port for the Node server (default 3001). |

The web app is built with Vite; the server is plain Node + Express. No database or auth in the current phase; all data is in-memory (server mock data and client state).

**Related documentation:** [README](../README.md) · [SETUP.md](./SETUP.md) · [REQUIREMENTS.md](./REQUIREMENTS.md)

