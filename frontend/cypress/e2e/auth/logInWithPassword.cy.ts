import { StatusCodes } from 'http-status-codes';

import { LOG_IN_PAGE_PATH } from '../../../src/config/paths';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
} from '../../../src/config/selectors';
import { AUTH_MEMBERS, CURRENT_MEMBER } from '../../fixtures/members';
import { PUBLISHED_ITEMS_PATH } from '../builder/utils';
import { fillPasswordSignInLayout } from './util';

describe('Email and Password Validation', () => {
  it('Sign In With Password', () => {
    const redirectionLink = `${Cypress.config().baseUrl}${PUBLISHED_ITEMS_PATH}`;
    let isSignedIn = false;

    cy.intercept(
      {
        pathname: '/login-password',
      },
      ({ reply }) => {
        isSignedIn = true;
        reply({ statusCode: StatusCodes.NO_CONTENT });
      },
    ).as('signInWithPassword');

    cy.intercept(
      {
        pathname: '/members/current',
      },
      ({ reply }) => {
        if (isSignedIn) {
          reply(CURRENT_MEMBER);
        } else {
          reply({
            statusCode: StatusCodes.NO_CONTENT,
          });
        }
      },
    ).as('getCurrent');

    const { INVALID_EMAIL: WRONG_EMAIL, GRAASP } = AUTH_MEMBERS;
    const loginPageUrl = new URL(
      `${Cypress.config().baseUrl}/${LOG_IN_PAGE_PATH}`,
    );
    loginPageUrl.searchParams.set('url', redirectionLink);
    cy.visit(loginPageUrl.href);
    // Signing in with wrong email
    cy.signInPasswordAndCheck(WRONG_EMAIL);

    // Signing in with a valid email and password
    cy.signInPasswordAndCheck(GRAASP);
    cy.wait('@signInWithPassword');
    cy.url().should('contain', redirectionLink);
  });

  it('Sign In With Wrong Password', () => {
    cy.intercept(
      {
        pathname: '/login-password',
      },
      (req) => {
        req.reply({
          statusCode: StatusCodes.UNAUTHORIZED,
          body: { message: 'Unauthorized member' },
        });
      },
    ).as('signInWithPassword');

    cy.visit(LOG_IN_PAGE_PATH);

    // Signing in with a valid email but wrong password
    fillPasswordSignInLayout(AUTH_MEMBERS.WRONG_PASSWORD);
    cy.get(`#${PASSWORD_SIGN_IN_BUTTON_ID}`).click();
    cy.get(`#${EMAIL_SIGN_IN_FIELD_ID}-helper-text`).should('not.exist');
    cy.get(`#${PASSWORD_SIGN_IN_FIELD_ID}-helper-text`).should('not.exist');
    cy.get(`[role="alert"]`).should('contain', 'Unauthorized member');
  });

  it('Check errors if  shows success message if no redirect', () => {
    cy.intercept(
      {
        pathname: '/login-password',
      },
      (req) => {
        req.reply({ statusCode: 303 });
      },
    ).as('signInWithPassword');

    cy.visit(LOG_IN_PAGE_PATH);
    cy.signInPasswordAndCheck(AUTH_MEMBERS.INVALID_EMAIL);

    // Signing in with a valid email but empty password
    cy.signInPasswordAndCheck(AUTH_MEMBERS.INVALID_PASSWORD);
  });
});
