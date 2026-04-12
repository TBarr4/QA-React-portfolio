import './commands/auth-commands';
import './commands/cart-commands';

// Load @cypress/grep for test tagging (v4+ path)
import registerCypressGrep from '@cypress/grep/src/support';
registerCypressGrep();

// Global before each: clear storage between tests
beforeEach(() => {
  cy.clearLocalStorage();
});
