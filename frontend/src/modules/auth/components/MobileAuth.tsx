import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Android, Apple, DeviceUnknown } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { TypographyLink } from '@/components/ui/TypographyLink';
import { NS } from '@/config/constants';

import { AUTH } from '~auth/langs';

import { LeftContentContainer } from './LeftContentContainer';

const PLAY_STORE_LINK =
  'https://play.google.com/store/apps/details?id=org.graasp.mobile';
const APPLE_STORE_LINK = 'https://apps.apple.com/ch/app/graasp/id1579895549';

export function MobileAuth(): JSX.Element {
  const { t } = useTranslation(NS.Auth);

  return (
    <LeftContentContainer>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <DeviceUnknown fontSize="large" color="primary" />
        <Typography>{t(AUTH.MOBILE_APP_NOT_INSTALLED_MESSAGE)}</Typography>
        <Button href={APPLE_STORE_LINK} variant="contained">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            px={1}
            py={{ xs: 1, sm: 2 }}
            textTransform="none"
          >
            <Apple />
            <Typography>{t(AUTH.MOBILE_GET_APP_FROM_APPLE_STORE)}</Typography>
          </Stack>
        </Button>
        <Button href={PLAY_STORE_LINK} variant="contained">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            px={1}
            py={{ xs: 1, sm: 2 }}
            textTransform="none"
          >
            <Android />
            <Typography>
              {t(AUTH.MOBILE_GET_APP_FROM_GOOGLE_PLAY_STORE)}
            </Typography>
          </Stack>
        </Button>
        <TypographyLink to="/auth/login" variant="caption">
          {t('MOBILE_BACK_TO_LOGIN')}
        </TypographyLink>
      </Stack>
    </LeftContentContainer>
  );
}
