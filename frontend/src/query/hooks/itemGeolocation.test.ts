/* eslint-disable react-hooks/rules-of-hooks */
import { StatusCodes } from 'http-status-codes';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  buildAddressFromCoordinatesKey,
  buildSuggestionsForAddressKey,
  itemKeys,
  itemsWithGeolocationKeys,
} from '../keys.js';
import {
  ITEMS_ROUTE,
  buildGetAddressFromCoordinatesRoute,
  buildGetSuggestionsForAddressRoute,
} from '../routes.js';
import { ITEM_GEOLOCATION, UNAUTHORIZED_RESPONSE } from '../test/constants.js';
import { mockHook, setUpTest } from '../test/utils.js';
import {
  useAddressFromGeolocation,
  useItemGeolocation,
  useItemsInMap,
  useSuggestionsForAddress,
} from './itemGeolocation.js';

const { wrapper, queryClient } = setUpTest();

describe('useItemGeolocation', () => {
  const response = ITEM_GEOLOCATION;
  const itemId = response.item.id;
  const route = `/${ITEMS_ROUTE}/${itemId}/geolocation`;
  const hook = () => useItemGeolocation(response.item.id);
  const key = itemKeys.single(itemId).geolocation;
  const endpoints = [{ route, response }];

  beforeEach(() => {
    queryClient.clear();
  });

  it(`Retrieve geolocation of item`, async () => {
    const { data, isSuccess } = await mockHook({ endpoints, hook, wrapper });

    expect(isSuccess).toBeTruthy();
    expect(data).toEqual(response);

    // verify cache keys
    expect(queryClient.getQueryData(key)).toMatchObject(response);
  });

  it(`Undefined id does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints,
      hook,
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Unauthorized`, async () => {
    const { data, isError } = await mockHook({
      hook,
      wrapper,
      endpoints: [
        {
          route,
          response: UNAUTHORIZED_RESPONSE,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
      ],
    });

    expect(data).toBeFalsy();
    expect(isError).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});

describe('useAddressFromGeolocation', () => {
  const response = { addressLabel: 'display_name' };
  const payload = { lat: 1, lng: 1, lang: 'en' };
  const route = `/${buildGetAddressFromCoordinatesRoute(payload)}`;
  const endpoints = [{ route, response }];

  const hook = () => useAddressFromGeolocation(payload);
  const key = buildAddressFromCoordinatesKey(payload);

  beforeEach(() => {
    queryClient.clear();
  });

  it(`Retrieve address for coordinates`, async () => {
    const { data, isSuccess } = await mockHook({
      endpoints,
      hook,
      wrapper,
    });

    expect(data).toEqual(response);
    expect(isSuccess).toBeTruthy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toMatchObject(response);
  });

  it(`Undefined lat does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () =>
        useAddressFromGeolocation({
          lng: 1,
          lat: undefined!,
        }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Undefined lng does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () =>
        useAddressFromGeolocation({
          lat: 1,
          lng: undefined!,
        }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`enabled=false does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () =>
        useAddressFromGeolocation({ lat: 1, lng: 2 }, { enabled: false }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});

describe.skip('useSuggestionsForAddress', () => {
  const response = { addressLabel: 'display_name' };
  const payload = { address: 'address', lang: 'en' };

  const route = `/${buildGetSuggestionsForAddressRoute(payload)}`;
  const endpoints = [{ route, response }];

  const hook = () => useSuggestionsForAddress(payload);
  const key = buildSuggestionsForAddressKey(payload);

  beforeEach(() => {
    queryClient.clear();
  });

  it(`Retrieve suggestions for address`, async () => {
    const { data, isSuccess } = await mockHook({
      endpoints,
      hook,
      wrapper,
    });

    expect(data).toEqual(response);
    expect(isSuccess).toBeTruthy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toMatchObject(response);
  });

  it(`Undefined address does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () => useSuggestionsForAddress({ address: undefined }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`enabled=false does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () =>
        useSuggestionsForAddress({ address: 'address' }, { enabled: false }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});

describe('useItemsInMap', () => {
  const response = [ITEM_GEOLOCATION];
  const values = { lat1: 1, lat2: 1, lng1: 1, lng2: 1 };
  const route = `/${ITEMS_ROUTE}/geolocation?lat1=1&lat2=1&lng1=1&lng2=1`;
  const hook = () => useItemsInMap(values);
  const key = itemsWithGeolocationKeys.inBounds(values);
  const endpoints = [{ route, response }];

  beforeEach(() => {
    queryClient.clear();
  });

  it(`Retrieve geolocation of item`, async () => {
    const { data, isSuccess } = await mockHook({ endpoints, hook, wrapper });

    expect(isSuccess).toBeTruthy();
    expect(data).toEqual(response);

    // verify cache keys
    expect(queryClient.getQueryData(key)).toMatchObject(response);
  });

  it(`Retrieve geolocation for search`, async () => {
    const keywords = ['here'];
    const { data, isSuccess } = await mockHook({
      endpoints: [
        {
          route: `/${ITEMS_ROUTE}/geolocation?lat1=1&lat2=1&lng1=1&lng2=1&keywords=${keywords[0]}`,
          response,
        },
      ],
      hook: () => useItemsInMap({ ...values, keywords }),
      wrapper,
    });

    expect(isSuccess).toBeTruthy();
    expect(data).toEqual(response);

    // verify cache keys
    expect(
      queryClient.getQueryData(
        itemsWithGeolocationKeys.inBounds({ ...values, keywords }),
      ),
    ).toMatchObject(response);
  });

  it(`Retrieve geolocation for lat1=0`, async () => {
    const valuesAndLat1IsZero = { ...values, lat1: 0 };
    const { data, isSuccess } = await mockHook({
      endpoints: [
        {
          route: `/${ITEMS_ROUTE}/geolocation?lat1=0&lat2=1&lng1=1&lng2=1`,
          response,
        },
      ],
      hook: () => useItemsInMap(valuesAndLat1IsZero),
      wrapper,
    });

    expect(isSuccess).toBeTruthy();
    expect(data).toEqual(response);

    // verify cache keys
    expect(
      queryClient.getQueryData(
        itemsWithGeolocationKeys.inBounds(valuesAndLat1IsZero),
      ),
    ).toMatchObject(response);
  });

  it(`Undefined lat1 does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints: [
        { route: `/${ITEMS_ROUTE}/geolocation?lat2=1&lng1=1&lng2=1`, response },
      ],
      hook: () => useItemsInMap({ ...values, lat1: undefined }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Undefined lat2 does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints: [
        { route: `/${ITEMS_ROUTE}/geolocation?lat1=1&lng1=1&lng2=1`, response },
      ],
      hook: () => useItemsInMap({ ...values, lat2: undefined! }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Undefined lng1 does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints: [
        { route: `/${ITEMS_ROUTE}/geolocation?lat1=1&lat2=1&lng2=1`, response },
      ],
      hook: () => useItemsInMap({ ...values, lng1: undefined! }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Undefined lng2 does not fetch`, async () => {
    const { data, isFetched } = await mockHook({
      endpoints: [
        { route: `/${ITEMS_ROUTE}/geolocation?lat1=1&lat2=1&lng1=1`, response },
      ],
      hook: () => useItemsInMap({ ...values, lng2: undefined! }),
      wrapper,
      enabled: false,
    });

    expect(isFetched).toBeFalsy();
    expect(data).toBeFalsy();

    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Unauthorized`, async () => {
    const { data, isError } = await mockHook({
      hook,
      wrapper,
      endpoints: [
        {
          route,
          response: UNAUTHORIZED_RESPONSE,
          statusCode: StatusCodes.UNAUTHORIZED,
        },
      ],
    });

    expect(data).toBeFalsy();
    expect(isError).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});
