import { type JSX, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppsIcon from '@mui/icons-material/Apps';
import { Stack } from '@mui/material';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import { ChartPieIcon, FileChartPieIcon } from 'lucide-react';

import { MainMenuItem } from '@/components/ui/MainMenuItem';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';

import {
  APP_ITEM,
  TAB_GENERAL,
  buildSidebarListItemId,
} from '~analytics/config/selectors';
import { DataContext } from '~analytics/context/DataProvider';

export function AnalyticsSidebar({
  itemId,
}: Readonly<{ itemId: string }>): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  const { descendantApps } = useContext(DataContext);
  const { data: item } = hooks.useItem(itemId);

  const menuItems = [];

  menuItems.push(
    <MainMenuItem
      key="general"
      id={buildSidebarListItemId(TAB_GENERAL)}
      text={t('TAB_GENERAL')}
      icon={<ChartPieIcon />}
      to="/analytics/items/$itemId"
      params={{ itemId }}
    />,
  );
  if (descendantApps.length) {
    menuItems.push(
      <MainMenuItem
        key="apps"
        id={buildSidebarListItemId(APP_ITEM)}
        text={t('TAB_APPS')}
        icon={<AppsIcon />}
        to="/analytics/items/$itemId/apps"
        params={{ itemId }}
      />,
    );
  }

  // read access users don't have permission over export actions
  if (
    item?.permission &&
    PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
  ) {
    menuItems.push(
      <MainMenuItem
        key="export"
        text={t('TAB_EXPORT')}
        to="/analytics/items/$itemId/export"
        params={{ itemId }}
        icon={<FileChartPieIcon />}
      />,
    );
  }

  return <Stack>{menuItems}</Stack>;
}
