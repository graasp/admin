import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { ArrowLeftRightIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import {
  FORBIDDEN_CONTENT_CONTAINER_ID,
  FORBIDDEN_CONTENT_ID,
} from '@/config/selectors';
import ForbiddenContent from '@/ui/itemLogin/ForbiddenContent';

export function ItemForbiddenScreen(): JSX.Element {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation(NS.Player, { keyPrefix: 'FORBIDDEN_CONTENT' });

  return (
    <Stack
      id={FORBIDDEN_CONTENT_CONTAINER_ID}
      direction="column"
      height="100%"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <ForbiddenContent
        id={FORBIDDEN_CONTENT_ID}
        memberId={user?.id}
        title={t('ERROR_ACCESSING_ITEM')}
        authenticatedText={t('ERROR_ACCESSING_ITEM_HELPER')}
      />
      {isAuthenticated ? (
        <Button
          onClick={() => {
            logout();
          }}
          variant="outlined"
          startIcon={<ArrowLeftRightIcon />}
        >
          {t('LOG_OUT_BUTTON')}
        </Button>
      ) : (
        <ButtonLink
          variant="outlined"
          to="/auth/login"
          search={{ url: window.location.toString() }}
        >
          {t('LOG_IN_BUTTON')}
        </ButtonLink>
      )}
    </Stack>
  );
}

export default ItemForbiddenScreen;
