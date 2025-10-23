import {
  DiscriminatedItem,
  ItemPublished,
  PackedItem,
  UUID,
} from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildGetAllPublishedItemsRoute,
  buildGetItemPublishedInformationRoute,
  buildGetMostLikedPublishedItemsRoute,
  buildGetMostRecentPublishedItemsRoute,
  buildGetPublishedItemsForMemberRoute,
  buildItemPublishRoute,
  buildItemUnpublishRoute,
} from '../routes.js';
import { verifyAuthentication } from './axios.js';

export const getAllPublishedItems = async (args: { categoryIds?: UUID[] }) =>
  axios
    .get<
      DiscriminatedItem[]
    >(`${API_HOST}/${buildGetAllPublishedItemsRoute(args?.categoryIds)}`)
    .then(({ data }) => data);

export const getMostLikedPublishedItems = async (args: { limit?: number }) =>
  axios
    .get<
      DiscriminatedItem[]
    >(`${API_HOST}/${buildGetMostLikedPublishedItemsRoute(args?.limit)}`)
    .then(({ data }) => data);

export const getMostRecentPublishedItems = async (args: { limit?: number }) =>
  axios
    .get<
      DiscriminatedItem[]
    >(`${API_HOST}/${buildGetMostRecentPublishedItemsRoute(args?.limit)}`)
    .then(({ data }) => data);

export const getPublishedItemsForMember = async (memberId: UUID) =>
  axios
    .get<
      PackedItem[]
    >(`${API_HOST}/${buildGetPublishedItemsForMemberRoute(memberId)}`)
    .then(({ data }) => data);

export const getItemPublishedInformation = async (id: UUID) =>
  axios
    .get<ItemPublished | null>(
      `${API_HOST}/${buildGetItemPublishedInformationRoute(id)}`,
    )
    .then(({ data }) => data);

export const publishItem = async (id: UUID, notification?: boolean) =>
  verifyAuthentication(() =>
    axios
      .post<ItemPublished>(
        `${API_HOST}/${buildItemPublishRoute(id, notification)}`,
      )
      .then(({ data }) => data),
  );

export const unpublishItem = async (id: UUID) =>
  verifyAuthentication(() =>
    axios
      .delete<ItemPublished>(`${API_HOST}/${buildItemUnpublishRoute(id)}`)
      .then(({ data }) => data),
  );
