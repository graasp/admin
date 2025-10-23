import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Stack, Typography } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { ChartColumnBigIcon, DatabaseIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { getLocalForDateFns } from '@/config/langs';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_CREATED_AT_ID,
  MEMBER_USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import { AvatarUploader } from './memberPicture/AvatarUploader';

export function MemberCard(): JSX.Element | null {
  const { t, i18n } = useTranslation(NS.Account);

  const { data: member } = hooks.useCurrentMember();

  if (member?.type !== AccountType.Individual) {
    return (
      <Alert severity="error">{t('NOT_AUTHENTICATED_OR_GUEST_MESSAGE')}</Alert>
    );
  }

  if (member) {
    return (
      <Stack direction="row" gap={2} alignItems="center">
        <Stack alignItems="center" gap={2}>
          <AvatarUploader />
        </Stack>
        <Stack direction="column">
          <Typography variant="h4" id={MEMBER_USERNAME_DISPLAY_ID}>
            {member.name}
          </Typography>

          <Typography id={MEMBER_CREATED_AT_ID} variant="caption">
            {t('PROFILE_CREATED_AT_INFO', {
              date: formatDistanceToNow(new Date(member.createdAt), {
                locale: getLocalForDateFns(i18n.language),
              }),
            })}
          </Typography>
          <Stack direction="row" gap={1}>
            <ButtonLink
              to="/account/storage"
              startIcon={<DatabaseIcon fontSize={24} />}
            >
              {t('MAIN_MENU.STORAGE')}
            </ButtonLink>
            <ButtonLink to="/account/stats" startIcon={<ChartColumnBigIcon />}>
              {t('MAIN_MENU.STATS')}
            </ButtonLink>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  // improvement: add a loading interface
  return null;
}
