import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { NS } from '@/config/constants.js';

import {
  cancelDialogButtonCypress,
  confirmDialogButtonCypress,
} from '../selectors.js';

type Props = {
  open: boolean;
  title: string;
  content: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  open,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Readonly<Props>) {
  const { t } = useTranslation(NS.Chatbox);

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onCancel}
          data-cy={cancelDialogButtonCypress}
        >
          {cancelText ?? t('CANCEL_BUTTON')}
        </Button>
        <Button
          variant="outlined"
          onClick={onConfirm}
          data-cy={confirmDialogButtonCypress}
        >
          {confirmText ?? t('CONFIRM_BUTTON')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
