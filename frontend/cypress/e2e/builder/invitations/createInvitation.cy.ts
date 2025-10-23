import {
  PackedFolderItemFactory,
  PermissionLevel,
  PermissionLevelOptions,
} from '@graasp/sdk';

import {
  CREATE_MEMBERSHIP_FORM_ID,
  SHARE_ITEM_EMAIL_INPUT_ID,
  SHARE_ITEM_SHARE_BUTTON_ID,
  buildShareButtonId,
} from '../../../../src/config/selectors';
import { MEMBERS } from '../../../fixtures/members';
import { buildItemPath } from '../utils';

const inviteItem = ({
  id,
  email,
  permission,
  submit,
}: {
  id: string;
  email: string;
  permission: PermissionLevelOptions;
  submit?: boolean;
}) => {
  cy.get(`#${buildShareButtonId(id)}`).click();

  cy.fillShareForm({
    email,
    permission,
    submit,
    selector: `#${CREATE_MEMBERSHIP_FORM_ID}`,
  });
};

describe('Create Invitation', () => {
  it('invite one new member', () => {
    const items = [PackedFolderItemFactory()];
    cy.setUpApi({ items, members: Object.values(MEMBERS) });

    const { id } = items[0];
    cy.visit(buildItemPath(id));

    // invite
    const email = 'mock@email.com';
    const permission = PermissionLevel.Read;
    inviteItem({ id, email, permission });

    cy.wait('@postInvitations').then(({ request: { url, body } }) => {
      expect(url).to.contain(id);
      const { invitations } = body;
      expect(invitations[0]?.permission).to.equal(permission);
      expect(invitations[0]?.email).to.equal(email);
    });

    // check that the email field is emptied after sharing completes
    cy.get(`#${SHARE_ITEM_EMAIL_INPUT_ID}`).should('be.empty');
  });

  it('cannot invite member with membership', () => {
    const item = PackedFolderItemFactory({ creator: MEMBERS.ANNA });
    const items = [
      {
        ...item,
        memberships: [
          {
            id: '79c25df6-8f2b-4bba-be9b-6459b2694ee7',
            item,
            account: MEMBERS.ANNA,
            permission: PermissionLevel.Admin,
            createdAt: '2024-02-05T16:45:00Z',
            updatedAt: '2024-02-05T16:45:00Z',
          },
        ],
      },
    ];
    cy.setUpApi({ items, members: Object.values(MEMBERS) });

    // go to child item
    const { id } = items[0];
    cy.visit(buildItemPath(id));

    // person to invite
    const { email } = MEMBERS.ANNA;
    inviteItem({ id, email, permission: PermissionLevel.Read });

    cy.get(`#${SHARE_ITEM_SHARE_BUTTON_ID}`).should('be.disabled');
  });

  it('cannot invite with invalid data', () => {
    const items = [PackedFolderItemFactory()];
    cy.setUpApi({ items, members: Object.values(MEMBERS) });

    const { id } = items[0];
    cy.visit(buildItemPath(id));

    // invite
    const email = 'mock';
    const permission = PermissionLevel.Read;
    inviteItem({ id, email, permission });

    cy.get(`#${SHARE_ITEM_SHARE_BUTTON_ID}`).should('be.disabled');
  });
});
