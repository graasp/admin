import { type JSX, type ReactNode } from 'react';

import { IconButton, Stack, useTheme } from '@mui/material';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { DEFAULT_DIRECTION } from '../constants.js';

export interface DrawerHeaderProps {
  children?: ReactNode;
  handleDrawerClose?: () => void;
}

export const DrawerHeader = ({
  handleDrawerClose,
  children,
}: DrawerHeaderProps): JSX.Element => {
  const theme = useTheme();
  const dir = theme.direction ?? DEFAULT_DIRECTION;
  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      justifyContent="space-between"
      py={1}
    >
      {children}
      <IconButton onClick={handleDrawerClose}>
        {dir === 'ltr' ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
    </Stack>
  );
};

export default DrawerHeader;
