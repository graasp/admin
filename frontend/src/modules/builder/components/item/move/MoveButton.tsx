import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { NS } from '@/config/constants';
import {
  ITEM_MENU_MOVE_BUTTON_CLASS,
  ITEM_MOVE_BUTTON_CLASS,
} from '@/config/selectors';
import GraaspMoveButton from '@/ui/buttons/MoveButton/MoveButton';
import {
  ActionButton,
  ActionButtonVariant,
  ColorVariantsType,
} from '@/ui/types';

import { BUILDER } from '../../../langs';

type MoveButtonProps = {
  color?: ColorVariantsType;
  id?: string;
  type?: ActionButtonVariant;
  onClick?: () => void;
};

const MoveButton = ({
  color,
  id,
  type = ActionButton.ICON_BUTTON,
  onClick,
}: MoveButtonProps): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <GraaspMoveButton
      color={color}
      type={type}
      id={id}
      onClick={onClick}
      text={translateBuilder(BUILDER.MOVE_BUTTON)}
      menuItemClassName={ITEM_MENU_MOVE_BUTTON_CLASS}
      iconClassName={ITEM_MOVE_BUTTON_CLASS}
    />
  );
};

export default MoveButton;
