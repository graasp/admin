import { type JSX, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Skeleton, useTheme } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { endOfDay } from 'date-fns/endOfDay';
import { formatISO } from 'date-fns/formatISO';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { NS } from '@/config/constants';
import { getItemActionsByWeekdayOptions } from '@/openapi/client/@tanstack/react-query.gen';

import { DataContext } from '~analytics/context/DataProvider';

import ChartContainer from '../common/ChartContainer';
import ChartTitle from '../common/ChartTitle';
import { AVERAGE_COLOR, GENERAL_COLOR } from '../constants';
import { EmptyChart } from './EmptyChart';

const ActionsByWeekdayChart = ({
  itemId,
}: {
  itemId: string;
}): JSX.Element | null => {
  const { t } = useTranslation(NS.Analytics);
  const { dateRange } = useContext(DataContext);

  const { direction } = useTheme();

  const { data, isPending, isError } = useQuery(
    getItemActionsByWeekdayOptions({
      path: { id: itemId },
      query: {
        startDate: formatISO(dateRange.startDate),
        endDate: formatISO(endOfDay(dateRange.endDate)),
      },
    }),
  );

  const title = t('ACTIONS_BY_WEEKDAY');

  // fill with empty data for missing hour
  if (data) {
    for (let weekday = 0; weekday <= 6; weekday += 1) {
      data[weekday] ??= {
        weekday,
        count: { all: 0 },
        personal: { all: 0 },
      };
    }

    // we don't translate here because we need to compare with the raw data
    const weekdayEnum = {
      0: 'Sun.',
      1: 'Mon.',
      2: 'Tue.',
      3: 'Wed.',
      4: 'Thu.',
      5: 'Fri.',
      6: 'Sat.',
    };

    return (
      <Box width="100%" minWidth={400}>
        <ChartTitle title={title} />
        <ChartContainer>
          <BarChart
            data={Object.values(
              data as { [key: string]: { weekday: string } },
            ).toSorted((a, b) => (a.weekday > b.weekday ? 1 : -1))}
          >
            <CartesianGrid strokeDasharray="2" />
            <XAxis
              interval={0}
              dataKey="weekday"
              tick={{ fontSize: 14 }}
              tickFormatter={(v) => weekdayEnum[v as keyof typeof weekdayEnum]}
            />
            <YAxis
              tick={{ fontSize: 14 }}
              orientation={direction === 'rtl' ? 'right' : 'left'}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="count.all" name={t('All')} fill={GENERAL_COLOR} />
            <Bar dataKey="personal.all" name={t('Me')} fill={AVERAGE_COLOR} />
          </BarChart>
        </ChartContainer>
      </Box>
    );
  }

  if (isPending) {
    return <Skeleton width={'100%'} height={500} />;
  }

  return <EmptyChart chartTitle={title} isError={isError} />;
};
export default ActionsByWeekdayChart;
