export class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  getTitle() {
    return cy.getByTestId('login-title');
  }

  getUsernameInput() {
    return cy.getByTestId('login-username-input');
  }

  getPasswordInput() {
    return cy.getByTestId('login-password-input');
  }

  getSubmitButton() {
    return cy.getByTestId('login-submit-button');
  }

  getErrorMessage() {
    return cy.getByTestId('login-error');
  }

  getDemoHint() {
    return cy.getByTestId('login-demo-hint');
  }

  fillUsername(username: string) {
    this.getUsernameInput().clear().type(username);
    return this;
  }

  fillPassword(password: string) {
    this.getPasswordInput().clear().type(password);
    return this;
  }

  submit() {
    this.getSubmitButton().click();
    return this;
  }

  login(username: string, password: string) {
    this.fillUsername(username).fillPassword(password).submit();
    return this;
  }
}
