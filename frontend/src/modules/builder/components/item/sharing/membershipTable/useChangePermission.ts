import { DiscriminatedItem, PermissionLevelOptions } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ItemMembership } from '@/openapi/client';
import {
  createItemMembershipMutation,
  updateItemMembershipMutation,
} from '@/openapi/client/@tanstack/react-query.gen';
import { itemKeys } from '@/query/keys';

export function useChangePermission({
  itemPath,
  itemId,
}: {
  itemId: DiscriminatedItem['id'];
  itemPath: DiscriminatedItem['path'];
}) {
  const queryClient = useQueryClient();
  const {
    mutateAsync: editItemMembership,
    error: editItemMembershipError,
    isPending: isPendingEditItemMembership,
  } = useMutation({
    ...updateItemMembershipMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).memberships,
      });
    },
  });
  const {
    mutateAsync: shareItem,
    isPending: isPendingShareItem,
    error: shareItemError,
  } = useMutation({
    ...createItemMembershipMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.single(itemId).memberships,
      });
    },
  });

  const changePermission = async (
    itemMembership: ItemMembership,
    newPermission: PermissionLevelOptions,
  ) => {
    if (itemMembership.item.path === itemPath) {
      await editItemMembership({
        path: { id: itemMembership.id, itemId: itemId },
        body: { permission: newPermission },
      });
    } else {
      await shareItem({
        path: { itemId: itemId },
        body: {
          accountId: itemMembership.account.id,
          permission: newPermission,
        },
      });
    }
  };

  return {
    changePermission,
    isPending: isPendingEditItemMembership || isPendingShareItem,
    error: editItemMembershipError || shareItemError,
  };
}
