import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

import { GraaspFeature } from './graaspFeature/GraaspFeature';

export function GraaspFeaturesSection() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'FEATURES.GRAASP_FEATURES',
  });
  return (
    <Stack maxWidth="lg" width="100%" gap={4} alignItems="center">
      <Typography variant="h2" color="primary">
        {t('TITLE')}
      </Typography>
      <Stack gap={20} maxWidth={{ xs: '600px', md: 'lg' }}>
        <GraaspFeature platform="builder" />
        <GraaspFeature platform="player" />
        <GraaspFeature platform="analytics" />
        <GraaspFeature platform="library" />
      </Stack>
    </Stack>
  );
}
