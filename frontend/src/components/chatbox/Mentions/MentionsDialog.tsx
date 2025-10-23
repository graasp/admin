import { type JSX, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';

import { BellIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { useButtonColor } from '@/ui/buttons/hooks';

type Props = {
  children: ReactNode;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export function MentionsDialog({
  children,
  open,
  setOpen,
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Chatbox);
  const { color } = useButtonColor('primary');
  return (
    <Dialog open={open} onClose={(): void => setOpen(false)} maxWidth="lg">
      <DialogTitle>
        <Stack direction="row" gap={2} alignItems="center">
          <BellIcon color={color} />
          {t('NOTIFICATIONS_DIALOG_TITLE')}
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
