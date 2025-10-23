import { type JSX, type ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  content?: ReactNode;
  contentId: string;
};
export function SettingItem({
  title,
  content,
  contentId,
}: Readonly<Props>): JSX.Element {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Typography variant="body1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="body1" id={contentId}>
        {content}
      </Typography>
    </Stack>
  );
}
