import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';

import { MenuIcon } from 'lucide-react';

import { MenuItemLink } from '@/components/ui/MenuItemLink';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';

export default function MobileMenu() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'NAVBAR' });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="landing-mobile-menu"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        aria-labelledby="landing-mobile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItemLink
          activeProps={() => ({ selected: true })}
          to="/"
          onClick={handleClose}
        >
          {t('HOME')}
        </MenuItemLink>
        <MenuItemLink
          activeProps={() => ({ selected: true })}
          to="/features"
          onClick={handleClose}
        >
          {t('FEATURES')}
        </MenuItemLink>
        <MenuItemLink
          activeProps={() => ({ selected: true })}
          to="/support"
          onClick={handleClose}
        >
          {t('GETTING_STARTED')}
        </MenuItemLink>
        <MenuItemLink
          activeProps={() => ({ selected: true })}
          to={GRAASP_LIBRARY_HOST}
          onClick={handleClose}
        >
          {t('LIBRARY')}
        </MenuItemLink>
        <MenuItemLink
          activeProps={() => ({ selected: true })}
          to="/about-us"
          onClick={handleClose}
        >
          {t('ABOUT_US')}
        </MenuItemLink>
      </Menu>
    </div>
  );
}
