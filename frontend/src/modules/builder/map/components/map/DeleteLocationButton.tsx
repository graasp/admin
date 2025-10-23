import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import {
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import Button from '@/ui/buttons/Button/Button';

import { MAP } from '../../constants';
import { useQueryClientContext } from '../context/QueryClientContext';

export interface Props {
  item: DiscriminatedItem;
}

const DeleteLocationButton = ({ item }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Map);
  const { t: translateCommon } = useTranslation(NS.Common);
  const { useDeleteItemGeolocation } = useQueryClientContext();
  const { mutate: deleteLocation } = useDeleteItemGeolocation();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const onDelete = () => {
    deleteLocation({ itemId: item.id });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Delete Item Location">
        <IconButton onClick={onClick}>
          <WrongLocationIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{t(MAP.DELETE_ITEM_LOCATION_TITLE)}</DialogTitle>
        <DialogContent>
          {t(MAP.DELETE_ITEM_LOCATION_EXPLANATION, { name: item.name })}
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpen(false)}>
            {translateCommon('CANCEL.BUTTON_TEXT')}
          </Button>
          <Button color="error" onClick={onDelete}>
            {t(MAP.DELETE_ITEM_LOCATION_BUTTON)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteLocationButton;
