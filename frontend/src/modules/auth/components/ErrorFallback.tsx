import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';

export function ErrorFallback() {
  const { t } = useTranslation(NS.Messages);
  return <Alert severity="error">{t('UNEXPECTED_ERROR')}</Alert>;
}
