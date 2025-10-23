import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Channel, ChatMessage, UUID, WebsocketClient } from '@graasp/sdk';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import {
  createChatMessageMutation,
  deleteChatMessageMutation,
  getChatOptions,
  getChatQueryKey,
  patchChatMessageMutation,
} from '@/openapi/client/@tanstack/react-query.gen';
import { KINDS, OPS, TOPICS } from '@/query/ws/constants';

interface ChatEvent {
  kind: string;
  op: string;
  message: ChatMessage;
}

export function useChatboxProvider({ itemId }: { itemId: string }) {
  const { t } = useTranslation(NS.Builder, { keyPrefix: 'CHATBOX' });

  const messagesQueryResult = useQuery(getChatOptions({ path: { itemId } }));

  // assume websockets are working, so no need of manual invalidation
  const { mutate: sendMessage } = useMutation({
    ...createChatMessageMutation(),
    onError: () => {
      toast.error(t('SEND_MESSAGE_ERROR'));
    },
  });

  const { mutate: editMessage } = useMutation({
    ...patchChatMessageMutation(),
    onError: () => {
      toast.error(t('EDIT_MESSAGE_ERROR'));
    },
  });

  const { mutate: deleteMessage } = useMutation({
    ...deleteChatMessageMutation(),
    onError: () => {
      toast.error(t('DELETE_MESSAGE_ERROR'));
    },
  });

  return {
    ...messagesQueryResult,
    sendMessage,
    editMessage,
    deleteMessage,
  };
}

/**
 * React hook to subscribe to the updates of the given chat ID
 * @param chatId The ID of the chat of which to observe updates
 */
export const useItemChatUpdates = (
  websocketClient: WebsocketClient,
  chatId: UUID | null,
) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!chatId || !websocketClient) {
      return () => {
        // do nothing
      };
    }

    const channel: Channel = {
      name: chatId,
      topic: TOPICS.CHAT_ITEM,
    };

    const handler = (event: ChatEvent) => {
      if (event.kind === KINDS.ITEM) {
        const chatKey = getChatQueryKey({ path: { itemId: chatId } });
        const current = queryClient.getQueryData<ChatMessage[]>(chatKey);

        const { message } = event;

        if (current) {
          switch (event.op) {
            case OPS.PUBLISH: {
              queryClient.setQueryData(chatKey, [...current, message]);
              break;
            }
            case OPS.UPDATE: {
              const index = current.findIndex((m) => m.id === event.message.id);
              if (index >= 0) {
                const messages = [
                  ...current.slice(0, index),
                  message,
                  ...current.slice(index + 1),
                ];
                queryClient.setQueryData(chatKey, messages);
              }
              break;
            }
            case OPS.DELETE: {
              const index = current.findIndex((m) => m.id === message.id);
              if (index >= 0) {
                const mutation = [
                  ...current.slice(0, index),
                  ...current.slice(index + 1),
                ];
                queryClient.setQueryData(chatKey, mutation);
              }
              break;
            }
            case OPS.CLEAR: {
              queryClient.setQueryData(chatKey, []);
              break;
            }
            default:
              break;
          }
        }
      }
    };

    websocketClient.subscribe(channel, handler);

    return function cleanup() {
      websocketClient.unsubscribe(channel, handler);
    };
  });
};
