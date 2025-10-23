import type { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Alert, Stack, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { ADMIN_CONTACT, NS } from '@/config/constants';

import { StorageBar } from '~account/storage/StorageBar';
import { StorageFiles } from '~account/storage/StorageFiles';

export const Route = createFileRoute('/_memberOnly/account/storage')({
  component: StorageRoute,
});

function StorageRoute(): JSX.Element {
  const { t } = useTranslation(NS.Account);

  return (
    <ScreenLayout title={t('STORAGE_TITLE')}>
      <Stack gap={2}>
        <Typography variant="body1">
          <Trans
            t={t}
            i18nKey={'STORAGE_TEXT'}
            values={{
              email: ADMIN_CONTACT,
            }}
            components={[
              <a key="email" href={`mailto:${ADMIN_CONTACT}`}>
                _
              </a>,
            ]}
          />
        </Typography>
        <Alert severity="info">{t('STORAGE_INFO')}</Alert>
      </Stack>
      <StorageBar />
      <StorageFiles />
    </ScreenLayout>
  );
}
