/// <reference types="cypress" />

// Type declarations for @cypress/grep sub-path imports (no bundled .d.ts for these)
declare module '@cypress/grep/src/plugin' {
  function plugin(config: Cypress.PluginConfigOptions): void;
  export default plugin;
}

declare module '@cypress/grep/src/support' {
  function registerGrepSupport(): void;
  export default registerGrepSupport;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Log in via the UI with username and password.
     */
    loginViaUI(username: string, password: string): Chainable<void>;

    /**
     * Log in via the API and store the auth token.
     */
    loginViaAPI(username: string, password: string): Chainable<void>;

    /**
     * Get an element by its data-test attribute.
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Add a product to the cart from the product listing page.
     */
    addProductToCart(productIndex: number): Chainable<void>;
  }
}
