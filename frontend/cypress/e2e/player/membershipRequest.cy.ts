import {
  CompleteMembershipRequest,
  HttpMethod,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import {
  FORBIDDEN_CONTENT_ID,
  REQUEST_MEMBERSHIP_BUTTON_ID,
} from '../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../fixtures/members';
import { API_HOST } from '../../support/env';
import { ID_FORMAT } from '../../support/utils';
import { buildContentPagePath } from './utils';

const item = PackedFolderItemFactory({}, { permission: null });

describe('Membership Request', () => {
  describe('Logged out', () => {
    beforeEach(() => {
      cy.setUpApi({
        currentMember: null,
        items: [item],
      });
    });

    it('Forbidden', () => {
      cy.visit(buildContentPagePath({ rootId: item.id, itemId: item.id }));

      cy.get(`#${FORBIDDEN_CONTENT_ID}`).should('be.visible');
    });
  });

  describe('Logged in', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [item],
      });
    });

    it('Request membership', () => {
      cy.intercept(
        {
          method: HttpMethod.Post,
          url: new RegExp(
            `${API_HOST}/items/${ID_FORMAT}/memberships/requests$`,
          ),
        },
        ({ reply }) => {
          reply({
            member: CURRENT_MEMBER,
            item,
            createdAt: Date.now().toString(),
          } as CompleteMembershipRequest);
        },
      ).as('request');

      cy.visit(buildContentPagePath({ rootId: item.id, itemId: item.id }));

      cy.get(`#${REQUEST_MEMBERSHIP_BUTTON_ID}`).click();

      cy.wait('@request');
    });
  });
});
