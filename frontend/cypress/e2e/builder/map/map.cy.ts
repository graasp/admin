// /map is used by the mobile application to display the map and have access to its feature
import {
  CREATE_ITEM_FOLDER_ID,
  FOLDER_FORM_DESCRIPTION_ID,
  MAP_COUNTRY_SELECTION_FORM_ID,
  buildMapViewId,
} from '../../../../src/config/selectors';
import { MAP_ITEMS_PATH } from '../utils';

describe('Map', () => {
  it('open create folder modal on Home', () => {
    cy.setUpApi();
    cy.visit(`${MAP_ITEMS_PATH}?enableGeolocation=false`);

    // home id
    cy.get(`#${buildMapViewId()}`).should('be.visible');

    // select a country
    cy.get(
      `#${buildMapViewId()} #${MAP_COUNTRY_SELECTION_FORM_ID} input`,
    ).click();
    cy.get(`#${buildMapViewId()} [role="presentation"]`).click();

    // open location button
    cy.get(`#${buildMapViewId()}`).click();
    cy.get(`#${buildMapViewId()} img[role="button"]`).click({ force: true });
    cy.get(`[aria-label="Add at this location"]`).click({ force: true });

    // open folder form
    cy.get(`#${CREATE_ITEM_FOLDER_ID}`).click();
    cy.get(`#${FOLDER_FORM_DESCRIPTION_ID}`).should('be.visible');
  });
});
