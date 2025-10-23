import { type JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import TextDisplay from '@/ui/TextDisplay/TextDisplay';
import { useButtonColor } from '@/ui/buttons/hooks';

import { useDataSyncContext } from '~builder/components/context/DataSyncContext';
import useModalStatus from '~builder/components/hooks/useModalStatus';
import DebouncedTextEditor from '~builder/components/input/DebouncedTextEditor';
import { BUILDER } from '~builder/langs';

import PublicationModal from './PublicationModal';

const SYNC_STATUS_KEY = 'PublishItemDescription';

type Props = {
  item: DiscriminatedItem;
};

export const EditItemDescription = ({ item }: Props): JSX.Element => {
  const { description, id: itemId } = item;
  const { t } = useTranslation(NS.Builder);
  const { computeStatusFor } = useDataSyncContext();
  const { isOpen, openModal, closeModal } = useModalStatus();
  const { color } = useButtonColor('warning');

  const {
    mutate: updateItem,
    isSuccess,
    isPending: isLoading,
    isError,
  } = mutations.useEditItem({
    enableNotifications: false,
  });

  useEffect(
    () => computeStatusFor(SYNC_STATUS_KEY, { isError, isLoading, isSuccess }),
    [computeStatusFor, isError, isLoading, isSuccess],
  );

  const handleDescriptionUpdated = (newDescription?: string) => {
    updateItem({
      id: itemId,
      description: newDescription ?? '',
    });
  };

  const modal = (
    <PublicationModal
      isOpen={isOpen}
      title={t('DESCRIPTION.LABEL')}
      modalContent={
        <DebouncedTextEditor
          initialValue={description ?? undefined}
          onUpdate={handleDescriptionUpdated}
          showActions={false}
        />
      }
      handleOnClose={closeModal}
    />
  );

  const noDescriptionToolTip = !description ? (
    <Tooltip
      title={t(BUILDER.LIBRARY_SETTINGS_ITEM_DESCRIPTION_MISSING_WARNING)}
    >
      <WarningIcon htmlColor={color} />
    </Tooltip>
  ) : null;

  const descriptionHeader = (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="h5">{t('DESCRIPTION.LABEL')}</Typography>
      <IconButton onClick={openModal}>
        <EditIcon />
      </IconButton>
    </Stack>
  );

  const descriptionContent = (
    <Stack direction="row" alignItems="center" spacing={1} pb={1}>
      <TextDisplay
        content={description ?? t(BUILDER.LIBRARY_SETTINGS_ITEM_NO_DESCRIPTION)}
      />
      {noDescriptionToolTip}
    </Stack>
  );

  return (
    <>
      {modal}
      <Stack>
        {descriptionHeader}
        {descriptionContent}
      </Stack>
    </>
  );
};

export default EditItemDescription;
