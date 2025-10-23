import { type JSX, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton, useTheme } from '@mui/material';

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
import { getItemActionsByHourOptions } from '@/openapi/client/@tanstack/react-query.gen';

import { DataContext } from '~analytics/context/DataProvider';

import ChartContainer from '../common/ChartContainer';
import ChartTitle from '../common/ChartTitle';
import { AVERAGE_COLOR, GENERAL_COLOR } from '../constants';
import { EmptyChart } from './EmptyChart';

const ActionsByTimeOfDayChart = ({
  itemId,
}: {
  itemId: string;
}): JSX.Element | null => {
  const { t } = useTranslation(NS.Analytics);
  const { dateRange } = useContext(DataContext);
  const { direction } = useTheme();
  const { data, isPending, isError } = useQuery(
    getItemActionsByHourOptions({
      path: { id: itemId },
      query: {
        startDate: formatISO(dateRange.startDate),
        endDate: formatISO(endOfDay(dateRange.endDate)),
      },
    }),
  );

  const title = t('ACTIONS_BY_TIME_OF_DAY');
  if (data) {
    // fill with empty data for missing hour
    for (let hour = 0; hour < 24; hour += 1) {
      if (!data[hour]) {
        data[hour] = {
          hour,
          count: { all: 0 },
          personal: { all: 0 },
        };
      }
    }

    return (
      <>
        <ChartTitle title={title} />
        <ChartContainer>
          <BarChart
            data={Object.values(
              data as { [key: string]: { hour: string } },
            ).toSorted((a, b) =>
              parseInt(a.hour) > parseInt(b.hour) ? 1 : -1,
            )}
          >
            <CartesianGrid strokeDasharray="2" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 14 }}
              tickFormatter={(v) => `${v}h`}
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
      </>
    );
  }

  if (isPending) {
    return <Skeleton width={'100%'} height={500} />;
  }

  return <EmptyChart chartTitle={title} isError={isError} />;
};
export default ActionsByTimeOfDayChart;
