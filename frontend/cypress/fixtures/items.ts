import {
  DocumentItemFactory,
  FolderItemFactory,
  ItemType,
  PackedDocumentItemFactory,
  PackedFolderItemFactory,
  PermissionLevel,
  ShortcutItemFactory,
  buildPathFromIds,
} from '@graasp/sdk';

import { v4 } from 'uuid';

import { DEFAULT_LANG } from '../../src/config/constants';
import { ItemForTest } from '../support/types';
import { CURRENT_MEMBER } from './members';

export const DEFAULT_FOLDER_ITEM = PackedFolderItemFactory({
  name: 'default folder',
  extra: { [ItemType.FOLDER]: {} },
  creator: CURRENT_MEMBER,
});

export const ITEM_WITH_CHAT_BOX: ItemForTest = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
  name: 'parent folder',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
  settings: {
    isPinned: false,
    showChatbox: true,
  },
};

export const DOCUMENT_WITH_CHAT_BOX: ItemForTest = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
  name: 'parent folder',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
  type: 'document',
  extra: { document: { content: 'hello this is a document' } },
  settings: {
    isPinned: false,
    showChatbox: true,
  },
};

export const DOCUMENT_WITHOUT_CHAT_BOX: ItemForTest = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
  name: 'parent folder',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
  type: 'document',
  extra: { document: { content: 'hello this is a document with no chatbox' } },
  settings: {
    isPinned: false,
    showChatbox: false,
  },
};

export const ITEM_WITHOUT_CHAT_BOX: ItemForTest = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
  name: 'child folder',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
  settings: {
    isPinned: false,
    showChatbox: false,
  },
};

export const FOLDER_WITH_SUBFOLDER_ITEM: { items: ItemForTest[] } = {
  items: [
    PackedFolderItemFactory(
      {
        ...DEFAULT_FOLDER_ITEM,
        id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
        name: 'parent folder',
        path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
        type: ItemType.FOLDER,
        extra: {
          [ItemType.FOLDER]: {},
        },
        settings: {
          isPinned: false,
          showChatbox: false,
        },
      },
      {
        permission: PermissionLevel.Admin,
      },
    ),
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
      name: 'child folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
      name: 'child folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130005',
      name: 'child of child folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003.fdf09f5a_5688_11eb_ae93_0242ac130005',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130006',
      name: 'document inside of child folder',
      type: 'document',
      extra: { document: { content: 'hello I am a document' } },
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003.fdf09f5a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130006',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
  ],
};
export const FOLDER_WITH_SUBFOLDER_ITEM_AND_PARTIAL_ORDER: {
  items: ItemForTest[];
} = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      extra: {
        [ItemType.FOLDER]: {},
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
      name: 'child folder 1',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
      name: 'child folder 2',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130005',
      name: 'child of child folder 1',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003.fdf09f5a_5688_11eb_ae93_0242ac130005',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
  ],
};

export const FOLDER_WITH_PINNED_ITEMS: { items: ItemForTest[] } = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130005',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      type: ItemType.LINK,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130006',
      name: 'NOT PINNED',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130006',
      extra: {
        [ItemType.LINK]: {
          url: 'http://example.com',
          html: '',
          thumbnails: [],
          icons: [],
        },
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130007',
      name: 'PINNED',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130007',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
  ],
};

const getPinnedElementWithoutInheritance = (): ItemForTest[] => {
  const parent = PackedFolderItemFactory(
    {
      name: 'Parent folder',
      creator: CURRENT_MEMBER,
    },
    { permission: PermissionLevel.Admin },
  );
  const children = [
    PackedDocumentItemFactory(
      {
        name: 'pinned from root',
        extra: { document: { content: 'I am pinned from parent' } },
        settings: { isPinned: true },
        parentItem: parent,
        creator: CURRENT_MEMBER,
      },
      { permission: PermissionLevel.Admin },
    ),
    PackedFolderItemFactory(
      {
        name: 'child folder 1',
        settings: { isPinned: false },
        parentItem: parent,
        creator: CURRENT_MEMBER,
      },
      { permission: PermissionLevel.Admin },
    ),
    PackedFolderItemFactory(
      {
        name: 'child folder 2',
        settings: { isPinned: false },
        parentItem: parent,
        creator: CURRENT_MEMBER,
      },
      { permission: PermissionLevel.Admin },
    ),
  ];
  const childrenOfChildren = [
    DocumentItemFactory({
      name: 'text in children 1',
      extra: { document: { content: 'Not pinned' } },
      settings: { isPinned: false },
      parentItem: children[1],
      creator: CURRENT_MEMBER,
    }),
    DocumentItemFactory({
      name: 'pinned text in children 2',
      extra: { document: { content: 'I am pinned from child 2' } },
      parentItem: children[2],
      settings: { isPinned: true },
      creator: CURRENT_MEMBER,
    }),
  ];
  const items = [parent, ...children, ...childrenOfChildren];
  return items;
};

export const PINNED_ITEMS_SHOULD_NOT_INHERIT =
  getPinnedElementWithoutInheritance();

export const PINNED_AND_HIDDEN_ITEM: { items: ItemForTest[] } = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130005',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...PackedFolderItemFactory(
        {
          ...DEFAULT_FOLDER_ITEM,
          id: 'fdf09f5a-5688-11eb-ae93-0242ac130007',
          name: 'PINNED & hidden',
          path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130007',
          settings: {
            isPinned: true,
            showChatbox: false,
          },
        },
        {
          hiddenVisibility: {},
        },
      ),
    },
    {
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130008',
      name: 'Normal child',
      description: 'I am a normal item',
      type: ItemType.DOCUMENT,
      extra: { [ItemType.DOCUMENT]: { content: 'hello' } },
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130008',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
      lang: DEFAULT_LANG,
      creator: CURRENT_MEMBER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export const PUBLIC_FOLDER_WITH_PINNED_ITEMS: { items: ItemForTest[] } = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130005',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
      // public: mockPublicTag(),
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      type: ItemType.LINK,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130006',
      name: 'NOT PINNED',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130006',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
      extra: {
        [ItemType.LINK]: {
          url: 'http://example.com',
          html: '',
          thumbnails: [],
          icons: [],
        },
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130007',
      name: 'PINNED',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130007',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
  ],
};

export const FOLDER_WITH_HIDDEN_ITEMS: { items: ItemForTest[] } = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130008',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130008',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    DocumentItemFactory(),
    PackedDocumentItemFactory({}, { hiddenVisibility: {} }),
    PackedDocumentItemFactory(
      {
        id: 'ecafbd2a-5688-11eb-ae93-0242ac130012',
        name: 'hidden folder',
        path: 'ecafbd2a_5688_11eb_ae93_0242ac130008.ecafbd2a-5688-11eb-ae93-0242ac130012',
        settings: {
          isPinned: false,
          showChatbox: false,
        },
      },
      { hiddenVisibility: {} },
    ),
  ],
};

export const getFolderWithShortcutFixture = (): ItemForTest[] => {
  const parent = FolderItemFactory({ name: 'Lesson', creator: CURRENT_MEMBER });
  const child = FolderItemFactory({
    parentItem: parent,
    name: 'Part 1',
    creator: CURRENT_MEMBER,
  });
  const documentItem = DocumentItemFactory({
    extra: { document: { content: 'I am a document' } },
    creator: CURRENT_MEMBER,
  });
  return [
    parent,
    documentItem,
    child,
    DocumentItemFactory({ parentItem: parent, creator: CURRENT_MEMBER }),
    ShortcutItemFactory({
      parentItem: parent,
      creator: CURRENT_MEMBER,
      extra: { shortcut: { target: documentItem.id } },
    }),
  ];
};

const tmpDocument = DocumentItemFactory();
export const FOLDER_WITH_COLLAPSIBLE_SHORTCUT_ITEMS: { items: ItemForTest[] } =
  {
    items: [
      // original for the shortcut
      tmpDocument,
      {
        ...DEFAULT_FOLDER_ITEM,
        id: 'ecafbd2a-5688-11eb-ae93-0242ac130008',
        name: 'parent folder',
        path: 'ecafbd2a_5688_11eb_ae93_0242ac130008',
        settings: {
          isPinned: false,
          showChatbox: false,
        },
      },
      // shortcut with collapse enabled
      ShortcutItemFactory({
        name: 'Shortcut to original document',
        path: 'ecafbd2a_5688_11eb_ae93_0242ac130008.ecafbd2a_5688_11eb_ae93_0242ac130012',
        type: ItemType.SHORTCUT,
        extra: {
          [ItemType.SHORTCUT]: { target: tmpDocument.id },
        },
        settings: { isCollapsible: true },
      }),
    ],
  };

export const generateLotsOfFoldersOnHome = ({
  folderCount,
  creator = DEFAULT_FOLDER_ITEM.creator,
  memberships = [],
}: {
  folderCount: number;
  creator?: ItemForTest['creator'];
  memberships?: ItemForTest['memberships'];
}): ItemForTest[] =>
  Array.from(Array(folderCount)).map(() => {
    const itemId = v4();
    return {
      ...DEFAULT_FOLDER_ITEM,
      id: itemId,
      name: itemId,
      path: buildPathFromIds(itemId),
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
      memberships,
      creator,
    };
  });

export const HOME_FOLDERS: { items: ItemForTest[] } = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
      name: 'folder',
      path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
      name: 'folder',
      path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
      name: 'folder',
      path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
      name: 'folder',
      path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
      name: 'folder',
      path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
      name: 'folder',
      path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
      type: ItemType.FOLDER,
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
  ],
};

export const FOLDER_WITHOUT_CHILDREN_ORDER: { items: ItemForTest[] } = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130122',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130122',
      extra: {
        [ItemType.FOLDER]: {},
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
  ],
};

export const FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS: {
  items: ItemForTest[];
} = {
  items: [
    // root
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      extra: {
        [ItemType.FOLDER]: {},
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    // children (need to be in order to respect test)
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
      name: 'child folder 1',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
      name: 'child folder 2',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130007',
      name: 'child folder 3',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a-5688-11eb-ae93-0242ac130007',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130008',
      name: 'child folder 4',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a-5688-11eb-ae93-0242ac130008',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130009',
      name: 'child folder 5',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a-5688-11eb-ae93-0242ac130009',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
  ],
};

export const ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS: {
  items: ItemForTest[];
} = {
  items: [
    // root
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'acafbd2a-5688-11eb-ae93-0242ac130002',
      name: 'parent folder',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130002',
      extra: {
        [ItemType.FOLDER]: {},
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    // children (need to be in order to respect test)
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
      name: 'child folder 1',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
      name: 'child folder 2',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130007',
      name: 'child folder 3',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a-5688-11eb-ae93-0242ac130007',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130008',
      name: 'child folder 4',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a-5688-11eb-ae93-0242ac130008',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130009',
      name: 'child folder 5',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a-5688-11eb-ae93-0242ac130009',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
  ],
};

export const YET_ANOTHER_FOLDER_WITH_FIVE_ORDERED_SUBFOLDER_ITEMS: {
  items: ItemForTest[];
} = {
  items: [
    // root
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'acafbd2a-5688-11eb-ae93-0242ac130012',
      name: 'parent folder',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130012',
      extra: {
        [ItemType.FOLDER]: {},
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    // children (need to be in order to respect test)
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130013',
      name: 'child folder 1',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130012.fdf09f5a_5688_11eb_ae93_0242ac130013',
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130014',
      name: 'child folder 2',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130012.fdf09f5a_5688_11eb_ae93_0242ac130014',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130017',
      name: 'child folder 3',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130012.fdf09f5a-5688-11eb-ae93-0242ac130017',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130018',
      name: 'child folder 4',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130012.fdf09f5a-5688-11eb-ae93-0242ac130018',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130019',
      name: 'child folder 5',
      path: 'acafbd2a_5688_11eb_ae93_0242ac130012.fdf09f5a-5688-11eb-ae93-0242ac130019',
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
  ],
};
