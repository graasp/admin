import {
  ComponentProps,
  type JSX,
  type MouseEventHandler,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import { AccountType } from '@graasp/sdk';

import {
  CircleHelpIcon,
  DoorOpenIcon,
  HomeIcon,
  SettingsIcon,
} from 'lucide-react';

import { type AuthenticatedUser } from '@/AuthContext';
import { MenuItemLink } from '@/components/ui/MenuItemLink';
import { NS } from '@/config/constants';

const MENU_ARIA_ID = 'account-menu';

type Props = {
  avatarButtonId: string;
  avatar: JSX.Element;
  user: AuthenticatedUser;
  signOutMenuItemId?: string;
  signOutText: string;
  /**
   * Name of the event that will be sent to Umami for tracking user actions
   */
  dataUmamiEvent?: string;

  /**
   * Async function used to perform the sign out
   * @param memberId Id of the user to sign out (current user)
   * @returns Promise of void
   */
  signOut: () => Promise<void>;
};

export function UserPopupMenu({
  avatarButtonId,
  user,
  signOutMenuItemId,
  avatar,
  dataUmamiEvent,
  signOut,
  signOutText,
}: Readonly<Props>) {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );
  const { t } = useTranslation(NS.Common);

  const handleClick: MouseEventHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const activeProps: ComponentProps<
    typeof MenuItemLink
  >['activeProps'] = () => ({
    selected: true,
  });

  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        id={avatarButtonId}
        aria-controls={open ? MENU_ARIA_ID : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        data-umami-event={dataUmamiEvent}
      >
        {avatar}
      </IconButton>
      <Menu
        id={MENU_ARIA_ID}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {user.type === AccountType.Individual && (
          <>
            <MenuItemLink
              to="/home"
              activeProps={activeProps}
              onClick={handleClose}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Typography variant="subtitle2">
                {t('USER_SWITCH.HOME')}
              </Typography>
            </MenuItemLink>
            <MenuItemLink
              to="/account/settings"
              activeProps={activeProps}
              onClick={handleClose}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Typography variant="subtitle2">
                {t('USER_SWITCH.SETTINGS')}
              </Typography>
            </MenuItemLink>
            <Divider />
            <MenuItemLink
              to="/support"
              activeProps={activeProps}
              onClick={handleClose}
            >
              <ListItemIcon>
                <CircleHelpIcon />
              </ListItemIcon>
              <Typography variant="subtitle2">
                {t('USER_SWITCH.NEED_HELP')}
              </Typography>
            </MenuItemLink>
          </>
        )}
        <MenuItem key="signout" onClick={signOut} id={signOutMenuItemId}>
          <ListItemIcon>
            <DoorOpenIcon />
          </ListItemIcon>
          <Typography variant="subtitle2">{signOutText}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
