import { PackedDocumentItemFactory, PermissionLevel } from '@graasp/sdk';

import {
  CHATBOX_DRAWER_ID,
  ITEM_CHATBOX_BUTTON_ID,
  ITEM_CHATBOX_ID,
} from '../../../src/config/selectors';
import {
  ITEM_WITHOUT_CHAT_BOX,
  ITEM_WITH_CHAT_BOX,
} from '../../fixtures/items';
import { buildContentPagePath, expectDocumentViewScreenLayout } from './utils';

const GRAASP_DOCUMENT_ITEM_WITH_CHAT_BOX = PackedDocumentItemFactory(
  {
    settings: {
      isPinned: false,
      showChatbox: true,
    },
  },
  { permission: PermissionLevel.Admin },
);

describe('Chatbox', () => {
  beforeEach(() => {
    cy.setUpApi({
      items: [
        ITEM_WITH_CHAT_BOX,
        ITEM_WITHOUT_CHAT_BOX,
        GRAASP_DOCUMENT_ITEM_WITH_CHAT_BOX,
      ],
    });
  });

  it('Chatbox button should toggle chatbox visibility', () => {
    const { id } = ITEM_WITH_CHAT_BOX;
    cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

    cy.wait('@getCurrentMember');

    // chatbox is closed by default
    cy.get(`#${ITEM_CHATBOX_ID}`).should('not.be.visible');
    cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('be.visible').click();

    cy.get(`#${ITEM_CHATBOX_ID}`).should('be.visible');
  });

  it('Side panel button should hide chatbox', () => {
    const { id } = ITEM_WITH_CHAT_BOX;
    cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

    cy.wait('@getCurrentMember');
    cy.get(`#${ITEM_CHATBOX_ID}`).should('not.be.visible');
    cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('be.visible');
    cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).click();

    cy.get(`#${ITEM_CHATBOX_ID}`).should('be.visible');

    cy.get(`#${CHATBOX_DRAWER_ID} .lucide-chevron-right`).click();
    cy.get(`#${ITEM_CHATBOX_ID}`).should('not.be.visible');
  });

  it('Disabled chatbox should not have button', () => {
    const { id } = ITEM_WITH_CHAT_BOX;
    cy.visit(buildContentPagePath({ rootId: id, itemId: id }));

    cy.wait('@getCurrentMember');
    cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('not.exist');
    cy.get(`#${ITEM_CHATBOX_ID}`).should('not.exist');
  });

  it('Chatbox button is clickable on document', () => {
    const { id } = GRAASP_DOCUMENT_ITEM_WITH_CHAT_BOX;
    cy.visit(
      buildContentPagePath({
        rootId: id,
        itemId: id,
      }),
    );
    cy.wait('@getCurrentMember');
    expectDocumentViewScreenLayout(GRAASP_DOCUMENT_ITEM_WITH_CHAT_BOX);
    cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).should('be.visible').click();
  });
});
