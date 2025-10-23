import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Stack } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { updateCurrentAccountMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { memberKeys } from '@/query/keys';
import { OnChangeLangProp } from '@/types';
import { DEFAULT_BACKGROUND_COLOR } from '@/ui/theme';

import { Footer } from '~landing/footer/Footer';
import { NavBar } from '~landing/header/NavBar';

export const Route = createFileRoute('/_landing')({
  component: RouteComponent,
});

function RouteComponent() {
  const { i18n } = useTranslation(NS.Landing, { keyPrefix: 'NAVBAR' });
  const { t: translateMessage } = useTranslation(NS.Messages);
  const { isAuthenticated, user } = useAuth();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    ...updateCurrentAccountMutation(),
    onError: (error: Error) => {
      console.error(error);
      toast.error(translateMessage('EDIT_MEMBER_ERROR'));
    },
    // Always refetch after error or success:
    onSettled: async () => {
      // invalidate all queries
      await queryClient.invalidateQueries({
        queryKey: memberKeys.current().content,
      });
    },
  });
  const onChangeLang: OnChangeLangProp = (lang: string) => {
    // only "full users" can change their language
    if (isAuthenticated && user.type === AccountType.Individual) {
      mutate({ body: { extra: { lang } } });
    }
    i18n.changeLanguage(lang);
  };

  return (
    <Stack alignItems="center" minHeight="100svh">
      <NavBar />
      <Stack
        id="bodyWrapper"
        direction="column"
        width="100%"
        alignItems="center"
        mt={
          // compensate the nav bar height
          10
        }
        p={4}
        pb={
          // give some breathing room before the footer
          15
        }
        gap={15}
        bgcolor={DEFAULT_BACKGROUND_COLOR}
        flexGrow={1}
      >
        <Outlet />
      </Stack>
      <Footer onChangeLang={onChangeLang} />
    </Stack>
  );
}
