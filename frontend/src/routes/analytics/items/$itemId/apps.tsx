import { type JSX, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import { Context, ItemType, PackedItem, PermissionLevel } from '@graasp/sdk';

import { createFileRoute } from '@tanstack/react-router';

import { type AuthenticatedUser, useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { API_HOST } from '@/config/env';
import { Api } from '@/query';
import AppItem from '@/ui/items/AppItem';

import SectionTitle from '~analytics/common/SectionTitle';
import {
  APPS_ID,
  APP_ITEM_CLASS_NAME,
  buildAppItemSelector,
} from '~analytics/config/selectors';
import { DataContext } from '~analytics/context/DataProvider';

export const Route = createFileRoute('/analytics/items/$itemId/apps')({
  component: AppsAnalyticPage,
});

function AppsAnalyticPage(): JSX.Element | null {
  const { t } = useTranslation(NS.Analytics);
  const { user, isAuthenticated } = useAuth();
  const { descendantApps } = useContext(DataContext);

  if (!isAuthenticated) {
    return null;
  }

  if (descendantApps.length) {
    return (
      <>
        <SectionTitle title={t('APPS_ANALYTICS_TITLE')} />
        <Grid container spacing={2} p={2} id={APPS_ID} width="100%">
          {descendantApps.map((item) => (
            <Grid
              key={item.id}
              size={{ xs: 12 }}
              id={buildAppItemSelector(item.id)}
              className={APP_ITEM_CLASS_NAME}
            >
              <AppContent item={item} member={user} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
  return null;
}

function AppContent({
  item,
  member,
}: Readonly<{
  item: PackedItem;
  member: AuthenticatedUser;
}>): JSX.Element | null {
  if (item.permission && item.type == ItemType.APP) {
    const permission = item.permission;

    return (
      <>
        <Typography variant="h6" align="center">
          {item.name}
        </Typography>
        <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <AppItem
            isResizable={false}
            item={item}
            height="70vh"
            requestApiAccessToken={(payload: {
              id: string;
              key: string;
              origin: string;
            }) => Api.requestApiAccessToken(payload)}
            contextPayload={{
              apiHost: API_HOST,
              itemId: item.id,
              accountId: member.id,
              permission: permission || PermissionLevel.Read,
              settings: item.settings,
              lang: item.lang || member.lang,
              context: Context.Analytics,
            }}
          />
        </Box>
      </>
    );
  }

  return null;
}
