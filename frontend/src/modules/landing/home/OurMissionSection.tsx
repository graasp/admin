import type { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

export function OurMissionSection(): JSX.Element {
  const { t } = useTranslation(NS.Landing);
  return (
    <Stack component={'section'} direction="column" justifyItems="center">
      <Stack
        direction="column"
        px={{ xs: 5, md: 15 }}
        py={{ xs: 2, md: 5 }}
        gap={4}
        alignItems="center"
        // make the "card"
        bgcolor="white"
        boxShadow={3}
        borderRadius={8}
      >
        <Typography variant="h2" color="primary" fontWeight="bold">
          {t('HOME.MISSION.TITLE')}
        </Typography>

        <Typography maxWidth="50ch" fontSize="1.25rem" textAlign="center">
          <Trans t={t} i18nKey="HOME.MISSION.DESCRIPTION" />
        </Typography>
        <Stack direction="column" gap={1}>
          <Typography color="textSecondary">
            {t('HOME.MISSION.CALL_TO_ACTION_LABEL')}
          </Typography>
          <Button variant="contained" size="small" href="">
            {t('HOME.MISSION.CALL_TO_ACTION_BUTTON_TEXT')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
