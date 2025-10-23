import {
  ItemTypeUnion,
  PackedAppItemFactory,
  PackedDocumentItemFactory,
  PackedEtherpadItemFactory,
  PackedFileItemFactory,
  PackedFolderItemFactory,
  PackedH5PItemFactory,
  PackedLinkItemFactory,
  PackedShortcutItemFactory,
  PermissionLevel,
} from '@graasp/sdk';

import { v4 } from 'uuid';

import { ItemForTest } from '../../../../support/types';

export const createPublicItemByType = (
  itemType: ItemTypeUnion,
): ItemForTest => {
  const publicVisibility = { publicVisibility: {} };

  switch (itemType) {
    case 'app':
      return PackedAppItemFactory({}, publicVisibility);
    case 'document':
      return PackedDocumentItemFactory({}, publicVisibility);
    case 'folder':
      return PackedFolderItemFactory({}, publicVisibility);
    case 'embeddedLink':
      return PackedLinkItemFactory({}, publicVisibility);
    case 'file':
      return PackedFileItemFactory({}, publicVisibility);
    case 'shortcut':
      return PackedShortcutItemFactory({}, publicVisibility);
    case 'h5p':
      return PackedH5PItemFactory({}, publicVisibility);
    case 'etherpad':
      return PackedEtherpadItemFactory({}, publicVisibility);
    case 'page':
      return {
        name: 'name',
        description: 'description',
        creator: null,
        updatedAt: new Date().toISOString(),
        lang: 'fr',
        id: v4(),
        path: '',
        type: 'page',
        extra: {} as never,
        settings: {},
        createdAt: new Date().toISOString(),
        permission: PermissionLevel.Admin,
        ...publicVisibility,
      };
    default:
      throw new Error(
        `Item Type "${itemType}" is unknown in "createPublicItemWithType"`,
      );
  }
};

export default createPublicItemByType;
