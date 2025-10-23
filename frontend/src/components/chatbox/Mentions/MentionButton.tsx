import { type JSX, useState } from 'react';

import { Badge, BadgeProps, IconButton } from '@mui/material';

import { MentionStatus } from '@graasp/sdk';

import { BellIcon } from 'lucide-react';

import { hooks } from '@/config/queryClient.js';

import { mentionButtonCypress } from '../selectors.js';
import { MentionsDialog } from './MentionsDialog.js';
import { MentionsTable } from './MentionsTable.js';

type Props = {
  color?: string;
  badgeColor?: BadgeProps['color'];
};

export function MentionButton({
  color = 'white',
  badgeColor = 'primary',
}: Readonly<Props>): JSX.Element {
  const { data: mentions } = hooks.useMentions();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        data-cy={mentionButtonCypress}
        onClick={(): void => setOpen(true)}
      >
        <Badge
          component="div"
          overlap="circular"
          color={badgeColor}
          badgeContent={
            mentions?.filter((m) => m.status === MentionStatus.Unread)
              ?.length ?? 0
          }
        >
          <BellIcon color={color} />
        </Badge>
      </IconButton>
      <MentionsDialog open={open} setOpen={setOpen}>
        <MentionsTable mentions={mentions} />
      </MentionsDialog>
    </div>
  );
}
