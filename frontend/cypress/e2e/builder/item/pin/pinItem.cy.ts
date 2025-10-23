import { PackedFolderItemFactory } from '@graasp/sdk';

import {
  ITEM_HEADER_ID,
  PIN_ITEM_BUTTON_CLASS,
  buildItemsGridMoreButtonSelector,
} from '../../../../../src/config/selectors';
import { HOME_PATH, buildItemPath } from '../../utils';

const togglePinButton = (itemId: string) => {
  cy.get(buildItemsGridMoreButtonSelector(itemId)).click();
  cy.get(`.${PIN_ITEM_BUTTON_CLASS}`).click();
};

const PINNED_ITEM = PackedFolderItemFactory({ settings: { isPinned: true } });
const ITEM = PackedFolderItemFactory({ settings: { isPinned: false } });

describe('Anonymous', () => {
  const PUBLIC_TTEM = PackedFolderItemFactory(
    { settings: { isPinned: false } },
    { permission: null, publicVisibility: {} },
  );
  const itemId = PUBLIC_TTEM.id;
  beforeEach(() => {
    cy.setUpApi({ currentMember: null, items: [PUBLIC_TTEM] });
    cy.visit(buildItemPath(itemId));
  });
  it("Can see item but can't pin", () => {
    cy.get(`#${ITEM_HEADER_ID}`).should('be.visible');
    cy.get(`#${ITEM_HEADER_ID} [aria-label="More"]`).should('not.exist');
  });
});

describe('Pinning Item', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [PINNED_ITEM, ITEM] });
    cy.visit(HOME_PATH);
  });

  it('Pin an item', () => {
    const item = ITEM;

    togglePinButton(item.id);

    cy.wait(`@editItem`).then(
      ({
        request: {
          body: { settings },
        },
      }) => {
        expect(settings.isPinned).to.equals(true);
      },
    );
  });

  it('Unpin Item', () => {
    const item = PINNED_ITEM;

    togglePinButton(item.id);

    cy.wait('@editItem').then(
      ({
        request: {
          body: { settings },
        },
      }) => {
        expect(settings.isPinned).to.equals(false);
      },
    );
  });
});
