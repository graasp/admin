import { PackedEtherpadItemFactory } from '@graasp/sdk';

import { buildContentPagePath } from './utils';

describe('Etherpad', () => {
  it('view etherpad', () => {
    const itemToEdit = PackedEtherpadItemFactory({
      extra: {
        etherpad: {
          padID: 'padId',
          groupID: 'groupId',
        },
      },
    });
    cy.setUpApi({ items: [itemToEdit] });

    cy.intercept(`/items/etherpad/view/${itemToEdit.id}?mode=write`).as(
      'viewEtherpad',
    );

    const { id } = itemToEdit;
    cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

    cy.wait('@viewEtherpad');
  });
});
