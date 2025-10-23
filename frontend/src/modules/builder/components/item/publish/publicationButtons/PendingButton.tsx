import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';

import { BUILDER } from '~builder/langs';

export const PendingButton = (): JSX.Element => {
  const { t } = useTranslation(NS.Builder);

  return (
    <Alert severity="info">
      {t(BUILDER.LIBRARY_SETTINGS_VALIDATION_STATUS_PENDING_AUTOMATIC)}
    </Alert>
  );
};

export default PendingButton;
