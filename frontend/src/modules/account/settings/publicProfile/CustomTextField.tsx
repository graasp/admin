import { ChangeEvent, type JSX } from 'react';

import { InputAdornment, TextField } from '@mui/material';

type CustomTextFieldProps = {
  readonly label: string;
  readonly value: string;
  readonly name: string;
  readonly helperText: string | false;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly Icon?: JSX.Element;
  readonly isError: boolean;
  readonly rows?: number;
  readonly multiline?: boolean;
  readonly required?: boolean;
  readonly id: string;
};
export function CustomTextField({
  label,
  onChange,
  value,
  name,
  Icon,
  helperText,
  isError,
  rows = 4,
  multiline = false,
  required = false,
  id,
}: CustomTextFieldProps): JSX.Element {
  return (
    <TextField
      label={label}
      variant="outlined"
      onChange={onChange}
      type="text"
      margin="dense"
      fullWidth
      name={name}
      value={value}
      helperText={helperText}
      error={isError}
      rows={rows}
      required={required}
      multiline={multiline}
      slotProps={
        Icon && {
          input: {
            startAdornment: (
              <InputAdornment position="start">{Icon}</InputAdornment>
            ),
          },
        }
      }
      id={id}
    />
  );
}
