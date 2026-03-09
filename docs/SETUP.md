# Setup — Global Email Studio

This guide gets the app running locally. For product overview and demos, see the [README](../README.md). For architecture and technical detail, see [TECHNICAL.md](./TECHNICAL.md).

---

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (or yarn/pnpm)

---

## Quick start

There is no root-level `package.json`; install and run from **server** and **web** separately.

1. **Start the API** (terminal 1):
   ```bash
   cd server
   npm install
   npm run dev
   ```
   Server runs at http://localhost:3001.

2. **Start the web app** (terminal 2):
   ```bash
   cd web
   cp .env.example .env
   # Edit .env: set VITE_API_URL=http://localhost:3001
   npm install
   npm run dev
   ```
   App runs at http://localhost:5173 (or the next free port Vite shows).

3. Open the app in your browser. Templates and locations load from the API. If `VITE_API_URL` is missing or wrong, the app will show an error.

---

## Environment variables

| Variable | Where | Required | Purpose |
|----------|--------|----------|---------|
| `VITE_API_URL` | web/.env | **Yes** | API base URL (e.g. `http://localhost:3001`). App will not load data without it. |
| `VITE_GOOGLE_TRANSLATE_API_KEY` | web/.env | No | Enables **Save & translate** on the Template step. Client calls [Google Cloud Translation API](https://cloud.google.com/translate/docs) directly. Create a key in [Google Cloud Console](https://console.cloud.google.com/apis/credentials), enable Cloud Translation API, and restrict the key by **HTTP referrer** (e.g. `http://localhost:5173/*`). |
| `PORT` | server | No | Server port (default `3001`). Set in server/.env if needed. |

Copy `web/.env.example` to `web/.env` and set at least `VITE_API_URL`. Optional: create `server/.env` from `server/.env.example` to override port.

---

## Optional: Storybook

To run the design-system component library in isolation:

```bash
cd web
npm run storybook
```

Opens at http://localhost:6006 (or the port Storybook reports). Useful for reviewing shared UI components without running the full app.

---

## Tests

**Web** (Vitest):

```bash
cd web
npm run test
```

Runs all tests once. For watch mode: `npm run test:watch`.

| Test file | Covers |
|-----------|--------|
| **api/client.test.ts** | apiGet/apiPost URL building, isApiConfigured, error handling (non-OK, HTML response) |
| **api/translateGoogle.test.ts** | isTranslateConfigured, translateDraftWithGoogle validation, fetch payload, grouping by language, API errors |
| **EmailStudio.hooks.test.ts** | Session load, error handling, location overrides, timed dismiss, save & translate |
| **PreviewPage.hooks.test.ts** | Previews derivation, simulate send, disabled state |
| **TemplatePage.util.test.ts** | Template/default content and display helpers |
| **templatesResolver.utils.test.ts** | Placeholder resolution, content order, date formatting |

**Server** (Node test runner + supertest):

```bash
cd server
npm install
npm run test
```

| Test file | Covers |
|-----------|--------|
| **test/routes.test.ts** | GET /health, GET /session, GET /templates, GET /locations (status and response shape) |

For more on how the app is tested, see [TECHNICAL.md](./TECHNICAL.md#48-testing).

---

## Related documentation

- **[README](../README.md)** — Project overview, what it does, demos, principles
- **[TECHNICAL.md](./TECHNICAL.md)** — Architecture, state, API, resolution, translation, testing
- **[requirements.md](./requirements.md)** — Product scope, data model, phased roadmap
