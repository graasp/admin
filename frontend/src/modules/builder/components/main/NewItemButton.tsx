import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonProps, IconButton, useTheme } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { PlusIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { CREATE_ITEM_BUTTON_ID } from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import { BUILDER } from '../../langs';
import NewItemModal from './NewItemModal';

type Props = {
  previousItemId?: DiscriminatedItem['id'];
  size?: ButtonProps['size'];
  type?: 'button' | 'icon';
};

const NewItemButton = ({
  previousItemId,
  size = 'small',
  type = 'button',
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {type === 'icon' ? (
        <IconButton
          onClick={handleClickOpen}
          color="primary"
          sx={{
            background: theme.palette.primary.main,
            '&:hover': { background: 'grey' },
          }}
          data-umami-event="new-item-icon-button"
        >
          <PlusIcon color="white" />
        </IconButton>
      ) : (
        <Button
          id={CREATE_ITEM_BUTTON_ID}
          onClick={handleClickOpen}
          color="primary"
          aria-label="add"
          startIcon={<PlusIcon />}
          size={size}
          data-umami-event="new-item-button"
        >
          {translateBuilder(BUILDER.NEW_ITEM_BUTTON)}
        </Button>
      )}
      <NewItemModal
        open={open}
        handleClose={handleClose}
        previousItemId={previousItemId}
      />
    </>
  );
};

export default NewItemButton;
