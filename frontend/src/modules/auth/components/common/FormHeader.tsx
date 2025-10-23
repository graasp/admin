import type { JSX } from 'react';

import { Stack, Typography, useTheme } from '@mui/material';

import GraaspLogo from '@/ui/GraaspLogo/GraaspLogo';

type FormHeaderProps = {
  readonly id?: string;
  readonly title: string;
};
export function FormHeader({ id, title }: FormHeaderProps): JSX.Element {
  const theme = useTheme();
  return (
    <Stack spacing={1}>
      <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
      <Typography variant="h4" component="h2" id={id} textAlign="center">
        {title}
      </Typography>
    </Stack>
  );
}
