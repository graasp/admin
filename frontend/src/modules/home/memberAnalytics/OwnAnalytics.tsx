import { type JSX, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Grid, Skeleton, Stack, Typography } from '@mui/material';

import { Action, ActionTriggers } from '@graasp/sdk';

import { useSuspenseQuery } from '@tanstack/react-query';
import { addDays } from 'date-fns';
import { format } from 'date-fns/format';
import { formatISO } from 'date-fns/formatISO';
import groupBy from 'lodash.groupby';
import { v4 } from 'uuid';

import { NS } from '@/config/constants';
import { getMembersActionsOptions } from '@/openapi/client/@tanstack/react-query.gen';

import ActionsLegend from '~analytics/charts-layout/ActionsLegend';
import DateRange from '~analytics/common/DateRangeInput';
import SectionTitle from '~analytics/common/SectionTitle';

import { MemberActionsChart } from './MemberActionsChart';
import { MemberStatsCard } from './MemberStatsCard';

export function OwnAnalyticsWrapper(): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  const [dateRange, setDateRange] = useState({
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: 'selection',
  });

  return (
    <Stack gap={1} width="100%" height="100%">
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        justifyContent={{ sm: 'center', md: 'space-between' }}
        gap={1}
      >
        <SectionTitle title={t('MY_ANALYTICS')} />
        <DateRange dateRange={dateRange} setDateRange={setDateRange} />
      </Stack>
      <Suspense fallback={<MemberStatsLoading />}>
        <MemberStats dateRange={dateRange} />
      </Suspense>
    </Stack>
  );
}

function fmtDate(date: Date) {
  return format(date, 'MMMM d, yyyy');
}

// mock data with ids to render skeletons
const placeholder = Array(4).fill(() => v4());
function MemberStatsLoading() {
  return (
    <Grid container spacing={2}>
      {placeholder.map((id) => (
        <Grid key={id} size={3}>
          <Skeleton variant="rounded" height="80px" width="100%" />
        </Grid>
      ))}
      <Grid size={12}>
        <Skeleton variant="rounded" height="450px" />
      </Grid>
    </Grid>
  );
}

function MemberStats({
  dateRange,
}: Readonly<{ dateRange: { startDate: Date; endDate: Date } }>): JSX.Element {
  const { t } = useTranslation(NS.Analytics);

  const { data, error } = useSuspenseQuery(
    getMembersActionsOptions({
      query: {
        startDate: formatISO(dateRange.startDate),
        endDate: formatISO(dateRange.endDate),
      },
    }),
  );

  if (error) {
    return <Alert severity="error">{t('ERROR_FETCHING_DATA')}</Alert>;
  }

  if (data) {
    const actionsGroupedByTypes = groupBy(data, 'type');
    return (
      <>
        <Stack gap={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
            <MemberStatsCard
              title={t('GENERAL_STATISTIC_ITEMS_CREATED')}
              stat={actionsGroupedByTypes[ActionTriggers.Create]?.length ?? 0}
            />
            <MemberStatsCard
              title={t('GENERAL_STATISTIC_LIKED_ITEMS')}
              stat={actionsGroupedByTypes[ActionTriggers.ItemLike]?.length ?? 0}
            />
            <MemberStatsCard
              title={t('GENERAL_STATISTIC_DOWNLOADED_ITEMS')}
              stat={
                actionsGroupedByTypes[ActionTriggers.ItemDownload]?.length ?? 0
              }
            />
            <MemberStatsCard
              title={t('GENERAL_STATISTIC_CHAT_CREATED')}
              stat={
                actionsGroupedByTypes[ActionTriggers.ChatCreate]?.length ?? 0
              }
            />
          </Stack>

          <MemberActionsChart
            actions={data as Action[]}
            dateRange={dateRange}
          />
        </Stack>
        <ActionsLegend actionsTypes={Object.keys(actionsGroupedByTypes)} />
      </>
    );
  }

  return (
    <Typography>
      {t('NO_RESULTS_FOUND', {
        period: `${fmtDate(dateRange.startDate)} - ${fmtDate(dateRange.endDate)}`,
      })}
    </Typography>
  );
}
