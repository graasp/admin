import { UUID, WebsocketClient } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import {
  getMembershipRequestsForItem,
  getMembershipsForItem,
} from '../api/membership.js';
import { itemKeys } from '../keys.js';
import { QueryClientConfig } from '../types.js';
import { configureWsMembershipHooks } from '../ws/index.js';

export default (
  queryConfig: QueryClientConfig,
  websocketClient?: WebsocketClient,
) => {
  const { enableWebsocket } = queryConfig;

  const membershipWsHooks =
    enableWebsocket && websocketClient // required to type-check non-null
      ? configureWsMembershipHooks(websocketClient)
      : undefined;

  return {
    // custom defined hook to handle websocket as well
    useItemMemberships: (itemId: UUID, options?: { getUpdates?: boolean }) => {
      const getUpdates = options?.getUpdates ?? enableWebsocket;

      membershipWsHooks?.useItemsMembershipsUpdates(
        getUpdates ? [itemId] : null,
      );

      return useQuery({
        // TODO: use sdk, but be aware of signal that cancels the query
        queryFn: () => {
          return getMembershipsForItem(itemId);
        },
        queryKey: itemKeys.single(itemId).memberships,
      });
    },
    // custom defined hook to handle websocket as well
    useMembershipRequests: (itemId: UUID, { enabled = true } = {}) => {
      return useQuery({
        // TODO: use sdk, but be aware of signal that cancels the query
        queryFn: () => {
          return getMembershipRequestsForItem(itemId);
        },
        queryKey: itemKeys.single(itemId).membershipRequests,
        enabled,
      });
    },
  };
};
