import { type JSX, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Button, Stack, Typography } from '@mui/material';

import { ItemLoginSchemaType } from '@graasp/sdk';

import { Navigate, createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { useAuth } from '@/AuthContext';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { hooks, mutations } from '@/config/queryClient';
import {
  AUTO_LOGIN_CONTAINER_ID,
  AUTO_LOGIN_ERROR_CONTAINER_ID,
  AUTO_LOGIN_NO_ITEM_LOGIN_ERROR_ID,
} from '@/config/selectors';

const autoLoginSchema = z.object({
  // need to use coerce here as otherwise if it looks like a number it will be processed as a number and fail
  username: z.coerce.string().optional(),
});

export const Route = createFileRoute('/player/$rootId/$itemId/autoLogin')({
  validateSearch: zodValidator(autoLoginSchema),
  component: AutoLogin,
});

const Wrapper = ({ id, children }: { id?: string; children: ReactNode }) => (
  <Stack
    id={id}
    height="100vh"
    alignItems="center"
    justifyContent="center"
    gap={2}
  >
    {children}
  </Stack>
);

function AutoLogin(): JSX.Element {
  const { user, logout } = useAuth();
  const { t } = useTranslation(NS.Player);

  const { mutateAsync: pseudoLogin } = mutations.usePostItemLogin();

  const { itemId, rootId } = Route.useParams();

  const { data: itemLoginSchemaType } = hooks.useItemLoginSchemaType({
    itemId,
  });
  const search = Route.useSearch();
  const navigate = useNavigate();

  // get username from query param
  const username = search.username;

  if (!username) {
    return (
      <Wrapper id={AUTO_LOGIN_ERROR_CONTAINER_ID}>
        <Alert severity="error">
          {t('AUTO_LOGIN_MISSING_REQUIRED_PARAMETER_USERNAME')}
        </Alert>
        <ButtonLink to="/">{t('AUTO_LOGIN_GO_TO_HOME')}</ButtonLink>
      </Wrapper>
    );
  }

  if (!itemId) {
    return <Navigate to="/" />;
  }

  // link used for the content
  const redirectionTarget = {
    to: '/player/$rootId/$itemId',
    params: { rootId, itemId },
    search: { fullscreen: search.fullscreen, shuffle: search.shuffle },
  } as const;

  // if the user is logged in
  if (user) {
    if (user.name !== username) {
      return (
        <Stack
          height="100vh"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Typography variant="h2">
            {t('AUTO_LOGIN_ALREADY_LOGGED_IN')}
          </Typography>
          <Button variant="contained" onClick={() => logout()}>
            {t('AUTO_LOGIN_SIGN_OUT_AND_BACK_IN')}
          </Button>
        </Stack>
      );
    }
    return <Navigate {...redirectionTarget} />;
  }

  if (itemLoginSchemaType !== ItemLoginSchemaType.Username) {
    return (
      <Alert id={AUTO_LOGIN_NO_ITEM_LOGIN_ERROR_ID} severity="error">
        {t('AUTO_LOGIN_NO_ITEM_LOGIN_ERROR')}
      </Alert>
    );
  }

  const autoLogin = async () => {
    // post item login for the passed username
    await pseudoLogin({ itemId, username });
    // auto navigate the user to the right context
    navigate(redirectionTarget);
  };

  return (
    <Wrapper id={AUTO_LOGIN_CONTAINER_ID}>
      <Typography variant="h2">{t('AUTO_LOGIN_WELCOME_TITLE')}</Typography>
      <Button variant="contained" onClick={autoLogin}>
        {t('AUTO_LOGIN_START_BUTTON')}
      </Button>
    </Wrapper>
  );
}
