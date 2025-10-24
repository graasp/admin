import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import { RotateCcwIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { useQuery } from '@/config/queryClient';
import { getApiStatusOptions } from '@/openapi/client/@tanstack/react-query.gen';

import { AUTH } from '~auth/langs';

export function APIChecker(): JSX.Element | null {
  const { t } = useTranslation(NS.Auth);

  const { isSuccess, isLoading, refetch, isError } = useQuery({
    ...getApiStatusOptions(),
    retry: 0,
  });

  if (isSuccess) {
    return null;
  }

  if (isError) {
    return (
      <Box maxWidth="48ch">
        <Alert variant="outlined" sx={{ background: 'white' }} severity="error">
          <AlertTitle>{t(AUTH.API_UNAVAILABLE_TITLE)}</AlertTitle>
          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography>{t(AUTH.API_UNAVAILABLE_EXPLANATION)}</Typography>
            <Typography>{t(AUTH.API_UNAVAILABLE_INSTRUCTIONS)}</Typography>
            <Button
              loading={isLoading}
              sx={{ maxWidth: 'min-content' }}
              endIcon={<RotateCcwIcon />}
              onClick={() => refetch()}
            >
              {t(AUTH.API_UNAVAILABLE_BUTTON)}
            </Button>
          </Stack>
        </Alert>
      </Box>
    );
  }

  // everything all right, we render nothing if connection is ok.
  return null;
}
