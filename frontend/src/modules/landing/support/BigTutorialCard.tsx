import { useTranslation } from 'react-i18next';

import { Card, Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

export function BigTutorialCard({
  title,
  description,
  link,
}: Readonly<{
  title: string;
  description: string;
  link: string;
}>) {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT.TUTORIALS' });
  return (
    <Card sx={{ width: '100%', p: 2, textAlign: 'center' }}>
      <Stack gap={1} justifyContent="space-between" height="100%">
        <Typography variant="h6">{title}</Typography>
        <Typography>{description}</Typography>
        <ButtonLink
          to={link}
          variant="contained"
          disableElevation
          // fullWidth
          size="small"
          color="primary"
        >
          {t('READ_BUTTON')}
        </ButtonLink>
      </Stack>
    </Card>
  );
}
