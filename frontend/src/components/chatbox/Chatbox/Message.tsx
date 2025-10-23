import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography, colors, styled } from '@mui/material';

import { format } from 'date-fns';
import truncate from 'lodash.truncate';

import { NS } from '@/config/constants.js';
import { getLocalForDateFns } from '@/config/langs.js';
import { hooks } from '@/config/queryClient.js';
import type { ChatMessageWithCreator } from '@/openapi/client/types.gen.js';
import Avatar from '@/ui/Avatar/Avatar.js';

import {
  DEFAULT_USER_NAME,
  MAX_AVATAR_SIZE,
  MAX_USERNAME_LENGTH,
} from '../constants.js';
import { messageIdCyWrapper } from '../selectors.js';
import { MessageBody } from './MessageBody.js';

const MessageWrapper = styled(Box)(({ theme }) => ({
  background: colors.grey[100],
  borderRadius: '5px',
  margin: theme.spacing(1, 0),
  padding: theme.spacing(0.5, 1, 0),
  maxWidth: '70%',
  width: 'fit-content',
  minWidth: 100,
  // wrap text at box limit
  wordBreak: 'break-word',
}));

const TimeText = styled(Typography)({
  float: 'right',
});

type Props = {
  message: ChatMessageWithCreator;
  isOwn: boolean;
};

export function Message({ message, isOwn }: Props) {
  const { t, i18n } = useTranslation(NS.Chatbox);
  const {
    data: avatarUrl,
    isPending: isPendingAvatar,
    isFetching: isFetchingAvatar,
  } = hooks.useAvatarUrl({
    id: message.creator?.id,
    size: 'small',
  });
  const { creator } = message;
  const creatorName = creator?.name
    ? truncate(creator?.name, { length: MAX_USERNAME_LENGTH })
    : DEFAULT_USER_NAME;
  const time = format(message.createdAt, 'HH:mm aaa', {
    locale: getLocalForDateFns(i18n.language),
  });

  return (
    <MessageWrapper
      p={1}
      sx={
        isOwn
          ? { background: colors.grey[300], alignSelf: 'flex-end' }
          : undefined
      }
      data-cy={messageIdCyWrapper(message.id)}
    >
      {!isOwn && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
          gap={1}
        >
          {creator?.id && (
            <Avatar
              variant={'circular'}
              alt={creatorName}
              isLoading={isPendingAvatar || isFetchingAvatar}
              component="avatar"
              url={avatarUrl}
              maxHeight={MAX_AVATAR_SIZE}
              maxWidth={MAX_AVATAR_SIZE}
            />
          )}
          <Typography variant="subtitle2">{creatorName}</Typography>
        </Stack>
      )}
      <MessageBody messageBody={message.body} />
      <TimeText variant="caption">
        {`${
          // when the createdAt and updatedAt times are different it means the message has been modified
          message.updatedAt !== message.createdAt
            ? t('MESSAGE_MODIFIED_INDICATOR')
            : ''
        } ${time}`}
      </TimeText>
    </MessageWrapper>
  );
}
