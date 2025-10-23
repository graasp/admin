import { PackedDocumentItemFactory } from '@graasp/sdk';

import { CURRENT_MEMBER } from '../../../../fixtures/members';
import { expectDocumentViewScreenLayout } from '../../../../support/viewUtils';
import { buildItemMembership } from '../../fixtures/memberships';
import { buildItemPath } from '../../utils';

const DOCUMENT = PackedDocumentItemFactory();

describe('View Document', () => {
  describe('Grid', () => {
    beforeEach(() => {
      cy.setUpApi({
        items: [
          {
            ...DOCUMENT,
            memberships: [
              buildItemMembership({
                item: DOCUMENT,
                account: CURRENT_MEMBER,
              }),
            ],
          },
        ],
      });
    });

    it('visit document', () => {
      cy.visit(buildItemPath(DOCUMENT.id));

      expectDocumentViewScreenLayout({ item: DOCUMENT });
    });
  });
});
