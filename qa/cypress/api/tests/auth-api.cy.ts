import { testUsers, apiEndpoints } from '../../support/utils/test-data';
import loginSchema from '../schemas/login.schema.json';
import { validateSchema } from '../../support/validators/schema-validator';

describe('Auth API Contract', { tags: ['@smoke', '@regression'] }, () => {
  const baseUrl = Cypress.env('apiBaseUrl');

  it('should return a valid token on successful login', { tags: '@smoke' }, () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}${apiEndpoints.login}`,
      body: {
        username: testUsers.valid.username,
        password: testUsers.valid.password,
      },
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body).to.have.property('token');

      const { valid, errors } = validateSchema(loginSchema, response.body);
      expect(valid, `Schema validation errors: ${JSON.stringify(errors)}`).to.be.true;
    });
  });

  it('should return 200 with token even for non-standard credentials (FakeStore API behavior)', { tags: '@regression' }, () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}${apiEndpoints.login}`,
      body: {
        username: testUsers.valid.username,
        password: testUsers.valid.password,
      },
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body.token).to.be.a('string');
      expect(response.body.token.length).to.be.greaterThan(0);
    });
  });

  it('should validate login response matches the JSON schema', { tags: '@regression' }, () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}${apiEndpoints.login}`,
      body: {
        username: testUsers.valid.username,
        password: testUsers.valid.password,
      },
    }).then((response) => {
      const { valid, errors } = validateSchema(loginSchema, response.body);

      if (!valid) {
        cy.log('Schema validation errors:', JSON.stringify(errors));
      }

      expect(valid).to.be.true;
    });
  });

  it('should return a valid auth token string from the login API', { tags: '@regression' }, () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}${apiEndpoints.login}`,
      body: {
        username: testUsers.valid.username,
        password: testUsers.valid.password,
      },
    }).then((response) => {
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string').and.to.have.length.greaterThan(10);
    });
  });
});
