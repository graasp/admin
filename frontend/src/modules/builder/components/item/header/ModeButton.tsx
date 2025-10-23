import { type JSX, MouseEvent, useState } from 'react';

import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';

import { useMatch } from '@tanstack/react-router';
import { LayoutGridIcon, ListIcon, MapIcon } from 'lucide-react';

import { MenuItemLink } from '@/components/ui/MenuItemLink';
import { LAYOUT_MODE_BUTTON_ID } from '@/config/selectors';
import { useButtonColor } from '@/ui/buttons/hooks';

import { useLayoutContext } from '~builder/components/context/LayoutContext';
import { ItemLayoutMode, ItemLayoutModeType } from '~builder/enums';

const ModeIcon = ({ mode }: { mode: ItemLayoutModeType }) => {
  const { color } = useButtonColor('primary');
  switch (mode) {
    case ItemLayoutMode.Map:
      return <MapIcon color={color} />;
    case ItemLayoutMode.Grid:
      return <LayoutGridIcon color={color} />;
    case ItemLayoutMode.List:
    default:
      return <ListIcon color={color} />;
  }
};

const ModeButton = (): JSX.Element | null => {
  const { mode } = useLayoutContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isHomePath = useMatch({
    from: '/_memberOnly/_homeLayout',
    shouldThrow: false,
  });
  const isItemPath = useMatch({
    from: '/builder/items/$itemId',
    shouldThrow: false,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  // show map only for home and path
  let options = Object.values(ItemLayoutMode);
  if (!isHomePath && !isItemPath) {
    options = options.filter((o) => o !== ItemLayoutMode.Map);
  }

  return (
    <>
      <IconButton id={LAYOUT_MODE_BUTTON_ID} onClick={handleClick}>
        <ModeIcon mode={mode} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((value) => (
          <MenuItemLink
            key={value}
            to="."
            search={(prev: object) => ({ ...prev, mode: value })}
            onClick={() => {
              handleClose();
              window.umami.track('toggle-layout-mode', { mode: value });
            }}
            value={value}
          >
            <ModeIcon mode={value} />
          </MenuItemLink>
        ))}
      </Menu>
    </>
  );
};

export default ModeButton;
