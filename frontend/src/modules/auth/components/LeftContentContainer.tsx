import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Stack } from '@mui/material';

import { NS } from '@/config/constants';
import { PLATFORM_ADVERTISEMENT_CONTAINER_ID } from '@/config/selectors';
import AnalyticsIcon from '@/ui/icons/AnalyticsIcon';
import BuildIcon from '@/ui/icons/BuildIcon';
import LibraryIcon from '@/ui/icons/LibraryIcon';
import PlayIcon from '@/ui/icons/PlayIcon';
import { AccentColors } from '@/ui/theme';

import { AUTH } from '~auth/langs';

import { BACKGROUND_PATTERN } from '../constants';
import { APIChecker } from './APIChecker';
import { BrandingLogo } from './BrandingLogo';
import { Footer } from './Footer';
import { PlatformContent } from './leftContent/PlatformContent';
import { styledBox } from './styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function LeftContentContainer({
  children,
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Auth);

  return (
    <>
      <Box
        display={{
          xs: 'none',
          sm: 'block',
          md: 'block',
        }}
      >
        <BrandingLogo />
      </Box>
      <Stack
        direction="row"
        // need to be minHeight for screen in landscape with potentially shallow heights
        minHeight="100svh"
        width="100%"
        sx={{
          backgroundImage: BACKGROUND_PATTERN,
        }}
        gap={2}
      >
        <Stack
          display={{ xs: 'none', md: 'flex' }}
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
          px={3}
        >
          <APIChecker />
          <Stack spacing={3} id={PLATFORM_ADVERTISEMENT_CONTAINER_ID}>
            <PlatformContent
              Icon={BuildIcon}
              text={t(AUTH.BUILDER_BACKGROUND_TEXT)}
              name={t(AUTH.BUILDER_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.builder}
            />
            <PlatformContent
              Icon={PlayIcon}
              text={t(AUTH.PLAYER_BACKGROUND_TEXT)}
              name={t(AUTH.PLAYER_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.player}
            />
            <PlatformContent
              Icon={LibraryIcon}
              text={t(AUTH.LIBRARY_BACKGROUND_TEXT)}
              name={t(AUTH.LIBRARY_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.library}
            />
            <PlatformContent
              Icon={AnalyticsIcon}
              text={t(AUTH.ANALYTICS_BACKGROUND_TEXT)}
              name={t(AUTH.ANALYTICS_BACKGROUND_TEXT_PLATFORM)}
              color={AccentColors.analytics}
            />
          </Stack>
        </Stack>
        <Stack
          {...styledBox}
          justifyContent="space-between"
          alignItems="flex-end"
          width={{ xs: '100%', md: 'fit-content' }}
          px={{ xs: 2, sm: 8 }}
          py={{ xs: 2, sm: 2 }}
          gap={2}
          flexGrow={1}
          flexShrink={0}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
          >
            {children}
          </Stack>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
}
