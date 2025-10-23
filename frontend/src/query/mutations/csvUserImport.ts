import { UUID } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api/csvUserImport.js';
import { itemKeys } from '../keys.js';
import { postCsvUserImportRoutine } from '../routines/csvUserImport.js';
import { QueryClientConfig } from '../types.js';

export default (queryConfig: QueryClientConfig) => {
  const useCSVUserImport = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: { file: File; itemId: UUID }) =>
        Api.uploadUserCsv(payload),
      onSuccess: () => {
        queryConfig.notifier?.({
          type: postCsvUserImportRoutine.SUCCESS,
        });
      },
      onError: (error: Error) => {
        queryConfig.notifier?.({
          type: postCsvUserImportRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: (_data, _error, { itemId }) => {
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).invitation,
        });
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).memberships,
        });
      },
    });
  };
  const useCSVUserImportWithTemplate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: {
        file: File;
        itemId: UUID;
        templateItemId: UUID;
      }) => Api.uploadUserCsvWithTemplate(payload),
      onSuccess: () => {
        queryConfig.notifier?.({
          type: postCsvUserImportRoutine.SUCCESS,
        });
      },
      onError: (error: Error) => {
        queryConfig.notifier?.({
          type: postCsvUserImportRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: (_data, _error, { itemId }) => {
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).invitation,
        });
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).memberships,
        });
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).allChildren,
        });
      },
    });
  };

  return { useCSVUserImportWithTemplate, useCSVUserImport };
};
