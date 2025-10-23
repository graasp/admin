import { FlagType, PackedFolderItemFactory } from '@graasp/sdk';

import {
  ITEM_MENU_FLAG_BUTTON_CLASS,
  buildFlagListItemId,
  buildItemsGridMoreButtonSelector,
} from '../../../../../src/config/selectors';
import { HOME_PATH } from '../../utils';

const openFlagItemModal = (itemId: string) => {
  cy.get(buildItemsGridMoreButtonSelector(itemId)).click();
  cy.get(`.${ITEM_MENU_FLAG_BUTTON_CLASS}`).click();
};

const flagItem = (itemId: string, type: FlagType) => {
  openFlagItemModal(itemId);

  const flagListItem = cy.get(`#${buildFlagListItemId(type)}`);

  flagListItem.click();

  const flagItemButton = cy.get(`button:contains("Flag")`);

  flagItemButton.click();
};

const FOLDER = PackedFolderItemFactory();

describe('Flag Item', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [FOLDER] });
    cy.visit(HOME_PATH);
  });

  it('flag item', () => {
    const item = FOLDER;
    const type = FlagType.FalseInformation;

    flagItem(item.id, type);

    cy.wait('@postItemFlag').then(
      ({
        request: {
          url,
          body: { type: flagType },
        },
      }) => {
        expect(flagType).to.equal(type);
        expect(url).to.contain(item.id);
      },
    );
  });
});
