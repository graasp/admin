import { type JSX, useState } from 'react';

import { IconButton, IconButtonProps, Menu, Typography } from '@mui/material';

import { ChevronRightIcon } from 'lucide-react';

import { MenuItemLink } from '../MenuItemLink';
import { MenuItemType } from './Navigator';

export type ExtraItemsMenuProps = {
  icon?: JSX.Element;
  menuItems: MenuItemType[];
};

const Separator = <ChevronRightIcon data-testid="NavigateNextIcon" />;

export function ExtraItemsMenu({
  icon = Separator,
  menuItems,
}: Readonly<ExtraItemsMenuProps>): JSX.Element {
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
        aria-expanded={open ? true : undefined}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
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
        {menuItems?.map(({ name, path }) => (
          <MenuItemLink key={name} to={path}>
            <Typography>{name}</Typography>
          </MenuItemLink>
        ))}
      </Menu>
    </>
  );
}
