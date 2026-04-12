import { apiEndpoints } from '../../support/utils/test-data';
import productSchema from '../schemas/product.schema.json';
import { validateSchema } from '../../support/validators/schema-validator';

describe('Product API Contract', { tags: ['@smoke', '@regression'] }, () => {
  const baseUrl = Cypress.env('apiBaseUrl');

  it('should return a list of products', { tags: '@smoke' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.products}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it('should validate each product matches the JSON schema', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.products}`,
    }).then((response) => {
      expect(response.status).to.eq(200);

      response.body.forEach((product: unknown, index: number) => {
        const { valid, errors } = validateSchema(productSchema, product);
        expect(
          valid,
          `Product at index ${index} failed schema validation: ${JSON.stringify(errors)}`
        ).to.be.true;
      });
    });
  });

  it('should return a single product by ID', { tags: '@smoke' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.productById(1)}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);

      const { valid, errors } = validateSchema(productSchema, response.body);
      expect(valid, `Schema validation errors: ${JSON.stringify(errors)}`).to.be.true;
    });
  });

  it('should return products filtered by category', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.productsByCategory('electronics')}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      response.body.forEach((product: Record<string, unknown>) => {
        expect(product.category).to.eq('electronics');
      });
    });
  });

  it('should return list of categories', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.categories}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body).to.include('electronics');
    });
  });

  it('should have required fields on each product', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.productById(1)}`,
    }).then((response) => {
      const product = response.body;
      expect(product).to.have.property('id');
      expect(product).to.have.property('title');
      expect(product).to.have.property('price');
      expect(product).to.have.property('description');
      expect(product).to.have.property('category');
      expect(product).to.have.property('image');
      expect(product).to.have.nested.property('rating.rate');
      expect(product).to.have.nested.property('rating.count');
    });
  });

  it('should return 404 for a non-existent product ID', { tags: '@regression' }, () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.productById(99999)}`,
      failOnStatusCode: false,
    }).then((response) => {
      // FakeStore API returns 200 with null for missing IDs — document actual behavior
      expect([200, 404]).to.include(response.status);
      if (response.status === 200) {
        // FakeStore quirk: returns null body for out-of-range IDs
        expect(response.body === null || response.body === '').to.be.true;
      }
    });
  });

  it('should return products limit correctly with boundary IDs', { tags: '@regression' }, () => {
    // Verify product IDs are within expected range (1-20 for FakeStore)
    cy.request({
      method: 'GET',
      url: `${baseUrl}${apiEndpoints.products}`,
    }).then((response) => {
      expect(response.body.length).to.be.at.most(20);
      response.body.forEach((product: Record<string, unknown>) => {
        expect(product.id).to.be.a('number').and.be.greaterThan(0);
        expect(product.price).to.be.a('number').and.be.greaterThan(0);
      });
    });
  });
});
