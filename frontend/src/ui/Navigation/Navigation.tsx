import { type JSX, type ReactNode, useState } from 'react';

import {
  Breadcrumbs,
  IconButton,
  IconButtonProps,
  Menu,
  Stack,
  SxProps,
  Typography,
  styled,
} from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import truncate from 'lodash.truncate';
import { ChevronRightIcon } from 'lucide-react';

import { MenuItemLink } from '@/components/ui/MenuItemLink.js';
import { TypographyLink } from '@/components/ui/TypographyLink.js';
import { ITEM_NAME_MAX_LENGTH } from '@/config/constants';
import { hooks } from '@/config/queryClient.js';

const StyledBreadcrumbs = styled(Breadcrumbs)(() => ({
  '.MuiBreadcrumbs-separator': {
    margin: 0,
  },
}));

type UseChildrenType = (typeof hooks)['useChildren'];

export type NavigationProps = {
  backgroundColor?: string;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildIconId?: (id: string) => string;
  buildMenuItemId?: (id: string) => string;
  itemPath: string;
  buildMenuId?: (id: string) => string;
  id?: string;
  item?: DiscriminatedItem;
  parents?: { name: string; id: string }[];
  sx?: SxProps;
  useChildren: UseChildrenType;
  maxItems?: number;
  children?: ReactNode;
};
export interface MenuItemType {
  name: string;
  path: string;
}

export function Navigation({
  backgroundColor,
  buildBreadcrumbsItemLinkId,
  buildIconId,
  buildMenuItemId,
  itemPath,
  id,
  item,
  parents,
  sx,
  useChildren,
  buildMenuId,
  maxItems = 4,
  children,
}: Readonly<NavigationProps>): JSX.Element | null {
  if (!parents?.length) {
    return null;
  }

  return (
    <StyledBreadcrumbs
      sx={sx}
      id={id}
      maxItems={maxItems}
      separator=""
      aria-label="breadcrumb"
      style={{ backgroundColor }}
    >
      {item?.id && parents && (
        <ParentsNavigation
          useChildren={useChildren}
          parents={parents}
          itemPath={itemPath}
          buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLinkId}
        />
      )}
      {item?.id && item && (
        <CurrentItemNavigation
          item={item}
          useChildren={useChildren}
          itemPath={itemPath}
          buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLinkId}
          buildIconId={buildIconId}
          buildMenuId={buildMenuId}
          buildMenuItemId={buildMenuItemId}
          showArrow={Boolean(children)}
        />
      )}
      {children}
    </StyledBreadcrumbs>
  );
}

export type ParentsProps = {
  parents: { name: string; id: string }[];
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  useChildren: UseChildrenType;
  itemPath: string;
};
function ParentsNavigation({
  parents,
  useChildren,
  buildBreadcrumbsItemLinkId,
  itemPath,
}: Readonly<ParentsProps>) {
  return (
    <Stack direction="row">
      {parents.map(({ name, id }) => (
        <Stack
          key={id}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <TypographyLink
            sx={{ textDecoration: 'none', color: 'inherit' }}
            id={buildBreadcrumbsItemLinkId?.(id)}
            to={itemPath}
            params={{ itemId: id }}
          >
            {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
          </TypographyLink>
          <ItemMenu useChildren={useChildren} itemId={id} itemPath={itemPath} />
        </Stack>
      ))}
    </Stack>
  );
}

type CurrentItemProps = {
  item: DiscriminatedItem;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildIconId?: (id: string) => string;
  buildMenuId?: (id: string) => string;
  buildMenuItemId?: (id: string) => string;
  useChildren: ItemMenuProps['useChildren'];
  itemPath: string;
  showArrow: boolean;
};
const CurrentItemNavigation = ({
  item,
  buildBreadcrumbsItemLinkId,
  itemPath,
  useChildren,
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  showArrow,
}: CurrentItemProps): JSX.Element | null => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <TypographyLink
        sx={{ textDecoration: 'none', color: 'inherit' }}
        id={buildBreadcrumbsItemLinkId?.(item.id)}
        key={item.id}
        to={itemPath}
        params={{ itemId: item.id }}
      >
        {truncate(item.name, { length: ITEM_NAME_MAX_LENGTH })}
      </TypographyLink>
      {(item.type === ItemType.FOLDER || showArrow) && (
        <ItemMenu
          useChildren={useChildren}
          itemId={item.id}
          itemPath={itemPath}
          buildIconId={buildIconId}
          buildMenuItemId={buildMenuItemId}
          buildMenuId={buildMenuId}
          renderArrow={showArrow}
        />
      )}
    </Stack>
  );
};

export type ItemMenuProps = {
  buildIconId?: (id: string) => string;
  buildMenuId?: (itemId: string) => string;
  buildMenuItemId?: (itemId: string) => string;
  itemPath: string;
  icon?: JSX.Element;
  itemId: string;
  useChildren: UseChildrenType;
  renderArrow?: boolean;
};

export function ItemMenu({
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  itemPath,
  icon = <ChevronRightIcon data-testid="NavigateNextIcon" />,
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
            to={itemPath}
            params={{ itemId: id }}
          >
            <Typography>{name}</Typography>
          </MenuItemLink>
        ))}
      </Menu>
    </>
  );
}
