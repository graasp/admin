import { type JSX, useState } from 'react';

import { IconButton, IconButtonProps, Menu, Typography } from '@mui/material';

import { ChevronRightIcon } from 'lucide-react';

import { MenuItemLink } from '@/components/ui/MenuItemLink.js';

import { MenuItemType } from './Navigation.js';

export type ExtraItemsMenuProps = {
  icon?: JSX.Element;
  menuItems: MenuItemType[];
  buildIconId?: (id: string) => string;
  buildMenuId?: (itemId: string) => string;
  name: string;
};

const Separator = <ChevronRightIcon data-testid="NavigateNextIcon" />;

const ExtraItemsMenu = ({
  icon = Separator,
  menuItems,
  buildIconId,
  buildMenuId,
  name: title,
}: ExtraItemsMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-haspopup="true"
        id={buildIconId?.(title)}
        aria-expanded={open ? true : undefined}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id={buildMenuId?.(title)}
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
        {menuItems?.map(({ name, path }) => (
          <MenuItemLink key={name} to={path}>
            <Typography>{name}</Typography>
          </MenuItemLink>
        ))}
      </Menu>
    </>
  );
};

export default ExtraItemsMenu;
