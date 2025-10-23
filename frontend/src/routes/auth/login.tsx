import { useTranslation } from 'react-i18next';

import { Divider, Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { LOG_IN_HEADER_ID } from '@/config/selectors';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { FormHeader } from '~auth/components/common/FormHeader';
import { MagicLinkLoginForm } from '~auth/components/signIn/MagicLinkLoginForm';
import { PasswordLoginForm } from '~auth/components/signIn/PasswordLoginForm';

const loginSearchSchema = z.object({
  url: z.string().url().optional(),
});

export const Route = createFileRoute('/auth/login')({
  validateSearch: zodValidator(loginSearchSchema),
  component: LoginRoute,
});

function LoginRoute() {
  const search = Route.useSearch();
  const { t } = useTranslation(NS.Auth);
  return (
    <LeftContentContainer>
      <Stack direction="column" alignItems="center" gap={3}>
        <FormHeader id={LOG_IN_HEADER_ID} title={t('LOGIN_TITLE')} />
        <Stack
          direction="column"
          alignItems="center"
          divider={<Divider flexItem>{t('LOGIN_METHODS_DIVIDER')}</Divider>}
          gap={3}
        >
          <MagicLinkLoginForm search={search} />
          <PasswordLoginForm />
          <ButtonLink
            variant="contained"
            fullWidth
            to="/auth/register"
            search={search}
          >
            {t('SIGN_UP_LINK_TEXT')}
          </ButtonLink>
        </Stack>
      </Stack>
    </LeftContentContainer>
  );
}
