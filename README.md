# 🚀 ShopFlow — Fullstack QA Automation Showcase

![Tested with Cypress](https://img.shields.io/badge/Tested%20with-Cypress-04C38E.svg)
![TypeScript Ready](https://img.shields.io/badge/TypeScript-Ready-blue)
![Status Active](https://img.shields.io/badge/Status-Active-success)
![QA Automation](https://img.shields.io/badge/QA-Automation-blueviolet)

A production-like **React e-commerce application** integrated with a **robust QA automation ecosystem**.

This project simulates how modern teams ensure **quality, stability, and safe deployments** using automation, API validation, and CI/CD pipelines.

---

## 💼 Business Impact

This project is designed to replicate real-world QA challenges and solutions:

✔ Prevent regressions before production  
✔ Detect API contract issues early  
✔ Ensure safe deployments via CI/CD  
✔ Reduce manual testing effort and release risk  

➡️ This is the type of QA automation strategy used in production environments.

---

## 📊 Test Metrics

This project includes a production-like automation suite designed for fast and reliable feedback:

✔ **50 automated tests**
- 33 E2E tests (critical user journeys)  
- 17 API contract tests  

✔ **100% pass rate**  
✔ **~27s total execution time**  
✔ **Zero flaky tests observed**

### ⚡ Execution Breakdown

- API tests: ~0.7s  
- E2E tests: ~26s  

### 🎯 What this means

- Fast feedback in CI pipelines  
- High reliability and stability  
- Confidence for production deployments  

---

## 🧪 Test Strategy

This project follows a layered testing approach:

- **E2E tests** → validate real user journeys  
- **API tests** → validate contracts and backend reliability  
- **CI validation** → enforce quality on every commit  

Focus areas:

✔ Stability (no flaky tests)  
✔ Maintainability (POM + custom commands)  
✔ Fast feedback (optimized execution time)  

---

## 🧩 Fullstack QA Coverage

✔ Frontend validation (UI + flows)  
✔ API contract testing (AJV + schema validation)  
✔ CI/CD integration (GitHub Actions)  
✔ Reporting & traceability (Mochawesome)  

➡️ This represents a fullstack QA approach across application layers.

---

## 🎬 Demo — Real User Flows Covered

This automation suite validates critical business flows:

### **![🔐 Login Flow](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/auth/login-flow.cy.ts)**
Validates authentication, session handling, and error scenarios
<img width="1598" height="720" alt="login-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/81c65eb0-4e04-48dc-83ed-9db773a819a2" />

### **![🛒 Cart Management](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/cart/cart-management.cy.ts)**
Ensures correct state updates and pricing logic
<img width="1602" height="720" alt="carrinho-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/12a6f358-28ff-4f41-97f3-09015cce6cbf" />

### **![💳 Checkout Flow](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/checkout/checkout-flow.cy.ts)**
Covers full purchase journey including API validation
<img width="1614" height="720" alt="checkout-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/d8eb9bc8-e815-4a61-89af-9ad024454f9e" />

### **![📦 Product Listing](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/products/product-listing.cy.ts)**
Validates rendering, filtering, and API integration
<img width="1608" height="720" alt="produto-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/38de5a7f-8705-4648-ae2c-9e6fe33bbf5b" />

## **![API Tests](https://github.com/TBarr4/QA-React-portfolio/tree/main/qa/cypress/api/tests) → validate contracts and backend reliability (non-UI, headless execution)**
---

## 🧠 What this project demonstrates

### Frontend engineering

- Feature-based architecture (scalable and modular)  
- Type-safe development with TypeScript  
- Clear separation of concerns  

### QA automation (core focus)

- Cypress E2E testing with:
  - Page Object Model (POM)  
  - Custom commands  
  - Stable selectors (`data-*`)  

- API contract validation:
  - JSON Schema  
  - AJV validator  

- Test filtering with `@cypress/grep`  

---

## ⚡ Challenges & Solutions

**Challenge:** Avoid flaky tests  
**Solution:** Stable selectors + deterministic test design  

**Challenge:** Validate backend reliability  
**Solution:** API contract testing with schema validation  

**Challenge:** Ensure CI reliability  
**Solution:** Pipeline with quality gates and artifact reporting  

---

## 🛠 Tech stack

| Layer     | Tools |
|----------|------|
| Frontend | React, TypeScript, Vite |
| Testing  | Cypress, Mochawesome, AJV |
| CI/CD    | GitHub Actions |
| API      | FakeStore API |

---

## ⚙️ Getting started

### Requirements

- Node.js 18+  
- npm 9+  
- Chrome  

### Installation

```bash
npm run install:all
```
Application URL: http://localhost:3000

Demo credentials:
```bash
Username: mor_2314
Password: 83r5^_
```
## 🧪 Running tests

Start the frontend application first, then run:
```bash
npm test
```
Useful commands:

```bash
npm run qa:open       # open Cypress UI
npm run test:smoke    # run critical path tests
npm run test:api      # validate API contracts
npm run qa:report     # generate test report
```
---
## 📂 Project structure
```bash
fullstack-qa-automation/
├── frontend/
│   ├── features/
│   ├── shared/
│   └── infrastructure/
├── qa/
│   ├── e2e/
│   ├── api/
│   └── support/
└── .github/workflows/
```
---
## 🔄 CI pipeline

Triggered on:

• Push to any branch

• Pull requests

• Manual dispatch

Pipeline steps:

1.Install dependencies

2.Type checking (frontend + QA)

3.Production build

4.Run API tests

5.Run E2E tests

6.Generate reports (Mochawesome)

7.Upload artifacts

---
## 📈 Test Coverage Strategy

The automation suite is structured to maximize coverage:

66% E2E tests → business-critical flows

34% API tests → backend validation


This ensures:

✔ Early bug detection

✔ End-to-end confidence

✔ Reduced regression risk

---
## 💼 How I can help your project

✔ Build scalable QA automation frameworks

✔ Reduce regression risk

✔ Integrate testing into CI/CD pipelines

✔ Stabilize flaky test suites

✔ Improve test performance and reliability

---
## 🚀 Suggested improvements (my next steps in this project)

• Test execution dashboard (trend analysis)

• Parallel execution in CI

• Visual regression testing (Percy)

• Coverage reporting
---
## 💼 Let’s work together

I help teams:

✔ Build reliable test automation

✔ Prevent production issues

✔ Deliver faster and safer releases

If you need QA automation that delivers real impact, let’s talk.
