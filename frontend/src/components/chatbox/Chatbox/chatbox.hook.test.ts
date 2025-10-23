import { renderHook } from '@testing-library/react';
import { v4 } from 'uuid';
import { beforeEach, describe, expect, it } from 'vitest';

import { ChatMessageRaw } from '@/openapi/client';
import { getChatQueryKey } from '@/openapi/client/@tanstack/react-query.gen';
import { CHAT_MESSAGES } from '@/query/test/constants';
import { KINDS, OPS, TOPICS } from '@/query/ws/constants';
import { Handler, MockedWebSocket, getHandlerByChannel } from '@/test/wsUtils';

import { useItemChatUpdates } from './chatbox.hook';
import { setUpTest } from './utils';

const { queryClient, wrapper } = setUpTest();

const chatId = v4();
const chatKey = getChatQueryKey({ path: { itemId: chatId } });
const messages = CHAT_MESSAGES;
const channel = {
  name: chatId,
  topic: TOPICS.CHAT_ITEM,
};
const handlers: Handler[] = [];
const WS_CLIENT = MockedWebSocket(handlers);

const NEW_MESSAGE = { body: 'new content message' };

describe('useItemChatUpdates', () => {
  beforeEach(() => {
    queryClient.clear();
    queryClient.setQueryData(chatKey, CHAT_MESSAGES);
  });
  it('Does nothing for undefined chatId', async () => {
    renderHook(() => useItemChatUpdates(WS_CLIENT, ''), {
      wrapper,
    });

    const chatEvent = {
      kind: KINDS.ITEM,
      op: OPS.PUBLISH,
      message: 'new Message',
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);

    // expect no change
    expect(queryClient.getQueryData(chatKey)).toEqual(CHAT_MESSAGES);
  });

  it(`Receive chat messages update`, async () => {
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const newMessage = { body: 'new content message' };

    queryClient.setQueryData(chatKey, CHAT_MESSAGES);

    const chatEvent = {
      kind: KINDS.ITEM,
      op: OPS.PUBLISH,
      message: newMessage,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);

    expect(queryClient.getQueryData(chatKey)).toContainEqual(newMessage);
  });
  it(`Receive chat messages update`, async () => {
    queryClient.setQueryData(chatKey, CHAT_MESSAGES);
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const chatEvent = {
      kind: KINDS.ITEM,
      op: OPS.PUBLISH,
      message: NEW_MESSAGE,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);

    expect(queryClient.getQueryData(chatKey)).toContainEqual(NEW_MESSAGE);
  });

  it(`Receive chat messages edit update`, async () => {
    const updatedMessage = {
      id: messages[0].id,
      body: 'new message content',
    };
    queryClient.setQueryData(chatKey, messages);
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const chatEvent = {
      kind: KINDS.ITEM,
      op: OPS.UPDATE,
      message: updatedMessage,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);
    expect(queryClient.getQueryData(chatKey)).toContainEqual(updatedMessage);
  });

  it(`Receive chat messages delete update`, async () => {
    const deletedMessage = { id: messages[0].id };
    queryClient.setQueryData(chatKey, CHAT_MESSAGES);
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const chatEvent = {
      kind: KINDS.ITEM,
      op: OPS.DELETE,
      message: deletedMessage,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);
    const m = queryClient.getQueryData(chatKey);
    expect(m).toHaveLength(1);
    expect(m).not.toContainEqual(CHAT_MESSAGES[0]);
  });

  it(`Receive chat messages clear update`, async () => {
    queryClient.setQueryData(chatKey, CHAT_MESSAGES);
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const chatEvent = {
      kind: KINDS.ITEM,
      op: OPS.CLEAR,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);

    expect(queryClient.getQueryData(chatKey)).toEqual([]);
  });

  it(`Does not update chat messages with wrong chat event`, async () => {
    queryClient.setQueryData(chatKey, CHAT_MESSAGES);
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const chatEvent = {
      kind: 'false kind',
      op: OPS.PUBLISH,
      message: NEW_MESSAGE,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);

    expect(
      queryClient
        .getQueryData<ChatMessageRaw[]>(chatKey)
        ?.find(({ body }: { body: string }) => body === NEW_MESSAGE.body),
    ).toBeFalsy();
  });

  it(`Does not update chat messages with wrong OP event`, async () => {
    queryClient.setQueryData(chatKey, CHAT_MESSAGES);
    renderHook(() => useItemChatUpdates(WS_CLIENT, chatId), {
      wrapper,
    });

    const chatEvent = {
      kind: KINDS.ITEM,
      op: 'unset OP',
      message: NEW_MESSAGE,
    };

    getHandlerByChannel(handlers, channel)?.handler(chatEvent);
    expect(
      queryClient
        .getQueryData<ChatMessageRaw[]>(chatKey)
        ?.find(({ body }: { body: string }) => body === NEW_MESSAGE.body),
    ).toBeFalsy();
  });
});
