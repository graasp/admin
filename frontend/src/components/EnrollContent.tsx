import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Stack, Typography } from '@mui/material';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CircleUser } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import { ENROLL_BUTTON_SELECTOR } from '@/config/selectors';
import { enrollMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { itemKeys } from '@/query/keys';

export const EnrollContent = ({ itemId }: { itemId: string }): JSX.Element => {
  const { t } = useTranslation(NS.Common, { keyPrefix: 'ENROLL' });
  const { t: translateMessage } = useTranslation(NS.Messages);

  const queryClient = useQueryClient();
  const { mutate: enroll, error } = useMutation({
    ...enrollMutation(),
    onError: (err) => {
      console.error(err);
    },
    onSettled: (_data, _error) => {
      // on success, enroll should have given membership to the user
      // invalidate full item because of packed
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).content,
      });
    },
  });

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flex={1}
      gap={2}
    >
      <CircleUser size={40} />
      <Typography variant="h3">{t('TITLE')}</Typography>
      <Typography variant="subtitle2">{t('DESCRIPTION')}</Typography>

      {error && (
        <Alert severity="error">
          {translateMessage('ENROLL_UNEXPECTED_ERROR')}
        </Alert>
      )}

      <Button
        data-cy={ENROLL_BUTTON_SELECTOR}
        onClick={() => enroll({ path: { itemId } })}
      >
        {t('BUTTON')}
      </Button>
    </Stack>
  );
};
