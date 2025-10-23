import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { DiscriminatedItem, Tag, TagCategoryType } from '@graasp/sdk';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import groupBy from 'lodash.groupby';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  createTagForItemMutation,
  deleteTagForItemMutation,
  getTagsForItemOptions,
  getTagsForItemQueryKey,
} from '@/openapi/client/@tanstack/react-query.gen';

const EMPTY_STRING = '';
type Props = {
  itemId: DiscriminatedItem['id'];
};

type UseMultiSelectChipInput = {
  tags?: Tag[];
  tagsPerCategory?: { [key: string]: Tag[] };
  currentValue: string;
  error: string | undefined;
  hasError: boolean;
  debouncedCurrentValue: string;

  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;

  handleCurrentValueChanged: (
    newValue: string,
    category: TagCategoryType,
  ) => void;
  addValue: (tag: Pick<Tag, 'name' | 'category'>) => void;
  resetCurrentValue: () => void;
  deleteValue: (tagId: Tag['id']) => void;
};

export const useTagsManager = ({ itemId }: Props): UseMultiSelectChipInput => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);
  const [currentValue, setCurrentValue] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<string | undefined>();
  const debouncedCurrentValue = hooks.useDebounce(currentValue, 500);
  const { data: tags } = useQuery(getTagsForItemOptions({ path: { itemId } }));
  const {
    mutate: addTag,
    isPending: addTagIsLoading,
    isSuccess: addTagIsSuccess,
    isError: addTagIsError,
  } = useMutation({
    ...createTagForItemMutation(),
    onError: (e) => {
      console.error(e);
      toast.error(translateMessage('UNEXPECTED_ERROR'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getTagsForItemQueryKey({ path: { itemId } }),
      });
    },
  });
  const {
    mutate: removeTag,
    isPending: removeTagIsLoading,
    isSuccess: removeTagIsSuccess,
    isError: removeTagIsError,
  } = useMutation({
    ...deleteTagForItemMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getTagsForItemQueryKey({ path: { itemId } }),
      });
    },
  });

  const hasError = Boolean(error);

  const tagsPerCategory = groupBy(tags, ({ category }) => category);

  const valueIsValid = (
    dataToValidate: string | undefined,
  ): dataToValidate is string => Boolean(dataToValidate);

  const valueExist = (tag: Pick<Tag, 'category' | 'name'>) =>
    tags?.find(
      ({ name, category }) => name === tag.name && category === tag.category,
    );

  const validateData = (tag: Pick<Tag, 'category' | 'name'>) => {
    if (valueExist(tag)) {
      setError(t('CHIPS_ALREADY_EXIST', { element: tag.name }));
      return false;
    }
    setError(undefined);
    return true;
  };

  const resetCurrentValue = () => {
    setCurrentValue(EMPTY_STRING);
  };

  const addValue = (tag: Pick<Tag, 'category' | 'name'>) => {
    if (valueIsValid(tag.name) && !valueExist(tag)) {
      addTag({ path: { itemId }, body: tag });

      resetCurrentValue();
    }
  };

  const deleteValue = (tagId: Tag['id']) => {
    removeTag({ path: { tagId, itemId } });
  };

  const handleCurrentValueChanged = (
    newValue: string,
    category: TagCategoryType,
  ) => {
    validateData({ name: newValue, category });
    setCurrentValue(newValue);
  };

  return {
    currentValue,
    error,
    hasError,
    handleCurrentValueChanged,
    addValue,
    deleteValue,
    resetCurrentValue,
    // return debounced current value, or empty when removing everything
    debouncedCurrentValue: currentValue.length
      ? debouncedCurrentValue
      : currentValue,
    tags,
    tagsPerCategory,
    isLoading: addTagIsLoading || removeTagIsLoading,
    isSuccess: addTagIsSuccess || removeTagIsSuccess,
    isError: addTagIsError || removeTagIsError,
  };
};

export default useTagsManager;
