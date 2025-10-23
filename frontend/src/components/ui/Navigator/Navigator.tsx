import type { JSX } from 'react';

import { Breadcrumbs, SxProps, styled } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { CurrentItemNavigation } from './CurrentItemNavigation';
import { ExtraItem, ExtraItemsNavigation } from './ExtraItemsNavigation';
import { ItemMenuProps } from './ItemMenu';
import { ParentsNavigation } from './ParentsNavigation';

const StyledBreadcrumbs = styled(Breadcrumbs)(() => ({
  '.MuiBreadcrumbs-separator': {
    margin: 0,
  },
}));

export type NavigationProps = {
  backgroundColor?: string;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildIconId?: (id: string) => string;
  buildMenuItemId?: (id: string) => string;
  buildMenuId?: (id: string) => string;
  id?: string;
  item?: DiscriminatedItem;
  parents?: { name: string; id: string }[];
  sx?: SxProps;
  useChildren: ItemMenuProps['useChildren'];
  maxItems?: number;
  extraItems?: ExtraItem[];
};
export interface MenuItemType {
  name: string;
  path: string;
}

export function AnalyticsNavigator({
  backgroundColor,
  buildBreadcrumbsItemLinkId,
  buildIconId,
  buildMenuItemId,
  id,
  item,
  parents,
  sx,
  useChildren,
  buildMenuId,
  maxItems = 4,
  extraItems,
}: Readonly<NavigationProps>): JSX.Element | null {
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
          buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLinkId}
        />
      )}
      {item?.id && item && (
        <CurrentItemNavigation
          item={item}
          useChildren={useChildren}
          buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLinkId}
          buildIconId={buildIconId}
          buildMenuId={buildMenuId}
          buildMenuItemId={buildMenuItemId}
          showArrow={Boolean(extraItems?.length)}
        />
      )}
      {extraItems && <ExtraItemsNavigation extraItems={extraItems} />}
    </StyledBreadcrumbs>
  );
}
