import { UnionOfConst } from '@graasp/sdk';

/** Enumeration of available platforms */
export const Platform = {
  Builder: 'builder',
  Player: 'player',
  Library: 'library',
  Analytics: 'analytics',
} as const;
export type PlatformType = UnionOfConst<typeof Platform>;

/** Maps each Platform to a URL generator function */
export type HostsMapper = Partial<
  Record<PlatformType, (itemId?: string) => string | undefined>
>;

/**
 * Generates a default hosts mapper given a record of platform to hostname
 * Only the origin part of the given hostname will be used!
 *
 * The default mapping is:
 *  BUILDER_HOST/items/<itemId>
 *  PLAYER_HOST/<itemId>
 *  LIBRARY_HOST/<itemId>
 *  ANALYTICS_HOST/items/<itemId>
 *
 * For any advanced usage, create your own {@see HostsMapper}
 */
export function defaultHostsMapper(
  hostsUrls: Partial<Record<PlatformType, string>>,
): HostsMapper {
  const urlBuilders: Record<
    PlatformType,
    (origin: string, itemId: string) => string
  > = {
    [Platform.Builder]: (origin: string, itemId: string) =>
      `${origin}/items/${itemId}`,
    [Platform.Player]: (origin: string, itemId: string) =>
      `${origin}/${itemId}`,
    [Platform.Library]: (origin: string, _itemId: string) =>
      // for now redirect to library home
      // in the future we may want to redirect to itemId and
      // redirect to home only if it is not published from there
      `${origin}`,
    [Platform.Analytics]: (origin: string, itemId: string) =>
      `${origin}/items/${itemId}`,
  };

  return Object.fromEntries(
    Object.entries(hostsUrls).map(([platform, url]) => {
      const origin = new URL(url).origin;
      return [
        platform,
        // if passed itemId is undefined, redirect to home page of platform
        (itemId: string) =>
          itemId
            ? urlBuilders[platform as PlatformType](origin, itemId)
            : origin,
      ];
    }),
  ) as HostsMapper;
}

/**
 * Hook to create a platform navigator function
 * @param hostsMapper {@see HostsMapper}
 * @param itemId Optional ID of the item context which will be opened in the target platform
 * @returns A mouse events factory that will generate left and middle click actions, to be applied to a given platform
 */
export function usePlatformNavigation(
  hostsMapper: HostsMapper,
  itemId?: string,
) {
  return (platform: PlatformType) => {
    const url = hostsMapper[platform]?.(itemId);
    const href = url ?? '#';
    return {
      href,
    };
  };
}
