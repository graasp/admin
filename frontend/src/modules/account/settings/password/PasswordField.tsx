import { type JSX, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import { Eye } from 'lucide-react';

type Props<T extends string> = {
  readonly id: string;
  readonly label: string;
  readonly error: boolean;
  readonly helperText?: string;
  readonly form: UseFormRegisterReturn<T>;
};

export function PasswordField<T extends string>({
  id,
  label,
  error,
  helperText,
  form,
}: Props<T>): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      slotProps={{
        input: {
          sx: { paddingRight: 0 },
          endAdornment: (
            <InputAdornment position="end" sx={{ margin: 0 }}>
              <IconButton onClick={() => setShowPassword((s) => !s)}>
                <Eye />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      label={label}
      variant="outlined"
      size="small"
      error={error}
      helperText={helperText}
      type={showPassword ? 'text' : 'password'}
      id={id}
      {...form}
    />
  );
}
