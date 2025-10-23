import {
  ChatMessage,
  DiscriminatedItem,
  ItemMembership,
  Member,
  PermissionLevel,
  PermissionLevelCompare,
  isChildOf,
} from '@graasp/sdk';

import { StatusCodes } from 'http-status-codes';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

import { ItemForTest } from './types';

// use simple id format for tests
export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';
export const SHORTLINK_FORMAT = '[a-zA-Z0-9-]+';

export const uuidValidateV4 = (uuid: string | null | undefined): boolean => {
  if (!uuid) {
    return false;
  }
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

/**
 * Try to extract the item id from a given url.
 * If it fails, an error will be thrown.
 *
 * @param interceptedPathFormat The path's format of the intercepted url.
 * @param url The complete url from the interceptor.
 * @returns The item id if found.
 * @throws If the item is not found.
 */
export const extractItemIdOrThrow = (
  interceptedPathFormat: string,
  url: URL,
): string => {
  const { protocol, host, pathname: urlPath } = url;
  const filterOutEmptyString = (
    value: string,
    _index: number,
    _array: string[],
  ) => value !== '';

  const hostAndProtocol = `${protocol}//${host}`;
  const interceptedParts = `${hostAndProtocol}/${interceptedPathFormat}`
    .slice(hostAndProtocol.length)
    .split('/')
    .filter(filterOutEmptyString);

  const positionOfId = interceptedParts.indexOf(ID_FORMAT);
  const urlParts = urlPath.split('/').filter(filterOutEmptyString);
  const itemId = urlParts[positionOfId];

  if (!uuidValidateV4(itemId)) {
    throw new Error(
      'MockServer error: The item id was not extracted correctly from the url!',
    );
  }

  return itemId;
};

export const getDataCy = (dataCy: string): string => `[data-cy="${dataCy}"]`;
export const buildDataCySelector = (
  dataCy: string,
  htmlSelector: string,
): string => `${getDataCy(dataCy)} ${htmlSelector}`;

/**
 * Parse characters of a given string to return a correct regex string
 * This function mainly allows for endpoints to have fixed chain of strings
 * as well as regex descriptions for data validation, eg /items/item-login?parentId=<id>
 *
 * @param {string} inputString
 * @param {string[]} characters
 * @param {boolean} parseQueryString
 * @returns regex string of the given string
 */
export const parseStringToRegExp = (
  inputString: string,
  { characters = ['?', '.'], parseQueryString = false } = {},
): string => {
  const [originalPathname, ...querystrings] = inputString.split('?');
  let pathname = originalPathname;
  let querystring = querystrings.join('?');
  characters.forEach((c) => {
    pathname = pathname.replaceAll(c, `\\${c}`);
  });
  if (parseQueryString) {
    characters.forEach((c) => {
      querystring = querystring.replaceAll(c, `\\${c}`);
    });
  }
  return `${pathname}${querystring.length ? '\\?' : ''}${querystring}`;
};

export const getItemById = (
  items: ItemForTest[],
  targetId: string,
): ItemForTest | undefined => items.find(({ id }) => targetId === id);

export const getChatMessagesById = (
  chatMessages: ChatMessage[],
  targetId: string,
): ChatMessage[] | undefined =>
  chatMessages.filter(({ itemId }) => targetId === itemId);

export const DEFAULT_GET = {
  credentials: 'include',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export const DEFAULT_POST = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

export const DEFAULT_DELETE = {
  method: 'DELETE',
  credentials: 'include',
};

export const DEFAULT_PATCH = {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

export const DEFAULT_PUT = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
};

export const checkMemberHasAccess = ({
  item,
  items,
  member,
}: {
  item: ItemForTest;
  items: ItemForTest[];
  member: Member | null;
}): undefined | { statusCode: number } => {
  if (
    item.permission &&
    PermissionLevelCompare.gte(item.permission, PermissionLevel.Read)
  ) {
    return undefined;
  }

  // mock membership
  const { creator } = item;
  const haveWriteMembership =
    creator?.id === member?.id ||
    items.find(
      (i) =>
        item.path.startsWith(i.path) &&
        i.memberships?.find(
          ({ account, permission }) =>
            account.id === member?.id &&
            PermissionLevelCompare.gte(permission, PermissionLevel.Write),
        ),
    );
  const haveReadMembership =
    items.find(
      (i) =>
        item.path.startsWith(i.path) &&
        i.memberships?.find(
          ({ account, permission }) =>
            account.id === member?.id &&
            PermissionLevelCompare.lt(permission, PermissionLevel.Write),
        ),
    ) ?? false;

  const isHidden =
    items.find(
      (i) =>
        item.path.startsWith(i.path) &&
        i?.visibilities?.find((v) => v.type === 'hidden'),
    ) ?? false;
  const isPublic =
    items.find((i) => item.path.startsWith(i.path) && i?.public) ?? false;
  // user is more than a reader so he can access the item
  if (isHidden && haveWriteMembership) {
    return undefined;
  }
  if (!isHidden && (haveWriteMembership || haveReadMembership)) {
    return undefined;
  }
  // item is public and not hidden
  if (!isHidden && isPublic) {
    return undefined;
  }
  return { statusCode: StatusCodes.FORBIDDEN };
};

export const getChildren = (
  items: ItemForTest[],
  item: ItemForTest,
  member: Member | null,
): ItemForTest[] =>
  items.filter(
    (newItem) =>
      isChildOf(newItem.path, item.path) &&
      checkMemberHasAccess({ item: newItem, items, member }) === undefined,
  );

// todo: to remove
// get highest permission a member have over an item,
// longer the itemPath, deeper is the permission, thus highest
export const getHighestPermissionForMemberFromMemberships = ({
  memberships,
  memberId,
  itemPath,
}: {
  memberships?: ItemMembership[];
  memberId?: string;
  itemPath: DiscriminatedItem['path'];
}): null | ItemMembership => {
  if (!memberId) {
    return null;
  }

  const itemMemberships = memberships?.filter(
    ({ item: { path: mPath }, account: { id: mId } }) =>
      mId === memberId && itemPath.includes(mPath),
  );
  if (!itemMemberships || itemMemberships.length === 0) {
    return null;
  }

  const sorted = [...itemMemberships];

  // sort memberships by the closest to you first (longest path)
  sorted?.sort((a, b) => (a.item.path.length > b.item.path.length ? -1 : 1));

  return sorted[0];
};
