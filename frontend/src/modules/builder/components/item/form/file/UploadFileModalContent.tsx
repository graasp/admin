import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { EDIT_ITEM_MODAL_CANCEL_BUTTON_ID } from '@/config/selectors';

import CancelButton from '~builder/components/common/CancelButton';
import { FileUploader } from '~builder/components/file/FileUploader';

type UploadFileModalContentProps = {
  previousItemId?: DiscriminatedItem['id'];
  onClose: () => void;
};

export function UploadFileModalContent({
  previousItemId,
  onClose,
}: Readonly<UploadFileModalContentProps>): JSX.Element {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <>
      <DialogTitle>{translateBuilder('UPLOAD_FILE_TITLE')}</DialogTitle>
      <DialogContent>
        <FileUploader previousItemId={previousItemId} onComplete={onClose} />
      </DialogContent>
      <DialogActions>
        <CancelButton id={EDIT_ITEM_MODAL_CANCEL_BUTTON_ID} onClick={onClose} />
      </DialogActions>
    </>
  );
}
