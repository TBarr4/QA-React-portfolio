# 🚀 ShopFlow — Fullstack QA Automation Showcase

![Tested with Cypress](https://img.shields.io/badge/Tested%20with-Cypress-04C38E.svg)
![TypeScript Ready](https://img.shields.io/badge/TypeScript-Ready-blue)
![Status Active](https://img.shields.io/badge/Status-Active-success)
![QA Automation](https://img.shields.io/badge/QA-Automation-blueviolet)

A production-like **React e-commerce application** integrated with a **robust QA automation ecosystem using Cypress**.

This project demonstrates how to build **reliable, scalable, and production-ready test automation**, aligned with modern frontend architecture and CI/CD practices.

---

## 💼 Why this project stands out
> 💡 This is the type of solution I build or improve in client projects.

This repository reflects how I approach **quality engineering in real-world scenarios**:

- Automation designed to **prevent regressions**, not just validate UI  
- Strong focus on **test stability and maintainability**  
- API contract validation to catch backend issues early  
- CI pipeline enforcing quality on every commit  
- Clear reporting for developers and stakeholders  

---

## 🎬 Demo


## **![User flow (E2E)](https://github.com/TBarr4/QA-React-portfolio/tree/main/qa/cypress/e2e)**

### **![Login Flow](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/auth/login-flow.cy.ts)**

<img width="1598" height="720" alt="login-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/81c65eb0-4e04-48dc-83ed-9db773a819a2" />

<img width="410" height="171" alt="image" src="https://github.com/user-attachments/assets/62d48176-63cf-4bcd-97df-7751f6e94698" />



### **![Cart Management](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/cart/cart-management.cy.ts)**

<img width="1602" height="720" alt="carrinho-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/12a6f358-28ff-4f41-97f3-09015cce6cbf" />

<img width="469" height="247" alt="image" src="https://github.com/user-attachments/assets/139169a7-a6ec-49f1-aeae-84fd7bf70bd9" />



### **![Checkout Flow](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/checkout/checkout-flow.cy.ts)**

<img width="1614" height="720" alt="checkout-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/d8eb9bc8-e815-4a61-89af-9ad024454f9e" />

<img width="590" height="239" alt="image" src="https://github.com/user-attachments/assets/8c6911c2-897b-42d8-9733-bbdd2adb6164" />


### **![Product Listing](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/e2e/products/product-listing.cy.ts)**

<img width="1608" height="720" alt="produto-projeto-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/38de5a7f-8705-4648-ae2c-9e6fe33bbf5b" />

<img width="538" height="231" alt="image" src="https://github.com/user-attachments/assets/e6838376-930b-4058-bc23-63487f3b203f" />


## **![API Testing](https://github.com/TBarr4/QA-React-portfolio/tree/main/qa/cypress/api/tests)**


### **![Auth API Contract](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/api/tests/auth-api.cy.ts)**
<img width="674" height="144" alt="image" src="https://github.com/user-attachments/assets/0c07bd9a-4332-4f6a-9eee-de14677f752c" />

### **![Order API Contract](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/api/tests/order-api.cy.ts)**
<img width="403" height="164" alt="image" src="https://github.com/user-attachments/assets/ed1e20d8-0cdf-4f90-8e1f-fb55c099b46c" />

### **![Product API Contract](https://github.com/TBarr4/QA-React-portfolio/blob/main/qa/cypress/api/tests/product-api.cy.ts)**
<img width="470" height="218" alt="image" src="https://github.com/user-attachments/assets/b34f3f98-7f2f-4643-aef5-1d2858d91222" />

---

## **Final result**
<img width="709" height="306" alt="image" src="https://github.com/user-attachments/assets/bcc1a23d-db18-4a53-82ce-333f5344229f" />

## **![CI pipeline](https://github.com/TBarr4/QA-React-portfolio/actions/runs/24588829042/job/71904918568)**
<img width="1692" height="997" alt="image" src="https://github.com/user-attachments/assets/984fdead-4b26-476e-a9f5-afcdde021b00" />


## **Integrated with Cypress Cloud for metrics**
<img width="1382" height="1216" alt="image" src="https://github.com/user-attachments/assets/747caeec-db1b-446a-9f9c-fd2349f1da23" />


---

## **🧠 What this project demonstrates**

### Frontend engineering

- Feature-based architecture (scalable and modular)  
- Type-safe development with TypeScript  
- Clear separation of concerns (features, shared, infrastructure)  

### QA automation (core focus)

- Cypress E2E testing with:
  - Page Object Model (POM)  
  - Custom commands  
  - `data-*` selectors for stability  

- API contract validation using:
  - JSON Schema  
  - AJV validator  

- Test filtering with `@cypress/grep`  

### CI/CD and quality gates

- GitHub Actions pipeline:
  - Runs on every push and pull request  
  - Prevents merges on failure  

- Mochawesome reporting  
- Artifact storage for traceability  

---

## **🛠 Tech stack**

| Layer     | Tools |
|----------|------|
| Frontend | React, TypeScript, Vite |
| Testing  | Cypress, Mochawesome, AJV |
| CI/CD    | GitHub Actions |
| API      | FakeStore API |

---

## **⚙️ Getting started**

### Requirements

- Node.js 18+  
- npm 9+  
- Chrome  

### Installation

```bash
npm run install:all
```

Run the application
```bash
npm start
```

Application URL: http://localhost:3000

Demo credentials
```bash
Username: mor_2314
Password: 83r5^_
```

---
## **🧪 Running tests**

Start the frontend application first, then run:
```bash
npm test
```
Useful commands to test
```bash
npm run qa:open       # open Cypress UI
npm run test:smoke    # run critical path tests
npm run test:api      # validate API contracts
npm run qa:report     # generate test report
```
---
## **📂 Project structure**
```bash
fullstack-qa-automation/
├── frontend/          # React application
│   ├── features/
│   ├── shared/
│   └── infrastructure/
├── qa/                # Cypress automation
│   ├── e2e/
│   ├── api/
│   └── support/
└── .github/workflows/ # CI pipeline
```
---
## **🔄 CI pipeline**

Triggered on:

• Push to any branch
• Pull requests
• Manual dispatch

Pipeline steps

1. Install dependencies
2. Type checking (frontend + QA)
3. Production build
4. Run API tests
5. Run E2E tests
6. Generate reports (Mochawesome)
7. Upload artifacts
### **![📊 Pipeline Results](https://github.com/TBarr4/QA-React-portfolio/actions)**
---
## **💡 How I can help your project**

• Build Cypress frameworks from scratch

• Stabilize flaky test suites

• Implement API contract validation

• Integrate QA into CI/CD pipelines

• Improve test performance and reliability

• Design scalable test architecture

---
## **🚀 Suggested improvements (high impact)**

To further enhance this project:

• Test dashboard (execution history, pass/fail trends)

• Coverage visualization

• Parallel test execution in CI

• Visual regression testing (e.g., Percy)

---
## **📬 Contact**

If you are looking for someone who can deliver real QA impact (not just test scripts), feel free to reach out.
