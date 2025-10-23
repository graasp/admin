import { forwardRef } from 'react';

import { Button, ButtonProps } from '@mui/material';

import {
  LinkComponent,
  UseLinkPropsOptions,
  createLink,
  useLinkProps,
} from '@tanstack/react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MUIButtonProps extends Omit<ButtonProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUIButtonProps>(
  (props, ref) => {
    const linkProps = useLinkProps(props as UseLinkPropsOptions);

    // obtain fontweight, usually from activeProps
    const fw =
      'fontWeight' in linkProps ? (linkProps.fontWeight as string) : 'inherit';

    return (
      <Button
        component={'a'}
        ref={ref}
        {...props}
        sx={{
          textTransform: 'none',
          minWidth: 'unset',
          fontWeight: fw,
          ...props.sx,
        }}
      />
    );
  },
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const ButtonLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
