import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ect8ey',
  allowCypressEnv: false,
  env: { },

  e2e: {
    baseUrl: 'http://localhost:5173/',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts'
  },
});

