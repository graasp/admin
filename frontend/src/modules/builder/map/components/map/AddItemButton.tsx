import { FormEvent, type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';

import { ItemGeolocation, ItemType } from '@graasp/sdk';

import { MapPinPlus } from 'lucide-react';

import { NS } from '@/config/constants';

import { useQueryClientContext } from '../context/QueryClientContext';

type Props = {
  location: Pick<ItemGeolocation, 'lat' | 'lng'> &
    Partial<Pick<ItemGeolocation, 'country' | 'addressLabel'>>;
};
const AddItemButton = ({ location }: Props): JSX.Element | null => {
  const {
    handleAddOnClick,
    usePostItem,
    item: parent,
  } = useQueryClientContext();
  const { t: commonT } = useTranslation(NS.Common);
  const { mutateAsync: postItem } = usePostItem();
  const { t } = useTranslation(NS.Map);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    if (location && name) {
      await postItem({
        parentId: parent?.id,
        name,
        description,
        type: ItemType.FOLDER,
        geolocation: location,
      });
    }
    setOpen(false);
  };
  const handleAddItem = () => {
    if (handleAddOnClick) {
      handleAddOnClick({ location });
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <CssBaseline />
      <Tooltip title={t('Add a new item at this location')}>
        <IconButton
          onClick={handleAddItem}
          aria-label={commonT('ARIA.ADD_LOCATION')}
        >
          <MapPinPlus />
        </IconButton>
      </Tooltip>
      {/* fallback form to add an item */}
      {!handleAddOnClick && (
        <Dialog open={open}>
          <DialogTitle>{t('Add a new item at this location')}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                margin="dense"
                id="name"
                label={t('Name')}
                fullWidth
                name="name"
                variant="standard"
                required
              />
              <TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                margin="dense"
                id="description"
                label={t('Description')}
                fullWidth
                name="description"
                variant="standard"
              />

              <p>{location.addressLabel}</p>
            </DialogContent>
            <DialogActions>
              <Button
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onClick={() => setOpen(false)}
              >
                {commonT('CANCEL.BUTTON_TEXT')}
              </Button>
              <Button type="submit" variant="contained">
                {commonT('SAVE.BUTTON_TEXT')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default AddItemButton;
