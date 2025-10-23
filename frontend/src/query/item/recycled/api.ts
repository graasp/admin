import { DiscriminatedItem, Paginated, Pagination } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import { verifyAuthentication } from '../../api/axios.js';
import { buildGetOwnRecycledItemRoute } from './routes.js';

export const getOwnRecycledItems = async (pagination: Partial<Pagination>) =>
  verifyAuthentication(() =>
    axios
      .get<
        Paginated<DiscriminatedItem>
      >(`${API_HOST}/${buildGetOwnRecycledItemRoute(pagination)}`)
      .then(({ data }) => data),
  );
