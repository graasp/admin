import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import ErrorIcon from '@mui/icons-material/Error';
import { Chip, useTheme } from '@mui/material';

import { NS } from '@/config/constants';

import { SyncStatus, SyncStatusType } from '../context/DataSyncContext';

type Props = {
  syncStatus: SyncStatusType;
};

const ICON_COLOR = '#BBB';

const SyncIcon = ({ syncStatus }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const theme = useTheme();

  const buildStatus = () => {
    switch (syncStatus) {
      case SyncStatus.SYNCHRONIZING:
        return {
          color: 'default' as const,
          icon: <CloudSyncIcon htmlColor={ICON_COLOR} />,
          text: t('ITEM_STATUS_SYNCHRONIZING'),
        };
      case SyncStatus.ERROR:
        return {
          color: 'error' as const,
          icon: <ErrorIcon color="error" />,
          text: t('ITEM_STATUS_ERROR'),
        };
      default: {
        return {
          color: 'success' as const,
          icon: <CheckCircleIcon htmlColor={theme.palette.success.light} />,
          text: t('ITEM_STATUS_SYNCHRONIZED'),
        };
      }
    }
  };

  const { icon, text, color } = buildStatus();

  return (
    <Chip
      size="small"
      variant="outlined"
      icon={icon}
      label={text}
      color={color}
    />
  );
};

export default SyncIcon;
