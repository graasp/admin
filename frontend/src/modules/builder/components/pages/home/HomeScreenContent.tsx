import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Box, Button, LinearProgress, Stack } from '@mui/material';

import { PackedItem, Paginated } from '@graasp/sdk';

import { InfiniteData } from '@tanstack/react-query';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { ACCESSIBLE_ITEMS_TABLE_ID } from '@/config/selectors';

import SelectTypes from '~builder/components/common/SelectTypes';
import { useFilterItemsContext } from '~builder/components/context/FilterItemsContext';
import { FileUploader } from '~builder/components/file/FileUploader';
import { NewFolderButton } from '~builder/components/item/form/folder/NewFolderButton';
import LoadingScreen from '~builder/components/layout/LoadingScreen';
import ItemsTable from '~builder/components/main/list/ItemsTable';
import { useSelectionContext } from '~builder/components/main/list/SelectionContext';
import {
  DragContainerStack,
  useDragSelection,
} from '~builder/components/main/list/useDragSelection';
import ShowOnlyMeButton from '~builder/components/table/ShowOnlyMeButton';
import SortingSelect from '~builder/components/table/SortingSelect';
import { SortingOptions } from '~builder/components/table/types';
import { useSorting } from '~builder/components/table/useSorting';
import { ITEM_PAGE_SIZE } from '~builder/constants';
import { Ordering } from '~builder/enums';

import NoItemFilters from '../NoItemFilters';
import HomeSelectionToolbar from './HomeSelectionToolbar';

const CONTAINER_ID = 'home-items-container';

type ShowOnlyMeChangeType = (checked: boolean) => void;

export function HomeScreenContent({
  searchText,
}: Readonly<{ searchText: string }>) {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateEnums } = useTranslation(NS.Enums);

  const [showOnlyMe, setShowOnlyMe] = useState(false);

  const { selectedIds } = useSelectionContext();
  const { sortBy, setSortBy, ordering, setOrdering } = useSorting({
    sortBy: SortingOptions.ItemUpdatedAt,
    ordering: Ordering.DESC,
  });

  const { user } = useAuth();
  const { itemTypes } = useFilterItemsContext();
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } =
    hooks.useInfiniteAccessibleItems(
      {
        // todo: in the future this can be any member from creators
        creatorId: showOnlyMe ? user?.id : undefined,
        // this error is caused by a typing that is very expensive to perform, relaxing it to a string is easier on the checker
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        sortBy,
        ordering,
        types: itemTypes,
        keywords: searchText,
      },
      // todo: adapt page size given the user window height
      { pageSize: ITEM_PAGE_SIZE },
    );

  const DragSelection = useDragSelection({ containerId: CONTAINER_ID });

  const onShowOnlyMeChange: ShowOnlyMeChangeType = (checked) => {
    setShowOnlyMe(checked);
  };

  if (data?.pages?.length) {
    const sortingOptions = Object.values(SortingOptions).sort((t1, t2) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      translateEnums(t1).localeCompare(translateEnums(t2)),
    );

    return (
      <>
        {DragSelection}
        <Stack
          alignItems="space-between"
          direction="column"
          mt={2}
          gap={1}
          width="100%"
        >
          <Stack spacing={1}>
            <ShowOnlyMeButton
              onClick={onShowOnlyMeChange}
              enabled={showOnlyMe}
            />
          </Stack>

          {selectedIds.length ? (
            <HomeSelectionToolbar
              items={data.pages.flatMap(({ data: i }) => i)}
            />
          ) : (
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
                    options={sortingOptions}
                  />
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack height="100%">
          <Content
            data={data}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
            searchText={searchText}
            hasNextPage={hasNextPage}
          />
          {data && isFetching && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
        </Stack>
      </>
    );
  }

  if (isLoading) {
    return <LoadingScreen chipsPlaceholder />;
  }

  return <Alert severity="error">{translateBuilder('ERROR_MESSAGE')}</Alert>;
}

type ContentProps = {
  data: InfiniteData<Paginated<PackedItem>>;
  fetchNextPage: () => void;
  searchText: string;
  hasNextPage: boolean;
  isFetching: boolean;
};
function Content({
  data,
  fetchNextPage,
  searchText,
  hasNextPage,
  isFetching,
}: Readonly<ContentProps>) {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { itemTypes } = useFilterItemsContext();

  const { selectedIds, toggleSelection, clearSelection } =
    useSelectionContext();

  if (data.pages[0].data.length) {
    return (
      <DragContainerStack id={CONTAINER_ID}>
        <ItemsTable
          canMove={!searchText}
          id={ACCESSIBLE_ITEMS_TABLE_ID}
          items={data.pages.flatMap(({ data: i }) => i)}
          enableMoveInBetween={false}
          onCardClick={toggleSelection}
          selectedIds={selectedIds}
          onMove={clearSelection}
        />
        {hasNextPage && (
          <Stack textAlign="center" alignItems="center">
            <Button
              variant="outlined"
              onClick={fetchNextPage}
              role="feed"
              loading={isFetching}
            >
              {translateBuilder('HOME_SCREEN_LOAD_MORE_BUTTON')}
            </Button>
          </Stack>
        )}
        {!hasNextPage && (
          // avoids button fullwidth
          <Stack alignItems="center" mb={2}>
            <NewFolderButton type="icon" />
          </Stack>
        )}
      </DragContainerStack>
    );
  } else if (itemTypes.length || searchText) {
    return <NoItemFilters searchText={searchText} />;
  }

  // default show upload zone
  return (
    <Box mt={2}>
      <FileUploader buttons={<NewFolderButton size="small" />} />
    </Box>
  );
}
