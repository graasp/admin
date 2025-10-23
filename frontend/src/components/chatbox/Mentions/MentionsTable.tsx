import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Check, Close, FiberManualRecord } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import { ChatMention, MentionStatus } from '@graasp/sdk';

import { useNavigate } from '@tanstack/react-router';

import { NS } from '@/config/constants.js';
import { mutations } from '@/config/queryClient.js';

import { ConfirmationDialog } from './ConfirmationDialog.js';

type Props = {
  mentions?: ChatMention[];
};

export function MentionsTable({ mentions }: Readonly<Props>) {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { t } = useTranslation(NS.Chatbox);
  const patchMention = mutations.usePatchMention();
  const deleteMention = mutations.useDeleteMention();
  const clearAllMentions = mutations.useClearMentions();
  const navigate = useNavigate();

  const markAsRead = (id: string) => {
    patchMention.mutate({
      id: id,
      status: MentionStatus.Read,
    });
  };

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Button
          variant="outlined"
          onClick={(): void => {
            mentions
              ?.filter((m) => m.status === MentionStatus.Unread)
              .map((m) =>
                patchMention.mutate({
                  id: m.id,
                  status: MentionStatus.Read,
                }),
              );
          }}
        >
          {t('MARK_ALL_AS_READ')}
        </Button>
        <Button
          variant="outlined"
          onClick={(): void => setOpenConfirmation(true)}
        >
          {t('CLEAR_ALL')}
        </Button>
        <ConfirmationDialog
          open={openConfirmation}
          title={t('CLEAR_ALL_NOTIFICATIONS_TITLE')}
          content={t('CLEAR_ALL_NOTIFICATIONS_CONTENT')}
          onConfirm={(): void => {
            clearAllMentions.mutate();
            setOpenConfirmation(false);
          }}
          onCancel={(): void => setOpenConfirmation(false)}
        />
      </Stack>
      {mentions?.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('COL_STATUS')}</TableCell>
              <TableCell>{t('COL_MESSAGE')}</TableCell>
              <TableCell>{t('COL_ACTIONS')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentions.map((m) => (
              <TableRow
                key={m.id}
                hover
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => {
                  markAsRead(m.id);
                  navigate({
                    to: '/builder/items/$itemId',
                    params: {
                      itemId: m.message.itemId,
                    },
                    search: { chatOpen: true },
                  });
                }}
              >
                <TableCell>
                  {m.status === MentionStatus.Unread && (
                    <FiberManualRecord fontSize="small" color="primary" />
                  )}
                </TableCell>
                <TableCell>
                  {t('NOTIFICATION_ITEM_CHAT_MENTION_MESSAGE')}
                </TableCell>
                <TableCell>
                  <Grid container direction="row">
                    <Grid>
                      <Tooltip title={t('MARK_AS_READ')}>
                        <IconButton
                          onClick={(e): void => {
                            e.stopPropagation();
                            markAsRead(m.id);
                          }}
                        >
                          <Check color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid>
                      <Tooltip title={t('DELETE_TOOLTIP')}>
                        <IconButton
                          onClick={(e): void => {
                            e.stopPropagation();
                            deleteMention.mutate(m.id);
                          }}
                        >
                          <Close color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <TableRow>
          <TableCell colSpan={4}>{t('EMPTY_NOTIFICATIONS')}</TableCell>
        </TableRow>
      )}
    </Stack>
  );
}
