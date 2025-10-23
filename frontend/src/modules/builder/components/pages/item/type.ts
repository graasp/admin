import { PackedItem, PermissionLevelOptions } from '@graasp/sdk';

export interface OutletType {
  item: PackedItem;
  permission?: PermissionLevelOptions;
  canWrite: boolean;
  canAdmin: boolean;
}
