# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier application.

## Environment Setup

Define VITE_CODESPACE_NAME so API calls target your Codespaces backend:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When VITE_CODESPACE_NAME is set, the frontend calls:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When VITE_CODESPACE_NAME is not set, the frontend safely falls back to:

```text
http://localhost:8000/api/[component]/
```

## Run

```bash
npm --prefix octofit-tracker/frontend install
npm --prefix octofit-tracker/frontend run dev -- --host 0.0.0.0 --port 5173
```
