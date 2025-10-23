import { createContext, useContext } from 'react';

import { PackedItem, PermissionLevelOptions } from '@graasp/sdk';

type OutletContextType = {
  item: PackedItem;
  canWrite: boolean;
  canAdmin: boolean;
  permission?: PermissionLevelOptions | null;
};
export const OutletContext = createContext<OutletContextType>({
  item: undefined!,
  canWrite: false,
  canAdmin: false,
  permission: undefined!,
});

export const useOutletContext = () => useContext(OutletContext);
