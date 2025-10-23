import type { JSX } from 'react';

import { PackedItem } from '@graasp/sdk';

import RecycleButton from '~builder/components/common/RecycleButton';
import useModalStatus from '~builder/components/hooks/useModalStatus';
import CopyButton from '~builder/components/item/copy/CopyButton';
import { CopyModal } from '~builder/components/item/copy/CopyModal';
import MoveButton from '~builder/components/item/move/MoveButton';
import { MoveModal } from '~builder/components/item/move/MoveModal';
import { useSelectionContext } from '~builder/components/main/list/SelectionContext';
import SelectionToolbar from '~builder/components/main/list/SelectionToolbar';

const HomeSelectionToolbar = ({
  items,
}: {
  items: PackedItem[];
}): JSX.Element => {
  const { selectedIds, clearSelection } = useSelectionContext();
  const selectedItems = items?.filter(({ id }) => selectedIds.includes(id));
  const {
    isOpen: isCopyModalOpen,
    openModal: openCopyModal,
    closeModal: closeCopyModal,
  } = useModalStatus();
  const {
    isOpen: isMoveModalOpen,
    openModal: openMoveModal,
    closeModal: closeMoveModal,
  } = useModalStatus();

  return (
    <>
      <CopyModal
        onClose={() => {
          closeCopyModal();
          clearSelection();
        }}
        open={isCopyModalOpen}
        items={selectedItems}
      />
      <MoveModal
        onClose={() => {
          closeMoveModal();
          clearSelection();
        }}
        open={isMoveModalOpen}
        items={selectedItems}
      />
      <SelectionToolbar>
        <>
          <MoveButton onClick={openMoveModal} />
          <CopyButton onClick={openCopyModal} />
          <RecycleButton
            onClick={clearSelection}
            color="primary"
            itemIds={selectedIds}
          />
        </>
      </SelectionToolbar>
    </>
  );
};

export default HomeSelectionToolbar;
