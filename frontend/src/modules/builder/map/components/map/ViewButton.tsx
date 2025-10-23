import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';

import { useQueryClientContext } from '../context/QueryClientContext';

type Props = {
  item: DiscriminatedItem;
};

const ViewButton = ({ item }: Props): JSX.Element => {
  const { viewItem } = useQueryClientContext();
  const { t } = useTranslation(NS.Map);

  return (
    <Tooltip title={t('VIEW_ITEM_PLAYER_TOOLTIP')}>
      <IconButton
        onClick={() => {
          viewItem(item);
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ViewButton;
