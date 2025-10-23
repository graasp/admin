import type { JSX } from 'react';

import { Stack, Typography } from '@mui/material';

import { Link } from '@tanstack/react-router';

type Props = {
  readonly icon?: JSX.Element;
  readonly contentId: string;
  readonly content?: string;
  readonly href?: string;
};
export function DisplayLink({
  icon,
  contentId,
  content,
  href,
}: Props): JSX.Element {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1" color="textSecondary">
        {icon}
      </Typography>

      <Typography variant="body1" id={contentId}>
        {href ? <Link to={href}>{content}</Link> : content}
      </Typography>
    </Stack>
  );
}
