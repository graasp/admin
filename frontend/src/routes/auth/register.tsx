import { useTranslation } from 'react-i18next';

import { Alert, LinearProgress, Stack, Typography } from '@mui/material';

import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { NS } from '@/config/constants';
import { useInvitation } from '@/query/hooks/invitation';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { RegisterForm } from '~auth/components/register/Register';

const registerSearchSchema = z.object({
  invitationId: z.string().uuid().optional(),
  url: z.string().url().optional(),
  m: z.string().optional(),
});

export const Route = createFileRoute('/auth/register')({
  validateSearch: zodValidator(registerSearchSchema),
  search: { middlewares: [retainSearchParams(['url'])] },
  component: () => (
    <LeftContentContainer>
      <RegisterPage />
    </LeftContentContainer>
  ),
});

function RegisterWithInvitation() {
  const search = Route.useSearch();
  const { t } = useTranslation(NS.Auth);

  const { data: invitation, isPending: isLoadingInvitations } = useInvitation(
    search.invitationId,
  );

  if (invitation) {
    return (
      <RegisterForm
        search={search}
        initialData={{ name: invitation.name, email: invitation.email }}
      />
    );
  }

  // invitations loading
  if (isLoadingInvitations) {
    return (
      <Stack direction="column" spacing={1}>
        <Typography>{t('INVITATION_LOADING_MESSAGE')}</Typography>
        <LinearProgress />
      </Stack>
    );
  }

  return (
    <Stack gap={2} alignItems="center">
      <Alert severity="warning" sx={{ maxWidth: '35ch' }}>
        {t('INVITATION_NOT_FOUND_MESSAGE')}
      </Alert>
      <RegisterForm search={search} />
    </Stack>
  );
}

function RegisterPage() {
  const search = Route.useSearch();
  if (search.invitationId) {
    return <RegisterWithInvitation />;
  }

  return <RegisterForm search={search} />;
}
