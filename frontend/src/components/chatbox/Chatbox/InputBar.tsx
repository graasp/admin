import { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

import { useChatboxProvider } from '@/components/chatbox/Chatbox/chatbox.hook.js';
import type { CreateChatMessageData } from '@/openapi/client/types.gen.js';

import { useEditingContext } from '../context/EditingContext.js';
import { useMessagesContext } from '../context/MessagesContext.js';
import { EditBanner } from './EditBanner.js';
import { Input } from './Input.js';

type Props = {
  sendMessageBoxId?: string;
};

export function InputBar({ sendMessageBoxId }: Readonly<Props>) {
  const { open, body, messageId, cancelEdit } = useEditingContext();
  const [textInput, setTextInput] = useState(open ? body : '');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { itemId } = useMessagesContext();
  const { editMessage, sendMessage } = useChatboxProvider({ itemId });

  useEffect(
    () => {
      // when in editing mode, seed the textfield with the old message body
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setTextInput(open ? body : '');
      // focus the input field
      if (open) {
        inputRef.current?.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, messageId],
  );

  const handleOnCloseEditingBanner = (): void => {
    cancelEdit();
    setTextInput('');
  };

  const handleSendMessageFunction = (
    newBody: CreateChatMessageData['body'],
  ): void => {
    if (open) {
      editMessage({
        path: { messageId: messageId, itemId },
        // TODO: here we only send an update of the text and leave out the mention update
        body: { body: newBody.body },
      });
    } else {
      sendMessage({ path: { itemId }, body: newBody });
    }
    // reset editing
    cancelEdit();
  };

  return (
    <Box width="100%">
      <EditBanner onClose={handleOnCloseEditingBanner} editedText={body} />
      <Input
        id={sendMessageBoxId}
        inputRef={inputRef}
        textInput={textInput}
        setTextInput={setTextInput}
        sendOrEditMessage={handleSendMessageFunction}
      />
    </Box>
  );
}
