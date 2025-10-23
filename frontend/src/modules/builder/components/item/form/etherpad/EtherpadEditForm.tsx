import type { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DialogActions, DialogContent, Stack } from '@mui/material';

import {
  EtherpadItemType,
  EtherpadPermission,
  getParentFromPath,
} from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { ITEM_FORM_CONFIRM_BUTTON_ID } from '@/config/selectors';
import { updateEtherpadMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { getKeyForParentId, itemKeys } from '@/query/keys';
import Button from '@/ui/buttons/Button/Button';

import { CancelButton } from '~builder/components/common/CancelButton';

import { ItemNameField } from '../ItemNameField';
import EtherpadSettings from './EtherpadSettings';

type Inputs = { name: string; allowReadersToWrite: boolean };

export function EtherpadEditForm({
  item,
  onClose,
}: Readonly<{
  item: EtherpadItemType;
  onClose: () => void;
}>): JSX.Element {
  const queryClient = useQueryClient();
  const { mutateAsync: updateEtherpad } = useMutation({
    ...updateEtherpadMutation(),
    onSettled: () => {
      const parentKey = getKeyForParentId(getParentFromPath(item.path));
      queryClient.invalidateQueries({ queryKey: parentKey });
      const itemKey = itemKeys.single(item.id).content;
      queryClient.invalidateQueries({ queryKey: itemKey });
    },
  });
  const { t: translateCommon } = useTranslation(NS.Common);

  const methods = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      allowReadersToWrite:
        item.extra.etherpad.readerPermission === EtherpadPermission.Write,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitted, isValid },
  } = methods;
  const onSubmit = async (data: Inputs) => {
    await updateEtherpad({
      body: {
        name: data.name,
        readerPermission: data.allowReadersToWrite
          ? EtherpadPermission.Write
          : EtherpadPermission.Read,
      },
      path: { id: item.id },
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
        <DialogContent>
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
