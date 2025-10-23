import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, useMediaQuery, useTheme } from '@mui/material';

import { Action } from '@graasp/sdk';

import { type Duration } from 'date-fns';
import { format } from 'date-fns/format';
import { intervalToDuration } from 'date-fns/intervalToDuration';
import countBy from 'lodash.countby';
import groupBy from 'lodash.groupby';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { NS } from '@/config/constants';

import ChartContainer from '~analytics/common/ChartContainer';
import { GroupByInterval } from '~analytics/config/type';
import {
  MAX_BARS_LARGE_SCREEN,
  MAX_BARS_SMALL_SCREEN,
  getColorForActionTriggerType,
} from '~analytics/constants';
import { groupActions } from '~analytics/utils';

function getGroupInterval(duration: Duration) {
  if (duration.years && duration.years >= 1) {
    return GroupByInterval.Year;
  }
  if (duration.months && duration.months > 2) {
    return GroupByInterval.Month;
  }
  if (duration.days && duration.days < 8) {
    return GroupByInterval.Day;
  } else {
    return GroupByInterval.Week;
  }
}

function getFreqFromData(actions: [string, Action[]][]) {
  const { months, days, years } = intervalToDuration({
    start: new Date(actions[0]?.[0]),
    end: new Date(actions[1]?.[0]),
  });

  // get bar interval
  if (years && years >= 1) {
    return GroupByInterval.Year;
  } else if (days === 1) {
    return GroupByInterval.Day;
  } else if (months === 1 && !days) {
    return GroupByInterval.Month;
  } else {
    return 'other';
  }
}

export function MemberActionsChart({
  actions,
  dateRange,
}: Readonly<{
  actions: Action[];
  dateRange: { startDate: Date; endDate: Date };
}>): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  const { t: translateAction } = useTranslation(NS.Common);
  const types: string[] = Object.keys(groupBy(actions, 'type'));

  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const groupInterval = getGroupInterval(
    intervalToDuration({
      start: dateRange.startDate,
      end: dateRange.endDate,
    }),
  );
  const groupedActionsByInterval = groupActions(
    actions,
    groupInterval,
    dateRange.startDate,
    dateRange.endDate,
    isLargeScreen ? MAX_BARS_LARGE_SCREEN : MAX_BARS_SMALL_SCREEN,
  );

  const actionsEntries = Object.entries(groupedActionsByInterval);
  const freq = getFreqFromData(actionsEntries);

  const noOfActionTypesOverInterval = actionsEntries.map(
    ([dateString, localActions], index) => {
      const actionsOverIntervalTypeCounts = countBy(localActions, 'type');

      // getting chart x-axis title for specified interval
      let title = '';
      const date = new Date(dateString);
      const nextDate = new Date(
        actionsEntries[index + 1]?.[0] || dateRange.endDate,
      );

      switch (freq) {
        case GroupByInterval.Day:
          title = format(date, 'MMM dd');
          break;
        case GroupByInterval.Month:
          title = format(date, 'MMM yyyy');
          break;
        case GroupByInterval.Year:
          title = format(date, 'yyyy');
          break;
        default: {
          title = `${format(date, 'MMM dd')} - ${format(nextDate, 'MMM dd')}`;
        }
      }

      return {
        date: title,
        ...actionsOverIntervalTypeCounts,
      };
    },
  );

  return (
    <>
      <Typography variant="h5" fontWeight={700}>
        {t('GENERAL_STATISTICS_ACTIVITY_CHART')}
      </Typography>
      <ChartContainer>
        <ComposedChart data={noOfActionTypesOverInterval}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis
            tick={{ fontSize: 14 }}
            orientation={theme.direction === 'rtl' ? 'right' : 'left'}
          />
          <Tooltip
            formatter={(value, name: string) => [
              value,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              translateAction(name),
            ]}
          />
          <Legend
            formatter={(value) => translateAction(value)}
            align="right"
            layout="horizontal"
          />

          {types.map((type) => (
            <Bar
              key=""
              dataKey={type}
              stackId="1"
              fill={getColorForActionTriggerType(type)}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
}
