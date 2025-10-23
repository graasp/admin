import { DiscriminatedItem, ItemGeolocation, UUID } from '@graasp/sdk';

import { DEFAULT_LANG } from '@/config/constants.js';
import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildDeleteItemGeolocationRoute,
  buildGetAddressFromCoordinatesRoute,
  buildGetItemGeolocationRoute,
  buildGetItemsInMapRoute,
  buildGetSuggestionsForAddressRoute,
  buildPutItemGeolocationRoute,
} from '../routes.js';
import { verifyAuthentication } from './axios.js';

export const getItemGeolocation = async (id: UUID) =>
  axios
    .get<ItemGeolocation | null>(
      `${API_HOST}/${buildGetItemGeolocationRoute(id)}`,
    )
    .then(({ data }) => data);

export const putItemGeolocation = async (payload: {
  itemId: DiscriminatedItem['id'];
  geolocation: Pick<ItemGeolocation, 'lat' | 'lng'> &
    Pick<Partial<ItemGeolocation>, 'country' | 'addressLabel' | 'helperLabel'>;
}) =>
  verifyAuthentication(() =>
    axios
      .put<void>(
        `${API_HOST}/${buildPutItemGeolocationRoute(payload.itemId)}`,
        payload,
      )
      .then(({ data }) => data),
  );

export const getItemsInMap = async (payload: {
  lat1?: ItemGeolocation['lat'];
  lat2?: ItemGeolocation['lat'];
  lng1?: ItemGeolocation['lng'];
  lng2?: ItemGeolocation['lng'];
  parentItemId?: DiscriminatedItem['id'];
  keywords?: string[];
}) =>
  verifyAuthentication(() =>
    axios
      .get<ItemGeolocation[]>(`${API_HOST}/${buildGetItemsInMapRoute(payload)}`)
      .then(({ data }) => data),
  );

export const deleteItemGeolocation = async (payload: { itemId: UUID }) =>
  verifyAuthentication(() =>
    axios
      .delete<void>(
        `${API_HOST}/${buildDeleteItemGeolocationRoute(payload.itemId)}`,
      )
      .then(({ data }) => data),
  );

export const getAddressFromCoordinates = async ({
  lat,
  lng,
  lang = DEFAULT_LANG,
}: Pick<ItemGeolocation, 'lat' | 'lng'> & { lang?: string }) =>
  axios
    .get<{
      addressLabel: string;
      country: string;
    }>(`${API_HOST}/${buildGetAddressFromCoordinatesRoute({ lat, lng, lang })}`)
    .then(({ data }) => data);

export const getSuggestionsForAddress = async ({
  address,
  lang = DEFAULT_LANG,
}: {
  address: string;
  lang?: string;
}) =>
  axios
    .get<
      {
        addressLabel: string;
        country?: string;
        id: string;
        lat: number;
        lng: number;
      }[]
    >(`${API_HOST}/${buildGetSuggestionsForAddressRoute({ address, lang })}`)
    .then(({ data }) => data);
