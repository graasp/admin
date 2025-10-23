import type { ReactNode } from 'react';

import { Stack } from '@mui/material';

import { BACKGROUND_PATTERN } from '../../constants';
import { APIChecker } from '../APIChecker';
import { Footer } from '../Footer';
import { styledBox } from '../styles';

export function CenteredContent({
  children,
  header,
}: Readonly<{
  children: ReactNode;
  header: ReactNode;
}>) {
  return (
    <Stack
      direction="column"
      minHeight="100svh"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: BACKGROUND_PATTERN,
      }}
      gap={5}
      p={2}
    >
      <APIChecker />
      <Stack {...styledBox} borderRadius={2} p={{ xs: 2, sm: 4 }}>
        <Stack direction="column" alignItems="center" gap={5} maxWidth="50ch">
          {header}
          {children}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
