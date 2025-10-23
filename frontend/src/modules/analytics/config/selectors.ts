import { ExportActionsFormatting } from '@graasp/sdk';

export const BREADCRUMBS_NAVIGATOR_ID = 'breadcrumbsNavigator';
export const HOME_MENU_ID = 'homeMenu';
export const HOME_MENU_DROPDOWN_BUTTON_ID = 'homeMenuDropdownButton';
export const HOME_MENU_OWN_MENUITEM_ID = 'homeMenuOwnMenuItem';
export const HOME_MENU_SHARED_MENUITEM_ID = 'homeMenuSharedMenuItem';

export const ROOT_MENU_ID = 'rootMenu';
export const ROOT_MENU_DROPDOWN_BUTTON_ID = 'rootMenuDropdownButton';
export const SELECT_VIEW_ID = 'selectViewId';
export const SELECT_USER_ID = 'selectUserId';
export const SELECT_ACTION_ID = 'selectActionId';
export const SELECT_VIEW_RENDERED_TEXT_ID = 'selectViewTextId';

export const buildMemberAvatarId = (id?: string): string =>
  `memberAvatar-${id}`;
export const buildMemberMenuItemId = (id: string): string =>
  `memberMenuItem-${id}`;
export const buildNavigationDropDownId = (id: string): string =>
  `dropDown-${id}`;

export const buildBreadcrumbsItemLink = (id: string): string =>
  `breadcrumbsItemLink-${id}`;
export const buildMenu = (id: string): string => `menu-${id}`;
export const buildMenuDropdownButton = (id: string): string =>
  `menuDropdownButton-${id}`;
export const buildMenuItemId = (id: string): string => `menuItem-${id}`;

export const buildSelectViewId = (view: string): string => `selectView-${view}`;
export const buildSelectedUserChipId = (username: string): string =>
  `selectUser-${username}`;
export const buildSelectedActionChipId = (action: string): string =>
  `selectAction-${action}`;

export const buildSidebarListItemId = (listName: string): string =>
  `listItem-${listName}`;

export const TAB_GENERAL = 'tab-general';
export const TAB_USERS = 'tab-users';
export const TAB_ITEMS = 'tab-items';

export const APP_ITEM = 'app';
export const APPS_ID = 'apps';
export const APP_ITEM_CLASS_NAME = 'appItemContainer';

export const buildAppItemSelector = (appID: string): string =>
  `appItem-${appID}`;

export const buildSelectExportFormatID = (
  format: ExportActionsFormatting,
): string => `export-${format}-id`;

export const EXPORT_ACTIONS_BUTTON_ID = 'exportActionsButtonId';

export const TOGGLE_FILTERS_DRAWER_BUTTON_ID = 'toggleFilterDrawerButtonId';
