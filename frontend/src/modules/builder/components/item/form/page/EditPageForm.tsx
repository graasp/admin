import type { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, Button, DialogActions, DialogContent } from '@mui/material';

import { DescriptionPlacementType, PageItemType } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
} from '@/config/selectors';

import CancelButton from '~builder/components/common/CancelButton';

import { ItemNameField } from '../ItemNameField';

type Inputs = {
  name: string;
  description: string;
  descriptionPlacement: DescriptionPlacementType;
};

export const EditPageForm = ({
  item,
  onClose,
}: {
  item: PageItemType;
  onClose: () => void;
}): JSX.Element => {
  const { t: translateCommon } = useTranslation(NS.Common);

  const methods = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      description: item.description ?? '',
    },
  });
  const { mutateAsync: editItem, isPending } = mutations.useEditItem();
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  async function onSubmit(data: Inputs) {
    try {
      await editItem({
        id: item.id,
        name: data.name,
        description: data.description,
        settings: { descriptionPlacement: data.descriptionPlacement },
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <DialogContent>
          <ItemNameField required />
        </DialogContent>
        <DialogActions>
          <CancelButton
            id={EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}
            onClick={onClose}
          />
          <Button
            loading={isPending}
            id={ITEM_FORM_CONFIRM_BUTTON_ID}
            type="submit"
            disabled={!isValid}
            variant="contained"
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </FormProvider>
    </Box>
  );
};
