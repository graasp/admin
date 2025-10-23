import { Pagination } from '@graasp/sdk';

import { useInfiniteQuery } from '@tanstack/react-query';

import { ITEM_PAGE_SIZE } from '~builder/constants.js';

import { memberKeys } from '../../keys.js';
import { getOwnRecycledItems } from './api.js';

/**
 * Returns paginated own recycled item data
 * @param pagination default and first page is 1
 * @returns paginated recycled item data
 */
export const useInfiniteOwnRecycledItems = (
  pagination?: Partial<Pagination>,
) => {
  return useInfiniteQuery({
    queryKey: memberKeys.current().infiniteRecycledItemData(),
    queryFn: ({ pageParam }) =>
      getOwnRecycledItems({ page: pageParam ?? 1, ...pagination }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.length < (pagination?.pageSize ?? ITEM_PAGE_SIZE)
        ? undefined
        : pages.length + 1;
    },
    refetchOnWindowFocus: () => false,
    initialPageParam: 1,
  });
};
