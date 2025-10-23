import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DialogActions, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import Button from '@/ui/buttons/Button/Button';
import DeleteButton from '@/ui/buttons/DeleteButton/DeleteButton';

import { MAP } from '../../constants';
import { useQueryClientContext } from '../context/QueryClientContext';

type Props = {
  item: DiscriminatedItem;
};

const DeleteItemButton = ({ item }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Map);
  const { useRecycleItems } = useQueryClientContext();
  const { mutate: recycleItems } = useRecycleItems();
  const { t: translateCommon } = useTranslation(NS.Common);
  const [open, setOpen] = useState(false);

  const { name, id } = item;

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    recycleItems([id]);
    handleClose();
  };
  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <DeleteButton text={t(MAP.DELETE_ITEM_TITLE)} onClick={onClick} />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{t(MAP.DELETE_ITEM_TITLE)}</DialogTitle>
        <DialogContent>
          {t(MAP.DELETE_ITEM_EXPLANATION, { name })}
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            {translateCommon('CANCEL.BUTTON_TEXT')}
          </Button>
          <Button color="error" onClick={onDelete}>
            {t(MAP.DELETE_ITEM_BUTTON)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteItemButton;
