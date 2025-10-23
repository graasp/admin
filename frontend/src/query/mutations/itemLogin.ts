import { ItemLoginSchemaStatus, ItemLoginSchemaType, UUID } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api/itemLogin.js';
import { itemKeys } from '../keys.js';
import {
  deleteItemLoginSchemaRoutine,
  postItemLoginRoutine,
  putItemLoginSchemaRoutine,
} from '../routines/itemLogin.js';
import type { QueryClientConfig } from '../types.js';

export default (queryConfig: QueryClientConfig) => {
  const { notifier } = queryConfig;

  const usePostItemLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: {
        itemId: UUID;
        username?: string;
        memberId?: UUID;
        password?: string;
      }) => Api.postItemLoginSignIn(payload),
      onError: (error: Error) => {
        notifier?.({
          type: postItemLoginRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: () => {
        // reset all queries when trying to sign in
        queryClient.resetQueries();
      },
    });
  };

  const usePutItemLoginSchema = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: {
        itemId: UUID;
        type?: ItemLoginSchemaType;
        status?: ItemLoginSchemaStatus;
      }) => Api.putItemLoginSchema(payload),
      onSuccess: () => {
        notifier?.({
          type: putItemLoginSchemaRoutine.SUCCESS,
          payload: { message: 'PUT_ITEM_LOGIN_SCHEMA' },
        });
      },
      onError: (error: Error) => {
        notifier?.({
          type: putItemLoginSchemaRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: (_data, _error, { itemId }) => {
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).itemLoginSchema.content,
        });
      },
    });
  };

  const useDeleteItemLoginSchema = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (payload: { itemId: UUID }) =>
        Api.deleteItemLoginSchema(payload),
      onSuccess: (_, { itemId }) => {
        notifier?.({
          type: deleteItemLoginSchemaRoutine.SUCCESS,
          payload: { message: 'DELETE_ITEM_LOGIN_SCHEMA' },
        });

        // delete content of item login schema
        queryClient.resetQueries({
          queryKey: itemKeys.single(itemId).itemLoginSchema.content,
        });
      },
      onError: (error: Error) => {
        notifier?.({
          type: deleteItemLoginSchemaRoutine.FAILURE,
          payload: { error },
        });
      },
      onSettled: (_data, _error, { itemId }) => {
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).itemLoginSchema.content,
        });
        queryClient.invalidateQueries({
          queryKey: itemKeys.single(itemId).memberships,
        });
      },
    });
  };

  return {
    usePostItemLogin,
    usePutItemLoginSchema,
    useDeleteItemLoginSchema,
  };
};
