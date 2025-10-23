import { PackedFolderItemFactory } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';

import {
  ITEM_LOGIN_SCREEN_FORBIDDEN_ID,
  REQUEST_MEMBERSHIP_BUTTON_ID,
} from '../../../../../src/config/selectors';
import { MEMBERS } from '../../../../fixtures/members';
import { expectFolderViewScreenLayout } from '../../../../support/viewUtils';
import { SAMPLE_PUBLIC_ITEMS } from '../../fixtures/items';
import { buildItemPath } from '../../utils';

describe('Public Items', () => {
  describe('Enabled', () => {
    it('Signed out user can access a public item', () => {
      cy.setUpApi({
        ...SAMPLE_PUBLIC_ITEMS,
        currentMember: null,
      });
      const item = SAMPLE_PUBLIC_ITEMS.items[4];
      cy.visit(buildItemPath(item.id));
      cy.wait('@getItem').then(({ response: { body } }) => {
        expect(body.id).to.equal(item.id);
      });
      expectFolderViewScreenLayout({ item, currentMember: null });
    });

    it('User without a membership can access a public item', () => {
      const currentMember = MEMBERS.BOB;
      cy.setUpApi({
        ...SAMPLE_PUBLIC_ITEMS,
        currentMember,
      });
      const item = SAMPLE_PUBLIC_ITEMS.items[4];
      cy.visit(buildItemPath(item.id));
      cy.wait('@getItem').then(({ response: { body } }) => {
        expect(body.id).to.equal(item.id);
      });
      expectFolderViewScreenLayout({ item, currentMember: MEMBERS.BOB });
    });

    it('User without a membership can access a child of a public item', () => {
      const currentMember = MEMBERS.BOB;
      cy.setUpApi({
        ...SAMPLE_PUBLIC_ITEMS,
        currentMember,
      });
      const item = SAMPLE_PUBLIC_ITEMS.items[2];
      cy.visit(buildItemPath(item.id));
      cy.wait('@getItem').then(({ response: { body } }) => {
        expect(body.id).to.equal(item.id);
      });
      expectFolderViewScreenLayout({ item, currentMember });
    });
  });

  describe('Disabled', () => {
    const item = PackedFolderItemFactory({}, { permission: null });
    it('Signed out user cannot access a private item', () => {
      cy.setUpApi({
        items: [item],
        currentMember: null,
      });
      cy.visit(buildItemPath(item.id));
      cy.wait('@getItem').then(({ response: { statusCode } }) => {
        expect(statusCode).to.equal(StatusCodes.UNAUTHORIZED);
      });
      cy.get(`#${ITEM_LOGIN_SCREEN_FORBIDDEN_ID}`).should('exist');
    });

    it('User without a membership can request access a private item', () => {
      cy.setUpApi({
        items: [item],
        currentMember: MEMBERS.BOB,
      });
      cy.visit(buildItemPath(item.id));
      cy.wait('@getItem').then(({ response: { statusCode } }) => {
        expect(statusCode).to.equal(StatusCodes.FORBIDDEN);
      });
      cy.get(`#${REQUEST_MEMBERSHIP_BUTTON_ID}`).click();
      cy.wait('@requestMembership').then(({ request }) => {
        expect(request.url).to.contain(item.id);
      });
    });

    it('User without a membership can request access to a child of a private item', () => {
      cy.setUpApi({
        items: [item],
        currentMember: MEMBERS.BOB,
      });
      cy.visit(buildItemPath(item.id));
      cy.wait('@getItem').then(({ response: { statusCode } }) => {
        expect(statusCode).to.equal(StatusCodes.FORBIDDEN);
      });
      cy.get(`#${REQUEST_MEMBERSHIP_BUTTON_ID}`).click();
      cy.wait('@requestMembership').then(({ request }) => {
        expect(request.url).to.contain(item.id);
      });
    });
  });
});
