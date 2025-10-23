import { UUID } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/invitation.js';
import { UndefinedArgument } from '../config/errors.js';
import { buildInvitationKey, itemKeys } from '../keys.js';
import { getInvitationRoutine } from '../routines/invitation.js';

export const useInvitation = (id?: UUID) =>
  useQuery({
    queryKey: buildInvitationKey(id),
    queryFn: () => {
      if (!id) {
        throw new UndefinedArgument();
      }
      return Api.getInvitation(id);
    },
    meta: {
      routine: getInvitationRoutine,
    },
    enabled: Boolean(id),
  });

export const useItemInvitations = (
  itemId?: UUID,
  options: { enabled?: boolean } = {},
) =>
  useQuery({
    queryKey: itemKeys.single(itemId).invitation,
    queryFn: () => {
      if (!itemId) {
        throw new UndefinedArgument();
      }

      return Api.getInvitationsForItem(itemId);
    },
    enabled: Boolean(itemId) && (options?.enabled ?? true),
  });
