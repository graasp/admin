import { type JSX, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconButton, InputAdornment } from '@mui/material';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { NS } from '@/config/constants';

import { AUTH } from '~auth/langs';

import { StyledTextField } from './StyledTextField';
import { PasswordAdornment } from './adornments';

type Props = {
  id: string;
  form: UseFormRegisterReturn<'password'>;
  error: string | undefined;
};

export function PasswordInput({
  id,
  error,
  form,
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Auth);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <StyledTextField
      slotProps={{
        input: {
          startAdornment: PasswordAdornment,
          endAdornment: (
            <InputAdornment position="end" color="inherit">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                color="inherit"
              >
                {showPassword ? (
                  <EyeOffIcon color="currentColor" />
                ) : (
                  <EyeIcon color="currentColor" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      error={Boolean(error)}
      helperText={error}
      placeholder={t(AUTH.PASSWORD_INPUT_PLACEHOLDER)}
      id={id}
      type={showPassword ? 'text' : 'password'}
      {...form}
    />
  );
}
