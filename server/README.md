# Global Email Studio — API (Phase 1)

Node/Express server that serves **mock** templates and locations for the frontend. No auth. For full setup (API + web app together), see [docs/SETUP.md](../docs/SETUP.md).

## Endpoints

| Method | Path       | Description                          |
|--------|------------|--------------------------------------|
| GET    | /templates | List of email templates              |
| GET    | /locations | List of locations (stores)           |
| GET    | /session   | `{ templates, locations }` in one   |
| GET    | /health    | Health check                         |

## Run

```bash
cd server
npm install
npm run dev
```

API runs at **http://localhost:3001**. Use `VITE_API_URL=http://localhost:3001` when running the web app so the frontend can call this API.

## Build

```bash
npm run build
npm start
```

## Env

- `PORT` — default `3001`
