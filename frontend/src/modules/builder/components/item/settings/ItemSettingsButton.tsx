import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, ListItemIcon, Tooltip } from '@mui/material';

import { Link } from '@tanstack/react-router';
import { SettingsIcon } from 'lucide-react';

import { MenuItemLink } from '@/components/ui/MenuItemLink';
import { NS } from '@/config/constants';
import { buildSettingsButtonId } from '@/config/selectors';
import { ActionButton, ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../../langs';

type Props = {
  itemId: string;
  type?: ActionButtonVariant;
};

const ItemSettingsButton = ({
  itemId,
  type = ActionButton.ICON_BUTTON,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const text = translateBuilder(BUILDER.SETTINGS_TITLE);
  const id = buildSettingsButtonId(itemId);

  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItemLink
          to="/builder/items/$itemId/settings"
          params={{ itemId }}
          key={text}
          id={id}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          {text}
        </MenuItemLink>
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={text}>
          <Link to="/builder/items/$itemId/settings" params={{ itemId }}>
            <IconButton id={id}>
              <SettingsIcon />
            </IconButton>
          </Link>
        </Tooltip>
      );
  }
};

export default ItemSettingsButton;
