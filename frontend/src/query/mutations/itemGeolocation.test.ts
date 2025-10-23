import { HttpMethod } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { v4 } from 'uuid';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { itemKeys, itemsWithGeolocationKeys } from '../keys.js';
import { buildPutItemGeolocationRoute } from '../routes.js';
import {
  deleteItemGeolocationRoutine,
  putItemGeolocationRoutine,
} from '../routines/itemGeolocation.js';
import { ITEM_GEOLOCATION, UNAUTHORIZED_RESPONSE } from '../test/constants.js';
import { mockMutation, setUpTest } from '../test/utils.js';

const mockedNotifier = vi.fn();
const { wrapper, queryClient, mutations } = setUpTest({
  notifier: mockedNotifier,
});

describe('Item Flag Mutations', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });

  describe('usePutItemGeolocation', () => {
    const itemId = v4();
    const key = itemKeys.single(itemId).geolocation;
    const route = `/${buildPutItemGeolocationRoute(itemId)}`;
    const mutation = mutations.usePutItemGeolocation;
    const singleKey = itemsWithGeolocationKeys.inBounds({
      lat1: 0,
      lng1: 0,
      lat2: 1,
      lng2: 1,
    });

    it('Put item geolocation', async () => {
      // set some starting data
      queryClient.setQueryData(key, ITEM_GEOLOCATION);
      queryClient.setQueryData(singleKey, [ITEM_GEOLOCATION]);

      const response = {};

      const endpoints = [
        {
          response,
          method: HttpMethod.Put,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({
        geolocation: {
          lat: 1,
          lng: 1,
          addressLabel: 'address',
          country: 'country',
        },
        itemId,
      });

      expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      expect(queryClient.getQueryState(singleKey)?.isInvalidated).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: putItemGeolocationRoutine.SUCCESS,
        payload: { message: 'PUT_ITEM_GEOLOCATION' },
      });
    });

    it('Put item geolocation without address and country', async () => {
      // set some starting data
      queryClient.setQueryData(key, ITEM_GEOLOCATION);
      queryClient.setQueryData(singleKey, [ITEM_GEOLOCATION]);

      const response = {};

      const endpoints = [
        {
          response,
          method: HttpMethod.Put,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({
        geolocation: { lat: 1, lng: 1 },
        itemId,
      });

      expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      expect(queryClient.getQueryState(singleKey)?.isInvalidated).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: putItemGeolocationRoutine.SUCCESS,
        payload: { message: 'PUT_ITEM_GEOLOCATION' },
      });
    });

    it('Put item geolocation with helper text and lat and lng', async () => {
      // set some starting data
      queryClient.setQueryData(key, ITEM_GEOLOCATION);
      queryClient.setQueryData(singleKey, [ITEM_GEOLOCATION]);

      const response = {};

      const endpoints = [
        {
          response,
          method: HttpMethod.Put,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({
        geolocation: { lat: 1, lng: 2, helperLabel: 'helperlabel' },
        itemId,
      });

      expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      expect(queryClient.getQueryState(singleKey)?.isInvalidated).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: putItemGeolocationRoutine.SUCCESS,
        payload: { message: 'PUT_ITEM_GEOLOCATION' },
      });
    });

    it('Unauthorized to put item geolocation', async () => {
      // set some starting data
      queryClient.setQueryData(key, ITEM_GEOLOCATION);
      queryClient.setQueryData(singleKey, [ITEM_GEOLOCATION]);

      const endpoints = [
        {
          response: UNAUTHORIZED_RESPONSE,
          statusCode: StatusCodes.UNAUTHORIZED,
          method: HttpMethod.Put,
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
          geolocation: { lat: 1, lng: 1 },
          itemId,
        }),
      ).rejects.toThrow();

      expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      expect(queryClient.getQueryState(singleKey)?.isInvalidated).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith(
        expect.objectContaining({
          type: putItemGeolocationRoutine.FAILURE,
          payload: { error: expect.anything() },
        }),
      );
    });
  });

  describe('useDeleteItemGeolocation', () => {
    const itemId = v4();
    const key = itemKeys.single(itemId).geolocation;
    const route = `/${buildPutItemGeolocationRoute(itemId)}`;
    const mutation = mutations.useDeleteItemGeolocation;
    const singleKey = itemsWithGeolocationKeys.inBounds({
      lat1: 0,
      lng1: 0,
      lat2: 1,
      lng2: 1,
    });

    it('Delete item geolocation', async () => {
      // set some starting data
      queryClient.setQueryData(key, ITEM_GEOLOCATION);
      queryClient.setQueryData(singleKey, [ITEM_GEOLOCATION]);

      const response = {};

      const endpoints = [
        {
          response,
          method: HttpMethod.Delete,
          route,
        },
      ];

      const mockedMutation = await mockMutation({
        endpoints,
        mutation,
        wrapper,
      });

      await mockedMutation.mutateAsync({ itemId });

      expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      expect(queryClient.getQueryState(singleKey)?.isInvalidated).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith({
        type: deleteItemGeolocationRoutine.SUCCESS,
        payload: { message: 'DELETE_ITEM_GEOLOCATION' },
      });
    });

    it('Unauthorized to delete item geolocation', async () => {
      // set some starting data
      queryClient.setQueryData(key, ITEM_GEOLOCATION);
      queryClient.setQueryData(singleKey, [ITEM_GEOLOCATION]);

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

      await expect(mockedMutation.mutateAsync({ itemId })).rejects.toThrow();

      expect(queryClient.getQueryState(key)?.isInvalidated).toBeTruthy();
      expect(queryClient.getQueryState(singleKey)?.isInvalidated).toBeTruthy();
      expect(mockedNotifier).toHaveBeenCalledWith(
        expect.objectContaining({
          type: deleteItemGeolocationRoutine.FAILURE,
          payload: { error: expect.anything() },
        }),
      );
    });
  });
});
