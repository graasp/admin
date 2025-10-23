import { type JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';

import {
  DescriptionPlacementType,
  DiscriminatedItem,
  ItemGeolocation,
  UnionOfConst,
} from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { ITEM_FORM_CONFIRM_BUTTON_ID } from '@/config/selectors';
import { createLinkMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { getKeyForParentId, itemsWithGeolocationKeys } from '@/query/keys';
import Button from '@/ui/buttons/Button/Button';

import CancelButton from '~builder/components/common/CancelButton';

import { BUILDER } from '../../../../langs';
import { ItemNameField } from '../ItemNameField';
import { DescriptionAndPlacementForm } from '../description/DescriptionAndPlacementForm';
import { LinkTypeFormControl } from './LinkTypeFormControl';
import LinkUrlField from './LinkUrlField';
import { LinkType, getSettingsFromLinkType, normalizeURL } from './linkUtils';

type Props = {
  onClose: () => void;
  parentId?: DiscriminatedItem['id'];
  geolocation?: Pick<ItemGeolocation, 'lat' | 'lng'>;
  previousItemId?: DiscriminatedItem['id'];
};

type Inputs = {
  name: string;
  linkType: UnionOfConst<typeof LinkType>;
  description: string;
  descriptionPlacement: DescriptionPlacementType;
  url: string;
};

export const LinkForm = ({
  onClose,
  parentId,
  geolocation,
  previousItemId,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateCommon } = useTranslation(NS.Common);
  const queryClient = useQueryClient();
  const { mutateAsync: createItem } = useMutation({
    ...createLinkMutation(),
    onSettled: (_data, _error) => {
      const key = getKeyForParentId(parentId);
      queryClient.invalidateQueries({ queryKey: key });

      // if item has geolocation, invalidate map related keys
      if (geolocation) {
        queryClient.invalidateQueries({
          queryKey: itemsWithGeolocationKeys.allBounds,
        });
      }
    },
  });
  const methods = useForm<Inputs>();
  const {
    handleSubmit,
    formState: { isValid, isSubmitted },
  } = methods;

  async function onSubmit(data: Inputs) {
    try {
      await createItem({
        query: {
          parentId,
          previousItemId,
        },
        body: {
          name: data.name,
          description: data.description,
          url: normalizeURL(data.url),
          ...getSettingsFromLinkType(data.linkType),
          settings: {
            descriptionPlacement: data.descriptionPlacement,
          },
          geolocation,
        },
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        {translateBuilder(BUILDER.CREATE_ITEM_LINK_TITLE)}
      </DialogTitle>
      <FormProvider {...methods}>
        <DialogContent>
          <Stack gap={1}>
            <LinkUrlField />
            <ItemNameField
              required
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
            />
            <DescriptionAndPlacementForm />
            <LinkTypeFormControl />
          </Stack>
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
};
