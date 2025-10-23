/* eslint-disable react-hooks/rules-of-hooks */
import { MAX_FILE_SIZE, UUID } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';

import { itemKeys } from '../../keys.js';
import { type QueryClientConfig } from '../../types.js';
import {
  deleteItemThumbnailRoutine,
  uploadItemThumbnailRoutine,
} from '../routines.js';
import { deleteItemThumbnail, uploadItemThumbnail } from './api.js';

export const useUploadItemThumbnail =
  (queryConfig: QueryClientConfig) => () => {
    const { notifier } = queryConfig;
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (args: {
        id: UUID;
        file: Blob;
        onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
      }) => {
        if (args.file.size > MAX_FILE_SIZE) {
          throw new Error('UPLOAD_BIG_FILES');
        }

        return uploadItemThumbnail(args);
      },
      onSuccess: () => {
        notifier?.({
          type: uploadItemThumbnailRoutine.SUCCESS,
          payload: { message: 'UPLOAD_ITEM_THUMBNAIL' },
        });
      },
      onError: (error: Error) => {
        notifier?.({
          type: uploadItemThumbnailRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: (_data, _error, { id }) => {
        // invalidate item to update settings.hasThumbnail
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(id).content,
        });
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(id).allThumbnails,
        });
      },
    });
  };

export const useDeleteItemThumbnail =
  (queryConfig: QueryClientConfig) => () => {
    const { notifier } = queryConfig;
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (itemId: UUID) => deleteItemThumbnail(itemId),
      onSuccess: () => {
        notifier?.({
          type: deleteItemThumbnailRoutine.SUCCESS,
          payload: { message: 'DELETE_ITEM_THUMBNAIL' },
        });
      },
      onError: (error: Error) => {
        notifier?.({
          type: deleteItemThumbnailRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: (_data, _error, id) => {
        // invalidateQueries doesn't invalidate if the query is disabled
        // so reset the query to avoid issues in the frontend (getting dirty cache).
        queryClient.resetQueries({
          queryKey: itemKeys.single(id).allThumbnails,
        });
        // try to invalidate the thumbnail (the invalidateQueries doesn't invalidate disabled queries)
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(id).allThumbnails,
        });
        // invalidate item to update settings.hasThumbnail
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(id).content,
        });
      },
    });
  };
