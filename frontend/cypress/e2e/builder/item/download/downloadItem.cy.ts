import {
  GuestFactory,
  ItemLoginSchemaFactory,
  ItemLoginSchemaType,
  PackedDocumentItemFactory,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import {
  buildDataCyWrapper,
  buildDownloadButtonId,
  buildExportAsZipButtonId,
  buildItemMenuDataCy,
  buildItemsGridMoreButtonSelector,
} from '../../../../../src/config/selectors';
import { HOME_PATH, buildItemPath } from '../../utils';

const buildExportFileUrl = (itemId: string) => `/items/${itemId}/download-file`;

describe('Download Item', () => {
  it('Download menu item should exist for document', () => {
    const item = PackedDocumentItemFactory();
    cy.setUpApi({ items: [item] });

    cy.intercept('POST', buildExportFileUrl(item.id)).as('exportFile');

    cy.visit(HOME_PATH);
    cy.get(buildDataCyWrapper(buildItemMenuDataCy(item.id))).click();
    cy.get(`[role="menu"] #${buildDownloadButtonId(item.id)}`).click();
    cy.wait('@exportFile');
    // no zip export button
    cy.get(`[role="menu"] #${buildExportAsZipButtonId(item.id)}`).should(
      'not.exist',
    );
  });

  it('Download menu item should exist for public document in card if logged out', () => {
    const folder = PackedFolderItemFactory();
    const document = PackedDocumentItemFactory({ parentItem: folder });
    cy.setUpApi({
      items: [folder, document],
      currentMember: null,
    });
    cy.intercept('POST', buildExportFileUrl(document.id)).as('exportFile');
    cy.visit(buildItemPath(folder.id));

    cy.get(buildItemsGridMoreButtonSelector(document.id)).click();
    cy.get(`[role="menu"] #${buildDownloadButtonId(document.id)}`).click();
    cy.wait('@exportFile');
  });

  it('Download menu item should exist in card for guest', () => {
    const folder = PackedFolderItemFactory();
    const itemLoginSchema = ItemLoginSchemaFactory({
      type: ItemLoginSchemaType.Username,
      item: folder,
    });
    const document = PackedDocumentItemFactory({ parentItem: folder });
    cy.setUpApi({
      items: [folder, document],
      currentMember: null,
      currentGuest: GuestFactory({ itemLoginSchema }),
    });
    cy.intercept('POST', buildExportFileUrl(document.id)).as('exportFile');
    cy.visit(buildItemPath(folder.id));

    cy.get(buildItemsGridMoreButtonSelector(document.id)).click();
    cy.get(`[role="menu"] #${buildDownloadButtonId(document.id)}`).click();
    cy.wait('@exportFile');
  });
});
