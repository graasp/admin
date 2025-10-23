import { DescriptionPlacement, PackedFileItemFactory } from '@graasp/sdk';

import {
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_SETTING_DESCRIPTION_PLACEMENT_SELECT_ID,
  TEXT_EDITOR_CLASS,
  buildDataCyWrapper,
  buildDescriptionPlacementId,
  buildEditButtonId,
  buildItemMenuDataCy,
} from '../../../../../src/config/selectors';
import { EDIT_ITEM_PAUSE } from '../../../../support/constants';
import {
  editCaptionFromViewPage,
  editItem,
} from '../../../../support/editUtils';
import { FileItemForTest } from '../../../../support/types';
import { MOCK_IMAGE_URL, MOCK_VIDEO_URL } from '../../fixtures/fileLinks';
import { ICON_FILEPATH, VIDEO_FILEPATH } from '../../fixtures/files';
import { HOME_PATH, buildItemPath } from '../../utils';

const EDITED_FIELDS = {
  name: 'new name',
};

const IMAGE_ITEM: FileItemForTest = {
  ...PackedFileItemFactory(),
  // for testing: creating needs a fixture, reading needs an url
  createFilepath: ICON_FILEPATH,
  readFilepath: MOCK_IMAGE_URL,
};

const VIDEO_ITEM: FileItemForTest = {
  ...PackedFileItemFactory(),
  // for testing: creating needs a fixture, reading needs an url
  createFilepath: VIDEO_FILEPATH,
  readFilepath: MOCK_VIDEO_URL,
};

describe('Edit File', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [IMAGE_ITEM, VIDEO_ITEM] });
  });

  describe('View Page', () => {
    it("edit file's caption", () => {
      const { id } = IMAGE_ITEM;
      cy.visit(buildItemPath(id));
      const caption = 'new caption';
      editCaptionFromViewPage({ id, caption });
      cy.wait(`@editItem`).then(({ request: { url, body } }) => {
        expect(url).to.contain(id);
        // caption content might be wrapped with html tags
        expect(body?.description).to.contain(caption);
      });
    });

    // test is skipped because of flakiness in CI.
    it.skip('edit description placement to above', () => {
      const { id } = IMAGE_ITEM;
      cy.visit(buildItemPath(id));

      cy.get(`#${buildEditButtonId(id)}`).click();

      cy.get(`#${ITEM_SETTING_DESCRIPTION_PLACEMENT_SELECT_ID}`)
        .should('be.visible')
        .click();
      cy.get(
        `#${buildDescriptionPlacementId(DescriptionPlacement.ABOVE)}`,
      ).click();
      cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).click();

      cy.wait(`@editItem`).then(({ request: { url, body } }) => {
        expect(url).to.contain(id);
        expect(body?.settings).to.contain({
          descriptionPlacement: DescriptionPlacement.ABOVE,
        });
      });
    });

    it("cancel file's caption", () => {
      const { id } = IMAGE_ITEM;
      cy.visit(buildItemPath(id));
      cy.get(`#${buildEditButtonId(id)}`).click();
      cy.get(`#${EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}`).click();
      // button should not exist anymore
      cy.get(`.${TEXT_EDITOR_CLASS}`).should('exist');
      cy.get(`#${EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}`).should('not.exist');
    });
  });

  it('edit file on Home', () => {
    cy.visit(HOME_PATH);

    const itemToEdit = IMAGE_ITEM;

    // edit
    cy.get(buildDataCyWrapper(buildItemMenuDataCy(itemToEdit.id))).click();
    editItem({
      ...itemToEdit,
      ...EDITED_FIELDS,
    });

    cy.wait('@editItem').then(
      ({
        response: {
          body: { id, name },
        },
      }) => {
        // check item is edited and updated
        expect(id).to.equal(itemToEdit.id);
        expect(name).to.equal(EDITED_FIELDS.name);
        cy.wait(EDIT_ITEM_PAUSE);
        cy.wait('@getAccessibleItems');
      },
    );
  });
});
