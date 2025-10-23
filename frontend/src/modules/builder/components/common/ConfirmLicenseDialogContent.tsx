import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { DialogActions, DialogContent, DialogContentText } from '@mui/material';

import { NS } from '@/config/constants';
import Button from '@/ui/buttons/Button/Button';

type Props = {
  handleSubmit: () => void;
  disableSubmission?: boolean;
  handleBack: () => void;
};

const ConfirmLicenseDialogContent = ({
  handleSubmit,
  disableSubmission,
  handleBack,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <>
      <DialogContent sx={{ paddingX: 3 }}>
        <DialogContentText>
          {translateBuilder('ITEM_SETTINGS_CC_LICENSE_MODAL_CONTENT')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleBack}>
          {translateBuilder('BACK')}
        </Button>
        <Button onClick={handleSubmit} disabled={disableSubmission}>
          {translateBuilder('CONFIRM_BUTTON')}
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmLicenseDialogContent;
