import { useState } from 'react';

import { ItemType, PackedItem, Paginated } from '@graasp/sdk';

import { waitFor } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { afterEach, describe, expect, it } from 'vitest';

import { itemKeys } from '../../keys.js';
import {
  UNAUTHORIZED_RESPONSE,
  generateFolders,
} from '../../test/constants.js';
import { mockEndpoints, mockHook, setUpTest } from '../../test/utils.js';
import { buildGetAccessibleItems } from '../routes.js';

const { hooks, wrapper, queryClient } = setUpTest();

describe('useAccessibleItems', () => {
  afterEach(async () => {
    // cancel in flight queries before clearing the query-client
    await queryClient.cancelQueries();
    queryClient.clear();
    // only once the query client is cleared we clear nock, ensuring no requests are cut short
    nock.cleanAll();
  });

  const params = {};
  const pagination = {};
  const route = `/${buildGetAccessibleItems(params, pagination)}`;
  const items = generateFolders();
  const response = { data: items };
  const hook = () => hooks.useAccessibleItems();
  const key = itemKeys.accessiblePage(params, pagination);

  it(`Receive accessible items`, async () => {
    const endpoints = [{ route, response }];
    const { data } = await mockHook({ endpoints, hook, wrapper });

    expect(data).toMatchObject(response);
    // verify cache keys
    expect(queryClient.getQueryData(key)).toMatchObject(response);
  });

  it(`Route constructed correctly for accessible folders`, async () => {
    const typesParams = { types: [ItemType.FOLDER] };
    const url = `/${buildGetAccessibleItems(typesParams, {})}`;
    const urlObject = new URL(url, 'https://no-existing-url.tmp');
    const queryParams = urlObject.searchParams;
    const typesValue = queryParams.get('types');

    expect(typesValue).toEqual(ItemType.FOLDER);
  });

  it(`Receive accessible folders for search`, async () => {
    const keywords = 'search search1';
    const keyForSearch = itemKeys.accessiblePage({ keywords }, pagination);
    const endpoints = [
      {
        route: `/${buildGetAccessibleItems({ keywords }, { page: 1 })}`,
        response,
      },
    ];
    const { data } = await mockHook({
      endpoints,
      hook: () => hooks.useAccessibleItems({ keywords }),
      wrapper,
    });
    expect(data).toMatchObject(response);
    // verify cache keys
    expect(queryClient.getQueryData(keyForSearch)).toMatchObject(response);
  });

  it(`Unauthorized`, async () => {
    const endpoints = [
      {
        route,
        response: UNAUTHORIZED_RESPONSE,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
    ];
    const { data, isError } = await mockHook({
      hook,
      endpoints,
      wrapper,
    });

    expect(data).toBeFalsy();
    expect(isError).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});

describe('useInfiniteAccessibleItems', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });
  const params = {};
  const pageSize = 5;
  const route = `/${buildGetAccessibleItems(params, { page: 1, pageSize })}`;
  const items = generateFolders(pageSize);
  const response = { data: items };
  const key = itemKeys.infiniteAccessible(params);

  it(`Receive accessible items`, async () => {
    const endpoints = [{ route, response }];
    const hook = () =>
      hooks.useInfiniteAccessibleItems(params, { page: 1, pageSize });
    const { data } = await mockHook({ endpoints, hook, wrapper });
    expect(data!.pages[0]).toMatchObject(response);
    // verify cache keys
    expect(
      queryClient.getQueryData<{ pages: Paginated<PackedItem>[] }>(key)!
        .pages[0],
    ).toMatchObject(response);
  });

  it(`calling nextPage accumulate items`, async () => {
    const hook = () =>
      hooks.useInfiniteAccessibleItems(params, { page: 1, pageSize });
    const endpoints = [
      { route, response },
      {
        route: `/${buildGetAccessibleItems(params, { pageSize, page: 2 })}`,
        response,
      },
    ];
    // cannot use mockHook because it prevents getting updated data
    mockEndpoints(endpoints, true);
    // wait for rendering hook
    const { result } = renderHook(hook, { wrapper });

    await waitFor(() =>
      expect(result.current.isSuccess || result.current.isError).toBe(true),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });
    await waitFor(() =>
      expect(result.current.data?.pages.flatMap((p) => p.data).length).toEqual(
        items.length * 2,
      ),
    );
  });

  it(`Reset on change param`, async () => {
    const creatorId = 'old';
    const route1 = `/${buildGetAccessibleItems({ ...params, creatorId }, { page: 1, pageSize })}`;
    const route2 = `/${buildGetAccessibleItems({ ...params, creatorId }, { page: 2, pageSize })}`;
    const newCreatorId = 'new';
    const route3 = `/${buildGetAccessibleItems({ ...params, creatorId: newCreatorId }, { page: 1, pageSize })}`;
    const endpoints = [
      { route: route1, response },
      { route: route2, response },
      { route: route3, response },
    ];
    // cannot use mockHook because it prevents getting updated data
    mockEndpoints(endpoints, true);

    // // wait for rendering hook
    const { result } = renderHook(
      () => {
        const [c, setCreatorId] = useState(creatorId);
        const res = hooks.useInfiniteAccessibleItems(
          { creatorId: c },
          { pageSize },
        );
        return { ...res, setCreatorId };
      },
      { wrapper },
    );

    await waitFor(() =>
      expect(result.current.isSuccess || result.current.isError).toBe(true),
    );

    await act(async () => {
      await result.current.fetchNextPage();
    });
    await waitFor(() => {
      expect(result.current.data!.pages.length).toEqual(2);
    });

    // changing creator id reset items
    act(() => {
      result.current.setCreatorId(newCreatorId);
    });

    await waitFor(() => expect(result.current.data!.pages.length).toEqual(1));
  });

  it(`Unauthorized`, async () => {
    const hook = () =>
      hooks.useInfiniteAccessibleItems(params, { page: 1, pageSize });
    const endpoints = [
      {
        route,
        response: UNAUTHORIZED_RESPONSE,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
    ];
    const { isError } = await mockHook({
      hook,
      wrapper,
      endpoints,
    });

    expect(isError).toBeTruthy();
  });

  it(`Route constructed correctly for accessible folders`, async () => {
    const typesParams = { types: [ItemType.FOLDER] };
    const url = `/${buildGetAccessibleItems(typesParams, {})}`;
    const urlObject = new URL(url, 'https://no-existing-url.tmp');
    const queryParams = urlObject.searchParams;
    const typesValue = queryParams.get('types');
    expect(typesValue).toEqual(ItemType.FOLDER);
  });
});
