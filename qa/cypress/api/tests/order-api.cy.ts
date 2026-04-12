import { apiEndpoints, testUsers } from '../../support/utils/test-data';
import orderSchema from '../schemas/order.schema.json';
import { validateSchema } from '../../support/validators/schema-validator';

describe('Order API Contract', { tags: ['@smoke', '@regression'] }, () => {
  const baseUrl = Cypress.env('apiBaseUrl');

  it('should create a new order (cart)', { tags: '@smoke' }, () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}${apiEndpoints.carts}`,
      body: {
        userId: 1,
        date: new Date().toISOString(),
        products: [
          { productId: 1, quantity: 2 },
          { productId: 3, quantity: 1 },
        ],
      },
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('products');
    });
  });

  it('should validate order response against JSON schema', { tags: '@regression' }, () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}${apiEndpoints.carts}`,
      body: {
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId: 5, quantity: 3 }],
      },
    }).then((response) => {
      const { valid, errors } = validateSchema(orderSchema, response.body);
      expect(valid, `Schema validation errors: ${JSON.stringify(errors)}`).to.be.true;
    });
  });

  it('should retrieve existing carts', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.carts}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('should retrieve a single cart by ID', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.cartById(1)}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('userId');
      expect(response.body.products).to.be.an('array');
    });
  });

  it('should contain valid product references in order', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.cartById(1)}`,
    }).then((response) => {
      response.body.products.forEach((item: { productId: number; quantity: number }) => {
        expect(item).to.have.property('productId');
        expect(item).to.have.property('quantity');
        expect(item.productId).to.be.a('number');
        expect(item.quantity).to.be.a('number').and.be.greaterThan(0);
      });
    });
  });
});
