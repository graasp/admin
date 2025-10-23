import type { JSX } from 'react';
import { Control, useController, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MemberConstants,
  RecaptchaAction,
  isEmail,
} from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';

import { TypographyLink } from '@/components/ui/TypographyLink';
import { NS } from '@/config/constants';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  REGISTER_AGREEMENTS_CHECKBOX_ID,
  REGISTER_BUTTON_ID,
  REGISTER_HEADER_ID,
  REGISTER_SAVE_ACTIONS_ID,
} from '@/config/selectors';
import { registerMutation } from '@/openapi/client/@tanstack/react-query.gen';

import { executeCaptcha } from '~auth/context/RecaptchaContext';
import { AUTH } from '~auth/langs';

import { ErrorDisplay } from '../common/ErrorDisplay';
import { FormHeader } from '../common/FormHeader';
import { StyledTextField } from '../common/StyledTextField';
import { EmailAdornment, NameAdornment } from '../common/adornments';

type RegisterInputs = {
  name: string;
  email: string;
  enableSaveActions: boolean;
  userHasAcceptedAllTerms: boolean;
};

type FormElementProps = {
  control: Control<RegisterInputs>;
};

function EnableAnalyticsForm({
  control,
}: Readonly<FormElementProps>): JSX.Element {
  const { field } = useController({ control, name: 'enableSaveActions' });
  const { t } = useTranslation(NS.Auth, { keyPrefix: 'REGISTER' });

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={REGISTER_SAVE_ACTIONS_ID}
          size="small"
          checked={field.value}
          onChange={(_, checked) => field.onChange(checked)}
        />
      }
      label={
        <Typography fontSize="small">
          <Trans
            i18nKey="SAVE_ACTIONS_LABEL"
            t={t}
            components={{
              1: (
                <a
                  href="https://graasp.github.io/docs/user/account/data-collection"
                  target="_blank"
                >
                  _
                </a>
              ),
            }}
          />
        </Typography>
      }
    />
  );
}

export function AgreementForm({ control }: Readonly<FormElementProps>) {
  const { t } = useTranslation(NS.Auth);
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name: 'userHasAcceptedAllTerms',
    rules: { required: t('USER_AGREEMENTS_REQUIRED') },
  });
  const validationError = errors.userHasAcceptedAllTerms?.message;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={field.value}
            onChange={(_, checked) => field.onChange(checked)}
            color={validationError ? 'error' : 'primary'}
            data-cy={REGISTER_AGREEMENTS_CHECKBOX_ID}
            size="small"
          />
        }
        label={
          <Typography
            display="inline"
            fontSize="small"
            color={validationError ? 'error' : 'default'}
          >
            <Trans
              t={t}
              i18nKey={AUTH.USER_AGREEMENTS_CHECKBOX_LABEL}
              components={{
                terms: <Link to="/terms" target="_blank" rel="noreferrer" />,
                privacy: <Link to="/policy" target="_blank" rel="noreferrer" />,
              }}
            />
          </Typography>
        }
      />
      {validationError && (
        <Typography variant="caption" color="error">
          {validationError}
        </Typography>
      )}
    </>
  );
}

type RegisterProps = {
  search: {
    url?: string;
    invitationId?: string;
  };
  initialData?: {
    name?: string;
    email?: string;
  };
};

export function RegisterForm({ search, initialData }: Readonly<RegisterProps>) {
  const { t, i18n } = useTranslation(NS.Auth);
  const { t: translateCommon } = useTranslation(NS.Common, {
    keyPrefix: 'FIELD_ERROR',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>({
    defaultValues: { enableSaveActions: true, ...initialData },
  });

  const {
    mutateAsync: signUp,
    isPending: isLoadingSignUp,
    error: webRegisterError,
  } = useMutation({
    ...registerMutation(),
    onError: (error: Error) => {
      console.error(error);
    },
  });
  const handleRegister = async (inputs: RegisterInputs) => {
    // lowercase email
    const email = inputs.email.toLowerCase();
    // trim username to remove extra whitespaces before and after
    const name = inputs.name.trim();
    const token = await executeCaptcha(RecaptchaAction.SignUp);
    await signUp({
      query: {
        lang: i18n.language,
      },
      body: {
        name,
        email,
        captcha: token,
        url: search.url,
        enableSaveActions: inputs.enableSaveActions,
      },
    });

    // navigate to success path
    navigate({
      to: '/auth/success',
      search: { email, back: location.pathname },
    });
  };

  const nameError = errors.name?.message;
  const emailError = errors.email?.message;
  const disableRegister = Boolean(Object.keys(errors).length > 0);

  return (
    <Stack direction="column" gap={4} alignItems="center" maxWidth="300px">
      <FormHeader id={REGISTER_HEADER_ID} title={t(AUTH.REGISTER_TITLE)} />
      <Stack
        component="form"
        onSubmit={handleSubmit(handleRegister)}
        direction="column"
        gap={1}
      >
        <StyledTextField
          id={NAME_SIGN_UP_FIELD_ID}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: NameAdornment,
            },
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          helperText={nameError}
          error={Boolean(nameError)}
          {...register('name', {
            required: translateCommon('REQUIRED'),
            maxLength: {
              value: MAX_USERNAME_LENGTH,
              message: translateCommon('USERNAME_MAX_LENGTH', {
                max: MAX_USERNAME_LENGTH,
              }),
            },
            minLength: {
              value: MIN_USERNAME_LENGTH,
              message: translateCommon('USERNAME_MIN_LENGTH', {
                min: MIN_USERNAME_LENGTH,
              }),
            },
            validate: (name) =>
              MemberConstants.USERNAME_FORMAT_REGEX.test(name.trim()) ||
              translateCommon('USERNAME_SPECIAL_CHARACTERS'),
          })}
          placeholder={t('NAME_FIELD_LABEL')}
        />
        <StyledTextField
          id={EMAIL_SIGN_UP_FIELD_ID}
          slotProps={{
            input: {
              startAdornment: EmailAdornment,
            },
          }}
          variant="outlined"
          error={Boolean(emailError)}
          helperText={emailError}
          {...register('email', {
            required: translateCommon('REQUIRED'),
            validate: (email) =>
              isEmail(email, {}) || translateCommon('INVALID_EMAIL'),
          })}
          placeholder={t('EMAIL_INPUT_PLACEHOLDER_REQUIRED')}
          // do not allow to modify the email if it was provided
          disabled={Boolean(initialData?.email)}
        />
        <Stack>
          <EnableAnalyticsForm control={control} />
          <AgreementForm control={control} />
        </Stack>
        <ErrorDisplay error={webRegisterError} />
        <Button
          id={REGISTER_BUTTON_ID}
          type="submit"
          variant="contained"
          loading={isLoadingSignUp}
          fullWidth
          disabled={disableRegister}
        >
          {t('SIGN_UP_BUTTON')}
        </Button>
      </Stack>
      <TypographyLink color="textSecondary" to="/auth/login" search={search}>
        {t('SIGN_IN_LINK_TEXT')}
      </TypographyLink>
    </Stack>
  );
}
