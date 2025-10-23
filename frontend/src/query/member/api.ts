import {
  CurrentAccount,
  Member,
  MemberStorage,
  MemberStorageItem,
  Paginated,
  Pagination,
  UUID,
} from '@graasp/sdk';

import { AxiosProgressEvent } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { API_HOST } from '@/config/env.js';
import {
  axiosClient as axios,
  verifyAuthentication,
} from '@/query/api/axios.js';

import { DEFAULT_THUMBNAIL_SIZE } from '../config/constants.js';
import {
  buildDownloadAvatarRoute,
  buildExportMemberDataRoute,
  buildGetCurrentMemberRoute,
  buildGetMemberRoute,
  buildGetMemberStorageFilesRoute,
  buildGetMemberStorageRoute,
  buildPostMemberEmailUpdateRoute,
  buildUploadAvatarRoute,
} from './routes.js';

export const getMember = async ({ id }: { id: UUID }) =>
  axios
    .get<Member>(`${API_HOST}/${buildGetMemberRoute(id)}`)
    .then(({ data }) => data);

export const getCurrentMember = async () =>
  verifyAuthentication(() =>
    axios
      .get<CurrentAccount>(`${API_HOST}/${buildGetCurrentMemberRoute()}`)
      .then(({ data }) => data)
      .catch((error) => {
        if (error.response) {
          // return valid response for unauthorized requests
          // avoid infinite loading induced by failure in react-query
          if (error.response.status === StatusCodes.UNAUTHORIZED) {
            return null;
          }
        }
        throw error;
      }),
  );

export const getMemberStorage = async () =>
  verifyAuthentication(() =>
    axios
      .get<MemberStorage>(`${API_HOST}/${buildGetMemberStorageRoute()}`)
      .then(({ data }) => data),
  );

export const getMemberStorageFiles = async (pagination: Partial<Pagination>) =>
  axios
    .get<
      Paginated<MemberStorageItem>
    >(`${API_HOST}/${buildGetMemberStorageFilesRoute(pagination)}`)
    .then(({ data }) => data);

export const uploadAvatar = async (args: {
  file: Blob;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) => {
  const { file } = args;
  const itemPayload = new FormData();

  /* WARNING: this file field needs to be the last one,
   * otherwise the normal fields can not be read
   * https://github.com/fastify/fastify-multipart?tab=readme-ov-file#usage
   */
  itemPayload.append('file', file);
  return axios
    .post<void>(`${API_HOST}/${buildUploadAvatarRoute()}`, itemPayload, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        args.onUploadProgress?.(progressEvent);
      },
    })
    .then(({ data }) => data);
};

export const downloadAvatarUrl = async ({
  id,
  size = DEFAULT_THUMBNAIL_SIZE,
}: {
  id: UUID;
  size?: string;
}) =>
  axios
    .get<string>(
      `${API_HOST}/${buildDownloadAvatarRoute({ id, size, replyUrl: true })}`,
    )
    .then(({ data }) => data);

export const updateEmail = async (email: string) =>
  axios.post<void>(`${API_HOST}/${buildPostMemberEmailUpdateRoute()}`, {
    email,
  });

export const validateEmailUpdate = async (token: string) =>
  axios.patch<void>(
    `${API_HOST}/${buildPostMemberEmailUpdateRoute()}`,
    {},
    // send the JWT as a bearer auth
    { headers: { Authorization: `Bearer ${token}` } },
  );

// Define the function to export member data
export const exportMemberData = async () =>
  axios
    .post<void>(`${API_HOST}/${buildExportMemberDataRoute()}`)
    .then(({ data }) => data);
