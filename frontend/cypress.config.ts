import setupCoverage from '@cypress/code-coverage/task.js';
import { defineConfig } from 'cypress';

const ENV = {
  VITE_GRAASP_REDIRECTION_HOST: process.env.VITE_GRAASP_REDIRECTION_HOST,
  VITE_GRAASP_API_HOST: process.env.VITE_GRAASP_API_HOST,
  VITE_SHOW_NOTIFICATIONS: false,
  VITE_GRAASP_LIBRARY_HOST: process.env.VITE_GRAASP_LIBRARY_HOST,
};

export default defineConfig({
  e2e: {
    retries: {
      openMode: 0,
      runMode: 1,
    },
    // needed for redirection tests to pass
    chromeWebSecurity: false,
    env: ENV,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      setupCoverage(on, config);
      return config;
    },
    baseUrl: `http://localhost:${process.env.VITE_PORT ?? 3333}`,
    defaultCommandTimeout: 7000,
    requestTimeout: 8000,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    env: ENV,
  },
});
