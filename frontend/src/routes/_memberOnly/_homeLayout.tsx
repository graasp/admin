import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { Outlet, createFileRoute, useMatches } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { MenuTabs } from '@/modules/home/MenuTabs';

import { FlagItemModalProvider } from '~builder/components/context/FlagItemModalContext';

export const Route = createFileRoute('/_memberOnly/_homeLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const { t } = useTranslation(NS.Common, { keyPrefix: 'PAGE_TITLES' });
  const matches = useMatches();
  const titleKey = matches.find((m) => m.staticData.pageTitle)?.staticData
    .pageTitle;

  // get item updates via websockets
  hooks.useItemFeedbackUpdates?.(user?.id);

  return (
    <FlagItemModalProvider>
      <Stack gap={4} alignItems="center">
        <Stack direction="row" width="100%" justifyItems="flex-end">
          {titleKey && <Typography variant="h1">{t(titleKey)}</Typography>}
          <MenuTabs />
        </Stack>
        <Stack width="100%" direction="column" gap={2}>
          <Outlet />
        </Stack>
      </Stack>
    </FlagItemModalProvider>
  );
}
