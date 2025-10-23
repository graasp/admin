import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem, PackedItem, getParentFromPath } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import type { NavigationElement } from '@/ui/Tree/types';

import { BUILDER } from '../../../langs';
import ItemSelectionModal, {
  ItemSelectionModalProps,
} from '../../main/itemSelectionModal/ItemSelectionModal';

type MoveButtonProps = {
  items?: PackedItem[];
  open: boolean;
  onClose: () => void;
};

export const MoveModal = ({
  onClose,
  items,
  open,
}: MoveButtonProps): JSX.Element | null => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { mutate: moveItems } = mutations.useMoveItems();

  const onConfirm: ItemSelectionModalProps['onConfirm'] = (destination) => {
    if (items) {
      moveItems({
        items,
        to: destination,
      });
    }
  };

  const isDisabled = (
    itemsArray: DiscriminatedItem[],
    item: NavigationElement,
    homeId: string,
  ) => {
    if (itemsArray?.length) {
      // cannot move inside self and below
      const moveInSelf = itemsArray.some((i) => item.path.includes(i.path));

      // cannot move in same direct parent
      // todo: not opti because we only have the ids from the table
      const directParentIds = itemsArray.map((i) => getParentFromPath(i.path));
      const moveInDirectParent = directParentIds.includes(item.id);

      // cannot move to home if was already on home
      let moveToHome = false;

      moveToHome = item.id === homeId && !getParentFromPath(itemsArray[0].path);

      return moveInSelf || moveInDirectParent || moveToHome;
    }
    return false;
  };

  const buttonText = (name?: string) =>
    translateBuilder('MOVE_BUTTON', { name, count: name ? 1 : 0 });

  // prevent loading if not opened
  if (!open) {
    return null;
  }

  return items ? (
    <ItemSelectionModal
      title={translateBuilder(BUILDER.MOVE_ITEM_MODAL_TITLE)}
      isDisabled={isDisabled}
      buttonText={buttonText}
      onClose={onClose}
      open={open}
      onConfirm={onConfirm}
      items={items}
    />
  ) : null;
};
