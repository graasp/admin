import type { JSX } from 'react';

import { Skeleton, Stack, Typography } from '@mui/material';

export function LoadingTree(): JSX.Element {
  return (
    <Stack p={1}>
      {['elem 1', 'elem 2', 'elem 3', 'elem 4', 'elem 5'].map((el) => (
        <Typography key={el}>
          <Skeleton variant="text" />
        </Typography>
      ))}
    </Stack>
  );
}
