import { useTranslation } from 'react-i18next';

import { Grid, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

import { ProjectCard } from './ProjectCard';

function Association() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'ABOUT_US.ASSOCIATION',
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

      <Typography variant="body1">{t('DESCRIPTION')}</Typography>

      <Typography variant="h4" color="primary">
        {t('PROJECTS.TITLE')}
      </Typography>

      <Grid container width="100%" spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProjectCard
            src="/projects/helvetas.svg"
            title={'Helvetas'}
            description={t('PROJECTS.HELVETAS.DESCRIPTION')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProjectCard
            src="/projects/climate.svg"
            width={100}
            title={t('PROJECTS.CLIMATE.TITLE')}
            description={t('PROJECTS.CLIMATE.DESCRIPTION')}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Association;
