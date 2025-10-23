import {
  MemberFactory,
  PackedFolderItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import {
  MEMBERSHIPS_TAB_SELECTOR,
  MEMBERSHIP_REQUESTS_EMPTY_SELECTOR,
  MEMBERSHIP_REQUESTS_TAB_SELECTOR,
  MEMBERSHIP_REQUEST_ACCEPT_BUTTON_SELECTOR,
  MEMBERSHIP_REQUEST_REJECT_BUTTON_SELECTOR,
  buildDataCyWrapper,
  buildMembershipRequestRowSelector,
} from '../../../../src/config/selectors';
import { CURRENT_MEMBER } from '../../../fixtures/members';

const itemWithRequests = PackedFolderItemFactory();
const membershipRequests = [
  {
    item: itemWithRequests,
    member: MemberFactory(),
    createdAt: '2021-08-11T12:56:36.834Z',
  },
  {
    item: itemWithRequests,
    member: MemberFactory(),
    createdAt: '2021-08-11T12:58:36.834Z',
  },
  {
    item: itemWithRequests,
    member: MemberFactory(),
    createdAt: '2021-08-11T13:56:36.834Z',
  },
];

describe('Membership requests table', () => {
  it('Writers cannot see', () => {
    const itemWithWrite = PackedFolderItemFactory(
      { creator: CURRENT_MEMBER },
      { permission: PermissionLevel.Write },
    );
    cy.setUpApi({ items: [itemWithWrite], membershipRequests });
    cy.visit(`/builder/items/${itemWithWrite.id}/share`);
    cy.get(buildDataCyWrapper(MEMBERSHIPS_TAB_SELECTOR)).should('exist');
    cy.get(buildDataCyWrapper(MEMBERSHIP_REQUESTS_TAB_SELECTOR)).should(
      'not.exist',
    );
  });

  it('empty membership requests', () => {
    cy.setUpApi({ items: [itemWithRequests] });
    cy.visit(`/builder/items/${itemWithRequests.id}/share`);
    cy.get(buildDataCyWrapper(MEMBERSHIP_REQUESTS_TAB_SELECTOR)).click();
    cy.get(buildDataCyWrapper(MEMBERSHIP_REQUESTS_EMPTY_SELECTOR))
      .scrollIntoView()
      .should('be.visible');
  });

  describe('Filled Membership Requests', () => {
    beforeEach(() => {
      cy.setUpApi({ items: [itemWithRequests], membershipRequests });
      cy.visit(`/builder/items/${itemWithRequests.id}/share`);
      cy.get(buildDataCyWrapper(MEMBERSHIP_REQUESTS_TAB_SELECTOR)).click();
    });
    it('view membership requests', () => {
      for (const mr of membershipRequests) {
        cy.get(
          buildDataCyWrapper(buildMembershipRequestRowSelector(mr.member.id)),
        )
          .should('contain', mr.member.name)
          .should('contain', mr.member.email)
          .should('contain', 'Accept')
          .should('contain', 'Reject');
      }
    });
    it('accept membership requests', () => {
      const { member } = membershipRequests[0];

      cy.get(
        `${buildDataCyWrapper(buildMembershipRequestRowSelector(member.id))} ${buildDataCyWrapper(MEMBERSHIP_REQUEST_ACCEPT_BUTTON_SELECTOR)}`,
      ).click();

      cy.wait('@postItemMembership').then(({ request: { body } }) => {
        expect(body.accountId).to.equal(member.id);
        expect(body.permission).to.equal(PermissionLevel.Read);
      });
    });
    it('reject membership requests', () => {
      const { member } = membershipRequests[0];

      cy.get(
        `${buildDataCyWrapper(buildMembershipRequestRowSelector(member.id))} ${buildDataCyWrapper(MEMBERSHIP_REQUEST_REJECT_BUTTON_SELECTOR)}`,
      ).click();

      cy.wait('@rejectMembershipRequest');
    });
  });
});
