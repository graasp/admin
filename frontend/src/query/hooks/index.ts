import { WebsocketClient } from '@graasp/sdk';

import configureItemHooks from '../item/hooks.js';
import configureMemberHooks from '../member/hooks.js';
import { QueryClientConfig } from '../types.js';
import configureEtherpadHooks from './etherpad.js';
import configureItemLoginHooks from './itemLogin.js';
import configureItemPublishedHooks from './itemPublish.js';
import configureMembershipHooks from './membership.js';
import configureMentionsHooks from './mention.js';
import useDebounce from './useDebounce.js';

export const configureHooks = (
  queryConfig: QueryClientConfig,
  websocketClient?: WebsocketClient,
) => {
  const memberHooks = configureMemberHooks(queryConfig);

  return {
    ...configureMentionsHooks(
      queryConfig,
      memberHooks.useCurrentMember,
      websocketClient,
    ),
    ...configureMembershipHooks(queryConfig, websocketClient),
    ...configureItemHooks(queryConfig, websocketClient),
    ...configureEtherpadHooks(queryConfig),
    ...configureItemLoginHooks(queryConfig),
    ...configureItemPublishedHooks(queryConfig),
    ...memberHooks,
    useDebounce,
  };
};
