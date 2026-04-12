import { LoginPage } from '../../support/pageObjects/login-page';
import { testUsers } from '../../support/utils/test-data';

describe('Login Flow', { tags: ['@smoke', '@regression'] }, () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should display the login form correctly', { tags: '@smoke' }, () => {
    loginPage.getTitle().should('contain.text', 'Sign in to ShopFlow');
    loginPage.getUsernameInput().should('be.visible');
    loginPage.getPasswordInput().should('be.visible');
    loginPage.getSubmitButton().should('be.visible').and('contain.text', 'Sign In');
    loginPage.getDemoHint().should('be.visible');
  });

  it('should login successfully with valid credentials', { tags: '@smoke' }, () => {
    cy.intercept('POST', '**/auth/login').as('loginRequest');

    loginPage.login(testUsers.valid.username, testUsers.valid.password);

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show validation errors for empty fields', { tags: '@regression' }, () => {
    loginPage.submit();

    cy.get('[id="username-error"]').should('be.visible').and('contain.text', 'Username is required');
    cy.get('[id="password-error"]').should('be.visible').and('contain.text', 'Password is required');
  });

  it('should show error message for invalid credentials', { tags: '@regression' }, () => {
    cy.intercept('POST', '**/auth/login').as('loginRequest');

    loginPage.login(testUsers.invalid.username, testUsers.invalid.password);

    cy.wait('@loginRequest');
    cy.getByTestId('login-error').should('be.visible');
  });

  it('should disable submit button while loading', { tags: '@regression' }, () => {
    cy.intercept('POST', '**/auth/login', (req) => {
      req.reply({ delay: 1000, statusCode: 200, body: { token: 'fake-token' } });
    }).as('loginRequest');

    loginPage.login(testUsers.valid.username, testUsers.valid.password);

    loginPage.getSubmitButton().should('be.disabled');
    cy.getByTestId('button-spinner').should('be.visible');
  });
});
