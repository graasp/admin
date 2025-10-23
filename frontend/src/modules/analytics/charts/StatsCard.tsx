import type { JSX } from 'react';

import { Grid, Paper, Stack, Typography } from '@mui/material';

type Props = {
  icon: JSX.Element;
  title: string;
  stat: number | string;
};
const StatsCard = ({ icon, title, stat }: Props): JSX.Element => (
  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
    <Stack
      height="100%"
      component={Paper}
      p={2}
      variant="outlined"
      direction="row"
      alignItems="center"
    >
      {icon}
      <Stack flexGrow={1} direction="column" alignItems="center">
        <Typography align="center">{title}</Typography>
        <Typography variant="h5" component="div">
          {stat}
        </Typography>
      </Stack>
    </Stack>
  </Grid>
);
export default StatsCard;
