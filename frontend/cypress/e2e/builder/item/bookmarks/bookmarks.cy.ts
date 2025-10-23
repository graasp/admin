import {
  PackedFolderItemFactory,
  PackedItemBookmarkFactory,
} from '@graasp/sdk';

import {
  BOOKMARKED_ITEMS_ERROR_ALERT_ID,
  BOOKMARKED_ITEMS_ID,
  BOOKMARK_ICON_SELECTOR,
  BOOKMARK_MANAGE_BUTTON_ID,
  UNBOOKMARK_ICON_SELECTOR,
  buildBookmarkCardRemoveButton,
  buildItemBookmarkCard,
  buildItemCard,
} from '../../../../../src/config/selectors';
import { HOME_PATH } from '../../utils';

const BOOKMARKED_ITEMS = [
  PackedItemBookmarkFactory(),
  PackedItemBookmarkFactory(),
];
const ITEMS = BOOKMARKED_ITEMS.map(({ item }) => item);
const NON_BOOKMARKED_ITEM = PackedFolderItemFactory();

const removefromItemCard = (itemId: string) => {
  cy.get(`#${buildItemCard(itemId)} ${UNBOOKMARK_ICON_SELECTOR}`).click();
};
const removefromBookmarkCard = (itemId: string) => {
  cy.get(`#${BOOKMARK_MANAGE_BUTTON_ID} `).click();
  cy.get(buildBookmarkCardRemoveButton(itemId)).click();
};

const addToBookmark = (itemId: string) => {
  cy.get(`#${buildItemCard(itemId)} ${BOOKMARK_ICON_SELECTOR}`).click();
};

describe('Bookmarked Item', () => {
  describe('Member has no bookmarked items', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: ITEMS,
      });
      cy.visit(HOME_PATH);
    });

    it('Show no bookmark', () => {
      cy.get(`#${BOOKMARKED_ITEMS_ID}`).should('not.exist');
    });
  });

  describe('Member has bookmarked items', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [...ITEMS, NON_BOOKMARKED_ITEM],
        bookmarkedItems: BOOKMARKED_ITEMS,
      });
      cy.visit(HOME_PATH);
    });

    it('Check bookmarked items view', () => {
      for (const { item } of BOOKMARKED_ITEMS) {
        cy.get(`#${buildItemBookmarkCard(item.id)}`).should('be.visible');
      }
    });

    it('Add item to bookmarks', () => {
      cy.visit(HOME_PATH);

      const item = NON_BOOKMARKED_ITEM;

      addToBookmark(item.id);

      cy.wait('@bookmarkItem').then(({ request }) => {
        expect(request.url).to.contain(item.id);
      });
    });

    it('remove item from item card', () => {
      const itemId = ITEMS[1].id;

      removefromItemCard(itemId);

      cy.wait('@unbookmarkItem').then(({ request }) => {
        expect(request.url).to.contain(itemId);
      });
    });

    it('remove item from item card', () => {
      const itemId = ITEMS[1].id;

      removefromBookmarkCard(itemId);

      cy.wait('@unbookmarkItem').then(({ request }) => {
        expect(request.url).to.contain(itemId);
      });
    });
  });

  describe('Error Handling', () => {
    it('check bookmarked items view with server error', () => {
      cy.setUpApi({
        items: ITEMS,
        getBookmarkError: true,
      });
      cy.visit(HOME_PATH);

      cy.get(`#${BOOKMARKED_ITEMS_ERROR_ALERT_ID}`).should('exist');
    });
  });
});
