import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';

import {
  DescriptionPlacementType,
  ItemType,
  LinkItemType,
  UnionOfConst,
  getParentFromPath,
} from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import {
  EDIT_ITEM_MODAL_CANCEL_BUTTON_ID,
  ITEM_FORM_CONFIRM_BUTTON_ID,
} from '@/config/selectors';
import { updateLinkMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { getKeyForParentId, itemKeys } from '@/query/keys';

import CancelButton from '~builder/components/common/CancelButton';

import { ItemNameField } from '../ItemNameField';
import { DescriptionAndPlacementForm } from '../description/DescriptionAndPlacementForm';
import { LinkTypeFormControl } from './LinkTypeFormControl';
import LinkUrlField from './LinkUrlField';
import {
  LinkType,
  getLinkType,
  getSettingsFromLinkType,
  normalizeURL,
} from './linkUtils';

type Inputs = {
  name: string;
  description: string;
  linkType: UnionOfConst<typeof LinkType>;
  descriptionPlacement: DescriptionPlacementType;
  url: string;
};

export function LinkEditForm({
  item,
  onClose,
}: Readonly<{
  item: LinkItemType;
  onClose: () => void;
}>) {
  const queryClient = useQueryClient();
  const { t: translateCommon } = useTranslation(NS.Common);
  const methods = useForm<Inputs>({
    defaultValues: {
      name: item.name,
      description: item.description ?? '',
      url: item.extra[ItemType.LINK].url,
      descriptionPlacement: item.settings.descriptionPlacement,
      linkType: getLinkType(item.settings),
    },
  });
  const {
    handleSubmit,
    formState: { isValid, dirtyFields },
  } = methods;

  const { mutateAsync: editLink } = useMutation({
    ...updateLinkMutation(),
    onSettled: async (response) => {
      // invalidate current item
      await queryClient.invalidateQueries({
        queryKey: itemKeys.single(item.id).content,
      });
      // invalidate parent keys
      if (response) {
        const parentKey = getKeyForParentId(getParentFromPath(response.path));
        queryClient.invalidateQueries({ queryKey: parentKey });
      }
    },
  });
  async function onSubmit(data: Inputs) {
    try {
      await editLink({
        path: { id: item.id },
        body: {
          name: data.name,
          description: data.description,
          url: normalizeURL(data.url),
          ...getSettingsFromLinkType(data.linkType),
          settings: {
            descriptionPlacement: data.descriptionPlacement,
          },
        },
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
          <Stack gap={1}>
            <LinkUrlField />
            <ItemNameField required />
            <DescriptionAndPlacementForm />
            <LinkTypeFormControl />
          </Stack>
        </DialogContent>
        <DialogActions>
          <CancelButton
            id={EDIT_ITEM_MODAL_CANCEL_BUTTON_ID}
            onClick={onClose}
          />
          <Button
            id={ITEM_FORM_CONFIRM_BUTTON_ID}
            variant="contained"
            type="submit"
            disabled={!isValid || !Object.keys(dirtyFields).length}
          >
            {translateCommon('SAVE.BUTTON_TEXT')}
          </Button>
        </DialogActions>
      </Box>
    </FormProvider>
  );
}
