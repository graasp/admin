import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import { Navigate, createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { Loader } from '@/ui/Loader/Loader';

import { ExportData } from '~analytics/ExportData';
import SectionTitle from '~analytics/common/SectionTitle';

export const Route = createFileRoute('/analytics/items/$itemId/export')({
  component: ExportAnalyticsPage,
});

const CustomListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  '&:before': {
    content: '"•"',
    paddingRight: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
  },
}));

function ExportAnalyticsPage(): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  const { itemId } = Route.useParams();

  const { data: item, isLoading } = hooks.useItem(itemId);

  const dataToExportExplanation = [
    {
      id: 'item',
      primary: t('EXPORT_LIST_ITEM_ITEM_TITLE'),
      secondary: t('EXPORT_LIST_ITEM_ITEM_DESCRIPTION'),
    },
    {
      id: 'descendants',
      primary: t('EXPORT_LIST_ITEM_DESCENDANTS_TITLE'),
      secondary: t('EXPORT_LIST_ITEM_DESCENDANTS_DESCRIPTION'),
    },
    {
      id: 'apps',
      primary: t('EXPORT_LIST_ITEM_APPS_TITLE'),
      secondary: t('EXPORT_LIST_ITEM_APPS_DESCRIPTION'),
    },
    {
      id: 'members',
      primary: t('EXPORT_LIST_ITEM_MEMBERS_TITLE'),
      secondary: t('EXPORT_LIST_ITEM_MEMBERS_DESCRIPTION'),
    },
    {
      id: 'chat',
      primary: t('EXPORT_LIST_ITEM_CHATS_TITLE'),
      secondary: t('EXPORT_LIST_ITEM_CHATS_DESCRIPTION'),
    },
    {
      id: 'actions',
      primary: t('EXPORT_LIST_ITEM_ACTIONS_TITLE'),
      secondary: t('EXPORT_LIST_ITEM_ACTIONS_DESCRIPTION'),
    },
  ];

  if (
    !isLoading &&
    item?.permission &&
    PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
  ) {
    return (
      <Stack paddingY={2} spacing={2}>
        <Box width="fit-content">
          <SectionTitle title={t('EXPORT_ANALYTICS_TITLE')} />
        </Box>
        <Typography
          variant="body1"
          whiteSpace="pre-line"
          sx={{ maxWidth: '100ch' }}
        >
          {t('EXPORT_ANALYTICS_DESCRIPTION')}
        </Typography>
        <Box>
          <Typography variant="h6">{t('WHAT_TO_EXPORT_TITLE')}</Typography>
          <List dense sx={{ paddingTop: 0 }}>
            {dataToExportExplanation.map(({ id, primary, secondary }) => (
              <CustomListItem key={id}>
                <ListItemText primary={primary} secondary={secondary} />
              </CustomListItem>
            ))}
          </List>
        </Box>
        <ExportData />
      </Stack>
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  // read access users don't have permission over export actions
  return <Navigate to="/analytics/items/$itemId" params={{ itemId }} replace />;
}
