import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Stack } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { HEADER_MEMBER_MENU_BUTTON_ID } from '@/config/selectors';
import { updateCurrentAccountMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { memberKeys } from '@/query/keys';
import { UserPopupMenu } from '@/ui/UserPopupMenu';

import { MentionButton } from '../chatbox/Mentions/MentionButton';
import { ButtonLink } from './ButtonLink';
import LanguageSwitch from './LanguageSwitch';
import MemberAvatar from './MemberAvatar';

export function HeaderRightContent() {
  const { i18n, t } = useTranslation(NS.Common, { keyPrefix: 'USER_SWITCH' });
  const { t: translateMessage } = useTranslation(NS.Messages);
  const { isAuthenticated, user, logout } = useAuth();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    ...updateCurrentAccountMutation(),
    onError: (error: Error) => {
      console.error(error);
      toast.error(translateMessage('EDIT_MEMBER_ERROR'));
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: memberKeys.current().content,
      });
    },
  });

  const handleLanguageChange = (lang: string) => {
    if (isAuthenticated && user.type === AccountType.Individual) {
      mutate({ body: { extra: { lang } } });
    }
    i18n.changeLanguage(lang);
  };

  if (isAuthenticated) {
    return (
      <Stack direction="row" gap={1} alignItems="center">
        {
          // only display these elements to "full users"
          user.type === AccountType.Individual && (
            <>
              <MentionButton color="white" badgeColor="primary" />

              <LanguageSwitch
                id="languageSwitch"
                lang={i18n.languages[0]}
                onChange={handleLanguageChange}
                color="white"
              />
            </>
          )
        }

        <UserPopupMenu
          avatarButtonId={HEADER_MEMBER_MENU_BUTTON_ID}
          signOut={logout}
          user={user}
          avatar={<MemberAvatar id={user.id} />}
          dataUmamiEvent="user-menu"
          signOutText={t('LOG_OUT')}
        />
      </Stack>
    );
  }

  // in case the user is not authenticated, we show a login button
  return (
    <ButtonLink to="/auth/login" sx={{ color: 'white' }} search={{}}>
      {t('LOG_IN')}
    </ButtonLink>
  );
}
