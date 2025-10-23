import {
  DiscriminatedItem,
  DocumentItemFactory,
  FolderItemFactory,
  ItemType,
  PackedAppItemFactory,
  PackedFolderItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import { CURRENT_MEMBER, MEMBERS } from '../members';

const MOCK_ITEMS: DiscriminatedItem[] = [
  FolderItemFactory({
    id: '2162f6ec-60f3-4339-be17-765a49d638c3',
    name: 'folder1',
    path: '2162f6ec_60f3_4339_be17_765a49d638c3',
    creator: CURRENT_MEMBER,
  }),
  FolderItemFactory({
    id: '81950088-ec8b-4afc-a8d2-4c6ddffdc497',
    name: 'folder2',
    path: '2162f6ec_60f3_4339_be17_765a49d638c3.81950088_ec8b_4afc_a8d2_4c6ddffdc497',
    creator: CURRENT_MEMBER,
  }),
  DocumentItemFactory({
    id: '865fad9a-a6e8-4c5f-899d-7f845bf37a1d',
    name: 'document1',
    path: '865fad9a_a6e8_4c5f_899d_7f845bf37a1d',
    extra: {
      [ItemType.DOCUMENT]: {
        content: '',
      },
    },
    creator: CURRENT_MEMBER,
  }),
  DocumentItemFactory({
    id: '02ae7c43-aaf8-45b7-a665-829fcf160550',
    name: 'document2',
    path: '2162f6ec_60f3_4339_be17_765a49d638c3.81950088_ec8b_4afc_a8d2_4c6ddffdc497.02ae7c43_aaf8_45b7_a665_829fcf160550',
    extra: {
      [ItemType.DOCUMENT]: {
        content: '',
      },
    },
    creator: CURRENT_MEMBER,
  }),
  FolderItemFactory({
    id: 'c884c33a-f8db-4a20-9935-d10b8ca758a4',
    name: 'folder3',
    path: 'c884c33a_f8db_4a20_9935_d10b8ca758a4',
    creator: MEMBERS.BOB,
  }),
  FolderItemFactory({
    id: '5dd7ed57-59b2-4058-9e70-b171a5c50be9',
    name: 'sharedFolder1',
    path: 'c884c33a_f8db_4a20_9935_d10b8ca758a4.5dd7ed57_59b2_4058_9e70_b171a5c50be9',
    creator: MEMBERS.BOB,
  }),
  DocumentItemFactory({
    id: '676d82b9-5a4c-4127-9807-2ad19b073526',
    name: 'sharedDocument1',
    path: 'c884c33a_f8db_4a20_9935_d10b8ca758a4.5dd7ed57_59b2_4058_9e70_b171a5c50be9.676d82b9_5a4c_4127_9807_2ad19b073526',
    extra: {
      [ItemType.DOCUMENT]: {
        content: '',
      },
    },
    creator: MEMBERS.BOB,
  }),
];

export const CALC_APP_ITEM = PackedAppItemFactory(
  {
    id: '820fb440-66dc-44d9-b6b4-bd767ac6085f',
    name: 'Calculator',
    path: '820fb440_66dc_44d9_b6b4_bd767ac6085f',
    creator: CURRENT_MEMBER,
  },
  { permission: PermissionLevel.Admin },
);

export const APP_ITEM_WITH_PARENT = PackedAppItemFactory(
  {
    id: 'd70ec385-e6b7-4665-b4ea-fd06badeccbc',
    name: 'App with parent',
    creator: CURRENT_MEMBER,
    parentItem: MOCK_ITEMS[0],
  },
  { permission: PermissionLevel.Admin },
);

export const CALC_APP_ITEM_WITH_PARENT = PackedAppItemFactory(
  {
    id: 'd70ec385-e6b7-4665-b4ea-fd06badeccdd',
    name: 'Calculator with parent',
    creator: CURRENT_MEMBER,
    parentItem: MOCK_ITEMS[0],
  },
  { permission: PermissionLevel.Admin },
);

export const ITEM_TO_EXPORT = PackedFolderItemFactory({
  creator: CURRENT_MEMBER,
});

export default MOCK_ITEMS;
