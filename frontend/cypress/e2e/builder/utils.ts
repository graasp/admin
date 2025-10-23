export const buildItemPath = (id: string, options?: { mode: string }) => {
  const path = `/builder/items/${id}`;
  if (options) {
    return `${path}?mode=${options.mode}`;
  }
  return path;
};
export const buildItemSharePath = (id: string) => `${buildItemPath(id)}/share`;
export const buildItemSettingsPath = (id: string) =>
  `${buildItemPath(id)}/settings`;
export const HOME_PATH = '/home';
export const BOOKMARKED_ITEMS_PATH = '/builder/bookmarks';
export const PUBLISHED_ITEMS_PATH = '/published';
export const RECYCLE_BIN_PATH = '/recycled';
export const MAP_ITEMS_PATH = '/builder/map';
