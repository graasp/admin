import { type JSX, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';

import { DiscriminatedItem, ItemGeolocation, ItemType } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  FOLDER_FORM_DESCRIPTION_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
} from '@/config/selectors';
import { createPageMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { itemKeys } from '@/query/keys';
import Button from '@/ui/buttons/Button/Button';

import CancelButton from '~builder/components/common/CancelButton';

import ThumbnailCrop from '../../../thumbnails/ThumbnailCrop';
import { ItemNameField } from '../ItemNameField';
import { DescriptionForm } from '../description/DescriptionForm';

type Inputs = {
  name: string;
  description: string;
};

type FolderCreateFormProps = {
  onClose: () => void;
  parentId?: DiscriminatedItem['id'];
  geolocation?: Pick<ItemGeolocation, 'lat' | 'lng'>;
  previousItemId?: DiscriminatedItem['id'];
};

export function FolderCreateForm({
  onClose,
  geolocation,
  previousItemId,
}: Readonly<FolderCreateFormProps>): JSX.Element {
  const { navigate } = useRouter();
  const { itemId: parentId } = useParams({ strict: false });
  const [clickCounter, setClickCounter] = useState(0);
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateCommon } = useTranslation(NS.Common);
  const methods = useForm<Inputs>({ mode: 'onChange' });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const [thumbnail, setThumbnail] = useState<Blob>();

  const { mutateAsync: createItem } = mutations.usePostItem();
  const queryClient = useQueryClient();
  const { mutateAsync: createPage } = useMutation({
    ...createPageMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(parentId).allChildren,
      });
    },
  });

  // allow pages only inside folders
  const handleClick = () => {
    if (parentId) {
      setClickCounter((s) => s + 1);
    }
  };

  async function onSubmit(data: Inputs) {
    try {
      await createItem({
        name: data.name,
        type: ItemType.FOLDER,
        description: data.description,
        thumbnail,
        parentId,
        geolocation,
        previousItemId,
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  const onCreatePageClick = async () => {
    const { id } = await createPage({
      body: { name: 'create page' },
      query: { parentId, previousItemId },
    });
    navigate({ to: '/builder/items/$itemId', params: { itemId: id } });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        direction="column"
        onSubmit={handleSubmit(onSubmit)}
        flex={1}
      >
        <DialogTitle onClick={handleClick}>
          {translateBuilder('CREATE_ITEM_NEW_FOLDER_TITLE')}
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={2}
          >
            <ThumbnailCrop
              setChanges={({ thumbnail: image }) => {
                setThumbnail(image);
              }}
            />
            <ItemNameField required />
          </Stack>
          <DescriptionForm id={FOLDER_FORM_DESCRIPTION_ID} />
        </DialogContent>
        <DialogActions>
          {clickCounter > 3 && (
            <Button color="player" onClick={onCreatePageClick}>
              Create Page
            </Button>
          )}
          <CancelButton onClick={onClose} />
          <Button
            id={ITEM_FORM_CONFIRM_BUTTON_ID}
            type="submit"
            disabled={!isValid}
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </Stack>
    </FormProvider>
  );
}
