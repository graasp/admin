import type { JSX } from 'react';

import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

import LibraryIcon from '@/ui/icons/LibraryIcon';

import { BUILDER } from '~builder/langs';

export interface MenuItemType {
  name: string;
  path: string;
}
export interface ExtraItem {
  name: string;
  path: string;
  icon?: JSX.Element;
  menuItems?: MenuItemType[];
}

export const buildExtraItems = ({
  translate,
  location,
  itemId,
}: {
  location: string;
  itemId?: string;
  translate: (s: string) => string;
}): ExtraItem[] => {
  if (!itemId) {
    return [];
  }

  const page = location;

  // we don't switch to sub pages
  // const menuItems = [
  //   {
  //     name: translate(BUILDER.SETTINGS_TITLE),
  //     path: buildItemSettingsPath(itemId),
  //   },
  //   {
  //     name: translate(BUILDER.SHARE_ITEM_BUTTON),
  //     path: buildItemSharePath(itemId),
  //   },
  //   {
  //     name: translate(BUILDER.LIBRARY_SETTINGS_PUBLISH_BUTTON),
  //     path: buildItemPublishPath(itemId),
  //   },
  //   {
  //     name: translate(BUILDER.ITEM_ACTION_INFORMATION),
  //     path: buildItemInformationPath(itemId),
  //   },
  // ];

  switch (true) {
    case page.includes('settings'):
      return [
        {
          name: translate(BUILDER.SETTINGS_TITLE),
          icon: <SettingsIcon />,
          path: `/builder/items/${itemId}/settings`,
          menuItems: [],
        },
      ];
    case page.includes('share'):
      return [
        {
          name: translate(BUILDER.SHARE_ITEM_BUTTON),
          icon: <GroupsIcon />,
          path: `/builder/items/${itemId}/share`,
          menuItems: [],
        },
      ];
    case page.includes('publish'):
      return [
        {
          name: translate(BUILDER.LIBRARY_SETTINGS_PUBLISH_BUTTON),
          icon: (
            <LibraryIcon
              size={24}
              showSetting
              primaryColor="#777"
              secondaryColor="#fff"
              disableHover
              selected
            />
          ),
          path: `/builder/items/${itemId}/publish`,
          menuItems: [],
        },
      ];
    default:
      return [];
  }
};
