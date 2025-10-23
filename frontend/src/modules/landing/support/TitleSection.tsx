import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import { Image } from '@/components/ui/StyledImages';
import { NS } from '@/config/constants';
import { LandingHeader } from '@/ui/Presentational/LandingHeader';

export function TitleSection() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT' });

  return (
    <LandingHeader
      image={
        <Image
          src="/illustration/getting-started.webp"
          sx={{
            // override the "show top of image" behavior of the Image component
            objectPosition: 'unset',
          }}
        />
      }
    >
      <Typography color="primary" variant="h1">
        {t('TITLE')}
      </Typography>
      <Typography>{t('DESCRIPTION')}</Typography>
    </LandingHeader>
  );
}
