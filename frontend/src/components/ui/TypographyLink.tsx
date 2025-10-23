import { forwardRef } from 'react';

import { Typography, TypographyProps } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MUITypographyProps extends Omit<TypographyProps, 'href'> {
  // Add any additional props you want to pass to the typography
}

const MUITypographyComponent = forwardRef<
  HTMLAnchorElement,
  MUITypographyProps
>((props, ref) => {
  return <Typography component={'a'} ref={ref} {...props} />;
});

const CreatedLinkComponent = createLink(MUITypographyComponent);

export const TypographyLink: LinkComponent<typeof MUITypographyComponent> = (
  props,
) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
