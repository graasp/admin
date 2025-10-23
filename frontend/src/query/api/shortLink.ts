import { ShortLink, ShortLinksOfItem } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildDeleteShortLinkRoute,
  buildGetShortLinksItemRoute,
} from '../routes.js';
import { verifyAuthentication } from './axios.js';

export const getShortLinksItem = (itemId: string) =>
  verifyAuthentication(() =>
    axios
      .get<ShortLinksOfItem>(
        `${API_HOST}/${buildGetShortLinksItemRoute(itemId)}`,
      )
      .then(({ data }) => data),
  );

export const deleteShortLink = (alias: string) =>
  verifyAuthentication(() =>
    axios
      .delete<ShortLink>(`${API_HOST}/${buildDeleteShortLinkRoute(alias)}`)
      .then(({ data }) => data),
  );
