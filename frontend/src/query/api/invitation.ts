import { Invitation, ItemMembership, UUID } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildDeleteInvitationRoute,
  buildGetInvitationRoute,
  buildGetItemInvitationsForItemRoute,
  buildPatchInvitationRoute,
  buildPostInvitationsRoute,
  buildResendInvitationRoute,
} from '../routes.js';
import { NewInvitation } from '../types.js';
import { verifyAuthentication } from './axios.js';

export const getInvitation = async (id: UUID) =>
  axios
    .get<Invitation>(`${API_HOST}/${buildGetInvitationRoute(id)}`)
    .then(({ data }) => data);

export const postInvitations = async ({
  itemId,
  invitations,
}: {
  itemId: UUID;
  invitations: NewInvitation[];
}) =>
  verifyAuthentication(() =>
    axios
      .post<{
        invitations: Invitation[];
        memberships: ItemMembership[];
      }>(`${API_HOST}/${buildPostInvitationsRoute(itemId)}`, { invitations })
      .then(({ data }) => data),
  );

export const getInvitationsForItem = async (id: UUID) =>
  verifyAuthentication(() =>
    axios
      .get<
        Invitation[]
      >(`${API_HOST}/${buildGetItemInvitationsForItemRoute(id)}`)
      .then(({ data }) => data),
  );

export const patchInvitation = async (
  payload: { itemId: UUID; id: UUID },
  body: Partial<Invitation>,
) =>
  verifyAuthentication(() =>
    axios
      .patch<Invitation>(
        `${API_HOST}/${buildPatchInvitationRoute(payload)}`,
        body,
      )
      .then(({ data }) => data),
  );

export const deleteInvitation = async (payload: { itemId: UUID; id: UUID }) =>
  verifyAuthentication(() =>
    axios
      .delete<Invitation>(`${API_HOST}/${buildDeleteInvitationRoute(payload)}`)
      .then(({ data }) => data),
  );

export const resendInvitation = async (payload: { itemId: UUID; id: UUID }) =>
  verifyAuthentication(() =>
    axios.post<void>(`${API_HOST}/${buildResendInvitationRoute(payload)}`),
  );
