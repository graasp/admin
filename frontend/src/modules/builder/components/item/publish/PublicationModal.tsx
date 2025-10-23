import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { NS } from '@/config/constants';

import { DIALOG_CONTENT_WIDTH } from '~builder/constants';
import { BUILDER } from '~builder/langs';

type Props = {
  title?: string;
  isOpen: boolean;
  modalContent: JSX.Element;
  dialogActions?: JSX.Element[] | JSX.Element;
  handleOnClose: () => void;
};

export const PublicationModal = ({
  title,
  isOpen,
  modalContent,
  dialogActions,
  handleOnClose,
}: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);

  return (
    <Dialog open={isOpen} onClose={handleOnClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent sx={{ width: DIALOG_CONTENT_WIDTH }}>
        {modalContent}
      </DialogContent>
      <DialogActions>
        {dialogActions ?? (
          <Button onClick={handleOnClose}>{t(BUILDER.CLOSE_BUTTON)}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PublicationModal;
