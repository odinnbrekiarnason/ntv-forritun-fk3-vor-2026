import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ect8ey',
  allowCypressEnv: false,
  env: { },

  e2e: {
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

