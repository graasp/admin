import {
  FileItemFactory,
  FolderItemFactory,
  FolderItemType,
  ItemType,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { afterEach, describe, expect, it } from 'vitest';

import { itemKeys } from '../keys.js';
import {
  THUMBNAIL_URL_RESPONSE,
  UNAUTHORIZED_RESPONSE,
  generateFolders,
} from '../test/constants.js';
import { Endpoint, mockHook, setUpTest } from '../test/utils.js';
import {
  buildDownloadFilesRoute,
  buildGetChildrenRoute,
  buildGetItemParents,
  buildGetItemRoute,
} from './routes.js';

const { hooks, wrapper, queryClient } = setUpTest();

// skip useChildren hook tests because they fail with a `window is not defined` error due to the use of `window.location` in the useDebounce hook.
describe.skip('useChildren', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });
  const id = 'item-id';
  const params = { ordered: true };
  const route = `/${buildGetChildrenRoute(id, params)}`;
  const response = generateFolders();
  const key = itemKeys.single(id).children({ ordered: true });

  it(`Receive children of item by id`, async () => {
    const hook = () => hooks.useChildren(id);
    const endpoints = [{ route, response }];
    const { data, isSuccess } = await mockHook({
      endpoints,
      hook,
      wrapper,
    });

    expect(data).toMatchObject(response);
    expect(isSuccess).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toEqual(response);
  });

  it(`Route constructed correctly for children folders`, async () => {
    const typesParams = { types: [ItemType.FOLDER] };
    const url = `/${buildGetChildrenRoute(id, typesParams)}`;
    const urlObject = new URL(url, 'https://no-existing-url.tmp');
    const queryParams = urlObject.searchParams;
    const typesValue = queryParams.get('types');

    expect(typesValue).toEqual(ItemType.FOLDER);
  });

  it(`Undefined id does not fetch`, async () => {
    const hook = () => hooks.useChildren(undefined);
    const endpoints = [{ route, response }];
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
    for (const item of response) {
      expect(
        queryClient.getQueryData(itemKeys.single(item.id).content),
      ).toBeFalsy();
    }
  });

  it(`enabled=false does not fetch`, async () => {
    const hook = () => hooks.useChildren(id, {}, { enabled: false });
    const endpoints = [{ route, response }];
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
    for (const item of response) {
      expect(
        queryClient.getQueryData(itemKeys.single(item.id).content),
      ).toBeFalsy();
    }
  });

  it(`ordered=false fetch children`, async () => {
    const unorderedRoute = `/${buildGetChildrenRoute(id, {
      ordered: false,
    })}`;
    const keyUnordered = itemKeys.single(id).children({ ordered: false });
    const hook = () => hooks.useChildren(id, { ordered: false });
    const endpoints = [{ route: unorderedRoute, response }];
    const { data, isSuccess } = await mockHook({
      endpoints,
      hook,
      wrapper,
    });

    expect(isSuccess).toBeTruthy();
    expect(data).toMatchObject(response);
    // verify cache keys
    expect(queryClient.getQueryData(keyUnordered)).toMatchObject(response);
  });

  it(`search by keywords`, async () => {
    const keywords = 'search search1';
    const keyWithSearch = itemKeys
      .single(id)
      .children({ ordered: true, keywords });
    const searchRoute = `/${buildGetChildrenRoute(id, {
      keywords,
      ordered: true,
    })}`;
    const hook = () => hooks.useChildren(id, { keywords });
    const endpoints = [{ route: searchRoute, response }];
    const { data, isSuccess } = await mockHook({
      endpoints,
      hook,
      wrapper,
    });

    expect(isSuccess).toBeTruthy();
    expect(data).toMatchObject(response);
    // verify cache keys
    expect(queryClient.getQueryData(keyWithSearch)).toMatchObject(response);
  });

  it(`Unauthorized`, async () => {
    const endpoints = [
      {
        route: `/${buildGetChildrenRoute(id, { ordered: true })}`,
        response: UNAUTHORIZED_RESPONSE,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
    ];
    const { data, isError } = await mockHook({
      endpoints,
      hook: () => hooks.useChildren(id),
      wrapper,
    });

    expect(data).toBeFalsy();
    expect(isError).toBeTruthy();
    // verify cache keys
    expect(
      queryClient.getQueryData(itemKeys.single(id).children()),
    ).toBeFalsy();
  });
});

describe('useParents', () => {
  afterEach(async () => {
    // cancel in flight queries before clearing the query-client
    await queryClient.cancelQueries();
    queryClient.clear();
    // only once the query client is cleared we clear nock, ensuring no requests are cut short
    nock.cleanAll();
  });

  const response = generateFolders();
  const childItem: FolderItemType = FolderItemFactory({
    id: 'child-item-id',
    path: [...response.map(({ id }) => id), 'child_item_id'].join('.'),
  });

  it(`Receive parents of item by id`, async () => {
    const hook = () => hooks.useParents({ id: childItem.id, enabled: true });

    // build endpoint for each item
    const endpoints = [
      {
        route: `/${buildGetItemParents(childItem.id)}`,
        response,
      },
    ];
    const { data } = await mockHook({ endpoints, hook, wrapper });

    expect(data).toMatchObject(response);
    // verify cache keys
    expect(
      queryClient.getQueryData(itemKeys.single(childItem.id).parents),
    ).toMatchObject(response);
  });

  it(`enabled=false does not fetch parents`, async () => {
    // build endpoint for each item
    const endpoints = [
      {
        route: `/${buildGetItemParents(childItem.id)}`,
        response,
      },
    ];
    const { data, isFetched } = await mockHook({
      hook: () => hooks.useParents({ id: childItem.id, enabled: false }),
      endpoints,
      wrapper,
      enabled: false,
    });

    expect(data).toBeFalsy();
    expect(isFetched).toBeFalsy();
    expect(
      queryClient.getQueryData(itemKeys.single(childItem.id).parents),
    ).toBeFalsy();
    // verify cache keys
    for (const i of response) {
      expect(
        queryClient.getQueryData(itemKeys.single(i.id).content),
      ).toBeFalsy();
    }
  });

  it(`Unauthorized`, async () => {
    // build endpoint for each item
    const endpoints = [
      {
        route: `/${buildGetItemParents(childItem.id)}`,
        response: UNAUTHORIZED_RESPONSE,
        statusCode: StatusCodes.UNAUTHORIZED,
      },
    ];
    const { data, isError } = await mockHook({
      hook: () => hooks.useParents({ id: childItem.id, enabled: true }),
      endpoints,
      wrapper,
    });

    expect(data).toBeFalsy();
    expect(isError).toBeTruthy();
    expect(
      queryClient.getQueryData(itemKeys.single(childItem.id).parents),
    ).toBeFalsy();
    // verify cache keys
    for (const i of response) {
      expect(
        queryClient.getQueryData(itemKeys.single(i.id).content),
      ).toBeFalsy();
    }
  });
});

describe('useItem', () => {
  afterEach(async () => {
    // cancel in flight queries before clearing the query-client
    await queryClient.cancelQueries();
    queryClient.clear();
    // only once the query client is cleared we clear nock, ensuring no requests are cut short
    nock.cleanAll();
  });

  const response = FolderItemFactory();
  const { id } = response;
  const route = `/${buildGetItemRoute(id)}`;
  const hook = () => hooks.useItem(id);
  const key = itemKeys.single(id).content;

  it(`Receive item by id`, async () => {
    const endpoints = [{ route, response }];
    const { data } = await mockHook({ endpoints, hook, wrapper });

    expect(data).toMatchObject(response);
    // verify cache keys
    expect(queryClient.getQueryData(key)).toMatchObject(response);
  });

  it(`Undefined id does not fetch`, async () => {
    const endpoints = [{ route, response }];
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () => hooks.useItem(undefined),
      wrapper,
      enabled: false,
    });

    expect(data).toBeFalsy();
    expect(isFetched).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
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

    expect(isError).toBeTruthy();
    expect(data).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});

describe('useFileContentUrl', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });

  const response = THUMBNAIL_URL_RESPONSE;
  const { id } = FileItemFactory();
  const route = `/${buildDownloadFilesRoute(id)}?replyUrl=true`;
  const hook = () => hooks.useFileContentUrl(id);
  const key = itemKeys.single(id).file({ replyUrl: true });

  it(`Receive file url`, async () => {
    const endpoints = [{ route, response }];
    const { data } = await mockHook({ endpoints, hook, wrapper });
    expect(data).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeTruthy();
  });

  it(`Undefined id does not fetch`, async () => {
    const endpoints = [{ route, response }];
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () => hooks.useFileContentUrl(undefined),
      wrapper,
      enabled: false,
    });

    expect(data).toBeFalsy();
    expect(isFetched).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`enabled=false does not fetch file`, async () => {
    // build endpoint for each item
    const endpoints: Endpoint[] = [];
    const { data, isFetched } = await mockHook({
      hook: () => hooks.useFileContentUrl(id, { enabled: false }),
      endpoints,
      wrapper,
      enabled: false,
    });

    expect(data).toBeFalsy();
    expect(isFetched).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
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

    expect(isError).toBeTruthy();
    expect(data).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});
