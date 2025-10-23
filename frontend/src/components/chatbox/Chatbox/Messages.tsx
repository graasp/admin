import { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography, styled } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import groupBy from 'lodash.groupby';

import { useChatboxProvider } from '@/components/chatbox/Chatbox/chatbox.hook.js';
import { NS } from '@/config/constants.js';
import { getLocalForDateFns } from '@/config/langs.js';
import { getCurrentAccountOptions } from '@/openapi/client/@tanstack/react-query.gen.js';
import type { ChatMessageWithCreator } from '@/openapi/client/types.gen.js';

import { DEFAULT_DATE_FORMAT, SCROLL_SAFETY_MARGIN } from '../constants.js';
import { useEditingContext } from '../context/EditingContext.js';
import { messagesContainerCypress } from '../selectors.js';
import { Message } from './Message.js';
import { MessageActions } from './MessageActions.js';

const Container = styled('div')({
  // used in accordance with the main container (input + scroll window)
  overflowY: 'auto',
  // grow container to push input at bottom of window
  flex: 1,
  minHeight: '0px',
});

const MessageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
});

const SingleMessageContainer = styled(Box)({
  // make sure that the box container takes the most space
  width: '100%',
  display: 'flex',
  // used to place actions on the left of the message
  flexDirection: 'row',
  // center button with message box
  alignItems: 'center',
  alignContent: 'stretch',
});

type Props = {
  isAdmin?: boolean;
  itemId: string;
};

export function Messages({ isAdmin = false, itemId }: Readonly<Props>) {
  const { i18n } = useTranslation(NS.Chatbox);
  const ref = useRef<HTMLDivElement>(null);
  const { open } = useEditingContext();
  const { data: currentAccount } = useQuery(getCurrentAccountOptions());
  const { data: messages } = useChatboxProvider({ itemId });

  // scroll down to last message at start, on new message and on editing message
  useEffect(() => {
    if (ref?.current) {
      // temporarily hide the scroll bars when scrolling the container
      ref.current.style.overflowY = 'hidden';
      // scroll down the height of the container + some margin to make sure we are at the bottom
      ref.current.scrollTop = ref.current.scrollHeight + SCROLL_SAFETY_MARGIN;
      // re-activate scroll
      ref.current.style.overflowY = 'auto';
    }
  }, [ref, messages, open]);

  const isOwn = (message: ChatMessageWithCreator): boolean =>
    message.creator?.id === currentAccount?.id;

  const messagesByDay = Object.entries(
    groupBy(messages, ({ createdAt }) =>
      format(createdAt, DEFAULT_DATE_FORMAT, {
        locale: getLocalForDateFns(i18n.language),
      }),
    ),
  );

  return (
    <Container ref={ref} data-cy={messagesContainerCypress}>
      <MessageContainer>
        {messagesByDay?.map(([date, m]) => (
          <Fragment key={date}>
            <Box p={1} alignSelf="center">
              <Typography variant="subtitle2">{date}</Typography>
            </Box>
            {m?.map((message) => {
              const isOwnMessage = isOwn(message);

              return (
                <SingleMessageContainer
                  key={message.id}
                  sx={{
                    justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Message isOwn={isOwnMessage} message={message} />
                  {(isOwnMessage || isAdmin) && (
                    <MessageActions
                      message={message}
                      isOwn={isOwnMessage}
                      itemId={itemId}
                    />
                  )}
                </SingleMessageContainer>
              );
            })}
          </Fragment>
        ))}
      </MessageContainer>
    </Container>
  );
}
