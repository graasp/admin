import { Trans, useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Image } from '@/components/ui/StyledImages';
import { NS } from '@/config/constants';
import { LandingHeader } from '@/ui/Presentational/LandingHeader';

export function TitleSection() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'FEATURES' });
  return (
    <LandingHeader
      image={
        <Image
          src="/illustration/features.webp"
          sx={{
            // override the "show top of image" behavior of the Image component
            objectPosition: 'unset',
          }}
        />
      }
    >
      <Typography variant="h1" color="primary">
        {t('TITLE')}
      </Typography>
      <Typography>
        <Trans i18nKey="DESCRIPTION" t={t} components={{ bold: <strong /> }} />
      </Typography>
      <Typography>{t('CALL_TO_ACTION_TEXT')}</Typography>
      <ButtonLink
        variant="contained"
        color="primary"
        sx={{ width: 'fit-content' }}
        to="/auth/register"
      >
        {t('CALL_TO_ACTION_BUTTON_TEXT')}
      </ButtonLink>
    </LandingHeader>
  );
}
