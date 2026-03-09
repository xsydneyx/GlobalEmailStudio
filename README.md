# Global Email Studio

A **B2B campaign email tool** for designing one campaign and localizing it per market. This project explores how to build tools for international markets and the multi-location patterns that overlap with Adplenty’s domain. It focuses on the authoring flow and frontend craft rather than the full product space.

---

## What it does

- **Template step** — Select a campaign template; edit default subject/body (campaign draft). Placeholders are explained and resolved per market. **Save & translate** sends the draft to each market’s language via Google Cloud Translation.
- **Markets step** — One card per store: include/exclude locations, set per-location subject/body overrides. Translated content from the Template step appears as defaults; override on the card as needed.
- **Preview & send** — Per-location resolved subject/body (placeholders filled, date in local language/timezone). Send is simulated (logs payload).
- **UI** — Theme (default/light/dark), UI language (EN/DE/DA), template default language. No auth in the current phase.

---

## Demos
https://github.com/user-attachments/assets/cae2afcb-53c7-49df-8fc3-f82e0b800322



---

## Principles

This project reflects how I approach React and front-end systems:

- **Separation of UI and behavior** — Components render; hooks own state and logic. UI stays simple; behavior is reusable and testable.
- **Clear state boundaries** — A small Zustand store for shared app state; feature logic in colocated hooks. Minimal global state, fewer tight couplings.
- **Colocation over premature abstraction** — Code lives next to the feature it supports. Patterns are extracted when reuse is clear.
- **Reusable, testable logic** — Shared behavior in hooks and utilities, with `.hooks.test` and `.util.test` next to the code.
- **Consistent UI patterns** — A design-system layer (tokens + themed components) and Storybook as a single source of truth for components.
- **Pragmatic scalability** — Start simple; refactor when patterns emerge.

---

## Documentation

**Quick links:** [Setup](docs/SETUP.md) · [Technical design](docs/TECHNICAL.md) · [**Product requirements**](docs/REQUIREMENTS.md)

| Document | Audience | Description |
|----------|----------|-------------|
| **[Setup](docs/SETUP.md)** | Anyone running the app | How to run the API and web app locally, env vars, optional Storybook, tests. |
| **[Technical design](docs/TECHNICAL.md)** | Tech leads, engineers | Architecture, state, data loading, template resolution, translation, testing. |
| **[Product requirements](docs/REQUIREMENTS.md)** | Product, engineering | Vision, scope, data model, capabilities, phased roadmap. |

---

## Quick start

Clone the repo, then follow **[Setup](docs/SETUP.md)** to install dependencies and run the server and web app. You need `VITE_API_URL` set in `web/.env` (e.g. `http://localhost:3001`) for the app to load data.

---

## Repo structure

```
GlobalEmailStudio/
├── docs/           # SETUP.md, TECHNICAL.md, REQUIREMENTS.md
├── server/         # Node API (GET /session, mock data)
└── web/            # React app (Vite, tabs: Template | Markets | Preview)
```

For full structure and module roles, see [Technical design](docs/TECHNICAL.md#3-system-architecture).
