import { ItemVisibility, UUID } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildDeleteItemVisibilityRoute,
  buildPostItemVisibilityRoute,
} from '../routes.js';
import { verifyAuthentication } from './axios.js';

export const postItemVisibility = async ({
  itemId,
  type,
}: {
  itemId: UUID;
  type: ItemVisibility['type'];
}) =>
  verifyAuthentication(() =>
    axios
      .post<ItemVisibility>(
        `${API_HOST}/${buildPostItemVisibilityRoute({ itemId, type })}`,
      )
      .then(({ data }) => data),
  );

export const deleteItemVisibility = async ({
  itemId,
  type,
}: {
  itemId: UUID;
  type: ItemVisibility['type'];
}) =>
  verifyAuthentication(() =>
    axios
      .delete<ItemVisibility>(
        `${API_HOST}/${buildDeleteItemVisibilityRoute({ itemId, type })}`,
      )
      .then(({ data }) => data),
  );
