import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog, Stack, Typography } from '@mui/material';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import {
  DELETE_MEMBER_BUTTON_ID,
  DELETE_MEMBER_DIALOG_DESCRIPTION_ID,
  DELETE_MEMBER_DIALOG_TITLE_ID,
  DELETE_MEMBER_SECTION_ID,
} from '@/config/selectors';

import { DeleteMemberDialogContent } from './DeleteMemberDialogContent';

export function DeleteMemberSection(): JSX.Element {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(NS.Account);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <BorderedSection
      title={t('PROFILE_DESTRUCTIVE_SETTINGS_TITLE')}
      id={DELETE_MEMBER_SECTION_ID}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="body2">
          {t('PROFILE_DELETE_ACCOUNT_INFORMATION')}
        </Typography>

        <Button
          id={DELETE_MEMBER_BUTTON_ID}
          variant="outlined"
          color="error"
          onClick={() => setOpen(true)}
        >
          {t('PROFILE_DELETE_ACCOUNT_BUTTON')}
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby={DELETE_MEMBER_DIALOG_TITLE_ID}
        aria-describedby={DELETE_MEMBER_DIALOG_DESCRIPTION_ID}
        maxWidth="sm"
        fullWidth
        disableRestoreFocus
      >
        <DeleteMemberDialogContent closeModal={closeModal} />
      </Dialog>
    </BorderedSection>
  );
}
