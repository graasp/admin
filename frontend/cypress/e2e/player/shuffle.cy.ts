import { DiscriminatedItem } from '@graasp/sdk';

import {
  FOLDER_NAME_TITLE_CLASS,
  buildTreeItemClass,
} from '../../../src/config/selectors';
import {
  ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS,
  FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS,
  YET_ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS,
} from '../../fixtures/items';
import { MEMBERS } from '../../fixtures/members';
import { buildContentPagePath, expectFolderLayout } from './utils';

export const TREE_NODE_GROUP_CLASS = 'tree-node-group';

// Warning: shuffling order is dependent on member Id and item Id, which can change.
// re-enable this test once we can compute the order in advance without it depending on specific ids.
describe.skip('Shuffle', () => {
  describe('Anna', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [
          ...ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
          ...FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
        ],
      });
    });

    it('displays item with children in order', () => {
      const root = FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(buildContentPagePath({ rootId: root.id, itemId: root.id }));

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[index + 1].name,
          );
        });
    });

    it('displays item with children shuffled', () => {
      const root = FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      const shuffledOrder = [2, 4, 1, 3, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[shuffledOrder[index]]
              .name,
          );
        });
    });

    it('displays item with children shuffled when redirected', () => {
      const root = FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: '',
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      const shuffledOrder = [2, 4, 1, 3, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[shuffledOrder[index]]
              .name,
          );
        });
    });

    it('displays item with children shuffled in the same order on a second visit', () => {
      const root = FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      const shuffledOrder = [2, 4, 1, 3, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[shuffledOrder[index]]
              .name,
          );
        });
    });

    it('displays item with children shuffled differently for same user but a different item', () => {
      const root = ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      // this is the value for the other item: [2, 4, 1, 3, 5]
      const shuffledOrder = [1, 4, 3, 2, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[
              shuffledOrder[index]
            ].name,
          );
        });
    });
  });

  describe('Bob', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: MEMBERS.BOB,
        items: [
          ...ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
          ...FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
        ],
      });
    });

    it('displays item with children shuffled differently for a different user', () => {
      const root = FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      // this is the value for Anna: [2, 4, 1, 3, 5]
      const shuffledOrder = [1, 2, 3, 4, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[shuffledOrder[index]]
              .name,
          );
        });
    });

    it('displays item with children shuffled differently for a different user and different item', () => {
      const root = ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      // this is the value for the other item: [1, 2, 3, 4, 5]
      // and this is the value for Anna for this item: [1, 4, 3, 2, 5]
      const shuffledOrder = [3, 4, 2, 1, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[
              shuffledOrder[index]
            ].name,
          );
        });
    });
  });

  describe('Cedric', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: MEMBERS.CEDRIC,
        items: [
          ...YET_ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
          ...ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
          ...FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items,
        ],
      });
    });

    it('displays item with children shuffled differently for a different user', () => {
      const root = FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      // this is the value for Anna: [2, 4, 1, 3, 5]
      // and this is the value for Bob: [1, 2, 3, 4, 5]
      const shuffledOrder = [3, 2, 1, 4, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[shuffledOrder[index]]
              .name,
          );
        });
    });

    it('displays item with children shuffled differently for a different user and different item', () => {
      const root = ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      // this is the value for the other item: [3, 4, 2, 1, 5]
      const shuffledOrder = [3, 2, 1, 4, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[
              shuffledOrder[index]
            ].name,
          );
        });
    });

    it('displays item with children shuffled differently for a different user and another different item', () => {
      const root =
        YET_ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[0];
      cy.visit(
        buildContentPagePath({
          rootId: root.id,
          itemId: root.id,
          searchParams: 'shuffle=true',
        }),
      );

      cy.get(`.${FOLDER_NAME_TITLE_CLASS}`).should('contain', root.name);

      expectFolderLayout({
        rootId: root.id,
        items:
          YET_ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items as DiscriminatedItem[],
      });

      // shuffled order is always the same for a given member + item id
      // this is the value for the first other item: [3, 4, 2, 1, 5]
      // and this is the value for the second other item: [3, 2, 1, 4, 5]
      const shuffledOrder = [3, 4, 1, 2, 5];

      // last should always be last
      expect(shuffledOrder[shuffledOrder.length - 1]).to.equal(
        shuffledOrder.length,
      );

      cy.get(`.${buildTreeItemClass(root.id)}`)
        .siblings(`ul.${TREE_NODE_GROUP_CLASS}:first`)
        .children('li')
        .each(($li, index) => {
          // assert the text of each li matches the expected order
          cy.wrap($li).should(
            'have.text',
            YET_ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS.items[
              shuffledOrder[index]
            ].name,
          );
        });
    });
  });
});
