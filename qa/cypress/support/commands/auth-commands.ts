Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add('loginViaUI', (username: string, password: string) => {
  cy.visit('/login');
  cy.getByTestId('login-username-input').clear().type(username);
  cy.getByTestId('login-password-input').clear().type(password);
  cy.getByTestId('login-submit-button').click();
});

Cypress.Commands.add('loginViaAPI', (username: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/auth/login`,
    body: { username, password },
  }).then((response) => {
    expect([200, 201]).to.include(response.status);
    window.localStorage.setItem('auth_token', response.body.token);
  });
});
