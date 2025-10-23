import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Button, Skeleton, Stack } from '@mui/material';

import { ItemType, PermissionLevel } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  buildItemRowArrowId,
  buildNavigationModalItemId,
} from '@/config/selectors';
import type { RowMenuProps } from '@/ui/Tree/RowMenu';
import RowMenus from '@/ui/Tree/RowMenus';

interface AccessibleNavigationTreeProps {
  isDisabled?: RowMenuProps['isDisabled'];
  onClick: RowMenuProps['onClick'];
  onNavigate: RowMenuProps['onNavigate'];
  selectedId?: string;
}

const PAGE_SIZE = 10;

const AccessibleNavigationTree = ({
  isDisabled,
  onClick,
  onNavigate,
  selectedId,
}: AccessibleNavigationTreeProps): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  // todo: to change with real recent items (most used)
  const {
    data: accessibleItems,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = hooks.useInfiniteAccessibleItems(
    {
      permissions: [PermissionLevel.Write, PermissionLevel.Admin],
      types: [ItemType.FOLDER],
    },
    { pageSize: PAGE_SIZE },
  );

  if (accessibleItems?.pages) {
    const allItems = accessibleItems.pages.flatMap((page) => page.data);
    return (
      <Stack
        height="100%"
        flex={1}
        direction="column"
        justifyContent="space-between"
      >
        <Stack>
          <RowMenus
            elements={allItems}
            onNavigate={onNavigate}
            selectedId={selectedId}
            onClick={onClick}
            isDisabled={isDisabled}
            buildRowMenuId={buildNavigationModalItemId}
            buildRowMenuArrowId={buildItemRowArrowId}
          />
        </Stack>
        {hasNextPage && (
          <Stack textAlign="center" alignItems="center">
            <Button
              variant="text"
              onClick={() => fetchNextPage()}
              role="feed"
              size="small"
              loading={isFetching}
            >
              {translateBuilder('HOME_SCREEN_LOAD_MORE_BUTTON')}
            </Button>
          </Stack>
        )}
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </>
    );
  }

  return <Alert severity="error">An unexpected error happened</Alert>;
};

export default AccessibleNavigationTree;
