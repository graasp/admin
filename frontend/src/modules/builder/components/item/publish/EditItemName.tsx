import { type JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';

import { useDataSyncContext } from '~builder/components/context/DataSyncContext';
import useModalStatus from '~builder/components/hooks/useModalStatus';
import DebouncedTextField from '~builder/components/input/DebouncedTextField';
import { BUILDER } from '~builder/langs';

import PublicationModal from './PublicationModal';

const SYNC_STATUS_KEY = 'PublishItemTitle';

type Props = {
  item: DiscriminatedItem;
};

export const EditItemName = ({ item }: Props): JSX.Element => {
  const { name, id: itemId } = item;
  const { t } = useTranslation(NS.Builder);
  const { computeStatusFor } = useDataSyncContext();
  const { isOpen, openModal, closeModal } = useModalStatus();

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

  const handleNameUpdated = (newName?: string) => {
    if (newName) {
      updateItem({
        id: itemId,
        name: newName,
      });
    }
  };

  const modal = (
    <PublicationModal
      isOpen={isOpen}
      title={t(BUILDER.CREATE_NEW_ITEM_NAME_LABEL)}
      modalContent={
        <DebouncedTextField
          initialValue={name ?? undefined}
          onUpdate={handleNameUpdated}
          label={t(BUILDER.CREATE_NEW_ITEM_NAME_LABEL)}
          mt={1}
          required
          emptyValueError={t(
            BUILDER.LIBRARY_SETTINGS_ITEM_NAME_CANNOT_BE_EMPTY,
          )}
        />
      }
      handleOnClose={closeModal}
    />
  );

  return (
    <>
      {modal}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h2" fontWeight={700}>
          {item.name}
        </Typography>
        <IconButton onClick={openModal}>
          <EditIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default EditItemName;
