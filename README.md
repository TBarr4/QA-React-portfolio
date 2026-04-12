# ShopFlow — Fullstack QA Automation

A React e-commerce frontend wired to the [FakeStore API](https://fakestoreapi.com), with a full Cypress automation suite covering E2E flows and API contract validation.

---

## What it does

- Browse and filter products by category
- Add items to a shopping cart (in-memory, no backend required)
- Fill out a checkout form with client-side validation
- Login with FakeStore demo credentials
- Cypress test suite: E2E flows + API schema validation + tag-based filtering

---

## Requirements

- Node.js 18+
- npm 9+
- Google Chrome (for Cypress)

---

## Install

```bash
npm run install:all
```

---

## Run the app

```bash
npm start
# opens http://localhost:3000
```

Demo credentials: **mor_2314 / 83r5^_**

---

## Run tests

> The frontend must be running before executing E2E tests.

```bash
# Run all tests (headless)
npm test

# Open Cypress interactive runner
npm run qa:open

# Smoke tests only
npm run test:smoke

# API contract tests only
npm run test:api

# Generate HTML report (after a run)
npm run qa:report
```

---

## Project structure

```
fullstack-qa-automation/
├── frontend/          # React + Vite (TypeScript)
│   └── src/
│       ├── app/       # Providers, routing
│       ├── features/  # auth / cart / checkout / products
│       ├── infrastructure/  # HTTP client, env config
│       └── shared/    # Reusable components, hooks, utils
│
└── qa/                # Cypress test suite
    └── cypress/
        ├── api/       # API contract tests + JSON schemas
        ├── e2e/       # End-to-end flows (auth / cart / checkout / products)
        └── support/   # Commands, page objects, test data, validators
    ```

    ---

    ## Environment variables

    Copy `frontend/.env.example` to `frontend/.env.local` to override defaults:

    ```bash
    cp frontend/.env.example frontend/.env.local
    ```

    | Variable | Default | Description |
    |---|---|---|
    | `VITE_API_BASE_URL` | `https://fakestoreapi.com` | API base URL |
    | `VITE_APP_NAME` | `ShopFlow` | App display name |

    ---

    ## Available scripts

    | Command | Description |
    |---|---|
    | `npm run install:all` | Install all dependencies |
    | `npm start` | Start frontend dev server |
    | `npm test` | Run Cypress headless |
    | `npm run test:smoke` | Run `@smoke` tagged tests only |
    | `npm run test:api` | Run API contract tests only |
    | `npm run qa:open` | Open Cypress interactive runner |
    | `npm run qa:report` | Generate HTML test report |
    | `npm run frontend:build` | Production build |
    | `npm run ci` | Build + run all tests + report |
```

---

## Environment variables

Copy `frontend/.env.example` to `frontend/.env.local` to override defaults:

```bash
cp frontend/.env.example frontend/.env.local
```

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `https://fakestoreapi.com` | API base URL |
| `VITE_APP_NAME` | `ShopFlow` | App display name |

---

## Available scripts

| Command | Description |
|---|---|
| `npm run install:all` | Install all dependencies |
| `npm start` | Start frontend dev server |
| `npm test` | Run Cypress headless |
| `npm run test:smoke` | Run `@smoke` tagged tests only |
| `npm run test:api` | Run API contract tests only |
| `npm run qa:open` | Open Cypress interactive runner |
| `npm run qa:report` | Generate HTML test report |
| `npm run frontend:build` | Production build |
| `npm run ci` | Build + run all tests + report |
