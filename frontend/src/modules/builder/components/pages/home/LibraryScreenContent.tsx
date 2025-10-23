import { useTranslation } from 'react-i18next';

import { Alert, Stack } from '@mui/material';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  PUBLISHED_ITEMS_EMPTY_ID,
  PUBLISHED_ITEMS_EMPTY_SEARCH_RESULT_ID,
  PUBLISHED_ITEMS_ERROR_ALERT_ID,
  PUBLISHED_ITEMS_ID,
} from '@/config/selectors';

import ErrorAlert from '~builder/components/common/ErrorAlert';
import SelectTypes from '~builder/components/common/SelectTypes';
import { useFilterItemsContext } from '~builder/components/context/FilterItemsContext';
import { useItemSearch } from '~builder/components/item/ItemSearch';
import ModeButton from '~builder/components/item/header/ModeButton';
import LoadingScreen from '~builder/components/layout/LoadingScreen';
import ItemsTable from '~builder/components/main/list/ItemsTable';
import SortingSelect from '~builder/components/table/SortingSelect';
import { SortingOptions } from '~builder/components/table/types';
import {
  useSorting,
  useTranslatedSortingOptions,
} from '~builder/components/table/useSorting';
import { Ordering } from '~builder/enums';

function LibraryScreenContent() {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { input, text } = useItemSearch();

  const { data: member } = hooks.useCurrentMember();
  const {
    data: publishedItems,
    isLoading,
    isError,
  } = hooks.usePublishedItemsForMember(member?.id);
  const options = useTranslatedSortingOptions();
  const { shouldDisplayItem } = useFilterItemsContext();
  const { sortBy, setSortBy, ordering, setOrdering, sortFn } = useSorting({
    sortBy: SortingOptions.ItemUpdatedAt,
    ordering: Ordering.DESC,
  });
  const filteredData = publishedItems?.filter(
    (d) =>
      shouldDisplayItem(d.type) &&
      d.name.toLowerCase().includes(text.toLowerCase()),
  );
  filteredData?.sort(sortFn);

  if (publishedItems?.length) {
    return (
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          {input}
        </Stack>
        <Stack
          alignItems="space-between"
          direction="column"
          gap={1}
          width="100%"
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <SelectTypes />
            <Stack direction="row" gap={1}>
              {sortBy && setSortBy && (
                <SortingSelect
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  ordering={ordering}
                  setOrdering={setOrdering}
                  options={options}
                />
              )}
              <ModeButton />
            </Stack>
          </Stack>
          {filteredData?.length ? (
            <ItemsTable
              id={PUBLISHED_ITEMS_ID}
              items={filteredData ?? []}
              canMove={false}
              enableMoveInBetween={false}
            />
          ) : (
            <Alert severity="info" id={PUBLISHED_ITEMS_EMPTY_SEARCH_RESULT_ID}>
              {translateBuilder('PUBLISHED_ITEMS_NOT_FOUND_SEARCH', {
                search: text,
              })}
            </Alert>
          )}
        </Stack>
      </>
    );
  }

  if (isError) {
    return <ErrorAlert id={PUBLISHED_ITEMS_ERROR_ALERT_ID} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!publishedItems?.length) {
    return (
      <Alert severity="info" id={PUBLISHED_ITEMS_EMPTY_ID}>
        {translateBuilder('PUBLISHED_ITEMS_EMPTY')}
      </Alert>
    );
  }

  return <ErrorAlert id={PUBLISHED_ITEMS_ERROR_ALERT_ID} />;
}

export default LibraryScreenContent;
