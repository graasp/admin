import { PackedFolderItemFactory } from '@graasp/sdk';

import { v4 } from 'uuid';

import {
  CHATBOX_ID,
  CHATBOX_INPUT_BOX_ID,
  ITEM_CHATBOX_BUTTON_ID,
} from '../../../../../src/config/selectors';
import { MockWebSocket } from '../../../../../src/query/ws/mock-ws-client';
import { CURRENT_MEMBER, MEMBERS } from '../../../../fixtures/members';
import { CHATBOX_TIMEOUT } from '../../../../support/constants';
import { ITEM_WITH_CHATBOX_MESSAGES } from '../../fixtures/chatbox';
import { buildItemPath } from '../../utils';

const openChatbox = () => {
  cy.get(`#${ITEM_CHATBOX_BUTTON_ID}`).click();
  cy.wait('@getItemChat', { timeout: CHATBOX_TIMEOUT });
};

const visitAndMockWs = (
  visitRoute: string,
  // todo: improve this type
  sampleData: object,
  wsClientStub: MockWebSocket,
) => {
  cy.setUpApi(sampleData);
  cy.visit(visitRoute, {
    onBeforeLoad: (win) => {
      cy.stub(win, 'WebSocket').callsFake(() => wsClientStub);
    },
  });
};

// flaky mocking of websockets
describe.skip('Chatbox Scenarios', () => {
  it('Send messages in chatbox', () => {
    const item = ITEM_WITH_CHATBOX_MESSAGES;
    const client = new MockWebSocket();
    visitAndMockWs(buildItemPath(item.id), { items: [item] }, client);

    // open chatbox
    openChatbox();
    // check the chatbox displays the already saved messages
    for (const msg of item.chat) {
      cy.get(`#${CHATBOX_ID}`).should('contain', msg.body);
    }

    // send message
    const message = 'a new message';
    const messageId = v4();
    // get the input field (which is a textarea because it is multiline
    cy.get(`#${CHATBOX_ID} #${CHATBOX_INPUT_BOX_ID} textarea:visible`).type(
      message,
    );
    cy.get(`#${CHATBOX_ID} #${CHATBOX_INPUT_BOX_ID} button`).click();
    cy.wait('@postItemChatMessage').then(({ request: { body } }) => {
      expect(body.body).to.equal(message);
      expect(body.mentions).to.deep.equal([]);

      // mock websocket response
      client.receive({
        realm: 'notif',
        type: 'update',
        topic: 'chat/item',
        channel: item.id,
        body: {
          kind: 'item',
          op: 'publish',
          message: {
            id: messageId,
            creator: CURRENT_MEMBER.id,
            chatId: item.id,
            body: message,
            createdAt: new Date().toISOString(),
            updated: new Date().toISOString(),
          },
        },
      });

      // check the new message is visible
      cy.get(`#${CHATBOX_ID} [data-cy=message-${messageId}]`).should(
        'contain',
        message,
      );
    });
  });

  it('Receive messages in chatbox from websockets', () => {
    const item = PackedFolderItemFactory();
    const client = new MockWebSocket();

    visitAndMockWs(
      buildItemPath(item.id),
      { items: [item], members: [MEMBERS] },
      client,
    );

    openChatbox();

    const messageId = v4();
    // check websocket: the chatbox displays someone else's message
    const bobMessage = 'a message from bob';
    cy.get(`#${CHATBOX_ID}`).then(() => {
      client.receive({
        realm: 'notif',
        type: 'update',
        topic: 'chat/item',
        channel: item.id,
        body: {
          kind: 'item',
          op: 'publish',
          message: {
            id: messageId,
            creator: MEMBERS.BOB.id,
            chatId: item.id,
            body: bobMessage,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      });

      // check the new message is visible
      cy.get(`#${CHATBOX_ID} [data-cy=message-${messageId}]`).should(
        'contain',
        bobMessage,
      );
    });
  });
});
