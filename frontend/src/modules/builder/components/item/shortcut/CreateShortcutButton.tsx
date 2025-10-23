import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ListItemIcon, MenuItem } from '@mui/material';

import { CableIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { ITEM_MENU_SHORTCUT_BUTTON_CLASS } from '@/config/selectors';

import { BUILDER } from '../../../langs';

export type Props = {
  onClick?: () => void;
};

const CreateShortcutButton = ({ onClick }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <MenuItem onClick={onClick} className={ITEM_MENU_SHORTCUT_BUTTON_CLASS}>
      <ListItemIcon>
        <CableIcon />
      </ListItemIcon>
      {translateBuilder(BUILDER.ITEM_MENU_CREATE_SHORTCUT_MENU_ITEM)}
    </MenuItem>
  );
};

export default CreateShortcutButton;
