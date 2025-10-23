import { useTranslation } from 'react-i18next';

import { Button, Container, Stack, Typography } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import {
  Outlet,
  createFileRoute,
  redirect,
  useCanGoBack,
  useRouter,
} from '@tanstack/react-router';
import { LockIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { LOG_IN_PAGE_PATH } from '@/config/paths';
import { PREVENT_GUEST_MESSAGE_ID } from '@/config/selectors';
import { useButtonColor } from '@/ui/buttons/hooks';

import { PageWrapper } from '~account/PageWrapper';
import { MemberValidationBanner } from '~account/alerts/MemberValidationBanner';

export const Route = createFileRoute('/_memberOnly')({
  beforeLoad: ({ context }) => {
    const { auth } = context;
    // check if the user is authenticated.
    // if not, redirect to `/auth/login` so the user can log in their account
    if (!auth.isAuthenticated) {
      throw redirect({
        to: LOG_IN_PAGE_PATH,
        search: {
          url: window.location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  if (user?.type !== AccountType.Individual) {
    return <GuestNotAuthorized />;
  }

  return (
    <PageWrapper>
      <MemberValidationBanner />
      <Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
        <Outlet />
      </Container>
    </PageWrapper>
  );
}

function GuestNotAuthorized() {
  const { t } = useTranslation(NS.Account, { keyPrefix: 'GUEST_AUTH' });
  const { t: translateCommon } = useTranslation(NS.Common);
  const { color } = useButtonColor('primary');
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <Stack
      id={PREVENT_GUEST_MESSAGE_ID}
      height="100vh"
      alignItems="center"
      justifyContent="center"
      p={5}
      gap={5}
    >
      <Stack direction="row" alignItems="center" gap={5}>
        <LockIcon size={80} color={color} />
        <Typography variant="h1" color="primary">
          {t('TITLE')}
        </Typography>
      </Stack>
      <Typography>{t('DESCRIPTION')}</Typography>
      {canGoBack ? (
        <Button onClick={() => router.history.back()}>
          {translateCommon('BACK.BUTTON_TEXT')}
        </Button>
      ) : null}
    </Stack>
  );
}
