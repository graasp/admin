import { DiscriminatedItem } from '@graasp/sdk';

import { AxiosProgressEvent } from 'axios';

import { API_HOST } from '@/config/env.js';

import { axiosClient as axios, verifyAuthentication } from '../../api/axios.js';
import { buildImportZipRoute } from '../../routes.js';

export const importZip = async (args: {
  id?: DiscriminatedItem['id'];
  file: Blob;
  previousItemId?: DiscriminatedItem['id'];
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}): Promise<DiscriminatedItem> =>
  verifyAuthentication(() => {
    const { id, file } = args;
    const itemPayload = new FormData();

    /* WARNING: this file field needs to be the last one,
     * otherwise the normal fields can not be read
     * https://github.com/fastify/fastify-multipart?tab=readme-ov-file#usage
     */
    itemPayload.append('files', file);
    return axios
      .post<DiscriminatedItem>(
        `${API_HOST}/${buildImportZipRoute(id)}`,
        itemPayload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },

          onUploadProgress: (progressEvent) => {
            args.onUploadProgress?.(progressEvent);
          },
        },
      )
      .then(({ data }) => data);
  });
