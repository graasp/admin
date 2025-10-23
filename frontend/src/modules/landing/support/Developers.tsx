import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';
import GraaspLogo from '@/ui/GraaspLogo/GraaspLogo';
import { PRIMARY_COLOR } from '@/ui/theme';

import { GithubIcon } from '~landing/footer/icons';

export function Developers() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT.DEVELOPERS' });
  return (
    <Stack
      mt={8}
      maxWidth={{ xs: '600px', md: 'lg' }}
      width="100%"
      alignItems={{ xs: 'center', md: 'flex-start' }}
      gap={3}
    >
      <Typography color="primary" variant="h2">
        {t('TITLE')}
      </Typography>

      <Typography fontWeight="bold">{t('SUBTITLE')}</Typography>
      <Typography>{t('DESCRIPTION')}</Typography>

      <Stack
        borderRadius={5}
        border={1}
        borderColor="#a84eff"
        p={{ xs: 3, md: 5 }}
        direction={{ md: 'row' }}
        justifyContent="center"
        gap={1}
        maxWidth="md"
        alignSelf="center"
      >
        <Stack>
          <Typography color="#a84eff" fontWeight="bold">
            {t('GITHUB.TITLE')}
          </Typography>
          <Typography>{t('GITHUB.DESCRIPTION')}</Typography>
        </Stack>
        <Stack minWidth="130px" alignItems="center" gap={1}>
          <Stack direction="row" gap={1}>
            <Stack
              bgcolor="white"
              width="40px"
              height="40px"
              justifyContent="center"
              alignItems="center"
              borderRadius={2}
              p={1}
            >
              <GraaspLogo height={38} sx={{ fill: PRIMARY_COLOR }} />
            </Stack>
            <Stack
              bgcolor="white"
              width="40px"
              height="40px"
              justifyContent="center"
              alignItems="center"
              borderRadius={2}
            >
              <GithubIcon fill="black" size={24} />
            </Stack>
          </Stack>
          <Typography textAlign="center">{t('GITHUB.SUBTITLE')}</Typography>
          <a href="https://github.com/graasp">
            <Button color="secondary" size="small" variant="contained">
              {t('GITHUB.BUTTON_TEXT')}
            </Button>
          </a>
        </Stack>
      </Stack>
    </Stack>
  );
}
