import { type JSX, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { EDIT_ITEM_BUTTON_CLASS, buildEditButtonId } from '@/config/selectors';
import GraaspEditButton from '@/ui/buttons/EditButton/EditButton';
import { ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../../langs';

type Props = {
  itemId: DiscriminatedItem['id'];
  type?: ActionButtonVariant;
  onClick?: MouseEventHandler;
};

const EditButton = ({ itemId, onClick, type = 'icon' }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <GraaspEditButton
      type={type}
      title={translateBuilder(BUILDER.EDIT_ITEM_BUTTON)}
      id={buildEditButtonId(itemId)}
      ariaLabel={translateBuilder(BUILDER.EDIT_ITEM_BUTTON)}
      className={EDIT_ITEM_BUTTON_CLASS}
      onClick={onClick}
      size="medium"
    />
  );
};

export default EditButton;
