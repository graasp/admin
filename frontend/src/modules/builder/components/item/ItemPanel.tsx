import { type JSX, type ReactNode } from 'react';

import { Drawer, Toolbar, styled } from '@mui/material';

import { ITEM_PANEL_ID } from '@/config/selectors';

export const RIGHT_MENU_WIDTH = 300;

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? RIGHT_MENU_WIDTH : 0,
  flexShrink: 0,
  // todo: move this to the UI theme.
  '.MuiDrawer-paper': {
    padding: theme.spacing(0, 1),
    boxSizing: 'border-box',
    width: RIGHT_MENU_WIDTH,
  },
}));

type Props = { open: boolean; children: ReactNode };

const ItemPanel = ({ open, children }: Props): JSX.Element => (
  <StyledDrawer
    id={ITEM_PANEL_ID}
    anchor="right"
    variant="persistent"
    open={open}
  >
    <Toolbar />
    {children}
  </StyledDrawer>
);

export default ItemPanel;
