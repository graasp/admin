import {
  ItemLoginSchema,
  ItemLoginSchemaStatus,
  ItemLoginSchemaType,
  Member,
  UUID,
} from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildDeleteItemLoginSchemaRoute,
  buildGetItemLoginSchemaRoute,
  buildGetItemLoginSchemaTypeRoute,
  buildPostItemLoginSignInRoute,
  buildPutItemLoginSchemaRoute,
} from '../routes.js';
import { verifyAuthentication } from './axios.js';

export const postItemLoginSignIn = async ({
  itemId,
  username,
  memberId,
  password,
}: {
  itemId: UUID;
  username?: string;
  memberId?: UUID;
  password?: string;
}) =>
  axios
    .post<Member>(`${API_HOST}/${buildPostItemLoginSignInRoute(itemId)}`, {
      username: username?.trim(),
      memberId: memberId?.trim(),
      password,
    })
    .then(({ data }) => data);

export const getItemLoginSchema = async (id: UUID) =>
  axios
    .get<ItemLoginSchema>(`${API_HOST}/${buildGetItemLoginSchemaRoute(id)}`)
    .then(({ data }) => data);

export const getItemLoginSchemaType = async (id: UUID) =>
  axios
    .get<ItemLoginSchemaType>(
      `${API_HOST}/${buildGetItemLoginSchemaTypeRoute(id)}`,
    )
    .then(({ data }) => data);

export const putItemLoginSchema = async ({
  itemId,
  type,
  status,
}: {
  itemId: UUID;
  type?: ItemLoginSchemaType;
  status?: ItemLoginSchemaStatus;
}) =>
  verifyAuthentication(() =>
    axios
      .put<ItemLoginSchema>(
        `${API_HOST}/${buildPutItemLoginSchemaRoute(itemId)}`,
        {
          type,
          status,
        },
      )
      .then(({ data }) => data),
  );

export const deleteItemLoginSchema = async ({ itemId }: { itemId: UUID }) =>
  verifyAuthentication(() =>
    axios
      .delete<ItemLoginSchema>(
        `${API_HOST}/${buildDeleteItemLoginSchemaRoute(itemId)}`,
      )
      .then(({ data }) => data),
  );
