import { type JSX, type ReactNode } from 'react';

import { Box, Stack } from '@mui/material';

import ExtraItemsMenu from './ExtraItemsMenu.js';
import { MenuItemType } from './Navigation.js';

export interface ExtraItem {
  name: string;
  path: string;
  icon?: JSX.Element;
  menuItems?: MenuItemType[];
}

export function ExtraItemsNavigation({
  extraItems,
  children,
}: {
  children: ReactNode;
  extraItems: ExtraItem[];
}): JSX.Element[] | null {
  return extraItems.map(({ icon, name, menuItems }) => (
    <Stack
      key={name}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" gap={1}>
        {icon}
        {children}
      </Box>
      {menuItems && menuItems.length > 0 && (
        <ExtraItemsMenu menuItems={menuItems} name={name} />
      )}
    </Stack>
  ));
}
