import { forwardRef } from 'react';

import { TableRow, TableRowProps } from '@mui/material';

import { LinkComponent, createLink } from '@tanstack/react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MUITableRowProps extends Omit<TableRowProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUITableRowProps>(
  (props, ref) => {
    return (
      <TableRow
        component={'a'}
        ref={ref}
        {...props}
        sx={{ textTransform: 'none', textDecoration: 'none', ...props.sx }}
      />
    );
  },
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const TableRowLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
