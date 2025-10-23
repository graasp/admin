import type { JSX } from 'react';

import { Skeleton } from '@mui/material';

const LoadingItemsIndicator = (): JSX.Element => (
  <Skeleton variant="rounded" animation="wave" width="100%" height={50} />
);
export default LoadingItemsIndicator;
