import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  AlertTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { RefreshCwIcon } from 'lucide-react';

import { NS } from '@/config/constants';

export function NetworkErrorAlert(): JSX.Element {
  const { t } = useTranslation(NS.Common, { keyPrefix: 'ERRORS.NETWORK' });
  return (
    <Stack
      height="100vh"
      width="100%"
      justifyContent="center"
      margin="auto"
      alignItems="center"
    >
      <Alert severity="error">
        <AlertTitle>{t('TITLE')}</AlertTitle>
        <Stack direction="column" alignItems="center">
          <Typography>{t('TEXT')}</Typography>
          <Tooltip title="Reload">
            <span>
              <IconButton onClick={() => window.location.reload()}>
                <RefreshCwIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Alert>
    </Stack>
  );
}
