import { forwardRef } from 'react';

import { Stack } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

const HomeHeaderLinkComponent = forwardRef<HTMLAnchorElement>((props, ref) => {
  return (
    <Stack
      component={'a'}
      ref={ref}
      alignItems="center"
      sx={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      {...props}
    />
  );
});

const CreatedLinkComponent = createLink(HomeHeaderLinkComponent);

export const HomeHeaderLink: LinkComponent<typeof HomeHeaderLinkComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
