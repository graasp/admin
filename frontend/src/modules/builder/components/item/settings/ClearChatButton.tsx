import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { DeleteForever } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { useMutation } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import {
  CLEAR_CHAT_CANCEL_BUTTON_ID,
  CLEAR_CHAT_CONFIRM_BUTTON_ID,
  CLEAR_CHAT_DIALOG_ID,
  CLEAR_CHAT_SETTING_ID,
} from '@/config/selectors';
import { clearChatMessageMutation } from '@/openapi/client/@tanstack/react-query.gen';
import Button from '@/ui/buttons/Button/Button';

type Props = {
  chatId: string;
};

const ClearChatButton = ({ chatId }: Props): JSX.Element | null => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useTranslation(NS.Builder);
  const { t: tCommon } = useTranslation(NS.Common);
  const { mutate: clearChat } = useMutation({
    ...clearChatMessageMutation(),
    onError: () => {
      toast.error(t('CHATBOX.CLEAR_ERROR'));
    },
  });

  const handleClearChat = () => {
    clearChat({ path: { itemId: chatId } });
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Box width="max-content">
          <Button
            id={CLEAR_CHAT_SETTING_ID}
            startIcon={<DeleteForever />}
            variant="outlined"
            color="error"
            onClick={() => setOpenConfirmation(true)}
          >
            <Typography noWrap>{t('CHAT.CLEAR_ALL')}</Typography>
          </Button>
        </Box>
      </Stack>
      <Dialog open={openConfirmation} id={CLEAR_CHAT_DIALOG_ID}>
        <DialogTitle>{t('CHAT.CLEAR_ALL_TITLE')}</DialogTitle>
        <DialogContent>
          <Stack flexDirection="column" alignItems="center" spacing={1}>
            <Typography textAlign="justify">
              {t('CHAT.CLEAR_ALL_CONTENT')}
            </Typography>
            <Typography>{t('ITEM_SETTINGS_CLEAR_CHAT_BACKUP_TEXT')}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            id={CLEAR_CHAT_CANCEL_BUTTON_ID}
            variant="contained"
            onClick={() => {
              setOpenConfirmation(false);
            }}
          >
            {tCommon('CANCEL.BUTTON_TEXT')}
          </Button>
          <Button
            id={CLEAR_CHAT_CONFIRM_BUTTON_ID}
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenConfirmation(false);
              handleClearChat();
            }}
          >
            {t('CHAT.CLEAR_BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClearChatButton;
