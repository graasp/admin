import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { useNavigate } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { LOG_IN_PAGE_PATH } from '@/config/paths';

import useModalStatus from '~builder/components/hooks/useModalStatus';

function CopyWarningModal({
  itemName,
}: Readonly<{
  itemName: string;
}>): JSX.Element {
  const navigate = useNavigate();
  const { t: translateCommon } = useTranslation(NS.Common);
  const { t: translateBuilder } = useTranslation(NS.Builder, {
    keyPrefix: 'COPY_WARNING_MODAL',
  });
  const { closeModal, isOpen } = useModalStatus({
    isInitiallyOpen: true,
  });

  const redirectToLoginPage = () => {
    navigate({
      to: LOG_IN_PAGE_PATH,
      search: {
        url: window.location.href,
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>
        {translateBuilder('TITLE', {
          name: itemName,
        })}
      </DialogTitle>
      <DialogContent>{translateBuilder('DESCRIPTION')}</DialogContent>

      <DialogActions>
        <Button onClick={closeModal}>
          {translateCommon('CANCEL.BUTTON_TEXT')}
        </Button>
        <Button
          aria-label={translateBuilder('LOGIN')}
          variant="contained"
          onClick={redirectToLoginPage}
        >
          {translateBuilder('LOGIN')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CopyWarningModal;
