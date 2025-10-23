import { PackedFolderItemFactory } from '@graasp/sdk';

import { ZIP_DASHBOARD_UPLOADER_ID } from '../../../../../src/config/selectors';
import { createItem } from '../../../../support/createUtils';
import { ZIP_DEFAULT } from '../../fixtures/files';
import { buildItemPath } from '../../utils';

describe('Import Zip', () => {
  it('create file in item', () => {
    const FOLDER = PackedFolderItemFactory();

    cy.setUpApi({ items: [FOLDER] });
    const { id } = FOLDER;
    cy.visit(buildItemPath(id));

    // create
    createItem(ZIP_DEFAULT);

    // check interface didn't crash
    cy.wait(5000);
    cy.get(`#${ZIP_DASHBOARD_UPLOADER_ID}`).should('be.visible');
  });

  it('catch error', () => {
    const FOLDER = PackedFolderItemFactory();

    cy.setUpApi({ items: [FOLDER], importZipError: true });
    const { id } = FOLDER;
    cy.visit(buildItemPath(id));

    // create
    createItem(ZIP_DEFAULT);

    // check interface didn't crash
    cy.wait(5000);
    cy.get(`#${ZIP_DASHBOARD_UPLOADER_ID}`).should('be.visible');
  });
});
