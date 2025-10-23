import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';

import { BUILDER } from '../../../langs';
import ItemSelectionModal, {
  ItemSelectionModalProps,
} from '../../main/itemSelectionModal/ItemSelectionModal';

export const CopyModal = ({
  items,
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  items: DiscriminatedItem[];
}): JSX.Element | null => {
  const { mutate: copyItems } = mutations.useCopyItems();
  const { t: translateBuilder } = useTranslation(NS.Builder);

  if (!items.length) {
    return null;
  }

  const onConfirm: ItemSelectionModalProps['onConfirm'] = (destination) => {
    copyItems({
      ids: items.map((i) => i.id),
      to: destination,
    });
    onClose();
  };

  const buttonText = (name?: string) =>
    translateBuilder('COPY_BUTTON', { name, count: name ? 1 : 0 });

  // prevent loading if not opened
  if (!open) {
    return null;
  }

  return (
    <ItemSelectionModal
      title={translateBuilder(BUILDER.COPY_ITEM_MODAL_TITLE, {
        count: items.length - 1,
        name: items[0].name,
      })}
      buttonText={buttonText}
      onClose={onClose}
      open={open}
      onConfirm={onConfirm}
      items={items}
      // cannot copy in self or below
      isDisabled={(itemsToCopy, item) => {
        return itemsToCopy.some((i) => item.path.includes(i.path));
      }}
    />
  );
};
