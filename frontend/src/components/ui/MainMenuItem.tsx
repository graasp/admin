import { type JSX, MouseEvent, forwardRef } from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

import { useMainMenuOpenContext } from '@/ui/MainMenu/hooks';
import { useMobileView } from '@/ui/hooks/useMobileView';

/**
 * MUI integration with `@tanstack/router`
 * https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#mui-example
 */
interface MUIListItemButtonProps extends Omit<ListItemButtonProps, 'href'> {
  id?: string;
  text: string;
  icon: JSX.Element;
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUIListItemButtonProps>(
  (props, ref) => {
    const { id, icon, text, onClick, ...rest } = props;
    const { isMobile } = useMobileView();
    const { setOpen } = useMainMenuOpenContext();

    const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
      if (isMobile) {
        setOpen(false);
      }
      // call original onclick
      onClick?.(e);
    };

    return (
      <ListItem disablePadding id={id}>
        <ListItemButton
          component={'a'}
          ref={ref}
          onClick={onClickHandler}
          {...rest}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    );
  },
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const MainMenuItem: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
