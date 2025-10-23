import {
  GO_TO_LANDING_ID,
  NOT_FOUND_MESSAGE_ID,
  NOT_FOUND_TEXT_ID,
} from '../../../src/config/selectors';
import { MEMBERS } from '../../fixtures/members';

describe('404 Page Test', () => {
  beforeEach(() => {
    cy.setUpApi({ currentMember: MEMBERS.BOB });
    cy.visit('/non-existing-page');
  });
  it('should display 404 page for non-existing routes', () => {
    cy.get(`#${NOT_FOUND_TEXT_ID}`).should('contain', 'Page not found');

    cy.get(`#${NOT_FOUND_MESSAGE_ID}`).should(
      'contain',
      'Sorry, we could not find this page.',
    );
  });

  it('should navigate to the home page when clicking "Go to Home"', () => {
    cy.get(`#${GO_TO_LANDING_ID}`).click();

    // Check if the URL is the home page
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
