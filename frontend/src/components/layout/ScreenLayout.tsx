import { type JSX, type ReactNode } from 'react';

import { Divider, Stack, Typography } from '@mui/material';

type ScreenLayoutProps = {
  id?: string;
  title: string;
  children: ReactNode;
};
export function ScreenLayout({
  id,
  title,
  children,
}: Readonly<ScreenLayoutProps>): JSX.Element {
  return (
    <Stack spacing={2} id={id}>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      <Divider />
      {children}
    </Stack>
  );
}
