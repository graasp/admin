import { type JSX, type ReactNode } from 'react';

import { Container, Stack } from '@mui/material';

import { DEFAULT_BACKGROUND_COLOR } from '@/ui/theme';

export function CenteredContainer({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <Stack height="100vh" bgcolor={DEFAULT_BACKGROUND_COLOR}>
      <Container sx={{ my: 5, height: '100%' }}>
        <Stack
          height="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          gap={2}
        >
          {children}
        </Stack>
      </Container>
    </Stack>
  );
}
