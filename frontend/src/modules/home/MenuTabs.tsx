import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { HomeIcon, LibraryBigIcon, TrashIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { MenuTab } from '@/ui/MenuTab/MenuTab';

export function MenuTabs() {
  const { t } = useTranslation(NS.Home, { keyPrefix: 'MENU' });

  return (
    <Stack
      direction="row"
      gap={{ xs: 1, sm: 2 }}
      flex={1}
      flexWrap="wrap"
      justifyContent="flex-end"
      alignItems="center"
    >
      <MenuTab icon={<HomeIcon />} title={t('HOME')} to="/home" />
      <MenuTab icon={<LibraryBigIcon />} title={t('LIBRARY')} to="/published" />
      <MenuTab
        icon={<TrashIcon />}
        title={t('RECYCLED_ITEMS')}
        to="/recycled"
      />
    </Stack>
  );
}
