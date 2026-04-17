import { ProductPage } from '../../support/pageObjects/product-page';

describe('Product Listing', { tags: ['@smoke', '@regression'] }, () => {
  const productPage = new ProductPage();

  beforeEach(() => {
    productPage.visit();
  });

  it('should display the product listing page', { tags: '@smoke' }, () => {
    productPage.getTitle().should('contain.text', 'Products');
    productPage.getProductGrid().should('be.visible');
  });

  it('should load and display products from the API', { tags: '@smoke' }, () => {
    cy.intercept('GET', '**/products').as('getProducts');
    productPage.visit();
    cy.wait('@getProducts').its('response.statusCode').should('eq', 200);

    productPage.getProductCards().should('have.length.greaterThan', 0);
  });

  it('should display product details on each card', { tags: '@regression' }, () => {
    cy.intercept('GET', '**/products').as('getProducts');
    productPage.visit();
    cy.wait('@getProducts');

    productPage.getProductByIndex(0).within(() => {
      cy.getByTestId('product-title').should('not.be.empty');
      cy.getByTestId('product-price').should('not.be.empty');
      cy.getByTestId('product-category').should('not.be.empty');
      cy.getByTestId('product-image').should('have.attr', 'src').and('not.be.empty');
      cy.getByTestId('product-rating').should('be.visible');
    });
  });

  it('should filter products by category', { tags: '@regression' }, () => {
    cy.intercept('GET', '**/products').as('getProducts');
    cy.intercept('GET', '**/products/category/electronics').as('getElectronics');

    productPage.visit();
    cy.wait('@getProducts');

    productPage.selectCategory('electronics');
    cy.wait('@getElectronics');

    productPage.getProductCards().should('have.length.greaterThan', 0);
    productPage.getProductCards().each(($card) => {
      cy.wrap($card).find('[data-test="product-category"]').should('contain.text', 'electronics');
    });
  });

  it('should show loading state while fetching products', { tags: '@regression' }, () => {
    cy.intercept('GET', '**/products', (req) => {
      req.reply({ delay: 1000, statusCode: 200, body: [] });
    }).as('getProducts');

    productPage.visit();
    productPage.getLoadingSpinner().should('be.visible');
  });

  it('should show error state when API fails', { tags: '@regression' }, () => {
    cy.intercept('GET', '**/products', { statusCode: 500, body: {} }).as('getProductsFail');
    productPage.visit();
    cy.wait('@getProductsFail');
    productPage.getErrorMessage().should('be.visible');
  });

  it('should show no-products message when category returns empty', { tags: '@regression' }, () => {
    cy.intercept('GET', '**/products').as('getProducts');
    cy.intercept('GET', '**/products/category/electronics', {
      statusCode: 200,
      body: [],
    }).as('getElectronicsEmpty');

    productPage.visit();
    cy.wait('@getProducts');

    productPage.selectCategory('electronics');
    cy.wait('@getElectronicsEmpty');

    cy.getByTestId('no-products-message').should('be.visible');
  });

  it('should reset category filter when selecting All after a filtered view', { tags: '@regression' }, () => {
    cy.intercept('GET', '**/products').as('getProducts');
    cy.intercept('GET', '**/products/category/electronics').as('getElectronics');

    productPage.visit();
    cy.wait('@getProducts');

    productPage.selectCategory('electronics');
    cy.wait('@getElectronics');

    cy.getByTestId('category-all').click();
    productPage.getProductCards().should('have.length.greaterThan', 0);
    productPage.getCategoryFilter().should('contain.text', 'All');
  });

  it('should add a product to the cart', { tags: '@smoke' }, () => {
    cy.intercept('GET', '**/products').as('getProducts');
    productPage.visit();
    cy.wait('@getProducts');

    productPage.addToCart(0);
    cy.getByTestId('cart-badge').should('be.visible').and('contain.text', '1');
  });
});
