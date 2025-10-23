import { buildCollapsibleId } from '../../../src/config/selectors';
import { FOLDER_WITH_COLLAPSIBLE_SHORTCUT_ITEMS } from '../../fixtures/items';
import { buildContentPagePath } from './utils';

describe('Collapsible', () => {
  beforeEach(() => {
    cy.setUpApi({
      items: FOLDER_WITH_COLLAPSIBLE_SHORTCUT_ITEMS.items,
    });
  });

  it('Shows a collapsible wrapper around a collapsible shortcut', () => {
    const parent = FOLDER_WITH_COLLAPSIBLE_SHORTCUT_ITEMS.items[1];
    cy.visit(buildContentPagePath({ rootId: parent.id, itemId: parent.id }));
    const collapsedShortcut = FOLDER_WITH_COLLAPSIBLE_SHORTCUT_ITEMS.items[2];
    // collapsible document should show as collapsed
    cy.get(`#${buildCollapsibleId(collapsedShortcut.id)}`)
      .should('be.visible')
      .and('contain.text', collapsedShortcut.name);
  });
});
