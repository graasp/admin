import { Pagination, UUID } from '@graasp/sdk';

import { DEFAULT_THUMBNAIL_SIZE } from '../config/constants';

export const MEMBERS_ROUTE = `members`;

export const buildGetCurrentMemberRoute = () => `${MEMBERS_ROUTE}/current`;
export const buildPostMemberEmailUpdateRoute = () =>
  `${MEMBERS_ROUTE}/current/email/change`;

// Member CRUD
export const buildGetMemberRoute = (id: UUID) => `${MEMBERS_ROUTE}/${id}`;

// Password
export const buildPostMemberPasswordRoute = () => `password`;
export const buildPatchMemberPasswordRoute = () => `password`;

// Storage
export const buildGetMemberStorageRoute = () =>
  `${MEMBERS_ROUTE}/current/storage`;

// Storage files
export const buildGetMemberStorageFilesRoute = (
  pagination: Partial<Pagination>,
) => {
  const searchParams = new URLSearchParams();

  searchParams.set('page', (pagination.page ?? 1).toString());
  searchParams.set('pageSize', (pagination.pageSize ?? 10).toString());

  return `${MEMBERS_ROUTE}/current/storage/files?${searchParams}`;
};
// Avatar
export const buildUploadAvatarRoute = () => `${MEMBERS_ROUTE}/avatar`;
export const buildDownloadAvatarRoute = ({
  id,
  replyUrl,
  size = DEFAULT_THUMBNAIL_SIZE,
}: {
  id: UUID;
  replyUrl: boolean;
  size?: string;
}) =>
  `${MEMBERS_ROUTE}/${id}/avatar/${size}?${new URLSearchParams({ replyUrl: replyUrl.toString() })}`;

// Actions
export const buildGetMemberActionsRoute = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) =>
  `${MEMBERS_ROUTE}/actions?${new URLSearchParams({
    startDate,
    endDate,
  })}`;

// Public Profile
export const PUBLIC_PROFILE = `profile`;
export const buildGetOwnPublicProfileRoute = () =>
  `${MEMBERS_ROUTE}/${PUBLIC_PROFILE}/own`;
export const buildPostPublicProfileRoute = () =>
  `${MEMBERS_ROUTE}/${PUBLIC_PROFILE}`;
export const buildPatchPublicProfileRoute = () =>
  `${MEMBERS_ROUTE}/${PUBLIC_PROFILE}`;
export const buildGetPublicProfileRoute = (memberId: UUID) =>
  `${MEMBERS_ROUTE}/${PUBLIC_PROFILE}/${memberId}`;

// Data export
export const DATA_EXPORT_ROUTE = 'export-data';
export const buildExportMemberDataRoute = () =>
  `${MEMBERS_ROUTE}/${DATA_EXPORT_ROUTE}`;
