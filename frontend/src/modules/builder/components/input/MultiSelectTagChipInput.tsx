import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  AutocompleteRenderValueGetItemProps,
  Box,
  Chip,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';

import { DiscriminatedItem, TagCategoryType } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import {
  MULTI_SELECT_CHIP_CONTAINER_ID,
  buildMultiSelectChipInputId,
  buildMultiSelectChipsSelector,
} from '@/config/selectors';
import { getCountForTagsOptions } from '@/openapi/client/@tanstack/react-query.gen';

import useTagsManager from '../item/publish/customizedTags/useTagsManager';

type Props = {
  itemId: DiscriminatedItem['id'];
  tagCategory: TagCategoryType;
  helpertext?: string;
};

export const MultiSelectTagChipInput = ({
  itemId,
  tagCategory,
  helpertext,
}: Props): JSX.Element | null => {
  const { t: translateEnums } = useTranslation(NS.Enums);
  const {
    currentValue,
    handleCurrentValueChanged,
    addValue,
    deleteValue,
    resetCurrentValue,
    debouncedCurrentValue,
    tagsPerCategory,
  } = useTagsManager({
    itemId,
  });
  const {
    data: tags,
    isFetching,
    isLoading,
  } = useQuery({
    ...getCountForTagsOptions({
      query: { search: debouncedCurrentValue, category: tagCategory },
    }),
    enabled: Boolean(debouncedCurrentValue),
  });
  const renderTags = (
    values: readonly (string | { title: string; value: string })[],
    getItemProps: AutocompleteRenderValueGetItemProps<true>,
  ) => (
    <Box data-cy={MULTI_SELECT_CHIP_CONTAINER_ID}>
      {values.map((option, index: number) => {
        const { title, value } =
          typeof option === 'string'
            ? { title: option, value: option }
            : option;
        return (
          <Chip
            data-cy={buildMultiSelectChipsSelector(index)}
            variant="outlined"
            label={title}
            {...getItemProps({ index })}
            onDelete={() => {
              const tagId = tagsPerCategory?.[tagCategory].find(
                ({ name }) => name === title,
              );
              if (tagId) {
                deleteValue(tagId.id);
              }
            }}
            key={value}
          />
        );
      })}
    </Box>
  );

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      variant="outlined"
      // show plural version
      label={translateEnums(tagCategory, { count: 2 })}
      slotProps={{
        htmlInput: {
          ...params.inputProps,
          value: currentValue,
        },
      }}
      helperText={helpertext}
      sx={{
        // Avoid to resize the textfield on hover when next tag will be on new line.
        '& .MuiAutocomplete-input': {
          minWidth: '30px !important',
        },
      }}
      onChange={(e) => handleCurrentValueChanged(e.target.value, tagCategory)}
      onKeyDown={(e) => {
        if (e.code === 'Enter' && 'value' in e.target) {
          addValue({ name: e.target.value as string, category: tagCategory });
        }
      }}
    />
  );

  const options =
    tags
      ?.filter(({ category }) => category === tagCategory)
      ?.map(({ name, count }) => ({ title: name, value: name, count })) ?? [];

  // If the current value is not empty allow to select it exacly by adding a "Add {value}" option
  if (
    currentValue !== '' &&
    !options.map((option) => option.value).includes(currentValue)
  ) {
    options.push({
      value: currentValue,
      title: currentValue,
      count: 0,
    });
  }

  return (
    <Stack mt={1} spacing={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Autocomplete
          data-cy={buildMultiSelectChipInputId(tagCategory)}
          fullWidth
          multiple
          filterSelectedOptions
          // allows to hide empty "add option" text on adding a new tag
          freeSolo={!currentValue}
          onBlur={resetCurrentValue}
          options={options}
          value={tagsPerCategory?.[tagCategory]?.map(({ name }) => name) ?? []}
          onChange={(_e, v) => {
            if (v.length) {
              const entry = v[v.length - 1];
              const name = typeof entry === 'string' ? entry : entry.value;
              addValue({
                name,
                category: tagCategory,
              });
            }
          }}
          renderValue={renderTags}
          renderOption={(optionProps, option) => (
            <Box component="li" {...optionProps} gap={1}>
              <span>{option.title}</span>
              {option.count > 0 && <Chip size="small" label={option.count} />}
            </Box>
          )}
          renderInput={renderInput}
          disableClearable
          loading={
            isFetching || isLoading || debouncedCurrentValue !== currentValue
          }
          loadingText={<Skeleton />}
        />
      </Stack>
    </Stack>
  );
};
