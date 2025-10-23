import { Trans, useTranslation } from 'react-i18next';

import { Stack, Typography, styled } from '@mui/material';

import { NS } from '@/config/constants';

const StyledVideo = styled('video')({
  flex: 1,
  width: '100%',
});

export function BlendedLearningSection() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'FEATURES.BLENDED_LEARNING',
  });
  return (
    <Stack
      maxWidth={{ xs: '600px', md: 'lg' }}
      width="100%"
      alignItems={{ xs: 'center', md: 'flex-start' }}
      gap={4}
    >
      <Typography variant="h2" color="primary">
        {t('TITLE')}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        gap={4}
        width="100%"
        textAlign="justify"
      >
        <Stack gap={2} flex={1}>
          <Typography>
            <Trans i18nKey="DESCRIPTION_1" t={t} />
          </Typography>
          <Typography>
            <Trans i18nKey="DESCRIPTION_2" t={t} />
          </Typography>
          <Typography>
            <Trans i18nKey="DESCRIPTION_3" t={t} />
          </Typography>
        </Stack>
        <StyledVideo poster="/illustration/video-thumbnail.webp"></StyledVideo>
      </Stack>
    </Stack>
  );
}
