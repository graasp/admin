import { ChangeEventHandler, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import {
  DiscriminatedItem,
  MAX_ZIP_FILE_SIZE,
  formatFileSize,
} from '@graasp/sdk';

import { useParams } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  CREATE_ITEM_CLOSE_BUTTON_ID,
  H5P_DASHBOARD_UPLOADER_ID,
} from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';
import UploadFileButton from '@/ui/upload/UploadFileButton/UploadFileButton';

import { BUILDER } from '../../langs';
import { useUploadWithProgress } from '../hooks/uploadWithProgress';

const ImportH5P = ({
  onClose,
  previousItemId,
}: {
  onClose?: () => void;
  previousItemId?: DiscriminatedItem['id'];
}): JSX.Element => {
  const { itemId } = useParams({ strict: false });
  const { mutateAsync: importH5P, isPending: isLoading } =
    mutations.useImportH5P();
  const { update, close: closeNotification } = useUploadWithProgress();
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files?.length) {
      try {
        await importH5P({
          onUploadProgress: update,
          id: itemId,
          previousItemId,
          file: e.target.files[0],
        });

        closeNotification();
        onClose?.();
      } catch (error) {
        closeNotification(error);
        console.error(error);
      }
    }
  };

  return (
    <>
      <DialogTitle>{translateBuilder(BUILDER.IMPORT_H5P_TITLE)}</DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Typography variant="body1">
            {translateBuilder(BUILDER.IMPORT_H5P_INFORMATIONS)}
          </Typography>
          <Typography variant="body1">
            {translateBuilder(BUILDER.IMPORT_H5P_WARNING)}
          </Typography>
          <Typography variant="body1">
            {translateBuilder(BUILDER.IMPORT_H5P_LIMITATIONS_TEXT, {
              maxSize: formatFileSize(MAX_ZIP_FILE_SIZE),
            })}
          </Typography>
          <UploadFileButton
            isLoading={isLoading}
            loadingText={translateBuilder(BUILDER.UPLOADING)}
            onChange={onChange}
            accept=".h5p"
            id={H5P_DASHBOARD_UPLOADER_ID}
            text={translateBuilder(BUILDER.UPLOAD_H5P_BUTTON)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          id={CREATE_ITEM_CLOSE_BUTTON_ID}
          variant="text"
          onClick={onClose}
        >
          {translateBuilder('CLOSE_BUTTON')}
        </Button>
      </DialogActions>
    </>
  );
};

export default ImportH5P;
