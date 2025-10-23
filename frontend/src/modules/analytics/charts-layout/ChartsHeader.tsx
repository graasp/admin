import { type JSX, useContext } from 'react';

import { Stack } from '@mui/material';

import DateRangeInput from '~analytics/common/DateRangeInput';
import { DataContext } from '~analytics/context/DataProvider';

const ChartsHeader = (): JSX.Element => {
  const { dateRange, setDateRange } = useContext(DataContext);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={{ xs: 2, sm: 3, lg: 4 }}
      p={2}
      width="100%"
    >
      <Stack direction="row">
        <DateRangeInput dateRange={dateRange} setDateRange={setDateRange} />
      </Stack>
    </Stack>
  );
};

export default ChartsHeader;
