import { type JSX, useState } from 'react';

import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuProps,
  Typography,
} from '@mui/material';

import { ChevronRightIcon, HomeIcon } from 'lucide-react';

import { MenuItemLink } from '@/components/ui/MenuItemLink.js';
import { TypographyLink } from '@/components/ui/TypographyLink';

const Separator = <ChevronRightIcon data-testid="NavigateNextIcon" />;

type Props = {
  selected: { name: string; id: string; to: string };
  elements: {
    name: string;
    id: string;
    to: string;
  }[];
  menuId?: string;
  buildMenuItemId?: (itemId: string) => string;
  homeDropdownId?: string;
};

const HomeMenu = ({
  buildMenuItemId,
  elements,
  homeDropdownId,
  menuId,
  selected,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onClick: MenuProps['onClick'] = (): void => {
    handleClose();
  };

  return (
    <>
      <HomeIcon />
      <IconButton
        onClick={handleClick}
        id={homeDropdownId}
        aria-controls={open ? 'root' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
      >
        {Separator}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id={menuId}
        onClose={handleClose}
        onClick={onClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {elements.map(({ name, id, to }) => (
          <MenuItemLink key={id} to={to} id={buildMenuItemId?.(id)}>
            <Typography>{name}</Typography>
          </MenuItemLink>
        ))}
      </Menu>
      <TypographyLink to={selected.to} key={selected.id}>
        {selected.name}
      </TypographyLink>
    </>
  );
};

export default HomeMenu;
