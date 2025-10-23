import type { JSX } from 'react';

import { DiscriminatedItem } from '@graasp/sdk';

import {
  RECYCLE_BIN_DELETE_MANY_ITEMS_BUTTON_ID,
  RECYCLE_BIN_RESTORE_MANY_ITEMS_BUTTON_ID,
} from '@/config/selectors';

import DeleteButton from '~builder/components/common/DeleteButton';
import RestoreButton from '~builder/components/common/RestoreButton';
import { useSelectionContext } from '~builder/components/main/list/SelectionContext';
import SelectionToolbar from '~builder/components/main/list/SelectionToolbar';

const RecycleBinSelectionToolbar = ({
  items,
}: {
  items: DiscriminatedItem[];
}): JSX.Element => {
  const { selectedIds, clearSelection } = useSelectionContext();

  return (
    <SelectionToolbar>
      <>
        <RestoreButton
          id={RECYCLE_BIN_RESTORE_MANY_ITEMS_BUTTON_ID}
          itemIds={selectedIds}
          onClick={clearSelection}
        />
        <DeleteButton
          id={RECYCLE_BIN_DELETE_MANY_ITEMS_BUTTON_ID}
          items={items.filter(({ id }) => selectedIds.includes(id))}
          onConfirm={clearSelection}
        />
      </>
    </SelectionToolbar>
  );
};

export default RecycleBinSelectionToolbar;
