import { ItemType, PackedFolderItemFactory, PageItemType } from '@graasp/sdk';

import {
  ITEM_FORM_LINK_INPUT_ID,
  PAGE_TOOLBAR_INSERT_LINK_BUTTON_ID,
} from '../../../../../src/config/selectors';
import { buildItemPath } from '../../utils';

const page = {
  ...PackedFolderItemFactory(),
  type: ItemType.PAGE,
  extra: {} as never,
} as PageItemType;

describe('Pages', () => {
  it('Click on link card show options', () => {
    cy.setUpApi({
      items: [page],
    });
    cy.visit(buildItemPath(page.id));

    // write a sentence
    cy.get('.content-editable-root').type('something here{enter}');

    // add a link
    cy.get(`#${PAGE_TOOLBAR_INSERT_LINK_BUTTON_ID}`).click();
    cy.get(`#${ITEM_FORM_LINK_INPUT_ID}`).type('https://graasp.org');
    cy.get('button[type="submit"]').click();

    // click on the card opens the option menu
    cy.get('[data-testid="fancy-link-card"]').click();
    cy.get('[aria-label="Link"]').click();
  });
});
