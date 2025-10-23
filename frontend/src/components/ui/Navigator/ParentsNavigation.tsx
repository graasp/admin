import type { JSX } from 'react';

import { Stack } from '@mui/material';

import { TypographyLink } from '../TypographyLink.js';
import ItemMenu, { ItemMenuProps } from './ItemMenu.js';

export type ParentsProps = {
  parents: { name: string; id: string }[];
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  useChildren: ItemMenuProps['useChildren'];
};

export function ParentsNavigation({
  parents,
  useChildren,
  buildBreadcrumbsItemLinkId,
}: Readonly<ParentsProps>): JSX.Element {
  return (
    <Stack direction="row" alignItems="center">
      {parents.map(({ name, id }) => (
        <Stack
          key={id}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <TypographyLink
            id={buildBreadcrumbsItemLinkId?.(id)}
            to="/analytics/items/$itemId"
            params={{ itemId: id }}
          >
            {name}
          </TypographyLink>
          <ItemMenu useChildren={useChildren} itemId={id} />
        </Stack>
      ))}
    </Stack>
  );
}
