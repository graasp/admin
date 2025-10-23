import { ACCOUNT_SETTINGS_PATH } from '../../../../src/config/paths';
import { EXPORT_DATA_BUTTON_ID } from '../../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../../fixtures/members';

describe('Check exporting data', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.visit(ACCOUNT_SETTINGS_PATH);
  });
  it('should disable the export button after clicking it', () => {
    cy.get(`#${EXPORT_DATA_BUTTON_ID}`).should('be.enabled');

    cy.get(`#${EXPORT_DATA_BUTTON_ID}`).click();
    cy.wait('@exportData');

    cy.get(`#${EXPORT_DATA_BUTTON_ID}`).should('be.disabled');
  });
});
