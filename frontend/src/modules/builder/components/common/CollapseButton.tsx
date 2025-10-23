import { type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { COLLAPSE_ITEM_BUTTON_CLASS } from '@/config/selectors';
import { ActionButton, ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../langs';

type Props = {
  item: DiscriminatedItem;
  type?: ActionButtonVariant;
  onClick?: () => void;
};

const CollapseButton = ({
  item,
  type = ActionButton.ICON_BUTTON,
  onClick,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const { mutate: editItem } = mutations.useEditItem();
  const [isCollapsible, setIsCollapsible] = useState(
    item?.settings?.isCollapsible ?? false,
  );

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setIsCollapsible(item?.settings?.isCollapsible ?? false);
  }, [item]);

  const disabled = item.type === ItemType.FOLDER;

  const handleCollapse = () => {
    editItem({
      id: item.id,
      name: item.name,
      settings: {
        isCollapsible: !isCollapsible,
      },
    });
    onClick?.();
  };

  const icon = isCollapsible ? <ChevronsUpDownIcon /> : <ChevronsDownUpIcon />;
  let text;
  if (disabled) {
    text = translateBuilder(BUILDER.SETTINGS_COLLAPSE_FOLDER_INFORMATION);
  } else {
    text = isCollapsible
      ? translateBuilder(BUILDER.COLLAPSE_ITEM_UNCOLLAPSE_TEXT)
      : translateBuilder(BUILDER.COLLAPSE_ITEM_COLLAPSE_TEXT);
  }

  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem
          key={text}
          onClick={handleCollapse}
          className={COLLAPSE_ITEM_BUTTON_CLASS}
          disabled={disabled}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    case ActionButton.ICON:
      return icon;
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              disabled={disabled}
              aria-label={text}
              className={COLLAPSE_ITEM_BUTTON_CLASS}
              onClick={handleCollapse}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default CollapseButton;
