import { DiscriminatedItem } from '@graasp/sdk';

export const InternalItemType = {
  ZIP: 'zip',
} as const;

export type NewItemTabType =
  | DiscriminatedItem['type']
  | typeof InternalItemType.ZIP;
