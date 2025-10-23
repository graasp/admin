import { FolderItemFactory, MembershipRequestStatus } from '@graasp/sdk';

import {
  ITEM_LOGIN_SCREEN_FORBIDDEN_ID,
  MEMBERSHIP_REQUEST_PENDING_SCREEN_SELECTOR,
  REQUEST_MEMBERSHIP_BUTTON_ID,
  buildDataCyWrapper,
} from '../../../../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../../../../fixtures/members';
import { ItemForTest } from '../../../../../support/types';
import { buildItemPath } from '../../../utils';

it('Request membership when signed in', () => {
  const item = FolderItemFactory();
  cy.setUpApi({
    items: [item],
  });

  cy.visit(buildItemPath(item.id));

  // click on request button
  cy.get(`#${REQUEST_MEMBERSHIP_BUTTON_ID}`).click();

  // check endpoint
  cy.wait('@requestMembership').then(({ request }) => {
    expect(request.url).to.contain(item.id);
  });

  // button is disabled
  cy.get(`#${REQUEST_MEMBERSHIP_BUTTON_ID}`).should('be.disabled');
});
it('Cannot request membership if item is hidden', () => {
  const tmp = FolderItemFactory();
  const item: ItemForTest = {
    ...tmp,
    visibilities: [
      {
        type: 'hidden',
        itemPath: tmp.path,
        createdAt: '2021-08-11T12:56:36.834Z',
        id: 'ecbfbd2a-9644-12db-ae93-0242ac130002',
      },
    ],
  };
  cy.setUpApi({
    items: [item],
  });

  cy.visit(buildItemPath(item.id));

  cy.get(`#${ITEM_LOGIN_SCREEN_FORBIDDEN_ID}`).should('be.visible');
});

it('Membership request is already sent', () => {
  const item = FolderItemFactory();
  cy.setUpApi({
    items: [item],
    membershipRequests: [
      {
        item,
        member: CURRENT_MEMBER,
        status: MembershipRequestStatus.Pending,
        createdAt: '2024-06-12T00:45:00Z',
      },
    ],
  });

  cy.visit(buildItemPath(item.id));

  // request pending screen
  cy.get(buildDataCyWrapper(MEMBERSHIP_REQUEST_PENDING_SCREEN_SELECTOR)).should(
    'be.visible',
  );
});
