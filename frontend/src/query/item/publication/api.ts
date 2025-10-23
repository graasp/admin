import { PublicationStatus, UUID } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import { buildGetPublicationStatusRoute } from '../../routes.js';

export const getItemPublicationStatus = async (itemId: UUID) =>
  axios
    .get<PublicationStatus>(
      `${API_HOST}/${buildGetPublicationStatusRoute(itemId)}`,
    )
    .then(({ data }) => data);
