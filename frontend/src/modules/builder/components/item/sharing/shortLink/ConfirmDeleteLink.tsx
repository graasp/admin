import { Dispatch, type JSX, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { NS } from '@/config/constants';
import {
  buildShortLinkCancelBtnId,
  buildShortLinkConfirmDeleteBtnId,
} from '@/config/selectors';

import CancelButton from '~builder/components/common/CancelButton';
import { BUILDER } from '~builder/langs';

interface DeleteLinkProps {
  shortLink: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
}

const ConfirmDeleteLink = ({
  shortLink,
  open,
  setOpen,
  handleDelete,
}: DeleteLinkProps): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const handleClose = () => setOpen(false);

  const onClose = (_event: Event, reason: string) => {
    if (reason === 'backdropClick') {
      return;
    }

    handleClose();
  };

  const handleClickDelete = () => {
    setOpen(false);
    handleDelete();
  };

  const CONFIRM_DELETE_DIALOG_TITLE = `alert-dialog-title-delete-${shortLink}`;
  const CONFIRM_DELETE_DIALOG_DESC = `alert-dialog-desc-delete-${shortLink}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={CONFIRM_DELETE_DIALOG_TITLE}
      aria-describedby={CONFIRM_DELETE_DIALOG_DESC}
    >
      <DialogTitle id={CONFIRM_DELETE_DIALOG_TITLE}>
        {translateBuilder(BUILDER.CONFIRM_DELETE_SHORT_LINK_TITLE)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={CONFIRM_DELETE_DIALOG_DESC}>
          {translateBuilder(BUILDER.CONFIRM_DELETE_SHORT_LINK_MSG, {
            shortLink,
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton
          onClick={handleClose}
          id={buildShortLinkCancelBtnId(shortLink)}
        />
        <Button
          onClick={handleClickDelete}
          color="error"
          id={buildShortLinkConfirmDeleteBtnId(shortLink)}
        >
          {translateBuilder(BUILDER.DELETE_BTN)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteLink;
