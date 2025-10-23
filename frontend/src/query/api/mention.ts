import { ChatMention, UUID } from '@graasp/sdk';

import { API_HOST } from '@/config/env.js';
import { axiosClient as axios } from '@/query/api/axios.js';

import {
  buildClearMentionsRoute,
  buildDeleteMentionRoute,
  buildGetMemberMentionsRoute,
  buildPatchMentionRoute,
} from '../routes.js';
import { verifyAuthentication } from './axios.js';

export const getMemberMentions = async () =>
  verifyAuthentication(() =>
    axios
      .get<ChatMention[]>(`${API_HOST}/${buildGetMemberMentionsRoute()}`)
      .then(({ data }) => data),
  );

export const patchMemberMentionsStatus = async ({
  id: mentionId,
  status,
}: {
  id: UUID;
  status: string;
}) =>
  verifyAuthentication(() =>
    axios
      .patch<ChatMention>(`${API_HOST}/${buildPatchMentionRoute(mentionId)}`, {
        status,
      })
      .then(({ data }) => data),
  );

export const deleteMention = async (mentionId: UUID) =>
  verifyAuthentication(() =>
    axios
      .delete<ChatMention>(`${API_HOST}/${buildDeleteMentionRoute(mentionId)}`)
      .then(({ data }) => data),
  );

export const clearMentions = async () =>
  verifyAuthentication(() =>
    axios
      .delete<ChatMention[]>(`${API_HOST}/${buildClearMentionsRoute()}`)
      .then(({ data }) => data),
  );
