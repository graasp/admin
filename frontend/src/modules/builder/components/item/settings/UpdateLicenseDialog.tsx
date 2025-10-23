import { type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';

import ConfirmLicenseDialogContent from '../../common/ConfirmLicenseDialogContent';
import useItemLicense from '../../hooks/useItemLicense';

type Props = {
  open: boolean;
  setOpen: (b: boolean) => void;
  item: DiscriminatedItem;
};

const commonsSx = {
  border: '1px solid #eee',
  borderRadius: 2,
  minWidth: 300,
  alignItems: 'center',
};
const UpdateLicenseDialog = ({ open, setOpen, item }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const [confirmationStep, setConfirmationStep] = useState(false);

  const {
    handleSubmit,
    licenseForm,
    creativeCommons,
    requireAttributionValue,
  } = useItemLicense({
    item,
    commonsSx,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = () => {
    handleSubmit();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setConfirmationStep(false);
    }
  }, [open]);

  return (
    <Dialog open={open} transitionDuration={0} onClose={handleClose}>
      <DialogTitle>
        {translateBuilder('ITEM_SETTINGS_LICENSE_TITLE')}
      </DialogTitle>

      {!confirmationStep ? (
        <>
          <DialogContent sx={{ paddingX: 3 }}>{licenseForm}</DialogContent>
          {requireAttributionValue && (
            <Box display="flex" justifyContent="center">
              {creativeCommons}
            </Box>
          )}
          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              {translateBuilder('CANCEL_BUTTON')}
            </Button>

            <Button
              variant="text"
              disabled={!requireAttributionValue}
              onClick={() => setConfirmationStep(true)}
            >
              {translateBuilder('SAVE_BTN')}
            </Button>
          </DialogActions>
        </>
      ) : (
        <ConfirmLicenseDialogContent
          handleSubmit={submitForm}
          handleBack={() => setConfirmationStep(false)}
        />
      )}
    </Dialog>
  );
};

export default UpdateLicenseDialog;
