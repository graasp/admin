import type { JSX } from 'react';

import { Stack } from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { TypographyLink } from '../TypographyLink.js';
import ItemMenu, { ItemMenuProps } from './ItemMenu.js';

export type CurrentItemProps = {
  item: DiscriminatedItem;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildIconId?: (id: string) => string;
  buildMenuId?: (id: string) => string;
  buildMenuItemId?: (id: string) => string;
  useChildren: ItemMenuProps['useChildren'];
  showArrow: boolean;
};

export function CurrentItemNavigation({
  item,
  buildBreadcrumbsItemLinkId,
  useChildren,
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  showArrow,
}: Readonly<CurrentItemProps>): JSX.Element | null {
  return (
    <Stack direction="row" alignItems="center">
      <TypographyLink
        id={buildBreadcrumbsItemLinkId?.(item.id)}
        key={item.id}
        to="."
        params={{ itemId: item.id }}
      >
        {item.name}
      </TypographyLink>
      {(item.type === ItemType.FOLDER || showArrow) && (
        <ItemMenu
          useChildren={useChildren}
          itemId={item.id}
          buildIconId={buildIconId}
          buildMenuItemId={buildMenuItemId}
          buildMenuId={buildMenuId}
          renderArrow={showArrow}
        />
      )}
    </Stack>
  );
}
