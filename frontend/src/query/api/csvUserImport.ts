import { Invitation, ItemMembership, UUID } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildPostUserCSVUploadRoute,
  buildPostUserCSVUploadWithTemplateRoute,
} from '../routes.js';

type CSVInviteResponse = {
  invitations: Invitation[];
  memberships: ItemMembership[];
};
type CSVStructureResponse = {
  groupName: string;
  invitations: Invitation[];
  memberships: ItemMembership[];
}[];

export const uploadUserCsv = async ({
  file,
  itemId,
}: {
  file: File;
  itemId: UUID;
}) => {
  const formData = new FormData();
  formData.append('file', file);

  const url = new URL(buildPostUserCSVUploadRoute(itemId), API_HOST);

  return axios
    .post<CSVInviteResponse>(url.toString(), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => data);
};

export const uploadUserCsvWithTemplate = async ({
  file,
  itemId,
  templateItemId,
}: {
  file: File;
  itemId: UUID;
  templateItemId: UUID;
}) => {
  const formData = new FormData();
  formData.append('file', file);

  const url = new URL(
    buildPostUserCSVUploadWithTemplateRoute(itemId),
    API_HOST,
  );
  url.searchParams.set('templateId', templateItemId);
  return axios
    .post<CSVStructureResponse>(url.toString(), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(({ data }) => data);
};
