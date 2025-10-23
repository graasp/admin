import { useTranslation } from 'react-i18next';

import { Button, Card, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

export function SmallTutorialCard({
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
    <Card sx={{ width: '100%', height: '100%', p: 2, textAlign: 'center' }}>
      <Stack gap={1} justifyContent="space-between" height="100%">
        <Typography color="#a84eff" variant="h6">
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <a href={link}>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            size="small"
            color="secondary"
          >
            {t('READ_BUTTON')}
          </Button>
        </a>
      </Stack>
    </Card>
  );
}
