import { useTranslation } from 'react-i18next';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

function TeamMembers() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'ABOUT_US.TEAM',
  });

  const TEAM = [
    {
      name: 'Denis Gillet',
      image: 'denis.webp',
      role: 'STATUSES.TITLE_PRESIDENT',
    },
    {
      name: 'María Jesús Rodríguez-Triana',
      image: 'maria.webp',
      role: 'STATUSES.TITLE_VP_RESEARCH',
    },
    {
      name: 'Juan Carlos Farah',
      image: 'juancarlos.webp',
      role: 'STATUSES.TITLE_VP_PRODUCT',
    },
    {
      name: 'Kim Lan Phan Hoang',
      image: 'kim.webp',
      role: 'STATUSES.TITLE_VP_ENGINEERING',
    },
    {
      name: 'Jérémy La Scala',
      image: 'jeremy.webp',
      role: 'STATUSES.TITLE_VP_OUTREACH',
    },
    {
      name: 'Sandy Ingram',
      image: 'sandy.webp',
      role: 'STATUSES.TITLE_VP_INNOVATION',
    },
    {
      name: 'Basile Spaenlehauer',
      image: 'basile.webp',
      role: 'STATUSES.TITLE_VP_TECHNOLOGY',
    },
    {
      name: 'Michele Notari',
      image: 'michele.webp',
      role: 'STATUSES.TITLE_VP_EDUCATION_AND_CONTENT',
    },
    {
      name: 'Hagop Taminian',
      image: 'hagop.webp',
      role: 'STATUSES.TITLE_SOFTWARE_ENGINEER',
    },
    {
      name: 'Philippe Kobel',
      image: 'philippe.webp',
      role: 'STATUSES.TITLE_AMBASSADOR',
    },
  ] as const;

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
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
      >
        {TEAM.map(({ name, image, role }) => (
          <Grid key={name} size={{ xs: 6, sm: 4, lg: 3 }}>
            <Box
              margin="auto"
              borderRadius="50%"
              height="150px"
              width="150px"
              sx={{ overflow: 'hidden' }}
              mb={2}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={`/team/${image}`}
                alt={name}
              />
            </Box>

            <Typography variant="h5" component="p" textAlign="center">
              {name}
            </Typography>
            <Typography
              textTransform="uppercase"
              variant="note"
              color="textSecondary"
              textAlign="center"
            >
              {t(role)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default TeamMembers;
