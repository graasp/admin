import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { List, Stack } from '@mui/material';

import {
  ArrowLeftIcon,
  ChartColumnIcon,
  HardDriveIcon,
  HouseIcon,
  SettingsIcon,
} from 'lucide-react';

import { MainMenuItem } from '@/components/ui/MainMenuItem';
import { NS } from '@/config/constants';
import { DRAWER_WIDTH } from '@/ui/constants';

export function MainMenu(): JSX.Element {
  const { t } = useTranslation(NS.Account, { keyPrefix: 'MAIN_MENU' });

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      flex={1}
      height="100%"
    >
      <List sx={{ width: DRAWER_WIDTH }}>
        <MainMenuItem to="/home" icon={<HouseIcon />} text={t('HOME')} />
        <MainMenuItem
          to="/account/stats"
          icon={<ChartColumnIcon />}
          text={t('STATS')}
        />
        <MainMenuItem
          to="/account/settings"
          icon={<SettingsIcon />}
          text={t('SETTINGS')}
        />
        <MainMenuItem
          to="/account/storage"
          icon={<HardDriveIcon />}
          text={t('STORAGE')}
        />
      </List>
      <List>
        <MainMenuItem to="/" icon={<ArrowLeftIcon />} text={t('LANDING')} />
      </List>
    </Stack>
  );
}
