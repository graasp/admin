import { Trans, useTranslation } from 'react-i18next';

import { Grid, Stack, Typography } from '@mui/material';

import { Link, createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@/ui/theme';

import { socialLinks } from '~landing/footer/Footer';

export const Route = createFileRoute('/_landing/contact-us')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'CONTACT_US' });
  return (
    <Stack gap={4} maxWidth="60ch" mt={8}>
      <Typography variant="h1" color="primary">
        {t('TITLE')}
      </Typography>
      <Stack gap={2}>
        <Typography variant="body1" textAlign="left">
          <Trans t={t} i18nKey={'DESCRIPTION'} />
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Typography variant="h2" textAlign="left">
          <Trans t={t} i18nKey={'SUPPORT.TITLE'} />
        </Typography>
        <Typography variant="body1" textAlign="left">
          <Trans t={t} i18nKey={'SUPPORT.DESCRIPTION'} />
        </Typography>
        <Typography variant="body1" fontWeight="bold" textAlign="left">
          {t('SUPPORT.EMAIL')}
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Typography variant="h2" textAlign="left">
          {t('OTHER.TITLE')}
        </Typography>
        <Typography variant="body1" textAlign="left">
          {t('OTHER.DESCRIPTION')}
        </Typography>
        <Typography variant="body1" fontWeight="bold" textAlign="left">
          {t('OTHER.EMAIL')}
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Typography variant="h2" textAlign="left">
          {t('SOCIAL.TITLE')}
        </Typography>
        <Typography variant="body1" textAlign="left">
          {t('SOCIAL.DESCRIPTION')}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={4}
        >
          {socialLinks.map(({ Icon, title, href }) => (
            <Grid key={title} size={3}>
              <Link to={href}>
                <Stack
                  direction="column"
                  alignItems="center"
                  gap={1}
                  py={2}
                  px={1}
                  borderRadius={4}
                  bgcolor={DEFAULT_LIGHT_PRIMARY_COLOR.main}
                >
                  <Icon size={24} fill="black" />
                  <Typography color="textPrimary">{title}</Typography>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
