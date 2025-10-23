import { StatusCodes } from 'http-status-codes';

import {
  BACK_BUTTON_ID,
  EMAIL_SIGN_IN_FIELD_ID,
  LOG_IN_HEADER_ID,
  REGISTER_HEADER_ID,
  RESEND_EMAIL_BUTTON_ID,
  SUCCESS_CONTENT_ID,
} from '../../../src/config/selectors';
import { AUTH_MEMBERS } from '../../fixtures/members';

describe('Success Content', () => {
  describe('Sign In', () => {
    it('Back Button', () => {
      const { GRAASP, GRAASP_OTHER } = AUTH_MEMBERS;
      cy.visit('/auth/login');

      cy.intercept('/login', ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

      // Signing in with a valid email
      cy.signInByMailAndCheck(GRAASP);

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

      cy.get(`#${BACK_BUTTON_ID}`).click();

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');
      cy.url().should('include', '/auth/login');
      cy.get(`#${LOG_IN_HEADER_ID}`).should('be.visible');
      // checks so email is cleared
      cy.get(`#${EMAIL_SIGN_IN_FIELD_ID}`).should('be.empty');

      // check if it's possible to sign in and use back button again
      cy.signInByMailAndCheck(GRAASP_OTHER);

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

      cy.get(`#${BACK_BUTTON_ID}`).click();

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');
      cy.url().should('include', '/auth/login');
      cy.get(`#${LOG_IN_HEADER_ID}`).should('be.visible');
      // checks so email is cleared
      cy.get(`#${EMAIL_SIGN_IN_FIELD_ID}`).should('be.empty');
    });

    it('Resend email', () => {
      const { GRAASP, GRAASP_OTHER } = AUTH_MEMBERS;
      cy.visit('/auth/login');

      cy.intercept('/login', ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });

      // Signing in with a valid email
      cy.signInByMailAndCheck(GRAASP_OTHER);
      cy.get(`#${BACK_BUTTON_ID}`).click();

      cy.signInByMailAndCheck(GRAASP);

      // checks so request body contains correct email
      cy.intercept('/login', ({ body }) => {
        expect(body.email).to.eq(GRAASP.email);
      });

      // checks resend email button is disabled after one click
      cy.get(`#${RESEND_EMAIL_BUTTON_ID}`).click().should('be.disabled');
    });
  });

  describe('Register', () => {
    beforeEach(() => {
      cy.intercept({ method: 'post', pathname: '/register' }, ({ reply }) => {
        return reply({
          statusCode: StatusCodes.NO_CONTENT,
        });
      });
    });
    it('Back Button', () => {
      const { GRAASP, GRAASP_OTHER } = AUTH_MEMBERS;
      cy.visit('/auth/register');

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');

      // Signing up with a valid email
      cy.signUpAndCheck(GRAASP, true);

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

      cy.get(`#${BACK_BUTTON_ID}`).click();

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');
      cy.url().should('include', '/auth/register');
      cy.get(`#${REGISTER_HEADER_ID}`).should('be.visible');

      // check if it's possible to sign up and use back button again
      cy.signUpAndCheck(GRAASP_OTHER, true);

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('be.visible');

      cy.get(`#${BACK_BUTTON_ID}`).click();

      cy.get(`#${SUCCESS_CONTENT_ID}`).should('not.exist');
      cy.url().should('include', '/auth/register');
      cy.get(`#${REGISTER_HEADER_ID}`).should('be.visible');
    });

    it('Resend email', () => {
      cy.visit('/auth/register');

      // Signing up with a valid email
      cy.signUpAndCheck(AUTH_MEMBERS.GRAASP_OTHER, true);
      cy.get(`#${BACK_BUTTON_ID}`).click();

      cy.signUpAndCheck(AUTH_MEMBERS.GRAASP, true);

      // checks so request body contains correct email
      cy.intercept('/login', ({ body }) => {
        expect(body.email).to.eq(AUTH_MEMBERS.GRAASP.email);
      });

      // checks resend email button is disabled after one click
      cy.get(`#${RESEND_EMAIL_BUTTON_ID}`).click().should('be.disabled');
    });
  });
});
