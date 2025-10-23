import type { JSX } from 'react';

import { Box } from '@mui/material';

import { ResponsiveContainer } from 'recharts';

import { CONTAINER_HEIGHT } from '../constants';

const ChartContainer = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
  <Box width="100%" p={2}>
    <ResponsiveContainer
      width="100%"
      height={CONTAINER_HEIGHT}
      style={{ direction: 'ltr' }} // This fixes the spacing issues between points and the axis in RTL view
    >
      {children}
    </ResponsiveContainer>
  </Box>
);

export default ChartContainer;
