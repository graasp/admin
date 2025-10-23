import {
  GuestFactory,
  ItemLoginSchemaFactory,
  ItemLoginSchemaType,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import { HEADER_MEMBER_MENU_BUTTON_ID } from '../../../src/config/selectors';

const folder = PackedFolderItemFactory();
const itemLoginSchema = ItemLoginSchemaFactory({
  type: ItemLoginSchemaType.Username,
  item: folder,
});
const guest = GuestFactory({ itemLoginSchema });

describe('Header', () => {
  describe('Sign out', () => {
    it('User menu', () => {
      cy.setUpApi();
      cy.visit('/home');
      // sign out
      cy.get(`#${HEADER_MEMBER_MENU_BUTTON_ID}`).click();
      cy.get('li').contains('Log out').click();
      cy.url().should('include', '/auth/login');
    });
  });
  describe('Guest', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [folder],
        currentMember: null,
        currentGuest: guest,
      });
    });
    it('does not see language switch on landing', () => {
      cy.visit('/');
      cy.get('a').contains('Go back to').should('be.visible');
      // guest does not see the language switch
      cy.get('#languageSwitch').should('not.exist');
    });
    it('does not see language switch on item page', () => {
      cy.visit(`/builder/items/${folder.id}`);
      cy.get(`#${HEADER_MEMBER_MENU_BUTTON_ID}`).should('be.visible');
      // guest does not see the language switch
      cy.get('#languageSwitch').should('not.exist');
    });
  });
});
