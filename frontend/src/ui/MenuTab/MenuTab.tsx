import { ReactNode, forwardRef } from 'react';

import { Stack, styled } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

import { DEFAULT_LIGHT_PRIMARY_COLOR } from '../theme';

type Props = {
  title: string;
  icon: ReactNode;
};

const StyledStack = styled(Stack)({
  textDecoration: 'none',
  color: 'inherit',
}) as typeof Stack;

const MUILinkComponent = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { icon, title, ...restProps } = props;

  return (
    <StyledStack
      component="a"
      ref={ref}
      direction="row"
      gap={1}
      width="auto"
      px={2}
      py={1}
      borderRadius={5}
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
      }}
      {...restProps}
    >
      {icon}
      {title}
    </StyledStack>
  );
});

const CreatedLinkComponent = createLink(MUILinkComponent);

export const MenuTab: LinkComponent<typeof MUILinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      preload="intent"
      activeProps={() => ({
        sx: { background: DEFAULT_LIGHT_PRIMARY_COLOR.main },
      })}
      {...props}
    />
  );
};
