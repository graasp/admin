import type { JSX } from 'react';

import { Box, Stack } from '@mui/material';

import { TypographyLink } from '../TypographyLink';
import { ExtraItemsMenu } from './ExtraItemsMenu';
import { MenuItemType } from './Navigator';

export interface ExtraItem {
  name: string;
  path: string;
  icon?: JSX.Element;
  menuItems?: MenuItemType[];
}

export function ExtraItemsNavigation({
  extraItems,
}: Readonly<{
  extraItems: ExtraItem[];
}>): JSX.Element[] {
  return extraItems.map(({ icon, name, path, menuItems }) => (
    <Stack key={name} direction="row" alignItems="center">
      <Box display="flex" gap={1}>
        {icon}
        <TypographyLink to={path}>{name}</TypographyLink>
      </Box>
      {menuItems && menuItems.length > 0 && (
        <ExtraItemsMenu menuItems={menuItems} />
      )}
    </Stack>
  ));
}
