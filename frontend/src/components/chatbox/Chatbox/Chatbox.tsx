import type { JSX } from 'react';

import { styled } from '@mui/material';

import { WS_CLIENT } from '@/config/queryClient.js';
import type {
  ChatMessageWithCreator,
  NullableCurrentAccount,
} from '@/openapi/client/types.gen.js';

import { CONTAINER_HEIGHT_SAFETY_MARGIN } from '../constants.js';
import { EditingContextProvider } from '../context/EditingContext.js';
import { MessagesContextProvider } from '../context/MessagesContext.js';
import { InputBar } from './InputBar.js';
import { Messages } from './Messages.js';
import { useItemChatUpdates } from './chatbox.hook.js';

const ChatboxContainer = styled('div')({
  // set height of full container
  // the margin is used to make it "slightly" smaller than the ful height to not have very small scrollbars
  height: `calc(100vh - ${CONTAINER_HEIGHT_SAFETY_MARGIN}px)`,
  minHeight: '0px',
  display: 'flex',
  flexDirection: 'column',
});

const InputContainer = styled('div')({
  // no flex growing -> keep container at bottom of window
  flex: 'none',
});

type Props = {
  id?: string;
  sendMessageBoxId?: string;
  messages?: ChatMessageWithCreator[];
  itemId: string;
  showAdminTools?: boolean;
  currentAccount?: NullableCurrentAccount;
};

export function Chatbox({
  id,
  sendMessageBoxId,
  messages,
  itemId,
  showAdminTools = false,
}: Readonly<Props>): JSX.Element {
  // enable websockets
  useItemChatUpdates(WS_CLIENT, itemId);

  return (
    <EditingContextProvider>
      <MessagesContextProvider itemId={itemId} messages={messages}>
        <ChatboxContainer id={id}>
          <Messages itemId={itemId} isAdmin={showAdminTools} />
          <InputContainer>
            <InputBar sendMessageBoxId={sendMessageBoxId} />
          </InputContainer>
        </ChatboxContainer>
      </MessagesContextProvider>
    </EditingContextProvider>
  );
}
