import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Stack, Typography, styled } from '@mui/material';

import { NS } from '@/config/constants';

import ChartTitle from '../common/ChartTitle';
import { CONTAINER_HEIGHT } from '../constants';

const EmptyChartAlert = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${CONTAINER_HEIGHT}px`,
});

const SelectContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 1,
}));

type Props = {
  chartTitle: string;
  selectFilter?: JSX.Element;
  isError?: boolean;
};

export function EmptyChart({
  chartTitle,
  selectFilter,
  isError = false,
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Analytics);

  const message = t('NO_ACTIONS_TO_SHOW_FOR_THIS_USER');

  return (
    <Stack direction="column">
      <ChartTitle title={chartTitle} />
      {selectFilter && <SelectContainer>{selectFilter}</SelectContainer>}
      <EmptyChartAlert>
        {isError ? (
          <Alert severity="error">{t('CHART_DATA_UNAVAILABLE')}</Alert>
        ) : (
          <Typography>{message}</Typography>
        )}
      </EmptyChartAlert>
    </Stack>
  );
}
