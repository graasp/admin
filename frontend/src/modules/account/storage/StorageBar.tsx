import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Skeleton, Stack, styled } from '@mui/material';

import { formatFileSize } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { STORAGE_BAR_ID, STORAGE_BAR_LABEL_ID } from '@/config/selectors';

const BAR_WIDTH = window.innerWidth / 3;
const BAR_HEIGHT = 25;

const StorageBarIndicator = styled('progress')(({ theme }) => ({
  // reset appearance of the progress bar
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  /* Get rid of default border in Firefox. */
  border: 'none',

  // border radius are the same as the inside element but prevent the bar from bleeding out
  overflow: 'hidden',
  borderRadius: theme.spacing(1),

  // apply some height to it
  height: theme.spacing(4),

  '&::-webkit-progress-bar': {
    backgroundColor: '#eee',
    // this border radius is necessary to maintain the shadow around the corners
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25) inset',
  },
  '&::-webkit-progress-value': {
    backgroundColor: theme.palette.primary.main,
    // this border radius is not necessary if we keep the border radius and overflow hidden on the real progress element
    // borderRadius: theme.spacing(1, 0, 0, 1),
  },
  '&::-moz-progress-bar': {
    backgroundColor: theme.palette.primary.main,
    // do not use border radius on firebox, as we
    // can not modify the background to also use border radius
    // borderRadius: theme.spacing(1, 0, 0, 1),
  },
  flexGrow: 1,
}));

export function StorageBar(): JSX.Element {
  const { t } = useTranslation(NS.Common);
  const { data: storage, isLoading } = hooks.useMemberStorage();
  if (storage) {
    const { current, maximum } = storage;
    const storageUsed = (current / maximum) * 100;
    return (
      <Stack direction="row" alignItems="center" width="100%" spacing={1}>
        <StorageBarIndicator id={STORAGE_BAR_ID} value={storageUsed} max={100}>
          {storageUsed}
        </StorageBarIndicator>
        <label htmlFor={STORAGE_BAR_ID} id={STORAGE_BAR_LABEL_ID}>
          {formatFileSize(current)} / {formatFileSize(maximum)}
        </label>
      </Stack>
    );
  }

  if (isLoading) {
    return <Skeleton width={BAR_WIDTH} height={BAR_HEIGHT} />;
  }

  return <Alert severity="error">{t('ERRORS.UNEXPECTED')}</Alert>;
}
