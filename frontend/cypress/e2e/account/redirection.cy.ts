import { LOG_IN_PAGE_PATH } from '../../../src/config/paths';

describe('Redirections', () => {
  it('redirects to the login page when not logged in', () => {
    cy.setUpApi({ currentMember: null });
    cy.visit('/home');
    cy.wait('@getCurrentMember');
    cy.url().should('contain', `/auth/login?url=`);
  });

  it('redirects to builder when already logged in', () => {
    cy.setUpApi({});
    cy.visit(LOG_IN_PAGE_PATH);
    cy.wait('@getCurrentMember');
    cy.url().should('contain', '/home');
  });
});
