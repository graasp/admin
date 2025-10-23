import type { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { DiscriminatedItem, ItemLoginSchemaStatus } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { hooks, mutations } from '@/config/queryClient';
import { DELETE_GUEST_CONFIRM_BUTTON_ID } from '@/config/selectors';

import { useGuestMemberships } from '~builder/components/hooks/useGuestMemberships';
import useModalStatus from '~builder/components/hooks/useModalStatus';
import { BUILDER } from '~builder/langs';

function DeleteItemLoginSchemaButton({
  itemId,
}: Readonly<{
  itemId: DiscriminatedItem['id'];
}>): JSX.Element | null {
  const { data: itemLoginSchema } = hooks.useItemLoginSchema({ itemId });
  const { mutate: deleteItemLoginSchema, isPending } =
    mutations.useDeleteItemLoginSchema();
  const { data: guestMemberships } = useGuestMemberships(itemId);

  const { isOpen, closeModal, openModal } = useModalStatus();
  const { t: translateCommon } = useTranslation(NS.Common);
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const onSubmit = () => {
    deleteItemLoginSchema({ itemId });
  };

  // immediately delete item login schema if does not contain any guests
  // this case can happen if all guests has been manually deleted
  const onClick = () => {
    if (guestMemberships?.length) {
      openModal();
    } else {
      onSubmit();
    }
  };

  if (
    itemLoginSchema &&
    itemLoginSchema.status !== ItemLoginSchemaStatus.Active &&
    guestMemberships // memberships are fetched
  ) {
    return (
      <>
        <Alert
          severity="info"
          action={
            <Button
              color="error"
              size="small"
              variant="outlined"
              onClick={onClick}
            >
              {translateBuilder(BUILDER.DELETE_BTN)}
            </Button>
          }
        >
          {guestMemberships.length
            ? translateBuilder(BUILDER.DELETE_GUESTS_ALERT_TEXT)
            : translateBuilder(BUILDER.DELETE_ITEM_LOGIN_SCHEMA_ALERT_TEXT)}
        </Alert>

        <Dialog onClose={closeModal} open={isOpen}>
          <DialogTitle>
            {translateBuilder(BUILDER.DELETE_GUESTS_MODAL_TITLE, {
              count: guestMemberships.length,
            })}
          </DialogTitle>
          <DialogContent>
            <Typography>
              <Trans
                t={translateBuilder}
                i18nKey={BUILDER.DELETE_GUESTS_MODAL_CONTENT}
                components={{ 1: <strong /> }}
              />
            </Typography>
            <ul>
              {guestMemberships.map(({ account }) => (
                <li key={account.id}>{account.name}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="text"
              color="primary"
              onClick={closeModal}
            >
              {translateCommon('CANCEL.BUTTON_TEXT')}
            </Button>
            <Button
              id={DELETE_GUEST_CONFIRM_BUTTON_ID}
              color="error"
              size="small"
              onClick={onSubmit}
              loading={isPending}
            >
              {translateBuilder(BUILDER.DELETE_GUESTS_MODAL_DELETE_BUTTON)}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return null;
}

export default DeleteItemLoginSchemaButton;
