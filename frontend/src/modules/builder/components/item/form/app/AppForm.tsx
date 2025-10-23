import { type JSX, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, DialogActions, DialogTitle, Stack } from '@mui/material';

import {
  DiscriminatedItem,
  ItemGeolocation,
  ItemType,
  buildAppExtra,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { ITEM_FORM_CONFIRM_BUTTON_ID } from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import CancelButton from '~builder/components/common/CancelButton';

import AppListForm from './AppListForm';
import { CustomAppForm } from './CustomAppForm';

type Props = {
  onClose: () => void;
  parentId?: DiscriminatedItem['id'];
  geolocation?: Pick<ItemGeolocation, 'lat' | 'lng'>;
  previousItemId?: DiscriminatedItem['id'];
};

type Inputs = {
  name: string;
  url: string;
};

const AppForm = ({
  parentId,
  geolocation,
  previousItemId,
  onClose,
}: Props): JSX.Element => {
  const { t: translateCommon } = useTranslation(NS.Common);
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const [isCustomApp, setIsCustomApp] = useState<boolean>(false);

  const { mutateAsync: createItem } = mutations.usePostItem();

  const methods = useForm<Inputs>();
  const {
    reset,
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = methods;

  async function onSubmit(data: Inputs) {
    try {
      await createItem({
        type: ItemType.APP,
        name: data.name,
        extra: buildAppExtra({
          url: data.url,
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

  const addCustomApp = () => {
    setIsCustomApp(true);
    reset({ name: '', url: '' });
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" height="100%" onSubmit={handleSubmit(onSubmit)}>
        <Stack height="100%">
          <DialogTitle>
            {translateBuilder('CREATE_NEW_ITEM_APP_TITLE')}
          </DialogTitle>
          <Stack height="100%" justifyContent="space-between">
            <Stack>
              {isCustomApp ? (
                <CustomAppForm setIsCustomApp={setIsCustomApp} />
              ) : (
                <AppListForm addCustomApp={addCustomApp} />
              )}
            </Stack>
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
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default AppForm;
