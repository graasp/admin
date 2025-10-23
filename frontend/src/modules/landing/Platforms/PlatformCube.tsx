import type { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';
import { Platform } from '@/ui/PlatformSwitch/hooks';
import AnalyticsIcon from '@/ui/icons/AnalyticsIcon';
import BuildIcon from '@/ui/icons/BuildIcon';
import LibraryIcon from '@/ui/icons/LibraryIcon';
import PlayIcon from '@/ui/icons/PlayIcon';

import { PlatformColorSurface } from './PlatformColorSurface';

function Row({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} gap="2px">
      {children}
    </Stack>
  );
}

export function PlatformCube() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'HOME.PUZZLE' });
  const PlatformProps = {
    [Platform.Builder]: {
      Icon: BuildIcon,
      color: Platform.Builder,
      text: <Trans t={t} i18nKey="BUILDER.DESCRIPTION" />,
      button: {
        text: t('BUILDER.BUTTON_TEXT'),
        href: '/features/#builder',
      },
    },
    [Platform.Player]: {
      Icon: PlayIcon,
      color: Platform.Player,
      text: <Trans t={t} i18nKey="PLAYER.DESCRIPTION" />,
      button: {
        text: t('PLAYER.BUTTON_TEXT'),
        href: '/features/#player',
      },
    },
    [Platform.Library]: {
      Icon: LibraryIcon,
      color: Platform.Library,
      text: <Trans t={t} i18nKey="LIBRARY.DESCRIPTION" />,
      button: {
        text: t('LIBRARY.BUTTON_TEXT'),
        href: '/features/#library',
      },
    },
    [Platform.Analytics]: {
      Icon: AnalyticsIcon,
      color: Platform.Analytics,
      text: <Trans t={t} i18nKey="ANALYTICS.DESCRIPTION" />,
      button: {
        text: t('ANALYTICS.BUTTON_TEXT'),
        href: '/features/#analytics',
      },
    },
  } as const;
  return (
    <Stack
      gap={8}
      maxWidth="md"
      direction="column"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2">{t('TITLE')}</Typography>
      <Stack overflow="hidden" borderRadius={8} direction="column" gap="2px">
        <Row>
          <PlatformColorSurface {...PlatformProps.builder} />
          <PlatformColorSurface {...PlatformProps.analytics} />
        </Row>
        <Row>
          <PlatformColorSurface {...PlatformProps.player} />
          <PlatformColorSurface {...PlatformProps.library} />
        </Row>
      </Stack>
    </Stack>
  );
}
