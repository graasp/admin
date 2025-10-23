import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';
import { getErrorMessageFromPayload } from '@/config/notifier';
import { ERROR_DISPLAY_ID } from '@/config/selectors';

export function ErrorDisplay({
  error,
}: Readonly<{
  error: Error | null;
}>): JSX.Element | null {
  const { t } = useTranslation(NS.Messages);

  if (!error) {
    return null;
  }

  return (
    <Alert id={ERROR_DISPLAY_ID} severity="error">
      {t(getErrorMessageFromPayload({ error }))}
    </Alert>
  );
}
