import { type JSX, useState } from 'react';

import { IconButton, IconButtonProps, Menu, Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { type UseQueryResult } from '@tanstack/react-query';
import { ChevronRightIcon } from 'lucide-react';

import { MenuItemLink } from '../MenuItemLink';

export const Separator = <ChevronRightIcon data-testid="NavigateNextIcon" />;

export type ItemMenuProps = {
  buildIconId?: (id: string) => string;
  buildMenuId?: (itemId: string) => string;
  buildMenuItemId?: (itemId: string) => string;
  icon?: JSX.Element;
  itemId: string;
  useChildren: (itemId: string) => UseQueryResult<DiscriminatedItem[]>;
  renderArrow?: boolean;
};

export function ItemMenu({
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  icon = Separator,
  itemId,
  useChildren,
  renderArrow,
}: Readonly<ItemMenuProps>): JSX.Element | null {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: items } = useChildren(itemId);

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  if (!items?.length && renderArrow) {
    // to display icon as a separator specially if there's an extra items after items menu
    return icon;
  }
  if (!items?.length) {
    return null;
  }
  return (
    <>
      <IconButton
        onClick={handleClick}
        id={buildIconId?.(itemId)}
        aria-controls={open ? buildMenuId?.(itemId) : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={buildMenuId?.(itemId)}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {items?.map(({ name, id }) => (
          <MenuItemLink
            id={buildMenuItemId?.(id)}
            key={id}
            to="/analytics/items/$itemId"
            params={{ itemId: id }}
          >
            <Typography>{name}</Typography>
          </MenuItemLink>
        ))}
      </Menu>
    </>
  );
}

export default ItemMenu;
