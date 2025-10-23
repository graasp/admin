import type { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, DialogActions, DialogContent } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  FOLDER_FORM_DESCRIPTION_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
} from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import CancelButton from '~builder/components/common/CancelButton';

import { ItemNameField } from '../ItemNameField';
import { DescriptionForm } from '../description/DescriptionForm';

type FolderEditFormProps = {
  item: DiscriminatedItem;
  onClose: () => void;
};

type Inputs = {
  name: string;
  description: string;
};

export function FolderEditForm({
  item,
  onClose,
}: Readonly<FolderEditFormProps>): JSX.Element {
  const { t: translateCommon } = useTranslation(NS.Common);
  const methods = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      description: item.description ?? '',
    },
    mode: 'onChange',
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
        description: data.description,
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
          <DescriptionForm id={FOLDER_FORM_DESCRIPTION_ID} />
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
