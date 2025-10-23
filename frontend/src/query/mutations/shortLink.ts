import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api/index.js';
import { buildShortLinkKey, itemKeys } from '../keys.js';
import { deleteShortLinkRoutine } from '../routines/index.js';
import type { QueryClientConfig } from '../types.js';

export default (queryConfig: QueryClientConfig) => {
  const { notifier } = queryConfig;

  const useDeleteShortLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (alias: string) => Api.deleteShortLink(alias),
      onSuccess: (data) => {
        notifier?.({
          type: deleteShortLinkRoutine.SUCCESS,
          payload: { message: 'DELETE_SHORT_LINK' },
        });
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(data.itemId).shortLinks,
        });
        queryClient.invalidateQueries({
          queryKey: buildShortLinkKey(data.alias),
        });
      },
      onError: (error: Error) => {
        notifier?.({
          type: deleteShortLinkRoutine.FAILURE,
          payload: { error },
        });
      },
    });
  };

  return {
    useDeleteShortLink,
  };
};
