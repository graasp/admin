import { HttpMethod } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { itemKeys } from '../keys.js';
import { buildPostItemValidationRoute } from '../routes.js';
import { postItemValidationRoutine } from '../routines/itemValidation.js';
import {
  ITEM_VALIDATION_GROUP,
  UNAUTHORIZED_RESPONSE,
} from '../test/constants.js';
import { mockMutation, setUpTest } from '../test/utils.js';

const mockedNotifier = vi.fn();
const { wrapper, queryClient, mutations } = setUpTest({
  notifier: mockedNotifier,
});

describe('Item Validation Mutations', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });

  describe('usePostItemValidation', () => {
    const itemId = 'item-id';
    const route = `/${buildPostItemValidationRoute(itemId)}`;
    const mutation = mutations.usePostItemValidation;
    const key = itemKeys.single(itemId).validation;

    it('Post item validation', async () => {
      queryClient.setQueryData(key, ITEM_VALIDATION_GROUP);

      const endpoints = [
        {
          response: ITEM_VALIDATION_GROUP,
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
      });

      expect(mockedNotifier).toHaveBeenCalledWith({
        type: postItemValidationRoutine.SUCCESS,
      });
    });
    it('Unauthorized to post item validation', async () => {
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

      await expect(mockedMutation.mutateAsync({ itemId })).rejects.toThrow();

      expect(mockedNotifier).toHaveBeenCalledWith(
        expect.objectContaining({
          type: postItemValidationRoutine.FAILURE,
        }),
      );
    });
  });
});
