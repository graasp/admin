import { v4 } from 'uuid';

import {
  ITEM_LOGIN_SCREEN_FORBIDDEN_ID,
  REQUEST_MEMBERSHIP_BUTTON_ID,
} from '../../../../../src/config/selectors';
import { buildItemPath } from '../../utils';

describe('Item does not exist', () => {
  it('Show forbidden message and cannot request membership', () => {
    cy.setUpApi();
    cy.visit(buildItemPath(v4()));

    // show forbidden message
    cy.get(`#${ITEM_LOGIN_SCREEN_FORBIDDEN_ID}`).should('be.visible');

    // do not show request membership button
    cy.get(`#${REQUEST_MEMBERSHIP_BUTTON_ID}`).should('not.exist');
  });
});
