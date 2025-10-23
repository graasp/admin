import type { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import {
  DiscriminatedItem,
  DocumentItemExtraFlavor,
  ItemGeolocation,
  ItemType,
  buildDocumentExtra,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  ITEM_FORM_CONFIRM_BUTTON_ID,
  ITEM_FORM_DOCUMENT_TEXT_ID,
} from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import { CancelButton } from '~builder/components/common/CancelButton';

import { ItemNameField } from '../ItemNameField';
import {
  DocumentContentForm,
  DocumentExtraFormInputs,
} from './DocumentContentForm';
import { DocumentFlavorSelect } from './DocumentFlavorSelect';

type Props = {
  onClose: () => void;
  parentId?: DiscriminatedItem['id'];
  geolocation?: Pick<ItemGeolocation, 'lat' | 'lng'>;
  previousItemId?: DiscriminatedItem['id'];
};

type Inputs = {
  name: string;
  isRaw: boolean;
  flavor: `${DocumentItemExtraFlavor}`;
} & DocumentExtraFormInputs;

export function DocumentCreateForm({
  parentId,
  geolocation,
  previousItemId,
  onClose,
}: Readonly<Props>): JSX.Element {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateCommon } = useTranslation(NS.Common);
  const { mutateAsync: createItem } = mutations.usePostItem();

  const methods = useForm<Inputs>({
    defaultValues: { flavor: DocumentItemExtraFlavor.None },
  });
  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isSubmitted },
  } = methods;

  async function onSubmit(data: Inputs) {
    try {
      await createItem({
        type: ItemType.DOCUMENT,
        name: data.name,
        extra: buildDocumentExtra({
          content: data.content,
          flavor: data.flavor,
          isRaw: data.isRaw,
        }),
        parentId,
        geolocation,
        previousItemId,
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box component="form" height="100%" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {translateBuilder('CREATE_NEW_ITEM_DOCUMENT_TITLE')}
      </DialogTitle>
      <FormProvider {...methods}>
        <DialogContent>
          <ItemNameField required />
          <DocumentFlavorSelect />
          <DocumentContentForm
            documentItemId={ITEM_FORM_DOCUMENT_TEXT_ID}
            onChange={(v) => {
              // bug: setValue does not trigger isValid to be recomputed, probably because of TextEditor handling
              // bug: setting the flavor is needed because otherwise it gets reset
              reset({ content: v, flavor: getValues().flavor });
            }}
            placeholder={translateBuilder('TEXT_EDITOR_PLACEHOLDER')}
          />
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
      </FormProvider>
    </Box>
  );
}
