import {
  AppItemFactory,
  AppItemType,
  ItemType,
  PackedAppItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import { API_HOST } from '../support/env';
import { ItemForTest } from '../support/types';
import { APP_NAME } from './apps/apps';
import { DEFAULT_FOLDER_ITEM } from './items';
import { CURRENT_MEMBER, MEMBERS } from './members';

// mock an app with the graasp link
export const GRAASP_APP_ITEM: AppItemType = AppItemFactory({
  id: 'baefbd2a-5688-11eb-ae91-0242ac130002',
  name: 'graasp app',
  description: 'a description for graasp app',
  path: 'baefbd2a_5688_11eb_ae93_0242ac130002',
  creator: CURRENT_MEMBER,
  extra: {
    app: { url: 'https://graasp.eu' },
  },
  settings: {
    isPinned: false,
    showChatbox: false,
  },
});

export const buildAppApiAccessTokenRoute = (id: string): string =>
  `app-items/${id}/api-access-token`;
export const buildGetAppData = (id: string): string =>
  `app-items/${id}/app-data`;
export const buildAppItemLinkForTest = (filename = '.*'): string =>
  `apps/${filename}`;

export const GRAASP_APP_PARENT_FOLDER = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'bdf09f5a-5688-11eb-ae93-0242ac130002',
  name: 'graasp app parent',
  path: 'bdf09f5a_5688_11eb_ae93_0242ac130002',
  extra: {
    image: 'someimageurl',
    name: APP_NAME,
  },
};

export const GRAASP_APP_CHILDREN_ITEM = AppItemFactory({
  id: 'ecafbd2a-5688-12eb-ae91-0272ac130002',
  path: 'bdf09f5a_5688_11eb_ae93_0242ac130002.ecafbd2a_5688_12eb_ae91_0272ac130002',
  name: 'my app',
  description: 'my app description',
  type: ItemType.APP,
  extra: {
    [ItemType.APP]: {
      url: 'http://localhost.com:3333',
    },
  },
  creator: CURRENT_MEMBER,
});

export const APP_USING_CONTEXT_ITEM: ItemForTest = PackedAppItemFactory(
  {
    id: 'ecafbd2a-5688-12eb-ae91-0272ac130002',
    path: 'ecafbd2a_5688_12eb_ae91_0272ac130002',
    name: 'my app',
    description: 'my app description',
    type: ItemType.APP,
    settings: {},
    extra: {
      [ItemType.APP]: {
        url: `${API_HOST}/${buildAppItemLinkForTest('app.html')}`,
      },
    },
    creator: CURRENT_MEMBER,
  },
  {
    permission: PermissionLevel.Admin,
  },
);

export const PUBLIC_APP_USING_CONTEXT_ITEM: ItemForTest = {
  ...PackedAppItemFactory(
    {
      id: 'ecafbd2a-5688-12eb-ae91-0272ac130003',
      path: 'ecafbd2a_5688_12eb_ae91_0272ac130003',
      name: 'my app',
      description: 'my app description',
      extra: {
        [ItemType.APP]: {
          url: `${API_HOST}/${buildAppItemLinkForTest('app.html')}`,
        },
      },
      creator: MEMBERS.BOB,
    },
    { publicVisibility: {} },
  ),
};

export const GRAASP_APP_ITEMS_FIXTURE = [
  GRAASP_APP_ITEM,
  GRAASP_APP_PARENT_FOLDER,
  GRAASP_APP_CHILDREN_ITEM,
];
