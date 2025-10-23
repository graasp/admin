// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
import '@cypress/code-coverage/support';

import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

/**
 * this is here because the accessible-tree-view component crashes
 * when requesting a node that is not in its tree, since it keeps a state internally
 */
Cypress.on('uncaught:exception', (err): false | void => {
  if (err.message.includes('Node with id')) {
    return false;
  }
  if (err.message.includes('Map container is already initialized.')) {
    return false;
  }
});
