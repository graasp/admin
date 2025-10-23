import {
  AccountFactory,
  FolderItemFactory,
  HttpMethod,
  getIdsFromPath,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { itemKeys } from '../keys.js';
import {
  buildDeleteItemVisibilityRoute,
  buildPostItemVisibilityRoute,
} from '../routes.js';
import {
  deleteItemVisibilityRoutine,
  postItemVisibilityRoutine,
} from '../routines/itemVisibility.js';
import { ITEM_VISIBILITIES, UNAUTHORIZED_RESPONSE } from '../test/constants.js';
import { mockMutation, setUpTest } from '../test/utils.js';

const mockedNotifier = vi.fn();
const { wrapper, queryClient, mutations } = setUpTest({
  notifier: mockedNotifier,
});

describe('Item Visibility Mutations', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });

  describe('usePostItemVisibility', () => {
    const itemId = FolderItemFactory().id;
    const creator = AccountFactory().id;
    const visibilityType = 'hidden';
    const route = `/${buildPostItemVisibilityRoute({ itemId, type: visibilityType })}`;
    const mutation = mutations.usePostItemVisibility;
    const itemVisibilityKey = itemKeys.single(itemId).visibilities;

    it('Post item visibility', async () => {
      queryClient.setQueryData(itemVisibilityKey, ITEM_VISIBILITIES);

      const endpoints = [
        {
          response: {},
          method: HttpMethod.Post,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({
        itemId,
        type: visibilityType,
        creator,
      });

      expect(
        queryClient.getQueryState(itemVisibilityKey)?.isInvalidated,
      ).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: postItemVisibilityRoutine.SUCCESS,
        payload: { message: 'POST_ITEM_VISIBILITY' },
      });
    });

    it('Unauthorized to post item visibility', async () => {
      queryClient.setQueryData(itemVisibilityKey, ITEM_VISIBILITIES);

      const endpoints = [
        {
          response: UNAUTHORIZED_RESPONSE,
          statusCode: StatusCodes.UNAUTHORIZED,
          method: HttpMethod.Post,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await expect(
        mockedMutation.mutateAsync({
          itemId,
          type: visibilityType,
          creator,
        }),
      ).rejects.toThrow();

      expect(
        queryClient.getQueryState(itemVisibilityKey)?.isInvalidated,
      ).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith(
        expect.objectContaining({
          type: postItemVisibilityRoutine.FAILURE,
        }),
      );
    });
  });

  describe('useDeleteItemVisibility', () => {
    const visibility = ITEM_VISIBILITIES[0];
    const { itemPath, type: visibilityType } = visibility;
    const itemId = getIdsFromPath(itemPath).at(-1)!;
    const route = `/${buildDeleteItemVisibilityRoute({ itemId, type: visibilityType })}`;
    const mutation = mutations.useDeleteItemVisibility;
    const itemVisibilityKey = itemKeys.single(itemId).visibilities;

    it('Delete item visibility', async () => {
      queryClient.setQueryData(itemVisibilityKey, ITEM_VISIBILITIES);

      const endpoints = [
        {
          response: {},
          method: HttpMethod.Delete,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({ itemId, type: visibilityType });

      const data = queryClient.getQueryState(itemVisibilityKey);
      expect(data?.isInvalidated).toBeTruthy();
      expect(data?.data).toMatchObject(
        ITEM_VISIBILITIES.filter(({ type }) => type !== visibilityType),
      );
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: deleteItemVisibilityRoutine.SUCCESS,
        payload: { message: 'DELETE_ITEM_VISIBILITY' },
      });
    });

    it('Unauthorized to delete item visibility', async () => {
      queryClient.setQueryData(itemVisibilityKey, ITEM_VISIBILITIES);

      const endpoints = [
        {
          response: UNAUTHORIZED_RESPONSE,
          statusCode: StatusCodes.UNAUTHORIZED,
          method: HttpMethod.Delete,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await expect(
        mockedMutation.mutateAsync({ itemId, type: visibilityType }),
      ).rejects.toThrow();

      const data = queryClient.getQueryState(itemVisibilityKey);
      expect(data?.isInvalidated).toBeTruthy();
      expect(data?.data).toEqual(ITEM_VISIBILITIES);
      expect(mockedNotifier).toHaveBeenCalledWith(
        expect.objectContaining({
          type: deleteItemVisibilityRoutine.FAILURE,
        }),
      );
    });
  });
});
