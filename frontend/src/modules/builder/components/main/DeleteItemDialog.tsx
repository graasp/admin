import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { CONFIRM_DELETE_BUTTON_ID } from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import { BUILDER } from '../../langs';
import CancelButton from '../common/CancelButton';

const labelId = 'alert-dialog-title';
const descriptionId = 'alert-dialog-description';

type Props = {
  open?: boolean;
  handleClose: () => void;
  items: DiscriminatedItem[];
  onConfirm?: () => void;
};

const DeleteItemDialog = ({
  items,
  open = false,
  handleClose,
  onConfirm,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const { mutate: deleteItems } = mutations.useDeleteItems();

  const itemIds = items.map(({ id }) => id);

  const onDelete = () => {
    deleteItems(itemIds);
    onConfirm?.();
    handleClose();
  };

  const names = items
    .toSorted((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    .map(({ name }) => <li key={name}>{name}</li>);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
    >
      <DialogTitle id={labelId}>
        {translateBuilder(BUILDER.DELETE_ITEM_MODAL_TITLE)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={descriptionId}>
          {translateBuilder(BUILDER.DELETE_ITEM_MODAL_CONTENT, {
            count: itemIds.length,
          })}
          <ul>{names}</ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose} />
        <Button
          id={CONFIRM_DELETE_BUTTON_ID}
          onClick={onDelete}
          color="error"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          variant="text"
        >
          {translateBuilder(BUILDER.DELETE_ITEM_MODAL_CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemDialog;
