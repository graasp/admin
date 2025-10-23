import { FolderItemFactory, ItemLoginSchemaType } from '@graasp/sdk';

import {
  ENROLL_BUTTON_SELECTOR,
  ITEM_LOGIN_SIGN_IN_BUTTON_ID,
  ITEM_LOGIN_USERNAME_INPUT_ID,
} from '../../../src/config/selectors';
import { ItemForTest } from '../../support/types';
import { buildContentPagePath } from './utils';

describe('Pseudonimized access', () => {
  it('Logged out', () => {
    const rootItem: ItemForTest = {
      ...FolderItemFactory({ name: 'pseudo' }),
      itemLoginSchema: { type: `${ItemLoginSchemaType.Username}` },
    };
    const items = [rootItem];
    cy.setUpApi({
      currentMember: null,
      items,
    });

    cy.visit(
      buildContentPagePath({ rootId: rootItem.id, itemId: rootItem.id }),
    );

    cy.wait('@getItemLoginSchemaType');

    // login
    cy.get(`#${ITEM_LOGIN_USERNAME_INPUT_ID}`).type('pseudo');
    cy.get(`#${ITEM_LOGIN_SIGN_IN_BUTTON_ID}`).click();

    cy.wait('@postItemLogin').then(({ request }) => {
      expect(request.body.username).to.eq('pseudo');
    });
  });

  it('Enroll', () => {
    const rootItem: ItemForTest = {
      ...FolderItemFactory({ name: 'pseudo' }),
      itemLoginSchema: { type: `${ItemLoginSchemaType.Username}` },
    };
    const items = [rootItem];
    cy.setUpApi({
      items,
    });

    cy.visit(
      buildContentPagePath({ rootId: rootItem.id, itemId: rootItem.id }),
    );

    cy.get(`[data-cy=${ENROLL_BUTTON_SELECTOR}]`).click();

    cy.wait('@enroll');
  });
});
