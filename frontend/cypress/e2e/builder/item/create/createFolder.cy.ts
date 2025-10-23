import { PackedFolderItemFactory } from '@graasp/sdk';

import { MAX_DESCRIPTION_LENGTH } from '../../../../../src/config/constants';
import {
  FOLDER_FORM_DESCRIPTION_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_SETTING_DESCRIPTION_PLACEMENT_SELECT_ID,
} from '../../../../../src/config/selectors';
import { createFolder } from '../../../../support/createUtils';
import { HOME_PATH, buildItemPath } from '../../utils';

describe('Create Folder', () => {
  it('create folder on Home', () => {
    cy.setUpApi();
    cy.visit(HOME_PATH);

    // create
    createFolder({ name: 'created item' });

    cy.wait(['@postItem', '@getAccessibleItems']);
  });

  it('create folder in item', () => {
    const FOLDER = PackedFolderItemFactory();
    const CHILD = PackedFolderItemFactory({ parentItem: FOLDER });
    cy.setUpApi({ items: [FOLDER, CHILD] });
    const { id } = FOLDER;

    // go to children item
    cy.visit(buildItemPath(id));

    // create
    createFolder({ name: 'created item' });

    cy.wait('@postItem').then(({ request: { url } }) => {
      expect(url).to.contain(FOLDER.id);
      // add after child
      expect(url).to.contain(CHILD.id);
    });
  });

  it('cannot create folder with blank name in item', () => {
    // create
    cy.setUpApi();
    cy.visit(HOME_PATH);
    createFolder({ name: ' ' }, { confirm: false });

    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).should('be.disabled');
  });

  it('cannot create folder with description too long', () => {
    // create
    cy.setUpApi();
    cy.visit(HOME_PATH);
    createFolder(
      { name: 'correct', description: 'x'.repeat(MAX_DESCRIPTION_LENGTH + 10) },
      { confirm: false },
    );

    cy.get(`#${ITEM_FORM_CONFIRM_BUTTON_ID}`).should('be.disabled');
    cy.get(`#${FOLDER_FORM_DESCRIPTION_ID}-error`)
      .scrollIntoView()
      .should('be.visible');
  });

  it('description placement should not exist for folder', () => {
    // create
    cy.setUpApi();
    cy.visit(HOME_PATH);
    createFolder({ name: ' ' }, { confirm: false });

    cy.get(`#${ITEM_SETTING_DESCRIPTION_PLACEMENT_SELECT_ID}`).should(
      'not.exist',
    );
  });
});
