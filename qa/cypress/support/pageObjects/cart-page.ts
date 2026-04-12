export class CartPage {
  visit() {
    cy.visit('/cart');
    return this;
  }

  openFromNav() {
    cy.getByTestId('nav-cart').click();
    return this;
  }

  getTitle() {
    return cy.getByTestId('cart-title');
  }

  getEmptyState() {
    return cy.getByTestId('cart-empty');
  }

  getCartItems() {
    return cy.get('[data-test^="cart-item-"]').filter((_index, element) => {
      const value = element.getAttribute('data-test') ?? '';
      return /^cart-item-\d+$/.test(value);
    });
  }

  getCartItemByProductId(productId: number) {
    return cy.getByTestId(`cart-item-${productId}`);
  }

  getCartSummary() {
    return cy.getByTestId('cart-summary');
  }

  getTotalPrice() {
    return cy.getByTestId('cart-total-price');
  }

  getCheckoutButton() {
    return cy.getByTestId('cart-checkout-button');
  }

  getClearButton() {
    return cy.getByTestId('cart-clear-button');
  }

  getCartBadge() {
    return cy.getByTestId('cart-badge');
  }

  increaseQuantity(productId: number) {
    this.getCartItemByProductId(productId)
      .find('[data-test="cart-item-increase"]')
      .click();
    return this;
  }

  decreaseQuantity(productId: number) {
    this.getCartItemByProductId(productId)
      .find('[data-test="cart-item-decrease"]')
      .click();
    return this;
  }

  removeItem(productId: number) {
    this.getCartItemByProductId(productId)
      .find('[data-test="cart-item-remove"]')
      .click();
    return this;
  }

  clearCart() {
    this.getClearButton().click();
    return this;
  }

  proceedToCheckout() {
    this.getCheckoutButton().click();
    return this;
  }
}
