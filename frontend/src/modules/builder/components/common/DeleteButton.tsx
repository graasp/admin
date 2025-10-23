import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { ITEM_DELETE_BUTTON_CLASS } from '@/config/selectors';
import GraaspDeleteButton from '@/ui/buttons/DeleteButton/DeleteButton';
import { ActionButtonVariant, ColorVariantsType } from '@/ui/types';

import { BUILDER } from '../../langs';
import DeleteItemDialog from '../main/DeleteItemDialog';

type Props = {
  items: DiscriminatedItem[];
  color?: ColorVariantsType;
  id?: string;
  type?: ActionButtonVariant;
  onConfirm?: () => void;
  onClose?: () => void;
};

/**
 * Delete Button Component
 * This button opens a dialog to confirm the action
 */
const DeleteButton = ({
  items,
  color,
  id,
  type,
  onConfirm,
  onClose,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const text = translateBuilder(BUILDER.DELETE_BUTTON, { count: items.length });

  return (
    <>
      <GraaspDeleteButton
        key={text}
        onClick={handleClickOpen}
        text={text}
        aria-label={text}
        id={id}
        color={color}
        type={type}
        className={ITEM_DELETE_BUTTON_CLASS}
      />
      <DeleteItemDialog
        onConfirm={onConfirm}
        open={open}
        handleClose={handleClose}
        items={items}
      />
    </>
  );
};

export default DeleteButton;
