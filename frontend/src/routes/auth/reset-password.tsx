import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { isPasswordStrong } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { TypographyLink } from '@/components/ui/TypographyLink';
import { HELP_EMAIL, NS } from '@/config/constants';
import { resetPasswordMutation } from '@/openapi/client/@tanstack/react-query.gen';

import { PasswordAdornment } from '~auth/components/common/adornments';
import { CenteredContent } from '~auth/components/layout/CenteredContent';
import { DialogHeader } from '~auth/components/layout/DialogHeader';
import { InvalidTokenScreen } from '~auth/components/requestPasswordReset/InvalidTokenScreen';
import { useValidateJWTToken } from '~auth/hooks/useValidateJWTToken';

import {
  RESET_PASSWORD_BACK_TO_LOGIN_BUTTON_ID,
  RESET_PASSWORD_ERROR_MESSAGE_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID,
  RESET_PASSWORD_NEW_PASSWORD_FIELD_ID,
  RESET_PASSWORD_SUBMIT_BUTTON_ID,
  RESET_PASSWORD_SUCCESS_MESSAGE_ID,
} from '../../config/selectors';

const resetPasswordSchema = z.object({
  t: z.string().optional(),
});

export const Route = createFileRoute('/auth/reset-password')({
  validateSearch: zodValidator(resetPasswordSchema),
  component: ResetPassword,
  errorComponent: InvalidTokenScreen,
});

type Inputs = {
  password: string;
  confirmPassword: string;
};

function ResetPassword() {
  const { t } = useTranslation(NS.Auth);
  const search = Route.useSearch();
  const { isValid: isTokenValid, token } = useValidateJWTToken(search.t);

  const [showPasswords, setShowPasswords] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    mutate: resolveRequestPasswordReset,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation(resetPasswordMutation());

  if (!isTokenValid) {
    return <InvalidTokenScreen />;
  }

  const resetPassword = ({ password }: Inputs) => {
    resolveRequestPasswordReset({
      body: { password },
      headers: { authorization: `Bearer ${token}` },
    });
  };

  const passwordErrorMessage = errors.password?.message;
  const confirmPasswordErrorMessage = errors.confirmPassword?.message;
  const hasErrors = Boolean(
    passwordErrorMessage || confirmPasswordErrorMessage,
  );

  return (
    <CenteredContent
      header={
        <DialogHeader
          title={t('RESET_PASSWORD_TITLE')}
          description={
            <Stack gap={1} width="100%">
              {t('RESET_PASSWORD_DESCRIPTION')}
              <Typography>
                {t('RESET_PASSWORD_REQUIREMENTS_TITLE')}
                <ul style={{ margin: 0 }}>
                  <li>
                    {t('RESET_PASSWORD_REQUIREMENTS_LENGTH', { length: 8 })}
                  </li>
                  <li>
                    {t('RESET_PASSWORD_REQUIREMENTS_LOWERCASE', {
                      count: 1,
                    })}
                  </li>
                  <li>
                    {t('RESET_PASSWORD_REQUIREMENTS_UPPERCASE', {
                      count: 1,
                    })}
                  </li>
                  <li>
                    {t('RESET_PASSWORD_REQUIREMENTS_NUMBER', {
                      count: 1,
                    })}
                  </li>
                </ul>
              </Typography>
            </Stack>
          }
        />
      }
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(resetPassword)}
        direction="column"
        alignItems="center"
        spacing={1}
        width="100%"
      >
        <TextField
          id={RESET_PASSWORD_NEW_PASSWORD_FIELD_ID}
          slotProps={{
            input: {
              startAdornment: PasswordAdornment,
            },
            formHelperText: {
              id: RESET_PASSWORD_NEW_PASSWORD_FIELD_ERROR_TEXT_ID,
            },
          }}
          {...register('password', {
            required: t('REQUIRED_FIELD_ERROR'),
            validate: (value) =>
              isPasswordStrong(value) || t('PASSWORD_WEAK_ERROR'),
          })}
          label={t('RESET_PASSWORD_NEW_PASSWORD_FIELD_LABEL')}
          variant="outlined"
          error={Boolean(passwordErrorMessage)}
          helperText={passwordErrorMessage}
          type={showPasswords ? '' : 'password'}
          fullWidth
          disabled={isSuccess || isError}
        />
        <TextField
          id={RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ID}
          slotProps={{
            input: {
              startAdornment: PasswordAdornment,
            },
            formHelperText: {
              id: RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_ERROR_TEXT_ID,
            },
          }}
          {...register('confirmPassword', {
            required: t('REQUIRED_FIELD_ERROR'),
            validate: {
              strong: (value) =>
                isPasswordStrong(value) || t('PASSWORD_WEAK_ERROR'),
              match: (confirmPassword, formState) =>
                confirmPassword === formState.password ||
                t('PASSWORD_DO_NOT_MATCH_ERROR'),
            },
          })}
          label={t('RESET_PASSWORD_NEW_PASSWORD_CONFIRMATION_FIELD_LABEL')}
          variant="outlined"
          error={Boolean(confirmPasswordErrorMessage)}
          helperText={confirmPasswordErrorMessage}
          type={showPasswords ? '' : 'password'}
          fullWidth
          disabled={isSuccess || isError}
        />
        <FormControlLabel
          sx={{ width: '100%' }}
          control={
            <Checkbox
              value={showPasswords}
              onChange={() => setShowPasswords((v) => !v)}
            />
          }
          label={t('SHOW_PASSWORD')}
        />
        {isError && (
          <>
            <Alert id={RESET_PASSWORD_ERROR_MESSAGE_ID} severity="error">
              {t('RESET_PASSWORD_ERROR_MESSAGE', { email: HELP_EMAIL })}
            </Alert>
            <ButtonLink
              variant="contained"
              fullWidth
              to="/auth/forgot-password"
              sx={{ textDecoration: 'none' }}
            >
              {t('REQUEST_PASSWORD_RESET_TITLE')}
            </ButtonLink>
          </>
        )}
        {isSuccess ? (
          <>
            <Alert id={RESET_PASSWORD_SUCCESS_MESSAGE_ID} severity="success">
              {t('RESET_PASSWORD_SUCCESS_MESSAGE')}
            </Alert>
            <ButtonLink
              variant="contained"
              fullWidth
              to="/auth/login"
              id={RESET_PASSWORD_BACK_TO_LOGIN_BUTTON_ID}
            >
              {t('BACK_TO_SIGN_IN_BUTTON')}
            </ButtonLink>
          </>
        ) : (
          <Button
            id={RESET_PASSWORD_SUBMIT_BUTTON_ID}
            variant="contained"
            loading={isLoading}
            fullWidth
            type="submit"
            disabled={hasErrors || isError}
          >
            {t('RESET_PASSWORD_BUTTON')}
          </Button>
        )}
      </Stack>
      {
        // only show this when `isSuccess` is false
        !isSuccess && (
          <TypographyLink
            to="/auth/login"
            color="textSecondary"
            sx={{ textDecoration: 'none' }}
          >
            {t('BACK_TO_SIGN_IN_BUTTON')}
          </TypographyLink>
        )
      }
    </CenteredContent>
  );
}
