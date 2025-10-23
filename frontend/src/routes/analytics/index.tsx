import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';
import { ChartNoAxesCombinedIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

export const Route = createFileRoute('/analytics/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(NS.Analytics, { keyPrefix: 'HOME' });
  return (
    <Stack
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={6}
          p={6}
        >
          <ChartNoAxesCombinedIcon size={100} />
          <Typography variant="h4" textAlign="center">
            {t('NO_ITEM_SELECTED')}
          </Typography>
        </Stack>
        <ButtonLink to="/home">{t('SELECT_AN_ITEM')}</ButtonLink>
      </Box>
    </Stack>
  );
}
