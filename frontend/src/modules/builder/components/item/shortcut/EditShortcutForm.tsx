import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, Button, DialogActions, DialogContent } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
} from '@/config/selectors';

import CancelButton from '~builder/components/common/CancelButton';

import { ItemNameField } from '../form/ItemNameField';

type Inputs = {
  name: string;
};

function EditShortcutForm({
  item,
  onClose,
}: Readonly<{
  item: DiscriminatedItem;
  onClose: () => void;
}>): ReactNode {
  const { t: translateCommon } = useTranslation(NS.Common);
  const methods = useForm<Inputs>({
    defaultValues: { name: item.name },
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { mutateAsync: editItem } = mutations.useEditItem();
  async function onSubmit(data: Inputs) {
    try {
      await editItem({
        id: item.id,
        name: data.name,
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ItemNameField required />
        </DialogContent>
        <DialogActions>
          <CancelButton
            id={EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}
            onClick={onClose}
          />
          <Button
            id={ITEM_FORM_CONFIRM_BUTTON_ID}
            type="submit"
            disabled={!isValid}
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}

export default EditShortcutForm;
