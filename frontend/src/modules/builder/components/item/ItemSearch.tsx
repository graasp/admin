import { ChangeEvent, type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import { NS } from '@/config/constants';
import {
  ITEMS_GRID_NO_SEARCH_RESULT_ID,
  ITEM_SEARCH_INPUT_ID,
} from '@/config/selectors';
import { SearchInput } from '@/ui/SearchInput/SearchInput';

import { BUILDER } from '../../langs';

export const NoItemSearchResult = (): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <Typography
      id={ITEMS_GRID_NO_SEARCH_RESULT_ID}
      variant="subtitle1"
      align="center"
      display="block"
    >
      {translateBuilder(BUILDER.ITEM_SEARCH_NO_RESULTS_MESSAGE)}
    </Typography>
  );
};

export const useItemSearch = ({
  onSearch,
}: {
  onSearch?: () => void;
} = {}): {
  text: string;
  input: JSX.Element;
} => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchInput = (event: ChangeEvent<{ value: string }>) => {
    const text = event.target.value;
    setSearchText(text);
    onSearch?.();
  };

  const itemSearchInput = (
    <SearchInput
      key="searchInput"
      onChange={handleSearchInput}
      value={searchText}
      inputBaseId={ITEM_SEARCH_INPUT_ID}
      placeholder={translateBuilder(BUILDER.ITEM_SEARCH_PLACEHOLDER)}
      size="small"
      dataUmamiEvent="item-search"
    />
  );
  return { text: searchText, input: itemSearchInput };
};
