import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Box, Button, Stack, Typography } from '@mui/material';

import { RecaptchaAction } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { MailIcon } from 'lucide-react';
import { z } from 'zod';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import {
  BACK_BUTTON_ID,
  RESEND_EMAIL_BUTTON_ID,
  SUCCESS_CONTENT_ID,
} from '@/config/selectors';
import { loginMutation } from '@/openapi/client/@tanstack/react-query.gen';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { executeCaptcha } from '~auth/context/RecaptchaContext';

const signInSuccessSchema = z.object({
  email: z.string().email(),
  url: z.string().url().optional(),
  back: z.string().optional(),
});

export const Route = createFileRoute('/auth/success')({
  validateSearch: zodValidator(signInSuccessSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { email, url, back } = Route.useSearch();
  const { t } = useTranslation(NS.Auth);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { mutate: signIn } = useMutation(loginMutation());

  if (!email) {
    console.error('Missing email query param');
    return null;
  }

  // used for resend email
  const handleResendEmail = async () => {
    const lowercaseEmail = email.toLowerCase();
    const token = await executeCaptcha(RecaptchaAction.SignIn);
    signIn({
      body: { email: lowercaseEmail, captcha: token, url },
    });
  };

  const onClickResendEmail = () => {
    setIsEmailSent(true);
    handleResendEmail();
  };

  return (
    <LeftContentContainer>
      <Box maxWidth="sm" id={SUCCESS_CONTENT_ID}>
        <Stack direction="column" spacing={2}>
          <Typography
            variant="h4"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <MailIcon size={30} />
            {t('SIGN_IN_SUCCESS_TITLE')}
          </Typography>
          <Typography variant="body1" align="justify">
            <Trans
              ns={NS.Auth}
              i18nKey={'SIGN_IN_SUCCESS_TEXT'}
              values={{ email }}
              components={{ bold: <strong /> }}
            />
          </Typography>
          <Typography variant="body1" align="justify">
            {t('SIGN_IN_SUCCESS_EMAIL_PROBLEM')}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={1}>
            {back && (
              <ButtonLink
                variant="text"
                color="primary"
                to={back}
                id={BACK_BUTTON_ID}
              >
                {t('BACK_BUTTON')}
              </ButtonLink>
            )}
            <Button
              id={RESEND_EMAIL_BUTTON_ID}
              variant="outlined"
              color="primary"
              onClick={onClickResendEmail}
              disabled={isEmailSent}
            >
              {t('RESEND_EMAIL_BUTTON')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </LeftContentContainer>
  );
}
