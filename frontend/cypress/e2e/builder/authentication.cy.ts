import { PackedFolderItemFactory } from '@graasp/sdk';

import {
  HEADER_APP_BAR_ID,
  ITEM_MAIN_CLASS,
} from '../../../src/config/selectors';

describe('Authentication', () => {
  describe('Signed Off > Redirect to sign in route', () => {
    beforeEach(() => {
      cy.setUpApi({ currentMember: null });
    });
    it('Home', () => {
      cy.visit('/home');
      cy.url().should('include', '/auth/login');
    });
  });

  describe('Signed In', () => {
    const ENV = { items: [PackedFolderItemFactory()] };

    beforeEach(() => {
      cy.setUpApi(ENV);
    });

    describe('Load page correctly', () => {
      it('Home', () => {
        cy.visit('/home');
        cy.get(`#${HEADER_APP_BAR_ID}`).should('be.visible');
      });
      it('Item', () => {
        cy.visit(`/builder/items/${ENV.items[0].id}`);
        cy.get(`#${HEADER_APP_BAR_ID}`).should('be.visible');
        cy.get(`.${ITEM_MAIN_CLASS}`).should('be.visible');
      });
    });
  });
});
