import { UUID } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import { buildGetApiAccessTokenRoute } from '../routes.js';

export const requestApiAccessToken = async (args: {
  id: UUID;
  key: string;
  origin: string;
}) => {
  const { id, key, origin } = args;
  return axios
    .post<{ token: string }>(`${API_HOST}/${buildGetApiAccessTokenRoute(id)}`, {
      origin,
      key,
    })
    .then(({ data }) => data);
};
