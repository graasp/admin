import { type JSX, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { PermissionLevel, PermissionLevelOptions } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { getErrorMessage } from '@/config/notifier';
import EditButton from '@/ui/buttons/EditButton/EditButton';

import useModalStatus from '~builder/components/hooks/useModalStatus';
import { BUILDER } from '~builder/langs';

import ItemMembershipSelect from '../ItemMembershipSelect';

type Props = {
  email?: string;
  name?: string;
  allowDowngrade?: boolean;
  permission: PermissionLevelOptions;
  handleUpdate: (p: PermissionLevelOptions) => Promise<void>;
  id?: string;
  loading: boolean;
};

const EditPermissionButton = ({
  email,
  name,
  permission,
  allowDowngrade = true,
  handleUpdate,
  id,
  loading,
}: Props): JSX.Element | null => {
  const { isOpen, openModal, closeModal } = useModalStatus();

  const [currentPermission, setCurrentPermission] = useState(permission);
  const [error, setError] = useState<string>();
  const { t: translateCommon } = useTranslation(NS.Common);
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);

  if (!allowDowngrade && permission === PermissionLevel.Admin) {
    return null;
  }

  const onSubmit = async () => {
    try {
      await handleUpdate(currentPermission);
      closeModal();
    } catch (e) {
      console.error(e);
      setError(translateMessage(getErrorMessage(e)));
    }
  };

  return (
    <>
      <EditButton id={id} onClick={() => openModal()} />
      <Dialog onClose={closeModal} open={isOpen}>
        <DialogTitle>
          <Trans
            t={translateBuilder}
            i18nKey={BUILDER.EDIT_PERMISSION_DIALOG_TITLE}
            values={{
              name: name || email,
            }}
            components={{ 1: <strong /> }}
          />
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Typography variant="body1">
              {translateBuilder(
                BUILDER.EDIT_PERMISSION_CANNOT_DOWNGRADE_FROM_PARENT,
              )}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <div>
                <Typography noWrap fontWeight="bold">
                  {name}
                </Typography>
                <Typography noWrap variant="subtitle2">
                  {email}
                </Typography>
              </div>
              <ItemMembershipSelect
                value={currentPermission}
                onChange={(e) =>
                  setCurrentPermission(e.target.value as PermissionLevelOptions)
                }
                size="medium"
                allowDowngrade={allowDowngrade}
              />
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={closeModal}>
            {translateCommon('CANCEL.BUTTON_TEXT')}
          </Button>
          <Button loading={loading} type="submit" onClick={onSubmit}>
            {translateBuilder(BUILDER.EDIT_PERMISSION_DIALOG_SUBMIT_BUTTON)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPermissionButton;
