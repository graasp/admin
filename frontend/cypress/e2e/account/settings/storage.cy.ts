import { formatDate, formatFileSize } from '@graasp/sdk';

import {
  MEMBER_STORAGE_FILE_NAME_ID,
  MEMBER_STORAGE_FILE_SIZE_ID,
  MEMBER_STORAGE_FILE_UPDATED_AT_ID,
  MEMBER_STORAGE_PARENT_FOLDER_ID,
  STORAGE_BAR_LABEL_ID,
  getCellId,
} from '../../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../../fixtures/members';
import { MEMBER_STORAGE_ITEM_RESPONSE } from '../../../fixtures/storage';

describe('Storage', () => {
  it('Can open the storage view from settings page', () => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.visit('/account/settings');

    // navigate to the storage page
    cy.get(`a[href="/account/storage"]`).click();
    cy.url().should('contain', '/account/storage');
  });

  it('Display storage interface', () => {
    const storageAmountInBytes = 698789;
    cy.setUpApi({ currentMember: CURRENT_MEMBER, storageAmountInBytes });
    cy.visit('/account/storage');
    cy.wait('@getCurrentMemberStorage');
    cy.get(`#${STORAGE_BAR_LABEL_ID}`).should(
      'contain',
      formatFileSize(storageAmountInBytes),
    );
  });
});

describe('Storage files', () => {
  beforeEach(() => {
    cy.setUpApi({
      currentMember: CURRENT_MEMBER,
      files: MEMBER_STORAGE_ITEM_RESPONSE,
    });
    cy.visit('/account/storage');
    cy.wait('@getMemberStorageFiles');
  });

  it('displays storage files of each page', () => {
    const files = MEMBER_STORAGE_ITEM_RESPONSE;
    const filesPerPage = 10;
    const numberPages = Math.ceil(files.length / filesPerPage);

    for (let i = 1; i <= numberPages; i += 1) {
      const currentNbOfFiles =
        files.length > i * filesPerPage ? i * filesPerPage : files.length;
      cy.get('tbody tr').should('have.length', currentNbOfFiles);

      files.slice(0, currentNbOfFiles).forEach((file, fileIndex) => {
        cy.get('tbody tr')
          .eq(fileIndex)
          .scrollIntoView()
          .should('be.visible')
          .within(() => {
            cy.get(
              `#${getCellId(MEMBER_STORAGE_FILE_NAME_ID, file.id)}`,
            ).should('contain', file.name);
            cy.get(
              `#${getCellId(MEMBER_STORAGE_FILE_SIZE_ID, file.id)}`,
            ).should('contain', formatFileSize(file.size));
            cy.get(
              `#${getCellId(MEMBER_STORAGE_FILE_UPDATED_AT_ID, file.id)}`,
            ).should('contain', formatDate(file.updatedAt, { locale: 'en' }));
            cy.get(
              `#${getCellId(MEMBER_STORAGE_PARENT_FOLDER_ID, file.id)}`,
            ).should('contain', file.parent?.name ?? '-');
          });
      });
      if (i !== numberPages) {
        cy.get('button[role="feed"]').click();
      }
      break;
    }
  });
});
