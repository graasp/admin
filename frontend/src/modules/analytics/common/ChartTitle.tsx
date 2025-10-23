import type { JSX } from 'react';

import { Stack, Typography } from '@mui/material';

const ChartTitle = ({ title }: { title: string }): JSX.Element => {
  return (
    <Stack
      spacing={1}
      pt={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" align="center">
        {title}
      </Typography>
    </Stack>
  );
};

export default ChartTitle;
