# Global Email Studio — Product Requirements

## 1. Vision and scope

**Global Email Studio** is a B2B campaign email tool: choose a template, customize subject and body per store (with placeholders like `{storeName}`, `{city}`, `{date}`), preview the resolved content per store, and trigger send. The product focuses on the authoring flow rather than building a full ESP.

**This phase:** Read-only API (templates, locations) and frontend integration. No auth; send is simulated (compute and log payload per location). Later phases could add auth, recipients, and real batch send.

---

## 2. Product contex

Stores (locations) have identity and locale (city, storeName, country, language, timezone, currency). Placeholders in templates are resolved per location so each market gets the right copy. In a full product, send would be a batch job (create work items; a cron/worker sends later). In this phase we only simulate that.

---

## 3. Data model

**Templates** — From the API. Each has id, name, subject, body (optional i18nKey). Subject/body may contain placeholders.

**Locations** — From the API. Each has id, city, storeName, country, language, currency, timezone. Optional per-location **overrides** (subject, body) are edited on the Markets step and kept in memory.

**Campaign draft** — In-memory only. One subject + body (default for all locations until a location has overrides or translated content). Not persisted.

**Translated content** — In-memory only. After "Save & translate" on the Template step, per-location subject/body from Google Cloud Translation; used as each location's default on Markets until overridden. Not persisted.

**Resolution:** For each location, subject/body = **location overrides** (if set) → else **translated content for that location** (if any) → else **campaign draft** → else **template default**. Then replace placeholders `{storeName}`, `{city}`, `{date}`, `{country}` using the location and current date (locale + timezone).

---

## 4. Capabilities (what the product does)

**Data loading** — One call to **GET /session** returns `{ templates, locations }`. Loading and error states; retry on failure.

**Template step** — User selects one template; edits default subject/body (campaign draft). Placeholders are explained. Optional **Save & translate** sends the draft to Google Cloud Translation and stores per-location translated subject/body for the Markets step.

**Markets step** — One card per location; include/exclude each; set per-location overrides (subject/body). Translated content (if any) is each location's default until overridden.

**Preview & send** — For each included location, show resolved subject and body (placeholders filled; date in that location's language/timezone). **Send** is simulated: compute and log payload per location; show success message.

**UI** — Theme (default/light/dark), UI language (EN/DE/DA). No auth.

---

## 5. Out of scope (this phase)

No auth, no campaign persistence (draft/overrides in memory only), no real email delivery (send is simulated), no recipient management in the UI.

---

## 6. Implementation (this phase)

### Read-only API and frontend integration

**Goal:** Backend serves templates and locations so the frontend has a real API to call, and you can demonstrate client design, data fetching, normalization, and error handling.

**Backend (Node)**  
- **GET /templates** — Returns list of templates (mock data; same shape as current app: id, name, subject, body, i18nKey?).  
- **GET /locations** — Returns list of locations (mock data; same shape: id, city, storeName, country, language, currency, timezone, overrides?).  
- **GET /session** — Returns `{ templates, locations }` in one response; the frontend uses this for a single round-trip on load. (GET /templates and GET /locations also exist for compatibility.)  
- No auth; CORS enabled for the frontend origin. Data can be single-tenant (one company's seed data) or a single static JSON array.

**Frontend**  
- Replace in-memory mocks with calls to the API (base URL from env, e.g. `VITE_API_URL`).  
- Single API client (e.g. `api/client.ts`): base URL, headers, handle non-OK (e.g. throw or return typed error).  
- Normalize and store templates/locations as needed (e.g. by id); keep existing UI and resolution logic.  
- Keep existing loading/error/retry behavior; errors come from real HTTP.

**Deliverable:** App loads templates and locations from the Node server; no change to product behavior, but a clear API boundary and a story for "how I design the client and handle data."

---

This document is the single source of truth for scope, data model, and next steps.

**Related documentation:** [README](../README.md) · [SETUP.md](./SETUP.md) · [TECHNICAL.md](./TECHNICAL.md)
