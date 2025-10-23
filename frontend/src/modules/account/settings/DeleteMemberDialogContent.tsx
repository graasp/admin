import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import {
  DELETE_MEMBER_DIALOG_CONFIRMATION_BUTTON_ID,
  DELETE_MEMBER_DIALOG_CONFIRMATION_FIELD_ID,
  DELETE_MEMBER_DIALOG_DESCRIPTION_ID,
  DELETE_MEMBER_DIALOG_TITLE_ID,
} from '@/config/selectors';
import { deleteCurrentAccountMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { memberKeys } from '@/query/keys';

type Props = {
  readonly closeModal: () => void;
};

export function DeleteMemberDialogContent({ closeModal }: Props): JSX.Element {
  const { t: translateAccount } = useTranslation(NS.Account);
  const { t: translateMessage } = useTranslation(NS.Messages);
  const [confirmationDeleteValue, setConfirmationDeleteValue] = useState('');
  const queryClient = useQueryClient();
  const { mutate: deleteMember, error } = useMutation({
    ...deleteCurrentAccountMutation(),
    onSuccess: () => {
      queryClient.resetQueries();

      // Update when the server confirmed the logout, instead optimistically updating the member
      // This prevents logout loop (redirect to logout -> still cookie -> logs back in)
      queryClient.setQueryData(memberKeys.current().content, undefined);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const confirmationDeleteTextToCompare = translateAccount(
    'PROFILE_DELETE_CONFIRMATION_VALUE',
  );

  // confirmation is disabled when the two texts do not match
  const isConfirmationDisabled =
    confirmationDeleteValue !== confirmationDeleteTextToCompare;

  return (
    <>
      <DialogTitle id={DELETE_MEMBER_DIALOG_TITLE_ID}>
        {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_TITLE')}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id={DELETE_MEMBER_DIALOG_DESCRIPTION_ID}>
            {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_INFORMATION')}
          </DialogContentText>
          <DialogContentText>
            {translateAccount('PROFILE_DELETE_TYPE_CONFIRMATION_TEXT', {
              text: confirmationDeleteTextToCompare,
            })}
          </DialogContentText>
        </Stack>
        <TextField
          id={DELETE_MEMBER_DIALOG_CONFIRMATION_FIELD_ID}
          value={confirmationDeleteValue}
          fullWidth
          required
          variant="outlined"
          // placeholder={confirmationDeleteTextToCompare}
          onChange={(event) => {
            setConfirmationDeleteValue(event.target.value);
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {translateMessage('DELETE_MEMBER_ERROR')}
          </Alert>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={closeModal}
          variant={isConfirmationDisabled ? 'contained' : 'text'}
        >
          {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_CANCEL_BUTTON')}
        </Button>
        <Button
          id={DELETE_MEMBER_DIALOG_CONFIRMATION_BUTTON_ID}
          onClick={() => {
            deleteMember({});
          }}
          color="error"
          disabled={isConfirmationDisabled}
        >
          {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_CONFIRM_BUTTON')}
        </Button>
      </DialogActions>
    </>
  );
}
