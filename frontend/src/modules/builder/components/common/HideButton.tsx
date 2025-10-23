import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { PackedItem, getParentFromPath } from '@graasp/sdk';

import { useQueryClient } from '@tanstack/react-query';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  HIDDEN_ITEM_BUTTON_CLASS,
  buildHideButtonId,
} from '@/config/selectors';
import { itemKeys } from '@/query/keys';
import { ActionButton, ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../langs';

type HideButtonProps = {
  item: PackedItem;
  type?: ActionButtonVariant;
  onClick?: () => void;
};

const HideButton = ({
  item,
  type = ActionButton.ICON_BUTTON,
  onClick,
}: HideButtonProps): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const queryClient = useQueryClient();
  const postVisibility = mutations.usePostItemVisibility();
  const deleteVisibility = mutations.useDeleteItemVisibility();

  const hiddenVisibility = item.hidden;
  // since children items are hidden because parent is hidden, the hidden tag should be removed from the root item
  // if hiddenVisibility is undefined -> the item is not hidden
  const isOriginalHiddenItem =
    !hiddenVisibility || hiddenVisibility?.itemPath === item.path;

  const handleToggleHide = async () => {
    if (hiddenVisibility) {
      await deleteVisibility.mutateAsync({
        itemId: item.id,
        type: 'hidden',
      });
    } else {
      await postVisibility.mutateAsync({
        itemId: item.id,
        type: 'hidden',
      });
    }
    const parentId = getParentFromPath(item.path);
    if (parentId) {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(parentId).allChildren,
      });
    }
    onClick?.();
  };

  const text = hiddenVisibility
    ? translateBuilder(BUILDER.HIDE_ITEM_SHOW_TEXT)
    : translateBuilder(BUILDER.HIDE_ITEM_HIDE_TEXT);
  let tooltip = text;
  if (hiddenVisibility && !isOriginalHiddenItem) {
    tooltip = translateBuilder(BUILDER.HIDE_ITEM_HIDDEN_PARENT_INFORMATION);
  }

  const icon = hiddenVisibility ? <EyeIcon /> : <EyeOffIcon />;

  switch (type) {
    case ActionButton.MENU_ITEM: {
      const menuItem = (
        <MenuItem
          key={text}
          onClick={handleToggleHide}
          className={HIDDEN_ITEM_BUTTON_CLASS}
          disabled={!isOriginalHiddenItem}
          data-cy={buildHideButtonId(Boolean(hiddenVisibility))}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );

      // show tooltip only on disabled
      if (isOriginalHiddenItem) {
        return menuItem;
      }
      return (
        <Tooltip title={tooltip} placement="left">
          <span>{menuItem}</span>
        </Tooltip>
      );
    }
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={tooltip}>
          <span>
            <IconButton
              aria-label={text}
              className={HIDDEN_ITEM_BUTTON_CLASS}
              onClick={handleToggleHide}
              disabled={!isOriginalHiddenItem}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default HideButton;
