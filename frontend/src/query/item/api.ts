import {
  DiscriminatedItem,
  ItemGeolocation,
  PackedItem,
  ResultOf,
  UUID,
} from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import { verifyAuthentication } from '../api/axios.js';
import {
  SHARED_ITEM_WITH_ROUTE,
  buildCopyItemsRoute,
  buildDeleteItemsRoute,
  buildDownloadFilesRoute,
  buildEditItemRoute,
  buildGetChildrenRoute,
  buildGetItemRoute,
  buildGetItemsRoute,
  buildMoveItemsRoute,
  buildRecycleItemsRoute,
  buildRestoreItemsRoute,
} from './routes.js';
import { ItemChildrenParams } from './types.js';

export const getItem = (id: UUID): Promise<PackedItem> =>
  axios
    .get<PackedItem>(`${API_HOST}/${buildGetItemRoute(id)}`)
    .then(({ data }) => data);

export const getItems = async (ids: UUID[]) =>
  axios
    .get<ResultOf<PackedItem>>(`${API_HOST}/${buildGetItemsRoute(ids)}`)
    .then(({ data }) => data);

export type PostItemPayloadType = Partial<DiscriminatedItem> &
  Pick<DiscriminatedItem, 'type' | 'name'> &
  Partial<{
    parentId: UUID;
    geolocation: Pick<ItemGeolocation, 'lat' | 'lng'>;
    previousItemId: UUID;
  }>;
export type PostItemWithThumbnailPayloadType = PostItemPayloadType & {
  thumbnail: Blob;
};

export const deleteItems = async (ids: UUID[]) =>
  verifyAuthentication(() =>
    axios
      .delete<void>(`${API_HOST}/${buildDeleteItemsRoute(ids)}`)
      .then(({ data }) => data),
  );

// payload = {name, type, description, extra}
// querystring = {parentId}
export const editItem = async (
  id: UUID,
  item: Pick<DiscriminatedItem, 'id'> &
    Partial<
      Pick<DiscriminatedItem, 'name' | 'description' | 'extra' | 'settings'>
    >,
): Promise<DiscriminatedItem> =>
  verifyAuthentication(() =>
    axios
      .patch<DiscriminatedItem>(`${API_HOST}/${buildEditItemRoute(id)}`, {
        ...item,
        name: item.name?.trim(),
      })
      .then(({ data }) => data),
  );

export const getChildren = async (id: UUID, params: ItemChildrenParams) =>
  axios
    .get<PackedItem[]>(`${API_HOST}/${buildGetChildrenRoute(id, params)}`)
    .then(({ data }) => data);

export const moveItems = async ({ to, ids }: { ids: UUID[]; to?: UUID }) =>
  verifyAuthentication(() => {
    // send parentId if defined
    const body = { ...(to && { parentId: to }) };
    return axios
      .post<void>(`${API_HOST}/${buildMoveItemsRoute(ids)}`, {
        ...body,
      })
      .then(({ data }) => data);
  });

export const copyItems = async ({ ids, to }: { ids: UUID[]; to?: UUID }) =>
  verifyAuthentication(() => {
    // send parentId if defined
    const body = { ...(to && { parentId: to }) };
    return axios
      .post<void>(`${API_HOST}/${buildCopyItemsRoute(ids)}`, {
        ...body,
      })
      .then(({ data }) => data);
  });

export const getSharedItems = async () =>
  verifyAuthentication(() =>
    axios
      .get<DiscriminatedItem[]>(`${API_HOST}/${SHARED_ITEM_WITH_ROUTE}`, {})
      .then(({ data }) => data),
  );

export const getFileContentUrl = async (id: UUID) =>
  axios
    .get<string>(`${API_HOST}/${buildDownloadFilesRoute(id)}`, {
      params: {
        replyUrl: true,
      },
    })
    .then(({ data }) => data);

export const recycleItems = async (ids: UUID[]) =>
  verifyAuthentication(() =>
    axios
      .post<void>(`${API_HOST}/${buildRecycleItemsRoute(ids)}`)
      .then(({ data }) => data),
  );

export const restoreItems = async (itemIds: UUID[]) =>
  verifyAuthentication(() =>
    axios
      .post<void>(`${API_HOST}/${buildRestoreItemsRoute(itemIds)}`)
      .then(({ data }) => data),
  );
