import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, List, Stack } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { HomeIcon, LibraryBigIcon, TrashIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { MainMenuItem } from '@/components/ui/MainMenuItem';
import { NS } from '@/config/constants';
import { NAVIGATION_HOME_ID } from '@/config/selectors';
import { DRAWER_WIDTH } from '@/ui/constants';

export function MainMenu(): JSX.Element | null {
  const { t } = useTranslation(NS.Builder, { keyPrefix: 'MENU' });
  const { user } = useAuth();

  if (user) {
    return (
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        height="100%"
      >
        <List sx={{ width: DRAWER_WIDTH }}>
          <MainMenuItem to="/home" icon={<HomeIcon />} text={t('MY_ITEMS')} />
          {user.type === AccountType.Individual ? (
            <>
              <MainMenuItem
                to="/published"
                text={t('PUBLISHED_ITEMS')}
                icon={<LibraryBigIcon />}
              />
              <MainMenuItem
                to="/recycled"
                text={t('RECYCLED_ITEMS')}
                icon={<TrashIcon />}
              />
            </>
          ) : null}
        </List>
        <Box>
          <MainMenuItem
            id={NAVIGATION_HOME_ID}
            text={t('RETURN_HOME')}
            icon={<HomeIcon />}
            to="/home"
          />
        </Box>
      </Stack>
    );
  }
  return null;
}
