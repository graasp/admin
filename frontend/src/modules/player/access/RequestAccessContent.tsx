import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  Member,
  MembershipRequestStatus,
} from '@graasp/sdk';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Lock } from 'lucide-react';

import { NS } from '@/config/constants';
import {
  MEMBERSHIP_REQUEST_PENDING_SCREEN_SELECTOR,
  REQUEST_MEMBERSHIP_BUTTON_ID,
} from '@/config/selectors';
import {
  createMembershipRequestMutation,
  getOwnMembershipRequestByItemIdOptions,
  getOwnMembershipRequestByItemIdQueryKey,
} from '@/openapi/client/@tanstack/react-query.gen';

export function RequestAccessContent({
  member,
  itemId,
}: Readonly<{
  member: Member;
  itemId: DiscriminatedItem['id'];
}>): JSX.Element {
  const { t: translatePlayer } = useTranslation(NS.Player);
  const queryClient = useQueryClient();
  const {
    mutateAsync: requestMembership,
    isSuccess,
    isPending,
  } = useMutation({
    ...createMembershipRequestMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getOwnMembershipRequestByItemIdQueryKey({
          path: { itemId },
        }),
      });
    },
  });
  const { data: request } = useQuery(
    getOwnMembershipRequestByItemIdOptions({ path: { itemId } }),
  );

  if (request?.status === MembershipRequestStatus.Pending) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flex={1}
        gap={2}
        data-cy={MEMBERSHIP_REQUEST_PENDING_SCREEN_SELECTOR}
      >
        <Lock size={40} />
        <Typography variant="h3">
          {translatePlayer('REQUEST_ACCESS_PENDING_TITLE')}
        </Typography>
        <Typography>
          {translatePlayer('REQUEST_ACCESS_PENDING_DESCRIPTION')}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flex={1}
      gap={2}
    >
      <Lock size={40} />
      <Typography variant="h3">
        {translatePlayer('REQUEST_ACCESS_TITLE')}
      </Typography>
      <Button
        id={REQUEST_MEMBERSHIP_BUTTON_ID}
        variant="contained"
        disabled={isSuccess}
        loading={isPending}
        endIcon={isSuccess ? <Check /> : null}
        onClick={async () => {
          await requestMembership({ path: { itemId } });
        }}
      >
        {isSuccess
          ? translatePlayer('REQUEST_ACCESS_SENT_BUTTON')
          : translatePlayer('REQUEST_ACCESS_BUTTON')}
      </Button>
      <Typography variant="subtitle2">
        {translatePlayer('ITEM_LOGIN_HELPER_SIGN_OUT', {
          email: member.email,
        })}
      </Typography>
    </Stack>
  );
}
