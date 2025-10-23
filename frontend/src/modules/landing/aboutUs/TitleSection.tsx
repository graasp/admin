import { useTranslation } from 'react-i18next';

import { Box, Grid, Stack, Typography, styled } from '@mui/material';

import { Image } from '@/components/ui/StyledImages';
import { NS } from '@/config/constants';

import NumberCard from './NumberCard';

export function TitleSection() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'ABOUT_US' });

  return (
    <Box>
      <HeaderContainer maxWidth="lg" gap={8} mt={8}>
        <Stack
          flex={{ md: 1 }}
          maxHeight={{ xs: '17rem', md: 'fit-content' }}
          maxWidth={{ xs: '30rem' }}
          borderRadius={4}
          overflow="hidden"
        >
          <Image
            src="/illustration/team.webp"
            sx={{
              // override the "show top of image" behavior of the Image component
              objectPosition: '0 72%',
            }}
          />
        </Stack>
        <Stack
          alignItems={{ xs: 'center', md: 'flex-start' }}
          flex={{ md: 2 }}
          gap={2}
        >
          <Typography variant="h1" color="primary">
            {t('TITLE')}
          </Typography>
          <Stack gap={2}>
            <Typography variant="body1" textAlign="left">
              {t('DESCRIPTION_1')}
            </Typography>

            <Typography variant="body1" textAlign="left">
              {t('DESCRIPTION_2')}
            </Typography>
          </Stack>
        </Stack>
      </HeaderContainer>

      <Grid mt={4} spacing={{ xs: 2, md: 5 }} width="100%" container>
        <Grid size={{ xs: 6, md: 3 }} p={0}>
          <NumberCard number="6000" title="Builder" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} p={0}>
          <NumberCard number="123+" title="Library's projects" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} p={0}>
          <NumberCard number="20+" title="Templates" />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} p={0}>
          <NumberCard number="12" title="Apps" />
        </Grid>
      </Grid>
    </Box>
  );
}

const HeaderContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '60ch',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row-reverse',
    textAlign: 'unset',
    maxWidth: theme.breakpoints.values.lg,
  },
}));
