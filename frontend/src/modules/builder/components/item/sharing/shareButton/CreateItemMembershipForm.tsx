import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  AccountType,
  DiscriminatedItem,
  PermissionLevel,
  PermissionLevelOptions,
  isEmail,
} from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import truncate from 'lodash.truncate';

import { ITEM_NAME_MAX_LENGTH, NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  CREATE_MEMBERSHIP_FORM_ID,
  SHARE_ITEM_CANCEL_BUTTON_CY,
  SHARE_ITEM_EMAIL_INPUT_ID,
  SHARE_ITEM_SHARE_BUTTON_ID,
} from '@/config/selectors';
import { createInvitationMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { useItemInvitations } from '@/query/hooks/invitation';
import { itemKeys } from '@/query/keys';
import Button from '@/ui/buttons/Button/Button';

import { BUILDER } from '../../../../langs';
import ItemMembershipSelect from '../ItemMembershipSelect';

type ContentProps = {
  item: DiscriminatedItem;
  handleClose: () => void;
};

type Inputs = {
  email: string;
  permission: PermissionLevelOptions;
};

const Content = ({ handleClose, item }: ContentProps) => {
  const itemId = item.id;
  const queryClient = useQueryClient();
  const { mutateAsync: shareItem } = useMutation({
    ...createInvitationMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).memberships,
      });
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).invitation,
      });
    },
  });
  const { data: memberships } = hooks.useItemMemberships(itemId);
  const { data: invitations } = useItemInvitations(item.id);

  const { t: translateCommon } = useTranslation(NS.Common);
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { permission: PermissionLevel.Read } });
  const permission = watch('permission');

  const handleShare = async (data: Inputs) => {
    let returnedValue;
    try {
      await shareItem({
        path: { id: itemId },
        body: {
          invitations: [
            {
              email: data.email,
              permission: data.permission,
            },
          ],
        },
      });

      handleClose();
    } catch (e) {
      console.error(e);
    }
    return returnedValue;
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleShare)}>
      <DialogContent>
        <Stack gap={3}>
          <Typography variant="body1">
            {translateBuilder(BUILDER.SHARE_ITEM_FORM_INVITATION_TOOLTIP)}
          </Typography>
          <Stack
            id={CREATE_MEMBERSHIP_FORM_ID}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <TextField
              id={SHARE_ITEM_EMAIL_INPUT_ID}
              variant="outlined"
              label={translateBuilder(BUILDER.SHARE_ITEM_FORM_EMAIL_LABEL)}
              helperText={errors.email?.message}
              {...register('email', {
                required: true,
                validate: {
                  isEmail: (email) =>
                    isEmail(email, {}) ||
                    translateBuilder(
                      BUILDER.SHARE_ITEM_FORM_INVITATION_INVALID_EMAIL_MESSAGE,
                    ),
                  noMembership: (email) =>
                    !memberships?.some(
                      ({ account }) =>
                        account.type === AccountType.Individual &&
                        account.email === email,
                    ) ||
                    translateBuilder(
                      BUILDER.SHARE_ITEM_FORM_ALREADY_HAVE_MEMBERSHIP_MESSAGE,
                    ),
                  noInvitation: (email) =>
                    !invitations?.some((inv) => inv.email === email) ||
                    translateBuilder(
                      BUILDER.SHARE_ITEM_FORM_INVITATION_EMAIL_EXISTS_MESSAGE,
                    ),
                },
              })}
              error={Boolean(errors.email)}
              sx={{ flexGrow: 1 }}
            />
            <ItemMembershipSelect
              value={permission}
              onChange={(event) => {
                if (event.target.value) {
                  setValue(
                    'permission',
                    event.target.value as PermissionLevelOptions,
                  );
                }
              }}
              size="medium"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={handleClose}
          dataCy={SHARE_ITEM_CANCEL_BUTTON_CY}
        >
          {translateCommon('CANCEL.BUTTON_TEXT')}
        </Button>
        <Button
          disabled={Boolean(errors.email)}
          id={SHARE_ITEM_SHARE_BUTTON_ID}
          type="submit"
        >
          {translateBuilder(BUILDER.SHARE_ITEM_FORM_CONFIRM_BUTTON)}
        </Button>
      </DialogActions>
    </Box>
  );
};

type CreateItemMembershipFormProps = {
  item: ContentProps['item'];
  open: boolean;
  handleClose: ContentProps['handleClose'];
};

const CreateItemMembershipForm = ({
  item,
  open,
  handleClose,
}: CreateItemMembershipFormProps): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {translateBuilder(BUILDER.SHARE_ITEM_FORM_TITLE, {
          name: truncate(item.name, { length: ITEM_NAME_MAX_LENGTH }),
        })}
      </DialogTitle>
      <Content item={item} handleClose={handleClose} />
    </Dialog>
  );
};

export default CreateItemMembershipForm;
