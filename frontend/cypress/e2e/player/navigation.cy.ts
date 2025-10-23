import {
  LinkItemFactory,
  PackedFolderItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import {
  NEXT_ITEM_NAV_BUTTON_ID,
  PREVIOUS_ITEM_NAV_BUTTON_ID,
  TREE_VIEW_ID,
  buildTreeItemClass,
} from '../../../src/config/selectors';
import {
  FOLDER_WITH_SUBFOLDER_ITEM,
  FOLDER_WITH_SUBFOLDER_ITEM_AND_PARTIAL_ORDER,
} from '../../fixtures/items';
import { CURRENT_MEMBER } from '../../fixtures/members';
import { buildContentPagePath, buildMainPath } from './utils';

describe('Navigation', () => {
  it('Show navigation island on root item', () => {
    cy.setUpApi({ items: FOLDER_WITH_SUBFOLDER_ITEM.items });
    const rootId = FOLDER_WITH_SUBFOLDER_ITEM.items[0].id;
    const itemId = FOLDER_WITH_SUBFOLDER_ITEM.items[1].id;
    const rootPage = buildContentPagePath({ rootId, itemId: rootId });
    cy.visit(rootPage);

    // previous should be disabled, but visible
    cy.get(`#${PREVIOUS_ITEM_NAV_BUTTON_ID}`)
      .should('be.visible')
      .and('not.have.attr', 'href');

    // next should be visible and enabled
    cy.get(`#${NEXT_ITEM_NAV_BUTTON_ID}`).should('be.visible').click();
    cy.url().should('contain', buildContentPagePath({ rootId, itemId }));
    // both previous and next are enabled
    cy.get(`#${PREVIOUS_ITEM_NAV_BUTTON_ID}`)
      .should('be.visible')
      .and('have.attr', 'href');
    cy.get(`#${NEXT_ITEM_NAV_BUTTON_ID}`)
      .should('be.visible')
      .and('have.attr', 'href');

    cy.get(`#${PREVIOUS_ITEM_NAV_BUTTON_ID}`).click();
    cy.url().should('contain', rootPage);
  });

  it('Expand folder when navigating', () => {
    cy.setUpApi({ items: FOLDER_WITH_SUBFOLDER_ITEM.items });
    const parent = FOLDER_WITH_SUBFOLDER_ITEM.items[0];
    cy.visit(buildMainPath({ rootId: parent.id }));

    const child = FOLDER_WITH_SUBFOLDER_ITEM.items[1];
    const childOfChild = FOLDER_WITH_SUBFOLDER_ITEM.items[3];
    // we need to to use the `:visible` meta selector because there are 2 navigations (one for mobile hidden, and one for desktop)
    cy.get(`.${buildTreeItemClass(child.id)}:visible`).click();
    cy.get(`.${buildTreeItemClass(childOfChild.id)}:visible`).should(
      'be.visible',
    );
  });

  it('Show all folders for partial order', () => {
    cy.setUpApi({ items: FOLDER_WITH_SUBFOLDER_ITEM_AND_PARTIAL_ORDER.items });
    const parent = FOLDER_WITH_SUBFOLDER_ITEM_AND_PARTIAL_ORDER.items[0];
    cy.visit(buildMainPath({ rootId: parent.id }));

    const child = FOLDER_WITH_SUBFOLDER_ITEM_AND_PARTIAL_ORDER.items[1];
    const child1 = FOLDER_WITH_SUBFOLDER_ITEM_AND_PARTIAL_ORDER.items[2];
    cy.get(`.${buildTreeItemClass(child.id)}`).should('be.visible');
    cy.get(`.${buildTreeItemClass(child1.id)}`).should('be.visible');
  });

  it('Navigate successfully when opening child as root', () => {
    cy.setUpApi({ items: FOLDER_WITH_SUBFOLDER_ITEM.items });
    const child = FOLDER_WITH_SUBFOLDER_ITEM.items[1];
    cy.visit(buildMainPath({ rootId: child.id }));

    const childOfChild = FOLDER_WITH_SUBFOLDER_ITEM.items[3];
    // we need to to use the `:visible` meta selector because there are 2 navigations (one for mobile hidden, and one for desktop)
    cy.get(`.${buildTreeItemClass(child.id)}:visible`).click();
    cy.get(`.${buildTreeItemClass(childOfChild.id)}:visible`).should(
      'be.visible',
    );
  });
});

describe('Internal navigation', () => {
  it('Open a /:rootId link works', () => {
    const firstCourse = PackedFolderItemFactory(
      {
        name: 'Parent',
        creator: CURRENT_MEMBER,
      },
      { permission: PermissionLevel.Admin },
    );
    const target = PackedFolderItemFactory(
      {
        name: 'Target',
        creator: CURRENT_MEMBER,
      },
      { permission: PermissionLevel.Admin },
    );
    const url = new URL(
      `/player/${target.id}`,
      window.location.origin,
    ).toString();
    const link = LinkItemFactory({
      name: 'Link to target',
      extra: {
        embeddedLink: {
          url,
        },
      },
      settings: { isCollapsible: false },
      parentItem: firstCourse,
      creator: CURRENT_MEMBER,
    });
    cy.setUpApi({
      items: [target, firstCourse, link],
    });
    cy.visit(
      buildContentPagePath({ rootId: firstCourse.id, itemId: firstCourse.id }),
    );
    cy.get('h1').should('contain', firstCourse.name);
    cy.get(`#${link.id}`).click();

    cy.url().should('contain', url);

    cy.get('h1').should('contain', target.name);

    cy.get(`#${TREE_VIEW_ID}`).should('contain', target.name);
  });
});
