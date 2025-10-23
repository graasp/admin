import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { NS } from '@/config/constants';
import {
  UPDATE_VISIBILITY_MODAL_CANCEL_BUTTON,
  UPDATE_VISIBILITY_MODAL_VALIDATE_BUTTON,
} from '@/config/selectors';

import { BUILDER } from '~builder/langs';

export type Visibility = {
  name: string;
  value: string;
};

type Props = {
  isOpen: boolean;
  newVisibility?: Visibility;
  onClose: () => void;
  onValidate: (visibility: string) => void;
};

export const UpdateVisibilityModal = ({
  isOpen,
  newVisibility,
  onClose,
  onValidate,
}: Props): JSX.Element | null => {
  const { t } = useTranslation(NS.Builder);

  if (!newVisibility) {
    return null;
  }

  const handleValidate = async () => {
    onValidate(newVisibility.value);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        <Typography variant="h3">
          {t(BUILDER.UPDATE_VISIBILITY_MODAL_TITLE)}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {t(BUILDER.UPDATE_VISIBILITY_MODAL_DESCRIPTION)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          data-cy={UPDATE_VISIBILITY_MODAL_CANCEL_BUTTON}
          onClick={onClose}
          variant="outlined"
        >
          {t(BUILDER.CANCEL_BUTTON)}
        </Button>
        <Button
          data-cy={UPDATE_VISIBILITY_MODAL_VALIDATE_BUTTON}
          onClick={handleValidate}
          variant="contained"
        >
          {t(BUILDER.UPDATE_VISIBILITY_MODAL_VALIDATE_BUTTON, {
            visibility: newVisibility.name,
          })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateVisibilityModal;
