import {
  GuestFactory,
  ItemLoginSchemaFactory,
  ItemLoginSchemaType,
  PackedDocumentItemFactory,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import {
  buildDownloadButtonId,
  buildExportAsZipButtonId,
  buildItemsGridMoreButtonSelector,
} from '../../../../../src/config/selectors';
import { HOME_PATH, buildItemPath } from '../../utils';

describe('Export Folder as ZIP', () => {
  const buildExportZipUrl = (itemId: string) => `/items/${itemId}/export`;

  it('Export ZIP exists in item menu for folder', () => {
    const item = PackedFolderItemFactory();
    cy.setUpApi({ items: [item] });
    cy.intercept('POST', buildExportZipUrl(item.id)).as('exportZip');
    cy.visit(HOME_PATH);
    cy.get(buildItemsGridMoreButtonSelector(item.id)).click();
    cy.get(`[role="menu"] #${buildExportAsZipButtonId(item.id)}`).click();
    cy.wait('@exportZip');
    // no normal download file button
    cy.get(`[role="menu"] #${buildDownloadButtonId(item.id)}`).should(
      'not.exist',
    );
  });

  it('Export ZIP should not exist in item menu for document', () => {
    const item = PackedDocumentItemFactory();
    cy.setUpApi({ items: [item] });
    cy.visit(HOME_PATH);
    cy.get(buildItemsGridMoreButtonSelector(item.id)).click();
    // no zip export button
    cy.get(`[role="menu"] #${buildExportAsZipButtonId(item.id)}`).should(
      'not.exist',
    );
  });

  it('Export ZIP should not exist in menu in card for guest', () => {
    const folder = PackedFolderItemFactory();
    const itemLoginSchema = ItemLoginSchemaFactory({
      type: ItemLoginSchemaType.Username,
      item: folder,
    });
    const item = PackedFolderItemFactory({ parentItem: folder });
    cy.setUpApi({
      items: [folder, item],
      currentMember: null,
      currentGuest: GuestFactory({ itemLoginSchema }),
    });
    cy.visit(buildItemPath(folder.id));

    cy.get(buildItemsGridMoreButtonSelector(item.id)).click();
    cy.get(`[role="menu"] #${buildDownloadButtonId(item.id)}`).should(
      'not.exist',
    );
  });
});
