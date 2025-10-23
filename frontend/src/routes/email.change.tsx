import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Stack,
  Typography,
} from '@mui/material';

import { Link, createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { HttpStatusCode, isAxiosError } from 'axios';
import { z } from 'zod';

import { CenteredContainer } from '@/components/layout/CenteredContainer';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { ACCOUNT_SETTINGS_PATH } from '@/config/paths';
import { mutations } from '@/config/queryClient';
import {
  EMAIL_VALIDATION_BUTTON_ID,
  EMAIL_VALIDATION_CONFLICT_MESSAGE_ID,
  EMAIL_VALIDATION_SUCCESS_MESSAGE_ID,
  EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID,
} from '@/config/selectors';

const schema = z.object({
  email: z.string().email().optional(),
  t: z.string().optional(),
});

export const Route = createFileRoute('/email/change')({
  validateSearch: zodValidator(schema),
  component: EmailChangeRoute,
});

function EmailChangeRoute() {
  const { email, t: jwtToken } = Route.useSearch();
  return (
    <CenteredContainer>
      <EmailChangeContent newEmail={email} jwtToken={jwtToken} />
    </CenteredContainer>
  );
}

type EmailChangeContentProps = {
  newEmail?: string;
  jwtToken?: string;
};

function EmailChangeContent({
  newEmail,
  jwtToken,
}: Readonly<EmailChangeContentProps>): JSX.Element {
  const { t } = useTranslation(NS.Account);
  const {
    mutate: validateEmail,
    error,
    isSuccess,
  } = mutations.useValidateEmailUpdate();

  if (jwtToken) {
    const handleEmailValidation = () => {
      validateEmail(jwtToken);
    };

    if (isSuccess) {
      return (
        <>
          <Alert id={EMAIL_VALIDATION_SUCCESS_MESSAGE_ID} severity="success">
            <AlertTitle>{t('EMAIL_UPDATE_SUCCESS_TITLE')}</AlertTitle>
            {t('EMAIL_UPDATE_SUCCESS_TEXT')}
          </Alert>
          <ButtonLink to="/auth/login">
            {t('EMAIL_UPDATE_SUCCESS_BUTTON_TEXT')}
          </ButtonLink>
        </>
      );
    }

    if (error && isAxiosError(error)) {
      const statusCode = error.response?.status;

      if (statusCode === HttpStatusCode.Unauthorized) {
        return (
          <Alert severity="error" id={EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID}>
            <AlertTitle>{t('EMAIL_UPDATE_UNAUTHORIZED_TITLE')}</AlertTitle>
            <Stack direction="column" gap={1}>
              <Typography>
                {t('EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_VALIDITY')}
              </Typography>
              <Typography>
                {t('EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_GENERATION')}
              </Typography>
              <Button component={Link} to={ACCOUNT_SETTINGS_PATH}>
                {t('EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_GENERATION_BUTTON')}
              </Button>
            </Stack>
          </Alert>
        );
      }

      if (statusCode === HttpStatusCode.Conflict) {
        return (
          <Alert severity="error" id={EMAIL_VALIDATION_CONFLICT_MESSAGE_ID}>
            <AlertTitle>{t('EMAIL_UPDATE_CONFLICT_TITLE')}</AlertTitle>
            {t('EMAIL_UPDATE_CONFLICT_TEXT')}
          </Alert>
        );
      }
    }

    return (
      <>
        <Typography variant="h2" component="h1">
          {t('VALIDATE_EMAIL_TITLE')}
        </Typography>
        <Card>
          <Stack direction="column" alignItems="center" gap={1} p={2}>
            <Typography>{t('VALIDATE_EMAIL_TEXT')}</Typography>
            <Typography fontWeight="bold">{newEmail}</Typography>
            <Button
              id={EMAIL_VALIDATION_BUTTON_ID}
              variant="contained"
              onClick={handleEmailValidation}
              sx={{ width: 'min-content' }}
            >
              {t('VALIDATE_EMAIL_BUTTON_TEXT')}
            </Button>
          </Stack>
        </Card>
      </>
    );
  }
  return <Typography>{t('EMAIL_UPDATE_MISSING_TOKEN')}</Typography>;
}
