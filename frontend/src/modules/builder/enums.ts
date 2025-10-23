import { UnionOfConst } from '@graasp/sdk';

const TreePreventSelection = {
  NONE: 'none',
  SELF_AND_CHILDREN: 'selfAndChildren',
} as const;

const ButtonVariants = {
  IconButton: 'icon',
  Button: 'button',
} as const;

const ItemLayoutMode = {
  List: 'list',
  Grid: 'grid',
  Map: 'map',
} as const;
export type ItemLayoutModeType = UnionOfConst<typeof ItemLayoutMode>;

const Ordering = {
  ASC: 'asc',
  DESC: 'desc',
} as const;
export type OrderingType = UnionOfConst<typeof Ordering>;

export const DEFAULT_ITEM_LAYOUT_MODE = ItemLayoutMode.List;

export { Ordering, TreePreventSelection, ButtonVariants, ItemLayoutMode };
