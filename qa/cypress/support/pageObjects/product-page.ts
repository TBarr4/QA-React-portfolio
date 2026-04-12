export class ProductPage {
  visit() {
    cy.visit('/');
    return this;
  }

  getTitle() {
    return cy.getByTestId('product-list-title');
  }

  getProductGrid() {
    return cy.getByTestId('product-grid');
  }

  getProductCards() {
    return cy.get('[data-test^="product-card-"]');
  }

  getProductByIndex(index: number) {
    return this.getProductCards().eq(index);
  }

  getCategoryFilter() {
    return cy.getByTestId('category-filter');
  }

  selectCategory(category: string) {
    cy.getByTestId(`category-${category}`).click();
    return this;
  }

  getLoadingSpinner() {
    return cy.getByTestId('loading-spinner');
  }

  getErrorMessage() {
    return cy.getByTestId('product-error');
  }

  addToCart(productIndex: number) {
    this.getProductByIndex(productIndex)
      .find('[data-test="product-add-to-cart-button"]')
      .click();
    return this;
  }
}
