import {
  GuestFactory,
  ItemLoginSchemaFactory,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import {
  CREATE_ITEM_BUTTON_ID,
  ITEM_SEARCH_INPUT_ID,
  PREVENT_GUEST_MESSAGE_ID,
  PUBLISHED_ITEMS_EMPTY_ID,
  PUBLISHED_ITEMS_EMPTY_SEARCH_RESULT_ID,
  PUBLISHED_ITEMS_ERROR_ALERT_ID,
  PUBLISHED_ITEMS_ID,
  SORTING_ORDERING_SELECTOR_ASC,
  SORTING_ORDERING_SELECTOR_DESC,
  SORTING_SELECT_SELECTOR,
  buildItemCard,
} from '../../../../../src/config/selectors';
import { SortingOptions } from '../../../../../src/modules/builder/components/table/types';
import { CURRENT_MEMBER } from '../../../../fixtures/members';
import { PublishedItemFactory } from '../../fixtures/items';
import { PUBLISHED_ITEMS_PATH } from '../../utils';

const items = [
  PublishedItemFactory(PackedFolderItemFactory({ creator: CURRENT_MEMBER })),
  PublishedItemFactory(PackedFolderItemFactory({ creator: CURRENT_MEMBER })),
  PublishedItemFactory(PackedFolderItemFactory({ creator: CURRENT_MEMBER })),
];
const publishedItemData = items.map(({ published }) => published);

describe('Published Items', () => {
  it('Show message for guest', () => {
    const item = PackedFolderItemFactory();
    const guest = GuestFactory({
      itemLoginSchema: ItemLoginSchemaFactory({ item }),
    });
    cy.setUpApi({ items: [item], currentMember: null, currentGuest: guest });
    cy.visit(PUBLISHED_ITEMS_PATH);
    cy.get(`#${PREVENT_GUEST_MESSAGE_ID}`).should('be.visible');
  });

  describe('Member has no published items', () => {
    it('Show empty table', () => {
      cy.setUpApi({
        items: [PackedFolderItemFactory()],
      });
      cy.visit(PUBLISHED_ITEMS_PATH);

      cy.get(`#${PUBLISHED_ITEMS_EMPTY_ID}`).should(
        'contain',
        "You didn't publish any items.",
      );
    });
  });

  describe('Member has published items', () => {
    beforeEach(() => {
      cy.setUpApi({
        items,
        publishedItemData,
      });
      cy.visit(PUBLISHED_ITEMS_PATH);
    });

    it('Empty search', () => {
      // wait for content to have loaded
      cy.wait('@getPublishedItemsForMember');
      const searchText = 'mysearch';
      cy.get(`#${ITEM_SEARCH_INPUT_ID}`)
        .should('not.be.disabled')
        .type(searchText);

      cy.get(`#${PUBLISHED_ITEMS_EMPTY_SEARCH_RESULT_ID}`).should(
        'contain',
        `No published item found for ${searchText}`,
      );
    });

    it('New button should not exist', () => {
      cy.get(`#${CREATE_ITEM_BUTTON_ID}`).should('not.exist');
    });

    it('check recycled item layout', () => {
      for (const { id } of items) {
        cy.get(`#${buildItemCard(id)}`).should('be.visible');
      }
    });

    it('Sorting & Ordering', () => {
      cy.get(`${SORTING_SELECT_SELECTOR} input`).should(
        'have.value',
        SortingOptions.ItemUpdatedAt,
      );
      cy.get(SORTING_ORDERING_SELECTOR_DESC).should('be.visible');

      cy.get(SORTING_SELECT_SELECTOR).click();
      cy.get('li[data-value="item.name"]').click();

      // check items are ordered by name
      cy.get(`#${PUBLISHED_ITEMS_ID} h5`).then(($e) => {
        items.sort((a, b) => (a.name < b.name ? 1 : -1));
        for (let idx = 0; idx < items.length; idx += 1) {
          expect($e[idx].innerText).to.eq(items[idx].name);
        }
      });

      // change ordering
      cy.get(SORTING_ORDERING_SELECTOR_DESC).click();
      cy.get(SORTING_ORDERING_SELECTOR_ASC).should('be.visible');
      cy.get(`#${PUBLISHED_ITEMS_ID} h5`).then(($e) => {
        items.reverse();
        for (let idx = 0; idx < items.length; idx += 1) {
          expect($e[idx].innerText).to.eq(items[idx].name);
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('check recycled item layout with server error', () => {
      cy.setUpApi({
        items,
        publishedItemData,
        getPublishedItemsError: true,
      });
      cy.visit(PUBLISHED_ITEMS_PATH);

      cy.get(`#${PUBLISHED_ITEMS_ERROR_ALERT_ID}`).should('exist');
    });
  });
});
