import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { DiscriminatedItem, PermissionLevel } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { CONFIRM_MEMBERSHIP_DELETE_BUTTON_ID } from '@/config/selectors';
import { ItemMembership } from '@/openapi/client';
import { deleteItemMembershipMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { itemKeys } from '@/query/keys';
import Button from '@/ui/buttons/Button/Button';

import { BUILDER } from '../../../../langs';
import CancelButton from '../../../common/CancelButton';

const labelId = 'alert-dialog-title';
const descriptionId = 'alert-dialog-description';

type Props = {
  open?: boolean;
  handleClose: () => void;
  itemId: DiscriminatedItem['id'];
  membershipToDelete: Pick<ItemMembership, 'id' | 'account' | 'permission'>;
  hasOnlyOneAdmin?: boolean;
};

const DeleteItemMembershipDialog = ({
  itemId,
  open = false,
  handleClose,
  membershipToDelete,
  hasOnlyOneAdmin = false,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { data: member } = hooks.useCurrentMember();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteItemMembership } = useMutation({
    ...deleteItemMembershipMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).memberships,
      });
    },
  });

  const navigate = useNavigate();

  const onDelete = () => {
    if (membershipToDelete?.id) {
      deleteItemMembership({
        path: { itemId, id: membershipToDelete.id },
      }).then(() => {
        // if current user deleted their own membership navigate them to the home
        if (membershipToDelete.account.id === member?.id) {
          navigate({ to: '/home' });
        }
      });

      handleClose();
    }
  };

  let dialogText = '';
  const isDeletingLastAdmin =
    hasOnlyOneAdmin && membershipToDelete?.permission === PermissionLevel.Admin;
  // incase of deleting the only admin
  if (isDeletingLastAdmin) {
    dialogText = translateBuilder(BUILDER.DELETE_LAST_ADMIN_ALERT_MESSAGE);
  } else if (member?.id === membershipToDelete?.account?.id) {
    // deleting yourself
    dialogText = translateBuilder(BUILDER.DELETE_OWN_MEMBERSHIP_MESSAGE);
  } else {
    // delete other members
    dialogText = translateBuilder(BUILDER.DELETE_MEMBERSHIP_MESSAGE, {
      name: membershipToDelete?.account.name,
      permissionLevel: membershipToDelete?.permission,
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
    >
      <DialogTitle id={labelId}>
        {translateBuilder(BUILDER.DELETE_MEMBERSHIP)}
      </DialogTitle>
      <DialogContent>
        {isDeletingLastAdmin ? (
          <Alert severity="error">{dialogText}</Alert>
        ) : (
          <DialogContentText id={descriptionId}>{dialogText}</DialogContentText>
        )}
      </DialogContent>

      <DialogActions>
        {isDeletingLastAdmin ? (
          <Button
            onClick={handleClose}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            variant="text"
          >
            {translateBuilder(BUILDER.APPROVE_BUTTON_TEXT)}
          </Button>
        ) : (
          <>
            <CancelButton onClick={handleClose} />
            <Button
              id={CONFIRM_MEMBERSHIP_DELETE_BUTTON_ID}
              onClick={onDelete}
              color="error"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              variant="text"
            >
              {translateBuilder(BUILDER.DELETE_MEMBERSHIP_MODAL_CONFIRM_BUTTON)}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemMembershipDialog;
