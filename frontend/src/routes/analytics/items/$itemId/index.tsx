import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorBoundary } from '@sentry/react';
import { createFileRoute, useParams } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import ChartsAlerts from '~analytics/charts-layout/ChartsAlerts';
import ChartsArea from '~analytics/charts-layout/ChartsArea';
import ChartsHeader from '~analytics/charts-layout/ChartsHeader';
import SectionTitle from '~analytics/common/SectionTitle';
import { ErrorFallback } from '~auth/components/ErrorFallback';

export const Route = createFileRoute('/analytics/items/$itemId/')({
  component: GeneralAnalyticsPage,
});

function GeneralAnalyticsPage(): JSX.Element | null {
  const { t } = useTranslation(NS.Analytics);

  const { itemId } = useParams({ strict: false });

  if (!itemId) {
    // TODO
    return null;
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('GENERAL_ANALYTICS_TITLE')} />
      <ChartsArea itemId={itemId} />
    </ErrorBoundary>
  );
}
