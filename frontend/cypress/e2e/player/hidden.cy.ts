import {
  DocumentItemFactory,
  PackedDocumentItemFactory,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import { buildDocumentId } from '../../../src/config/selectors';
import { MEMBERS } from '../../fixtures/members';
import { ItemForTest } from '../../support/types';
import { buildContentPagePath } from './utils';

const parentItem = PackedFolderItemFactory({
  name: 'parent folder',
  settings: {
    isPinned: false,
    showChatbox: false,
  },
});
const FOLDER_WITH_HIDDEN_ITEMS: ItemForTest[] = [
  parentItem,
  DocumentItemFactory({ parentItem, settings: { isCollapsible: false } }),
  PackedDocumentItemFactory(
    { parentItem, settings: { isCollapsible: false } },
    { hiddenVisibility: {} },
  ),
  PackedDocumentItemFactory(
    {
      name: 'hidden document',
      settings: {
        isPinned: false,
        showChatbox: false,
        isCollapsible: false,
      },
      parentItem,
    },
    { hiddenVisibility: {} },
  ),
];

describe('Hidden Items', () => {
  it("Don't display Hidden items when viewing as admin", () => {
    const items = FOLDER_WITH_HIDDEN_ITEMS;

    cy.setUpApi({
      items,
    });

    const parent = items[0];
    cy.visit(buildContentPagePath({ rootId: parent.id, itemId: parent.id }));

    // hidden document should not be displayed
    cy.get(`#${buildDocumentId(items[1].id)}`).should('be.visible');
    cy.get(`#${buildDocumentId(items[2].id)}`).should('not.exist');
  });

  it("Don't display Hidden items when viewing as writer", () => {
    const items = FOLDER_WITH_HIDDEN_ITEMS;
    cy.setUpApi({
      currentMember: MEMBERS.CEDRIC,
      items,
    });

    const parent = items[0];
    cy.visit(buildContentPagePath({ rootId: parent.id, itemId: parent.id }));

    cy.get(`#${buildDocumentId(items[1].id)}`).should('be.visible');
    // hidden document should not be displayed
    cy.get(`#${buildDocumentId(items[2].id)}`).should('not.exist');
  });

  it("Don't display Hidden items when viewing as reader", () => {
    const items = FOLDER_WITH_HIDDEN_ITEMS;
    cy.setUpApi({
      currentMember: MEMBERS.BOB,
      items,
    });

    const parent = items[0];
    cy.visit(buildContentPagePath({ rootId: parent.id, itemId: parent.id }));

    cy.get(`#${buildDocumentId(items[1].id)}`).should('be.visible');
    // hidden document should not be displayed
    cy.get(`#${buildDocumentId(items[2].id)}`).should('not.exist');
  });

  it("Don't display Hidden items when viewing as public", () => {
    const publicParentItem = PackedFolderItemFactory(
      {
        name: 'public parent folder with hidden child',
        description: '',
        settings: {
          isPinned: false,
          showChatbox: false,
        },
      },
      { permission: null, publicVisibility: {} },
    );
    const PUBLIC_FOLDER_WITH_HIDDEN_ITEMS: { items: ItemForTest[] } = {
      items: [
        publicParentItem,
        PackedDocumentItemFactory(
          { parentItem: publicParentItem, settings: { isCollapsible: false } },
          { permission: null, publicVisibility: {} },
        ),
        PackedDocumentItemFactory(
          { parentItem: publicParentItem },
          { permission: null, publicVisibility: {}, hiddenVisibility: {} },
        ),
      ],
    };
    const { items } = PUBLIC_FOLDER_WITH_HIDDEN_ITEMS;
    cy.setUpApi({
      currentMember: MEMBERS.CEDRIC,
      items,
    });

    const parent = items[0];
    cy.visit(buildContentPagePath({ rootId: parent.id, itemId: parent.id }));

    cy.get(`#${buildDocumentId(items[1].id)}`).should('be.visible');
    // hidden document should not be displayed
    cy.get(`#${buildDocumentId(items[2].id)}`).should('not.exist');
  });
});
