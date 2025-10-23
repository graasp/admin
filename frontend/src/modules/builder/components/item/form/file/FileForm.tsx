import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';

import {
  DescriptionPlacementType,
  FileItemExtra,
  FileItemType,
  ItemType,
  MimeTypes,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_FORM_IMAGE_ALT_TEXT_EDIT_FIELD_ID,
} from '@/config/selectors';

import CancelButton from '~builder/components/common/CancelButton';

import { BUILDER } from '../../../../langs';
import { ItemNameField } from '../ItemNameField';
import { DescriptionAndPlacementForm } from '../description/DescriptionAndPlacementForm';

type Inputs = {
  name: string;
  altText: string;
  description: string;
  descriptionPlacement: DescriptionPlacementType;
};

export function FileForm({
  item,
  onClose,
}: Readonly<{
  item: FileItemType;
  onClose: () => void;
}>) {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateCommon } = useTranslation(NS.Common);
  const methods = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      description: item?.description ?? undefined,
    },
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = methods;

  const altText = watch('altText');
  const descriptionPlacement = watch('descriptionPlacement');

  const { mimetype, altText: previousAltText } = item.extra.file;

  const { mutateAsync: editItem } = mutations.useEditItem();

  function buildFileExtra() {
    if (altText) {
      return {
        [ItemType.FILE]: {
          altText,
        },
      } as FileItemExtra;
    }
    return undefined;
  }

  async function onSubmit(data: Inputs) {
    try {
      await editItem({
        id: item.id,
        name: data.name,
        description: data.description,
        // only post extra if it has been changed
        extra: altText !== previousAltText ? buildFileExtra() : undefined,
        // only patch settings it it has been changed
        settings:
          descriptionPlacement !== item.settings.descriptionPlacement
            ? { descriptionPlacement }
            : undefined,
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ItemNameField required showClearButton={Boolean(watch('name'))} />
          {mimetype && MimeTypes.isImage(mimetype) && (
            <TextField
              variant="standard"
              id={ITEM_FORM_IMAGE_ALT_TEXT_EDIT_FIELD_ID}
              label={translateBuilder(BUILDER.EDIT_ITEM_IMAGE_ALT_TEXT_LABEL)}
              // always shrink because setting name from defined app does not shrink automatically
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ width: '50%', my: 1 }}
              multiline
              {...register('altText', { value: previousAltText })}
            />
          )}
          <DescriptionAndPlacementForm />
        </DialogContent>
        <DialogActions>
          <CancelButton
            id={EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}
            onClick={onClose}
          />
          <Button
            variant="contained"
            type="submit"
            id={ITEM_FORM_CONFIRM_BUTTON_ID}
            disabled={isSubmitted && !isValid}
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}
