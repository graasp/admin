import { type JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Alert,
  Box,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {
  PackedItem,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import { SectionHeader } from '@/components/SectionHeader';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  ITEM_SCREEN_ERROR_ALERT_ID,
  buildItemsTableId,
} from '@/config/selectors';
import Loader from '@/ui/Loader/Loader';

import { useOutletContext } from '~builder/contexts/OutletContext';
import { ItemLayoutMode, Ordering } from '~builder/enums';

import ErrorAlert from '../common/ErrorAlert';
import SelectTypes from '../common/SelectTypes';
import { useFilterItemsContext } from '../context/FilterItemsContext';
import { useLayoutContext } from '../context/LayoutContext';
import { FileUploader } from '../file/FileUploader';
import NewItemButton from '../main/NewItemButton';
import ItemsTable from '../main/list/ItemsTable';
import {
  SelectionContextProvider,
  useSelectionContext,
} from '../main/list/SelectionContext';
import {
  DragContainerStack,
  useDragSelection,
} from '../main/list/useDragSelection';
import { DesktopMap } from '../map/DesktopMap';
import NoItemFilters from '../pages/NoItemFilters';
import SortingSelect from '../table/SortingSelect';
import {
  SortingOptionsForFolder,
  SortingOptionsForFolderType,
} from '../table/types';
import { useSorting } from '../table/useSorting';
import FolderToolbar from './FolderSelectionToolbar';
import { useItemSearch } from './ItemSearch';
import { NewFolderButton } from './form/folder/NewFolderButton';
import ModeButton from './header/ModeButton';

type Props = {
  item: PackedItem;
  searchText: string;
  items?: PackedItem[];
  sortBy: SortingOptionsForFolderType;
  canWrite?: boolean;
};

const CONTAINER_ID = 'items-container-id';

const Content = ({
  item,
  searchText,
  items,
  sortBy,
  canWrite = false,
}: Props) => {
  const { mode } = useLayoutContext();
  const { itemTypes } = useFilterItemsContext();
  const { selectedIds, clearSelection, toggleSelection } =
    useSelectionContext();
  const DragSelection = useDragSelection({ containerId: CONTAINER_ID });

  useEffect(() => {
    clearSelection();
  }, [clearSelection, item.id]);

  if (mode === ItemLayoutMode.Map) {
    return (
      <Box flex={1} mt={1}>
        <DesktopMap parentId={item.id} />
      </Box>
    );
  }

  if (items?.length) {
    return (
      <>
        <DragContainerStack id={CONTAINER_ID}>
          <ItemsTable
            selectedIds={selectedIds}
            enableMoveInBetween={sortBy === SortingOptionsForFolder.Order}
            id={buildItemsTableId(item.id)}
            items={items ?? []}
            onCardClick={toggleSelection}
            onMove={clearSelection}
          />
          {Boolean(canWrite && !searchText && !itemTypes?.length) && (
            <Stack alignItems="center" mb={2}>
              <NewItemButton
                type="icon"
                key="newButton"
                // add new items at the end of the list
                previousItemId={items ? items[items.length - 1]?.id : undefined}
              />
            </Stack>
          )}
        </DragContainerStack>
        {DragSelection}
      </>
    );
  }

  // no items to show because of filters
  if (!items?.length && (searchText.length || itemTypes.length)) {
    return <NoItemFilters searchText={searchText} />;
  }

  // no items show drop zone
  if (
    item.permission &&
    PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
  ) {
    return (
      <Box mt={1}>
        <FileUploader
          buttons={
            <>
              <NewFolderButton size="small" key="newFolder" />
              <NewItemButton size="small" key="newButton" />
            </>
          }
        />
      </Box>
    );
  }

  return null;
};

/**
 * Helper component to render typed folder items
 */
const FolderContent = ({ item }: { item: PackedItem }): JSX.Element => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const { itemTypes } = useFilterItemsContext();
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { selectedIds } = useSelectionContext();
  const itemSearch = useItemSearch();
  const { canWrite } = useOutletContext();

  const {
    data: children,
    isLoading,
    isError,
  } = hooks.useChildren(item.id, {
    ordered: true,
    keywords: itemSearch.text,
    types: itemTypes,
  });

  const { ordering, setOrdering, setSortBy, sortBy, sortFn } = useSorting({
    sortBy: SortingOptionsForFolder.Order,
    ordering: Ordering.ASC,
  });

  const sortingOptions = Object.values(SortingOptionsForFolder).sort((t1, t2) =>
    translateBuilder(t1).localeCompare(translateBuilder(t2)),
  );

  if (children) {
    const sortedChildren = children.toSorted(sortFn);

    return (
      <>
        <SectionHeader item={item} />

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          my={2}
        >
          {itemSearch.input}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            {canWrite && (
              <Stack direction="row" spacing={1}>
                <NewFolderButton
                  type={isSm ? 'button' : 'icon'}
                  // add new items at the end of the list
                  previousItemId={children[children.length - 1]?.id}
                />
                <NewItemButton
                  type={isSm ? 'button' : 'icon'}
                  key="newButton"
                  size="medium"
                  // add new items at the end of the list
                  previousItemId={children[children.length - 1]?.id}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
        {sortedChildren.length ? (
          <Stack
            alignItems="space-between"
            direction="column"
            mt={2}
            gap={1}
            width="100%"
          >
            {selectedIds.length ? (
              <FolderToolbar items={sortedChildren} />
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
                      ordering={ordering}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      options={sortingOptions}
                      setOrdering={setOrdering}
                    />
                  )}
                  <ModeButton />
                </Stack>
              </Stack>
            )}
          </Stack>
        ) : null}
        {/* reader empty message */}
        {!sortedChildren.length && !canWrite ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            {translateBuilder('EMPTY_FOLDER_MESSAGE')}
          </Alert>
        ) : null}
        <Content
          canWrite={canWrite}
          sortBy={sortBy}
          item={item}
          items={sortedChildren}
          searchText={itemSearch.text}
        />
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorAlert id={ITEM_SCREEN_ERROR_ALERT_ID} />;
  }

  return (
    <Alert severity="info">
      {translateBuilder('ITEMS_TABLE_EMPTY_MESSAGE')}
    </Alert>
  );
};

export const FolderContentWrapper = ({
  item,
}: {
  item: PackedItem;
}): JSX.Element => (
  <SelectionContextProvider>
    <Container maxWidth="lg">
      <FolderContent item={item} />
    </Container>
  </SelectionContextProvider>
);

export default FolderContentWrapper;
