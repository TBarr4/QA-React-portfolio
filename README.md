# ShopFlow - Fullstack QA Automation

React e-commerce frontend integrated with a Cypress automation suite for E2E and API contract testing.

## What this project shows

- Feature-based React architecture with TypeScript
- Stable Cypress E2E tests using data-test selectors and page objects
- API contract validation with JSON Schema and AJV
- CI pipeline that runs tests on every commit and pull request

## Tech stack

- Frontend: React, TypeScript, Vite
- Testing: Cypress, @cypress/grep, Mochawesome, AJV
- CI: GitHub Actions
- API: FakeStore API

## Requirements

- Node.js 18+
- npm 9+
- Chrome (for local Cypress runs)

## Installation

```bash
npm run install:all
```

## Run locally

```bash
npm start
```

App URL: http://localhost:3000

Demo credentials:

- Username: mor_2314
- Password: 83r5^_

## Run tests

Keep the frontend running in one terminal, then use another terminal for tests.

```bash
npm test
```

Useful test commands:

```bash
npm run qa:open
npm run test:smoke
npm run test:api
npm run qa:report
```

## Environment variables

Copy the example file:

```bash
cp frontend/.env.example frontend/.env.local
```

Variables:

- VITE_API_BASE_URL (default: https://fakestoreapi.com)
- VITE_APP_NAME (default: ShopFlow)

## Repository structure

```text
fullstack-qa-automation/
  frontend/          React app (features, shared, infrastructure)
  qa/                Cypress suite (e2e, api, support)
  .github/workflows/ CI pipeline
```

## CI behavior

The workflow in .github/workflows/ci.yml runs on:

- Every push (all branches)
- Every pull request
- Manual workflow dispatch

It performs:

- Frontend + QA dependency installation
- Typechecks (frontend and QA)
- Frontend production build
- Cypress API tests (CLI)
- Cypress E2E tests (CLI)
- Mochawesome report generation and artifact upload
