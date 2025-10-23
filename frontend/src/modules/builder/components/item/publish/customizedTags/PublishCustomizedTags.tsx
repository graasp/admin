import { type JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import WarningIcon from '@mui/icons-material/Warning';
import { Tooltip } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { useButtonColor } from '@/ui/buttons/hooks';

import { useDataSyncContext } from '~builder/components/context/DataSyncContext';
import { BUILDER } from '~builder/langs';

import CustomizedTags from './CustomizedTags';
import { useTagsManager } from './useTagsManager';

type Props = {
  item: DiscriminatedItem;
  onChange?: (args: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }) => void;
};

const SYNC_STATUS_KEY = 'CustomizedTags';
export const PublishCustomizedTags = ({
  item,
  onChange,
}: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { tags, isLoading, isSuccess, isError } = useTagsManager({
    itemId: item.id,
  });
  const { computeStatusFor } = useDataSyncContext();
  const showWarning = !tags?.length;
  const { color } = useButtonColor('warning');

  useEffect(
    () => computeStatusFor(SYNC_STATUS_KEY, { isLoading, isSuccess, isError }),
    [isLoading, isSuccess, isError, onChange, computeStatusFor],
  );

  return (
    <>
      <CustomizedTags item={item} />

      {showWarning && (
        <Tooltip title={t(BUILDER.ITEM_TAGS_MISSING_WARNING)}>
          <WarningIcon htmlColor={color} />
        </Tooltip>
      )}
    </>
  );
};
