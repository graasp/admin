import { PermissionLevel } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { hooks } from '@/config/queryClient';
import {
  createItemMembershipMutation,
  deleteMembershipRequestMutation,
} from '@/openapi/client/@tanstack/react-query.gen';
import { itemKeys } from '@/query/keys';

export function useMembershipRequests({
  itemId,
  canAdmin,
}: {
  itemId: string;
  canAdmin: boolean;
}) {
  const queryClient = useQueryClient();
  const { data: requests, isPending } = hooks.useMembershipRequests(itemId, {
    enabled: canAdmin,
  });
  const { mutate: deleteRequest } = useMutation({
    ...deleteMembershipRequestMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).membershipRequests,
      });
    },
  });
  const { mutate: shareItem } = useMutation({
    ...createItemMembershipMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).membershipRequests,
      });
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).memberships,
      });
    },
  });

  const acceptRequest = (memberId: string) => {
    shareItem({
      path: { itemId: itemId },
      body: {
        accountId: memberId,
        permission: PermissionLevel.Read,
      },
    });
  };

  const refuseRequest = (memberId: string) => {
    deleteRequest({
      path: { itemId, memberId },
    });
  };

  return { requests, isPending, acceptRequest, refuseRequest };
}
