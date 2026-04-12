import { ProductPage } from '../../support/pageObjects/product-page';
import { CartPage } from '../../support/pageObjects/cart-page';

describe('Cart Management', { tags: ['@smoke', '@regression'] }, () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.intercept('GET', '**/products').as('getProducts');
    productPage.visit();
    cy.wait('@getProducts');
  });

  it('should show empty cart state initially', { tags: '@smoke' }, () => {
    cartPage.visit();
    cartPage.getEmptyState().should('be.visible');
  });

  it('should add a product to cart and show it', { tags: '@smoke' }, () => {
    productPage.addToCart(0);
    cy.getByTestId('cart-badge').should('contain.text', '1');

    cartPage.openFromNav();
    cartPage.getCartItems().should('have.length', 1);
  });

  it('should increase product quantity in cart', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    cartPage.openFromNav();

    cartPage.getCartItems().first().find('[data-test="cart-item-quantity"]').should('contain.text', '1');

    cartPage.getCartItems().first().invoke('attr', 'data-test').then((attr) => {
      const productId = parseInt((attr as string).replace('cart-item-', ''), 10);
      cartPage.increaseQuantity(productId);
      cartPage.getCartItemByProductId(productId)
        .find('[data-test="cart-item-quantity"]')
        .should('contain.text', '2');
    });
  });

  it('should decrease product quantity in cart', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    cartPage.openFromNav();

    cartPage.getCartItems().first().invoke('attr', 'data-test').then((attr) => {
      const productId = parseInt((attr as string).replace('cart-item-', ''), 10);
      cartPage.increaseQuantity(productId);
      cartPage.getCartItemByProductId(productId)
        .find('[data-test="cart-item-quantity"]')
        .should('contain.text', '2');

      cartPage.decreaseQuantity(productId);
      cartPage.getCartItemByProductId(productId)
        .find('[data-test="cart-item-quantity"]')
        .should('contain.text', '1');
    });
  });

  it('should disable decrease button at quantity 1', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    cartPage.openFromNav();

    cartPage.getCartItems().first().invoke('attr', 'data-test').then((attr) => {
      const productId = parseInt((attr as string).replace('cart-item-', ''), 10);
      cartPage.getCartItemByProductId(productId)
        .find('[data-test="cart-item-decrease"]')
        .should('be.disabled');
    });
  });

  it('should merge quantity when the same product is added twice', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    productPage.addToCart(0);

    cartPage.openFromNav();
    cartPage.getCartItems().should('have.length', 1);
    cartPage.getCartItems().first()
      .find('[data-test="cart-item-quantity"]')
      .should('contain.text', '2');
    cy.getByTestId('cart-badge').should('contain.text', '2');
  });

  it('should remove a product from the cart', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    cartPage.openFromNav();

    cartPage.getCartItems().should('have.length', 1);

    cartPage.getCartItems().first().invoke('attr', 'data-test').then((attr) => {
      const productId = parseInt((attr as string).replace('cart-item-', ''), 10);
      cartPage.removeItem(productId);
    });

    cartPage.getEmptyState().should('be.visible');
  });

  it('should clear all items from the cart', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    productPage.addToCart(1);

    cartPage.openFromNav();
    cartPage.getCartItems().should('have.length', 2);

    cartPage.clearCart();
    cartPage.getEmptyState().should('be.visible');
  });

  it('should display correct total price', { tags: '@regression' }, () => {
    productPage.addToCart(0);
    cartPage.openFromNav();

    cartPage.getTotalPrice().should('be.visible').and('contain.text', '$');
  });

  it('should navigate to checkout from cart', { tags: '@smoke' }, () => {
    productPage.addToCart(0);
    cartPage.openFromNav();

    cartPage.proceedToCheckout();
    cy.url().should('include', '/checkout');
  });
});
