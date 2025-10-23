import { AccountType, DiscriminatedItem, PermissionLevel } from '@graasp/sdk';

import { hooks } from '@/config/queryClient';
import { ItemMembership } from '@/openapi/client';

import { selectHighestMemberships } from '~builder/utils/membership';

export const useHighestMemberships = ({
  canAdmin,
  item,
}: {
  canAdmin: boolean;
  item: DiscriminatedItem;
}): {
  data?: ItemMembership[];
  isPending: boolean;
  hasOnlyOneAdmin: boolean;
} => {
  const { data: currentMember } = hooks.useCurrentMember();

  const { data: rawMemberships, isPending: isMembershipsPending } =
    hooks.useItemMemberships(item.id);

  const hasOnlyOneAdmin =
    rawMemberships?.filter((per) => per.permission === PermissionLevel.Admin)
      .length === 1;

  let memberships = rawMemberships;

  if (memberships) {
    // can only edit your own membership
    if (!canAdmin) {
      memberships = memberships?.filter(
        (im) => im.account.id === currentMember?.id,
      );
    }

    // keep only the highest membership per member
    memberships = selectHighestMemberships(memberships).sort((im1, im2) => {
      if (im1.account.type !== AccountType.Individual) {
        return 1;
      }
      if (im2.account.type !== AccountType.Individual) {
        return -1;
      }
      return im1.account.name > im2.account.name ? 1 : -1;
    });
  }

  return {
    data: memberships,
    isPending: isMembershipsPending,
    hasOnlyOneAdmin,
  };
};
