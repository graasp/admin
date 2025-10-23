import { EtherpadPermission, PackedEtherpadItemFactory } from '@graasp/sdk';

import { buildItemPath } from '../../utils';

describe('Etherpad', () => {
  it('view etherpad with readerPermission=read', () => {
    const itemToEdit = PackedEtherpadItemFactory({
      extra: {
        etherpad: {
          padID: 'padId',
          groupID: 'groupId',
          readerPermission: EtherpadPermission.Read,
        },
      },
    });
    cy.setUpApi({ items: [itemToEdit] });

    cy.intercept(`/items/etherpad/view/${itemToEdit.id}?mode=write`).as(
      'viewEtherpad',
    );

    const { id } = itemToEdit;
    cy.visit(buildItemPath(id));

    cy.wait('@viewEtherpad');
  });

  it('view etherpad with readerPermission=write', () => {
    const itemToEdit = PackedEtherpadItemFactory({
      extra: {
        etherpad: {
          padID: 'padId',
          groupID: 'groupId',
          readerPermission: EtherpadPermission.Write,
        },
      },
    });
    cy.setUpApi({ items: [itemToEdit] });

    cy.intercept(`/items/etherpad/view/${itemToEdit.id}?mode=write`).as(
      'viewEtherpad',
    );

    const { id } = itemToEdit;
    cy.visit(buildItemPath(id));

    cy.wait('@viewEtherpad');
  });
});
