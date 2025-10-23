import { Context, UnionOfConst } from '@graasp/sdk';

export const Variant = {
  TEXT: 'text',
  RECT: 'rectangular',
  CIRCLE: 'circular',
} as const;

export type TooltipPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export const ColorVariants = {
  Inherit: 'inherit',
  Primary: 'primary',
  Secondary: 'secondary',
  Error: 'error',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Builder: 'builder',
  Player: 'player',
  Library: 'library',
  Analytics: 'analytics',
  Auth: 'auth',
} as const;

export type ColorVariantsType = UnionOfConst<typeof ColorVariants>;

export type IconSizeVariant = 'small' | 'medium' | 'large';

export const ActionButton = {
  ICON: 'icon',
  ICON_BUTTON: 'iconButton',
  MENU_ITEM: 'menuItem',
} as const;

export type ActionButtonVariant = UnionOfConst<typeof ActionButton>;

export type AllowedContext = Exclude<Context, Context.Unknown>;

export const CCSharing = {
  YES: 'yes',
  NO: 'no',
  ALIKE: 'alike',
} as const;

export type CCSharingVariant = UnionOfConst<typeof CCSharing>;
