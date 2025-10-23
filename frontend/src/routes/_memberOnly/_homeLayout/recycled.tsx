import { useTranslation } from 'react-i18next';

import { Alert, Button, Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import {
  RECYCLED_ITEMS_EMPTY_ID,
  RECYCLED_ITEMS_ERROR_ALERT_ID,
} from '@/config/selectors';
import { useInfiniteOwnRecycledItems } from '@/query/item/recycled/hooks';

import DeleteButton from '~builder/components/common/DeleteButton';
import ErrorAlert from '~builder/components/common/ErrorAlert';
import RestoreButton from '~builder/components/common/RestoreButton';
import LoadingScreen from '~builder/components/layout/LoadingScreen';
import {
  SelectionContextProvider,
  useSelectionContext,
} from '~builder/components/main/list/SelectionContext';
import {
  DragContainerStack,
  useDragSelection,
} from '~builder/components/main/list/useDragSelection';
import RecycleBinToolbar from '~builder/components/pages/recycleBin/RecycleBinSelectionToolbar';
import ItemCard from '~builder/components/table/ItemCard';
import { ITEM_PAGE_SIZE } from '~builder/constants';
import { BUILDER } from '~builder/langs';

const CONTAINER_ID = 'recycle-items-container';

export const Route = createFileRoute('/_memberOnly/_homeLayout/recycled')({
  component: RouteComponent,
  staticData: {
    pageTitle: 'TRASH',
  },
});

function RouteComponent() {
  return (
    <SelectionContextProvider>
      <RecycledItemsScreenContent />
    </SelectionContextProvider>
  );
}

function RecycledItemsScreenContent() {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const { data, fetchNextPage, isLoading, hasNextPage, isFetching } =
    useInfiniteOwnRecycledItems(
      // improvement: adapt page size given the user window height
      { pageSize: ITEM_PAGE_SIZE },
    );

  const { selectedIds, toggleSelection } = useSelectionContext();

  const DragSelection = useDragSelection({ containerId: CONTAINER_ID });

  // render this when there is data from the query
  if (data?.pages?.length) {
    if (data.pages[0].data.length) {
      const fetchedItems = data.pages.flatMap((p) => p.data);

      const hasSelection = Boolean(selectedIds.length && fetchedItems.length);
      return (
        <>
          <Stack gap={1} height="100%">
            <Stack
              alignItems="space-between"
              direction="column"
              gap={1}
              width="100%"
            >
              {hasSelection ? <RecycleBinToolbar items={fetchedItems} /> : null}
            </Stack>
            <DragContainerStack id={CONTAINER_ID}>
              {fetchedItems.map((item) => (
                <Stack key={item.id} mb={1}>
                  <ItemCard
                    item={item}
                    onThumbnailClick={() => toggleSelection(item.id)}
                    isSelected={selectedIds.includes(item.id)}
                    footer={
                      <Stack justifyContent="right" direction="row">
                        <RestoreButton itemIds={[item.id]} />
                        <DeleteButton items={[item]} />
                      </Stack>
                    }
                  />
                </Stack>
              ))}
              {hasNextPage && (
                <Stack textAlign="center" alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={() => fetchNextPage()}
                    role="feed"
                    loading={isFetching}
                  >
                    {translateBuilder(BUILDER.HOME_SCREEN_LOAD_MORE_BUTTON)}
                  </Button>
                </Stack>
              )}
            </DragContainerStack>
          </Stack>
          {DragSelection}
        </>
      );
    }
    return (
      <Alert severity="info" id={RECYCLED_ITEMS_EMPTY_ID}>
        {translateBuilder(BUILDER.TRASH_NO_ITEM)}
      </Alert>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <ErrorAlert id={RECYCLED_ITEMS_ERROR_ALERT_ID} />;
}
