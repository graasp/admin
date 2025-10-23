import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';

export const PublishedChildrenButton = (): JSX.Element => {
  const { t } = useTranslation(NS.Builder);

  return (
    <Alert severity="success">
      {t('LIBRARY_SETTINGS_CHILD_PUBLISHED_STATUS')}
    </Alert>
  );
};

export default PublishedChildrenButton;
