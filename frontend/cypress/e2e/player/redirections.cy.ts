import {
  FolderItemFactory,
  GuestFactory,
  ItemLoginSchemaFactory,
  ItemLoginSchemaType,
} from '@graasp/sdk';

import { FORBIDDEN_CONTENT_CONTAINER_ID } from '../../../src/config/selectors';
import { FOLDER_WITH_SUBFOLDER_ITEM } from '../../fixtures/items';
import { TestHelper, buildContentPagePath, buildMainPath } from './utils';

const item = FolderItemFactory({ name: 'Pseudo Item' });
const pseudoMember = GuestFactory({
  name: 'bob-guest',
  itemLoginSchema: ItemLoginSchemaFactory({
    type: ItemLoginSchemaType.Username,
    item,
  }),
});

describe('Item page', () => {
  describe('Logged out', () => {
    beforeEach(() => {
      const helper = new TestHelper({
        item,
        pseudoMember,
        initiallyIsLoggedIn: false,
        returnItemLoginSchemaType: false,
      });
      helper.setupServer();

      cy.visit(buildMainPath({ rootId: item.id }));
    });

    it('Should redirect to auth with url parameter', () => {
      cy.get(`#${FORBIDDEN_CONTENT_CONTAINER_ID} a`)
        .should('be.visible')
        .click();
      cy.url().should('include', `?url=`);
    });
  });
  describe('Logged in', () => {
    beforeEach(() => {
      const helper = new TestHelper({
        item,
        pseudoMember,
        initiallyIsLoggedIn: true,
        returnItemLoginSchemaType: false,
        hasAccessToItem: false,
      });
      helper.setupServer();

      cy.visit(buildMainPath({ rootId: item.id }));
    });

    it('Should redirect to auth with url parameter', () => {
      cy.get(`#${FORBIDDEN_CONTENT_CONTAINER_ID} button`)
        .should('be.visible')
        .click();
      cy.url().should('include', `?url=`);
    });
  });
});

describe('Platform switch', () => {
  const parent = FOLDER_WITH_SUBFOLDER_ITEM.items[0];
  const child = FOLDER_WITH_SUBFOLDER_ITEM.items[1];
  beforeEach(() => {
    cy.setUpApi({
      items: FOLDER_WITH_SUBFOLDER_ITEM.items,
    });
    // go to child
    cy.visit(buildContentPagePath({ rootId: parent.id, itemId: child.id }));
  });
  ['builder', 'analytics'].forEach((platform) => {
    it(platform, () => {
      cy.get(`[data-testid="${platform}"]`).click();
      cy.url().should('contain', `/${platform}/items/${child.id}`);
    });
  });
});
