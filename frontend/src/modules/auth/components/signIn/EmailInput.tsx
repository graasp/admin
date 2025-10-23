import type { JSX } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { StyledTextField } from '../common/StyledTextField';
import { EmailAdornment } from '../common/adornments';

type Props = {
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  form: UseFormRegisterReturn<'email'>;
  error?: string;
  placeholder: string;
};

export function EmailInput({
  id,
  disabled = false,
  autoFocus = false,
  form,
  error,
  placeholder,
}: Readonly<Props>): JSX.Element {
  return (
    <StyledTextField
      id={id}
      slotProps={{
        input: {
          startAdornment: EmailAdornment,
        },
      }}
      variant="outlined"
      error={Boolean(error)}
      placeholder={placeholder}
      helperText={error}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      disabled={disabled}
      {...form}
    />
  );
}
