// todo: remove this ignore once the queries are refactored
/* eslint-disable react-hooks/rules-of-hooks */
import {
  DiscriminatedItem,
  MAX_FILE_SIZE,
  MAX_NUMBER_OF_FILES_UPLOAD,
  partitionArray,
} from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';

import {
  getKeyForParentId,
  itemKeys,
  itemsWithGeolocationKeys,
} from '../../keys.js';
import { QueryClientConfig } from '../../types.js';
import {
  PostItemPayloadType,
  PostItemWithThumbnailPayloadType,
} from '../api.js';
import { createItemRoutine, uploadFilesRoutine } from '../routines.js';
import { postItem, postItemWithThumbnail, uploadFiles } from './api.js';

export const usePostItem = (queryConfig: QueryClientConfig) => () => {
  const queryClient = useQueryClient();
  const { notifier } = queryConfig;
  return useMutation({
    mutationFn: async (
      item: PostItemPayloadType | PostItemWithThumbnailPayloadType,
    ) => {
      // check if thumbnail was provided and if it is defined
      if ('thumbnail' in item && item.thumbnail) {
        return postItemWithThumbnail(item);
      }
      return postItem(item);
    },
    //  we cannot optimistically add an item because we need its id
    onSuccess: () => {
      notifier?.({
        type: createItemRoutine.SUCCESS,
        payload: { message: 'CREATE_ITEM' },
      });
    },
    onError: (error: Error) => {
      notifier?.({ type: createItemRoutine.FAILURE, payload: { error } });
    },
    onSettled: (_data, _error, { geolocation, parentId }) => {
      const key = getKeyForParentId(parentId);
      queryClient.invalidateQueries({ queryKey: key });

      // invalidate descendants for tree
      if (parentId) {
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(parentId).descendants(),
        });
      }

      // if item has geolocation, invalidate map related keys
      if (geolocation) {
        queryClient.invalidateQueries({
          queryKey: itemsWithGeolocationKeys.allBounds,
        });
      }
    },
  });
};

/**
 * Mutation to upload files
 * bug: currently the backend only support one file at a time, when improving this we need to handle the resultOf's errors
 * @param queryConfig
 */
export const useUploadFiles = (queryConfig: QueryClientConfig) => () => {
  const queryClient = useQueryClient();
  const { notifier } = queryConfig;
  return useMutation({
    mutationFn: async (args: {
      id?: DiscriminatedItem['id'];
      files: File[];
      previousItemId?: DiscriminatedItem['id'];
      onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
    }) => {
      // filter out big files to not upload them
      const [validFiles, bigFiles] = partitionArray(
        args.files,
        ({ size }) => size < MAX_FILE_SIZE,
      );

      if (bigFiles.length) {
        // we only notify, we can continue with the valid files
        notifier?.({
          type: uploadFilesRoutine.FAILURE,
          payload: {
            error: new Error('UPLOAD_BIG_FILES'),
          },
        });
      }

      if (!validFiles.length) {
        throw new Error('UPLOAD_EMPTY_FILE');
      }

      if (validFiles.length > MAX_NUMBER_OF_FILES_UPLOAD) {
        throw new Error('UPLOAD_TOO_MANY_FILES');
      }

      return uploadFiles({ ...args, files: validFiles });
    },
    onSuccess: () => {
      notifier?.({
        type: uploadFilesRoutine.SUCCESS,
        payload: { message: 'UPLOAD_FILES' },
      });
    },
    onError: (error: Error) => {
      notifier?.({
        type: uploadFilesRoutine.FAILURE,
        payload: { error },
      });
    },
    onSettled: (_data, _error, { id }) => {
      const parentKey = getKeyForParentId(id);
      queryClient.invalidateQueries({ queryKey: parentKey });
    },
  });
};
