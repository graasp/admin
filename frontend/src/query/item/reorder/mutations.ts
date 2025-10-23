/* eslint-disable react-hooks/rules-of-hooks */
import { UUID } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { itemKeys } from '../../keys.js';
import { QueryClientConfig } from '../../types.js';
import { reorderItemRoutine } from '../routines.js';
import { reorderItem } from './api.js';

export const useReorderItem = (queryConfig: QueryClientConfig) => () => {
  const { notifier } = queryConfig;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      id: UUID;
      parentItemId: UUID;
      previousItemId?: UUID;
    }) => reorderItem(args),
    onSuccess: () => {
      notifier?.({
        type: reorderItemRoutine.SUCCESS,
        payload: { message: 'REORDER_ITEM' },
      });
    },
    onError: (error: Error) => {
      notifier?.({ type: reorderItemRoutine.FAILURE, payload: { error } });
    },
    onSettled: (_data, _error, args) => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(args.parentItemId).allChildren,
      });
    },
  });
};
