import type { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { DiscriminatedItem, EtherpadPermission } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { ITEM_FORM_CONFIRM_BUTTON_ID } from '@/config/selectors';
import { createEtherpadMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { getKeyForParentId } from '@/query/keys';
import Button from '@/ui/buttons/Button/Button';

import { CancelButton } from '~builder/components/common/CancelButton';

import { BUILDER } from '../../../../langs';
import { ItemNameField } from '../ItemNameField';
import EtherpadSettings from './EtherpadSettings';

type Inputs = { name: string; allowReadersToWrite: boolean };

export function EtherpadForm({
  parentId,
  onClose,
}: Readonly<{
  parentId?: DiscriminatedItem['id'];
  onClose: () => void;
}>): JSX.Element {
  const queryClient = useQueryClient();
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { mutateAsync: postEtherpad } = useMutation({
    ...createEtherpadMutation(),
    onSettled: () => {
      const parentKey = getKeyForParentId(parentId);
      queryClient.invalidateQueries({ queryKey: parentKey });
    },
  });
  const { t: translateCommon } = useTranslation(NS.Common);

  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { isSubmitted, isValid },
  } = methods;
  const onSubmit = async (data: Inputs) => {
    await postEtherpad({
      query: {
        parentId,
      },
      body: {
        name: data.name,
        readerPermission: data.allowReadersToWrite
          ? EtherpadPermission.Write
          : EtherpadPermission.Read,
      },
    });

    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Stack
        direction="column"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        flex={1}
      >
        <DialogTitle>
          {translateBuilder(BUILDER.CREATE_NEW_ITEM_ETHERPAD_TITLE)}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {translateBuilder(BUILDER.CREATE_NEW_ITEM_ETHERPAD_INFORMATIONS)}
          </Typography>
          <ItemNameField required />
          <EtherpadSettings />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <Button
            id={ITEM_FORM_CONFIRM_BUTTON_ID}
            type="submit"
            disabled={isSubmitted && !isValid}
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </Stack>
    </FormProvider>
  );
}
