import { PackedItem, Paginated, Pagination } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import { verifyAuthentication } from '../../api/axios.js';
import { buildGetAccessibleItems } from '../routes.js';
import { ItemSearchParams } from '../types.js';

export const getAccessibleItems = async (
  params: ItemSearchParams,
  pagination: Partial<Pagination>,
) =>
  verifyAuthentication(() =>
    axios
      .get<
        Paginated<PackedItem>
      >(`${API_HOST}/${buildGetAccessibleItems(params, pagination)}`)
      .then(({ data }) => data),
  );
