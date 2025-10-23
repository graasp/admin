import { type JSX, type ReactNode } from 'react';

import { Grid, Typography } from '@mui/material';

type FormPropertyProps = {
  title: string;
  children: ReactNode;
};
const FormProperty = ({ title, children }: FormPropertyProps): JSX.Element => (
  <Grid
    container
    direction={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    spacing={{ xs: 1, sm: 2 }}
  >
    <Grid size={{ xs: 12, sm: 4 }} p={0}>
      <Typography color="textSecondary">{title}</Typography>
    </Grid>
    <Grid size={{ xs: 12, sm: 8 }} p={0}>
      {children}
    </Grid>
  </Grid>
);
export default FormProperty;
