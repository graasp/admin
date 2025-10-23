import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Alert, Button, Stack } from '@mui/material';

import { RecaptchaAction, isEmail } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';

import { TypographyLink } from '@/components/ui/TypographyLink';
import { NS } from '@/config/constants';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SUCCESS_ALERT,
} from '@/config/selectors';
import { signInWithPasswordMutation } from '@/openapi/client/@tanstack/react-query.gen';

import { executeCaptcha } from '~auth/context/RecaptchaContext';
import { AUTH } from '~auth/langs';

import { PasswordInput } from '../common/PasswordInput';
import { EmailInput } from './EmailInput';

type Inputs = {
  email: string;
  password: string;
};

export function PasswordLoginForm() {
  const { t } = useTranslation(NS.Auth);

  const { t: translateMessage } = useTranslation(NS.Messages);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const {
    mutate: signInWithPassword,
    isSuccess: signInWithPasswordSuccess,
    isPending: isLoadingPasswordSignIn,
    error: passwordSignInError,
  } = useMutation({
    ...signInWithPasswordMutation(),
    onSuccess: async () => {
      // reload app to refetch current account and trigger beforeLoad
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const handlePasswordSignIn = async (data: Inputs) => {
    const lowercaseEmail = data.email.toLowerCase();

    const token = await executeCaptcha(RecaptchaAction.SignInWithPassword);
    signInWithPassword({
      body: {
        ...data,
        email: lowercaseEmail,
        captcha: token,
      },
    });
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handlePasswordSignIn)}
      direction="column"
      spacing={1}
      alignItems="center"
    >
      <EmailInput
        id={EMAIL_SIGN_IN_FIELD_ID}
        form={register('email', {
          required: t('REQUIRED_FIELD_ERROR'),
          validate: (email) => isEmail(email, {}) || t('INVALID_EMAIL_ERROR'),
        })}
        placeholder={t(AUTH.EMAIL_INPUT_PLACEHOLDER)}
        error={emailError}
      />
      <Stack direction="column" alignItems="flex-end">
        <PasswordInput
          id={PASSWORD_SIGN_IN_FIELD_ID}
          error={passwordError}
          form={register('password', {
            required: t('REQUIRED_FIELD_ERROR'),
          })}
        />
        <TypographyLink
          color="textSecondary"
          variant="caption"
          sx={{
            textDecoration: 'none',
            '&:hover': { color: 'palette.primary.main' },
          }}
          to="/auth/forgot-password"
        >
          {t(AUTH.REQUEST_PASSWORD_RESET_LINK)}
        </TypographyLink>
      </Stack>
      {passwordSignInError && (
        <Alert severity="error">
          {'message' in passwordSignInError
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              translateMessage(passwordSignInError.message)
            : translateMessage('UNEXPECTED_ERROR')}
        </Alert>
      )}
      <Button
        type="submit"
        disabled={Boolean(passwordError) || Boolean(emailError)}
        id={PASSWORD_SIGN_IN_BUTTON_ID}
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none' }}
        fullWidth
        loading={isLoadingPasswordSignIn || signInWithPasswordSuccess}
      >
        {t(AUTH.SIGN_IN_PASSWORD_BUTTON)}
      </Button>

      {signInWithPasswordSuccess && (
        <Alert severity="success" id={PASSWORD_SUCCESS_ALERT}>
          {t(AUTH.PASSWORD_SUCCESS_ALERT)}
        </Alert>
      )}
    </Stack>
  );
}
