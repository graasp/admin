import { type JSX, type ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type BorderedSectionProps = {
  id?: string;
  title: string;
  topAction?: ReactNode;
  children: ReactNode;
};
export function BorderedSection({
  id,
  title,
  topAction,
  children,
}: Readonly<BorderedSectionProps>): JSX.Element {
  return (
    <Stack
      id={id}
      border="1px solid"
      borderColor="divider"
      borderRadius={1}
      p={2}
      spacing={1}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        {topAction}
      </Stack>
      {children}
    </Stack>
  );
}
