Cypress.Commands.add('addProductToCart', (productIndex: number) => {
  cy.getByTestId('product-grid')
    .find('[data-test^="product-card-"]')
    .eq(productIndex)
    .find('[data-test="product-add-to-cart-button"]')
    .click();
});
