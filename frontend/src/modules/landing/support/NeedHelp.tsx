import { useTranslation } from 'react-i18next';

import { Card, Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

export function NeedHelp() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT.HELP' });
  return (
    <Card sx={{ borderRadius: 10, p: 4, maxWidth: 'sm' }}>
      <Stack
        maxWidth={{ xs: '600px', md: 'lg' }}
        width="100%"
        alignItems="center"
        gap={3}
      >
        <Typography color="primary" variant="h2">
          {t('TITLE')}
        </Typography>

        <Typography>{t('DESCRIPTION')}</Typography>

        <ButtonLink to="/contact-us" variant="contained">
          {t('CONTACT_FORM_BUTTON')}
        </ButtonLink>
      </Stack>
    </Card>
  );
}
