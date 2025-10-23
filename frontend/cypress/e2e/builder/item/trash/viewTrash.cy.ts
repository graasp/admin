import {
  GuestFactory,
  ItemLoginSchemaFactory,
  PackedFolderItemFactory,
  PackedRecycledItemDataFactory,
} from '@graasp/sdk';

import {
  PREVENT_GUEST_MESSAGE_ID,
  RECYCLED_ITEMS_EMPTY_ID,
  RECYCLED_ITEMS_ERROR_ALERT_ID,
  buildItemCard,
} from '../../../../../src/config/selectors';
import { RECYCLE_BIN_PATH } from '../../utils';

const recycledItemData = [
  PackedRecycledItemDataFactory(),
  PackedRecycledItemDataFactory(),
  PackedRecycledItemDataFactory(),
];

describe('View trash', () => {
  it('Show message for guest', () => {
    const item = PackedFolderItemFactory();
    const guest = GuestFactory({
      itemLoginSchema: ItemLoginSchemaFactory({ item }),
    });
    cy.setUpApi({ items: [item], currentMember: null, currentGuest: guest });
    cy.visit(RECYCLE_BIN_PATH);
    cy.get(`#${PREVENT_GUEST_MESSAGE_ID}`).should('be.visible');
  });

  describe('Member has no recycled items', () => {
    it('Show empty table', () => {
      cy.setUpApi({
        items: recycledItemData.map(({ item }) => item),
      });
      cy.visit(RECYCLE_BIN_PATH);
      cy.get(`#${RECYCLED_ITEMS_EMPTY_ID}`).should(
        'contain',
        'You trash is empty.',
      );
    });
  });

  describe('Member has recycled items', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: recycledItemData.map(({ item }) => item),
        recycledItemData,
      });
      cy.visit(RECYCLE_BIN_PATH);
    });

    it('check recycled item layout', () => {
      for (const { item } of recycledItemData) {
        cy.get(`#${buildItemCard(item.id)}`).should('be.visible');
      }
    });
  });

  describe('Error Handling', () => {
    it('check recycled item layout with server error', () => {
      cy.setUpApi({
        items: recycledItemData.map(({ item }) => item),
        recycledItemData,
        getRecycledItemsError: true,
      });
      cy.visit(RECYCLE_BIN_PATH);

      cy.get(`#${RECYCLED_ITEMS_ERROR_ALERT_ID}`).should('exist');
    });
  });
});
