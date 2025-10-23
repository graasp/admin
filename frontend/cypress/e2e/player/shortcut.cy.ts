import {
  PackedFolderItemFactory,
  PackedShortcutItemFactory,
} from '@graasp/sdk';

import { v4 } from 'uuid';

import {
  BACK_TO_SHORTCUT_ID,
  buildFolderButtonId,
} from '../../../src/config/selectors';
import { buildContentPagePath } from './utils';

describe('Shortcuts', () => {
  it('Come back from shortcut navigation', () => {
    const parentItem = PackedFolderItemFactory({
      name: 'parent item',
      settings: {},
    });
    const toShortcut = PackedFolderItemFactory({
      name: 'target folder',
      settings: {},
    });
    const shortcut = PackedShortcutItemFactory({
      name: 'shortcut',
      parentItem,
      settings: {},
      extra: { shortcut: { target: toShortcut.id } },
    });
    cy.setUpApi({ items: [parentItem, shortcut, toShortcut] });

    cy.visit(
      buildContentPagePath({ rootId: parentItem.id, itemId: parentItem.id }),
    );

    // click on folder shortcut
    cy.get(`#${buildFolderButtonId(toShortcut.id)}`).click();
    cy.url()
      .should('contain', 'from')
      .and('contain', parentItem.id)
      .and('contain', 'fromName')
      .and('contain', 'parent+item');

    cy.wait(3000);

    // go back to origin
    cy.get(`#${BACK_TO_SHORTCUT_ID}`).click();
    cy.url().should('contain', parentItem.id);
  });

  it('Keep other params from shortcut navigation like shuffle', () => {
    const parentItem = PackedFolderItemFactory({
      name: 'parent item',
      settings: {},
    });
    const toShortcut = PackedFolderItemFactory({
      name: 'target folder',
      settings: {},
    });
    const shortcut = PackedShortcutItemFactory({
      name: 'shortcut',
      parentItem,
      settings: {},
      extra: { shortcut: { target: toShortcut.id } },
    });
    cy.setUpApi({ items: [parentItem, shortcut, toShortcut] });

    cy.visit(
      buildContentPagePath({
        rootId: parentItem.id,
        itemId: parentItem.id,
        searchParams: 'fullscreen=true',
      }),
    );

    // click on folder shortcut
    cy.get(`#${buildFolderButtonId(toShortcut.id)}`).click();
    cy.url()
      .should('contain', 'from')
      .and('contain', parentItem.id)
      .and('contain', 'fromName')
      .and('contain', 'parent+item')
      .and('contain', 'fullscreen=true');

    // go back to origin
    cy.get(`#${BACK_TO_SHORTCUT_ID}`).click();
    cy.url().should('contain', parentItem.id).and('contain', 'fullscreen=true');
  });

  it('No from name does not show button', () => {
    const parentItem = PackedFolderItemFactory({ name: 'parent item' });
    cy.setUpApi({ items: [parentItem] });

    cy.visit(
      `${buildContentPagePath({
        rootId: parentItem.id,
        itemId: parentItem.id,
      })}?from=/${v4()}`,
    );

    // need wait for wrongly shown button to appear
    cy.wait(1000);

    // should not show from button
    cy.get(`#${BACK_TO_SHORTCUT_ID}`).should('not.exist');
  });

  it('Hacking query params is safe', () => {
    const parentItem = PackedFolderItemFactory({ name: 'parent item' });
    cy.setUpApi({ items: [parentItem] });

    cy.visit(
      `${buildContentPagePath({
        rootId: parentItem.id,
        itemId: parentItem.id,
      })}?from=/idid&fromName=shouldnotdisplay`,
    );

    // need wait for wrongly shown button to appear
    cy.wait(1000);

    // should not show from button
    cy.get(`#${BACK_TO_SHORTCUT_ID}`).should('not.exist');
  });

  it('Hacking from url with external url is safe', () => {
    const parentItem = PackedFolderItemFactory({ name: 'parent item' });
    cy.setUpApi({ items: [parentItem] });

    cy.visit(
      `${buildContentPagePath({
        rootId: parentItem.id,
        itemId: parentItem.id,
      })}?from=http://example.org&fromName=shouldnotdisplay`,
    );

    // need wait for wrongly shown button to appear
    cy.wait(1000);

    // should not show from button
    cy.get(`#${BACK_TO_SHORTCUT_ID}`).should('not.exist');
  });
});
