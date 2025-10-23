import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { RESET_PASSWORD_TOKEN_ERROR_ID } from '@/config/selectors';

import { AUTH } from '~auth/langs';

import { CenteredContent } from '../layout/CenteredContent';
import { DialogHeader } from '../layout/DialogHeader';

export function InvalidTokenScreen() {
  const { t } = useTranslation(NS.Auth);

  return (
    <CenteredContent
      header={<DialogHeader title={t(AUTH.INVALID_TOKEN_PROVIDED_TITLE)} />}
    >
      <Alert id={RESET_PASSWORD_TOKEN_ERROR_ID} severity="error">
        {t(AUTH.INVALID_TOKEN_PROVIDED_DESCRIPTION)}
      </Alert>
      <ButtonLink
        variant="contained"
        fullWidth
        to="/auth/forgot-password"
        sx={{ textDecoration: 'none' }}
      >
        {t(AUTH.REQUEST_PASSWORD_RESET_TITLE)}
      </ButtonLink>
    </CenteredContent>
  );
}
