import { HttpMethod } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import { EMAIL_CHANGE_VALIDATION_PATH } from '../../../src/config/paths';
import {
  EMAIL_VALIDATION_BUTTON_ID,
  EMAIL_VALIDATION_CONFLICT_MESSAGE_ID,
  EMAIL_VALIDATION_SUCCESS_MESSAGE_ID,
  EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID,
} from '../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../fixtures/members';
import { API_HOST } from '../../support/env';

describe('Validate Email Update', () => {
  it('No token', () => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.visit(EMAIL_CHANGE_VALIDATION_PATH);
    cy.get('p').should('be.visible').and('contain', 'No token was found');
  });

  it('Valid token', () => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.intercept(
      {
        method: HttpMethod.Patch,
        url: `${API_HOST}/members/current/email/change`,
      },
      ({ reply }) =>
        // accept change
        reply(StatusCodes.NO_CONTENT),
    ).as('changeEmail');

    cy.visit(`${EMAIL_CHANGE_VALIDATION_PATH}?t=hello`);
    cy.get('h1').should('be.visible');
    cy.get(`#${EMAIL_VALIDATION_BUTTON_ID}`).click();
    cy.wait('@changeEmail').then(({ request }) => {
      expect(request.headers.authorization).to.equal('Bearer hello');
    });
    cy.get(`#${EMAIL_VALIDATION_SUCCESS_MESSAGE_ID}`);
  });

  it('Old token', () => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.intercept(
      {
        method: HttpMethod.Patch,
        url: `${API_HOST}/members/current/email/change`,
      },
      ({ reply }) =>
        // Not authorized
        reply(StatusCodes.UNAUTHORIZED),
    ).as('changeEmail');
    cy.visit(`${EMAIL_CHANGE_VALIDATION_PATH}?t=hello`);
    cy.get('h1').should('be.visible');
    cy.get(`#${EMAIL_VALIDATION_BUTTON_ID}`).click();

    cy.wait('@changeEmail').then(({ request }) => {
      expect(request.headers.authorization).to.equal('Bearer hello');
    });
    cy.get(`#${EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID}`);
  });

  it('Conflicting token', () => {
    cy.setUpApi({ currentMember: CURRENT_MEMBER });
    cy.intercept(
      {
        method: HttpMethod.Patch,
        url: `${API_HOST}/members/current/email/change`,
      },
      ({ reply }) =>
        // Conflict on resource
        reply(StatusCodes.CONFLICT),
    ).as('changeEmail');
    cy.visit(`${EMAIL_CHANGE_VALIDATION_PATH}?t=hello`);
    cy.get('h1').should('be.visible');
    cy.get(`#${EMAIL_VALIDATION_BUTTON_ID}`).click();

    cy.wait('@changeEmail').then(({ request }) => {
      expect(request.headers.authorization).to.equal('Bearer hello');
    });
    cy.get(`#${EMAIL_VALIDATION_CONFLICT_MESSAGE_ID}`);
  });
});
