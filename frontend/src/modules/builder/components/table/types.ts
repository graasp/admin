import { UnionOfConst } from '@graasp/sdk';

// corresponds to the value that should be sent in the request
export const SortingOptions = {
  ItemName: 'item.name',
  ItemType: 'item.type',
  ItemCreator: 'item.creator.name',
  ItemUpdatedAt: 'item.updated_at',
} as const;
export type SortingOptionsType = UnionOfConst<typeof SortingOptions>;

// special sorting value for inside folders
// corresponds to the value that should be sent in the request
export const SortingOptionsForFolder = {
  ItemName: 'item.name',
  ItemType: 'item.type',
  ItemCreator: 'item.creator.name',
  ItemUpdatedAt: 'item.updated_at',
  Order: 'item.order',
} as const;
export type SortingOptionsForFolderType = UnionOfConst<
  typeof SortingOptionsForFolder
>;

export type AllSortingOptions =
  | SortingOptionsType
  | SortingOptionsForFolderType;
