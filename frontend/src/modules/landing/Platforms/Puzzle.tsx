import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';
import { Platform } from '@/ui/PlatformSwitch/hooks';

import { BuilderPuzzle } from './BuilderPuzzle';
import { PlatformButton } from './PlatformButton';

export function PuzzleSection(): JSX.Element {
  const { t } = useTranslation(NS.Landing);
  return (
    <Stack
      component="section"
      direction="column"
      maxWidth="lg"
      alignSelf="center"
    >
      <Stack direction="column" alignItems="center" gap={5}>
        <Typography variant="h2" textAlign="center">
          {t('HOME.PUZZLE.TITLE')}
        </Typography>
        <Grid
          container
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          spacing={5}
        >
          <Grid
            size={{ xs: 12, lg: 6 }}
            justifySelf="center"
            order={{ xs: 0, lg: 1 }}
            px={10}
            maxWidth={{ xs: '600px' }}
          >
            <BuilderPuzzle />
          </Grid>
          <Grid
            container
            direction={{ xs: 'row', lg: 'column' }}
            spacing={{ xs: 2, lg: 8 }}
            size={{ xs: 12, lg: 3 }}
            order={{ xs: 1, lg: 0 }}
            justifyContent="space-between"
          >
            <PlatformButton
              platform={Platform.Builder}
              buttonText={t('HOME.PUZZLE.BUILDER.BUTTON_TEXT')}
              description={t('HOME.PUZZLE.BUILDER.DESCRIPTION')}
              direction="left"
            />
            <PlatformButton
              platform={Platform.Player}
              buttonText={t('HOME.PUZZLE.PLAYER.BUTTON_TEXT')}
              description={t('HOME.PUZZLE.PLAYER.DESCRIPTION')}
              direction="left"
            />
          </Grid>
          <Grid
            container
            direction={{ xs: 'row', lg: 'column' }}
            spacing={{ xs: 2, lg: 8 }}
            size={{ xs: 12, lg: 3 }}
            order={{ xs: 2, lg: 2 }}
            justifyContent="space-between"
          >
            <PlatformButton
              platform={Platform.Analytics}
              direction="right"
              buttonText={t('HOME.PUZZLE.ANALYTICS.BUTTON_TEXT')}
              description={t('HOME.PUZZLE.ANALYTICS.DESCRIPTION')}
            />
            <PlatformButton
              platform={Platform.Library}
              direction="right"
              buttonText={t('HOME.PUZZLE.LIBRARY.BUTTON_TEXT')}
              description={t('HOME.PUZZLE.LIBRARY.DESCRIPTION')}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
