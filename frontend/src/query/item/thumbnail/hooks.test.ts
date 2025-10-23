/* eslint-disable react-hooks/rules-of-hooks */
import { FolderItemFactory, ThumbnailSize } from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import { afterEach, describe, expect, it } from 'vitest';

import { itemKeys } from '../../keys.js';
import {
  THUMBNAIL_URL_RESPONSE,
  UNAUTHORIZED_RESPONSE,
} from '../../test/constants.js';
import { mockHook, setUpTest } from '../../test/utils.js';
import { buildDownloadItemThumbnailRoute } from '../routes.js';
import { useItemThumbnailUrl } from './hooks.js';

const { wrapper, queryClient } = setUpTest();

describe('useItemThumbnailUrl', () => {
  afterEach(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    nock.cleanAll();
  });

  const item = FolderItemFactory();
  const replyUrl = true;
  const key = itemKeys.single(item.id).thumbnail({ replyUrl });
  const response = THUMBNAIL_URL_RESPONSE;
  const route = `/${buildDownloadItemThumbnailRoute({
    id: item.id,
    replyUrl,
  })}`;
  const hook = () => useItemThumbnailUrl({ id: item.id });

  it(`Receive default thumbnail`, async () => {
    const endpoints = [
      {
        route,
        response,
      },
    ];
    const { data } = await mockHook({ endpoints, hook, wrapper });

    expect(data).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeTruthy();
  });

  it(`Receive large thumbnail`, async () => {
    const size = ThumbnailSize.Large;
    const routeLarge = `/${buildDownloadItemThumbnailRoute({
      id: item.id,
      size,
      replyUrl,
    })}`;
    const hookLarge = () => useItemThumbnailUrl({ id: item.id, size });
    const keyLarge = itemKeys.single(item.id).thumbnail({ size, replyUrl });

    const endpoints = [
      {
        route: routeLarge,
        response,
      },
    ];
    const { data } = await mockHook({
      endpoints,
      hook: hookLarge,
      wrapper,
    });

    expect(data).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(keyLarge)).toBeTruthy();
  });

  it(`Undefined id does not fetch`, async () => {
    const endpoints = [
      {
        route,
        response,
      },
    ];
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () => useItemThumbnailUrl({ id: undefined }),
      wrapper,
      enabled: false,
    });

    expect(data).toBeFalsy();
    expect(isFetched).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Does not fetch if item has no thumbnail with corresponding id`, async () => {
    const itemWithoutThumbnail = {
      ...item,
      settings: { hasThumbnail: false },
    };
    queryClient.setQueryData(
      itemKeys.single(itemWithoutThumbnail.id).content,
      itemWithoutThumbnail,
    );
    const endpoints = [
      {
        route,
        response,
      },
    ];
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () => useItemThumbnailUrl({ id: itemWithoutThumbnail.id }),
      wrapper,
      enabled: false,
    });

    expect(data).toBeFalsy();
    expect(isFetched).toBeFalsy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });

  it(`Does not fetch if item has no thumbnail with corresponding item`, async () => {
    const itemWithoutThumbnail = {
      ...item,
      settings: { hasThumbnail: false },
    };
    queryClient.setQueryData(
      itemKeys.single(itemWithoutThumbnail.id).content,
      itemWithoutThumbnail,
    );
    const endpoints = [
      {
        route,
        response,
      },
    ];
    const { data, isFetched } = await mockHook({
      endpoints,
      hook: () =>
        useItemThumbnailUrl({
          item: itemWithoutThumbnail,
        }),
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
    const { data, isError } = await mockHook({ endpoints, hook, wrapper });

    expect(data).toBeFalsy();
    expect(isError).toBeTruthy();
    // verify cache keys
    expect(queryClient.getQueryData(key)).toBeFalsy();
  });
});
