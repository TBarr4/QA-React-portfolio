import { defineConfig } from 'cypress';
import cypressGrep from '@cypress/grep/src/plugin';

export default defineConfig({
  projectId: '1j9tum',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: ['cypress/e2e/**/*.cy.ts', 'cypress/api/**/*.cy.ts'],
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: false,
    screenshotOnRunFailure: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true,
    },
    env: {
      apiBaseUrl: 'https://fakestoreapi.com',
    },
    setupNodeEvents(on, config) {
      cypressGrep(config);
      return config;
    },
  },
});
