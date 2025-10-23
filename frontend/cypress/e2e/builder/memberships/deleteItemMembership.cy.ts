import {
  ItemMembership,
  PackedFolderItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import { v4 } from 'uuid';

import {
  CONFIRM_MEMBERSHIP_DELETE_BUTTON_ID,
  buildItemMembershipRowDeleteButtonId,
  buildItemMembershipRowEditButtonId,
  buildShareButtonId,
} from '../../../../src/config/selectors';
import { CURRENT_MEMBER, MEMBERS } from '../../../fixtures/members';
import { ItemForTest } from '../../../support/types';
import { ITEMS_WITH_MEMBERSHIPS } from '../fixtures/memberships';
import { buildItemPath } from '../utils';

const deleteItemMembership = ({
  id,
  itemId,
}: {
  id: string;
  itemId: string;
}) => {
  cy.get(`#${buildShareButtonId(itemId)}`).click();
  cy.get(`#${buildItemMembershipRowDeleteButtonId(id)}`).click();
  cy.get(`#${CONFIRM_MEMBERSHIP_DELETE_BUTTON_ID}`).click();
};

describe('Delete Membership', () => {
  it('delete item membership', () => {
    cy.setUpApi({ ...ITEMS_WITH_MEMBERSHIPS });

    // go to children item
    const { id, memberships } = ITEMS_WITH_MEMBERSHIPS.items[0];
    cy.visit(buildItemPath(id));

    // delete
    const { id: mId } = memberships[1];
    deleteItemMembership({ id: mId, itemId: id });

    cy.wait('@deleteItemMembership').then(({ request: { url } }) => {
      expect(url).to.contain(mId);
    });
  });

  it('cannot delete item membership from parent', () => {
    cy.setUpApi({ ...ITEMS_WITH_MEMBERSHIPS });

    // go to children item
    const { id, memberships } = ITEMS_WITH_MEMBERSHIPS.items[1];
    cy.visit(buildItemPath(id));
    cy.get(`#${buildShareButtonId(id)}`).click();

    const { id: mId } = memberships[1];
    cy.get(`#${buildItemMembershipRowEditButtonId(mId)}`).should('exist');
    cy.get(`#${buildItemMembershipRowDeleteButtonId(mId)}`).should('not.exist');
  });

  it('cannot delete if there is only one admin item membership', () => {
    const item: ItemForTest = PackedFolderItemFactory();
    const items = [
      {
        ...item,
        memberships: [
          {
            id: v4(),
            permission: PermissionLevel.Admin,
            account: CURRENT_MEMBER,
            item,
          } as unknown as ItemMembership,
          {
            id: v4(),
            permission: PermissionLevel.Read,
            account: MEMBERS.BOB,
            item,
          } as unknown as ItemMembership,
        ],
      },
    ];

    cy.setUpApi({ items });
    // go to children item
    const { id, memberships } = items[0];
    cy.visit(buildItemPath(id));
    cy.get(`#${buildShareButtonId(id)}`).click();

    const [m1, m2] = memberships;
    cy.get(`#${buildItemMembershipRowDeleteButtonId(m1.id)}`).should(
      'not.exist',
    );
    cy.get(`#${buildItemMembershipRowDeleteButtonId(m2.id)}`).should('exist');
  });
});
