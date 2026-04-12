import { ProductPage } from '../../support/pageObjects/product-page';
import { CartPage } from '../../support/pageObjects/cart-page';
import { CheckoutPage } from '../../support/pageObjects/checkout-page';
import { testShippingAddress } from '../../support/utils/test-data';

describe('Checkout Flow', { tags: ['@smoke', '@regression'] }, () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    cy.intercept('GET', '**/products').as('getProducts');
    productPage.visit();
    cy.wait('@getProducts');

    // Add a product and go to checkout
    productPage.addToCart(0);
    cartPage.openFromNav();
    cartPage.proceedToCheckout();
  });

  it('should display the checkout form', { tags: '@smoke' }, () => {
    checkoutPage.getTitle().should('contain.text', 'Checkout');
    checkoutPage.getForm().should('be.visible');
    checkoutPage.getOrderSummary().should('be.visible');
    checkoutPage.getSubmitButton().should('be.visible');
  });

  it('should show validation errors for empty shipping form', { tags: '@regression' }, () => {
    checkoutPage.submit();

    cy.get('[id="first-name-error"]').should('be.visible');
    cy.get('[id="last-name-error"]').should('be.visible');
    cy.get('[id="email-error"]').should('be.visible');
  });

  it('should show email validation error for invalid email', { tags: '@regression' }, () => {
    checkoutPage.getEmailInput().type('invalid-email');
    checkoutPage.submit();

    cy.get('[id="email-error"]').should('contain.text', 'Invalid email format');
  });

  it('should show phone validation error for invalid phone', { tags: '@regression' }, () => {
    checkoutPage.getPhoneInput().type('abc');
    checkoutPage.submit();

    cy.get('[id="phone-error"]').should('be.visible');
  });

  it('should show ZIP code validation error for invalid ZIP', { tags: '@regression' }, () => {
    checkoutPage.getZipCodeInput().type('ABCDE');
    checkoutPage.submit();

    cy.get('[id="zip-code-error"]').should('be.visible');
  });

  it('should submit order successfully with valid data', { tags: '@smoke' }, () => {
    cy.intercept('POST', '**/carts').as('placeOrder');

    checkoutPage.fillShippingInfo(testShippingAddress);
    checkoutPage.submit();

    cy.wait('@placeOrder').its('response.statusCode').should('be.oneOf', [200, 201]);
    checkoutPage.getSuccessMessage().should('be.visible');
  });

  it('should display order summary with correct items', { tags: '@regression' }, () => {
    checkoutPage.getOrderSummary().should('be.visible');
    checkoutPage.getTotal().should('be.visible').and('contain.text', '$');
  });

  it('should disable submit button during order processing', { tags: '@regression' }, () => {
    cy.intercept('POST', '**/carts', (req) => {
      req.reply({
        delay: 1500,
        statusCode: 200,
        body: { id: 21, userId: 1, date: new Date().toISOString(), products: [{ productId: 1, quantity: 1 }] },
      });
    }).as('placeOrder');

    checkoutPage.fillShippingInfo(testShippingAddress);
    checkoutPage.submit();

    checkoutPage.getSubmitButton().should('be.disabled');
  });

  it('should redirect to home when cart is empty and checkout is visited directly', { tags: '@regression' }, () => {
    // Navigate away from checkout, clear cart, come back directly
    cy.visit('/');
    cy.visit('/checkout');
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });
});
