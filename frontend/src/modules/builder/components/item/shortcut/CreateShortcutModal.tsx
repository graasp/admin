import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DiscriminatedItem,
  ItemType,
  ShortcutItemType,
  buildShortcutExtra,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';

import { BUILDER } from '../../../langs';
import ItemSelectionModal, {
  ItemSelectionModalProps,
} from '../../main/itemSelectionModal/ItemSelectionModal';

export type Props = {
  item: DiscriminatedItem;
  onClose: () => void;
  open: boolean;
};

const CreateShortcutModal = ({
  item: defaultItem,
  onClose,
  open,
}: Props): JSX.Element | null => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { mutate: createShortcut } = mutations.usePostItem();
  const [item] = useState<DiscriminatedItem>(defaultItem);

  const onConfirm: ItemSelectionModalProps['onConfirm'] = (destination) => {
    const target = item.id; // id of the item where the shortcut is pointing

    const shortcut: Partial<ShortcutItemType> &
      Pick<DiscriminatedItem, 'name' | 'type'> & {
        parentId?: string;
      } = {
      name: translateBuilder(BUILDER.CREATE_SHORTCUT_DEFAULT_NAME, {
        name: item?.name,
      }),
      extra: buildShortcutExtra(target),
      type: ItemType.SHORTCUT,
      parentId: destination,
    };

    createShortcut(shortcut);
    onClose();
  };

  const buttonText = (name?: string) =>
    translateBuilder('CREATE_SHORTCUT_BUTTON', { name, count: name ? 1 : 0 });

  if (item && open) {
    return (
      <ItemSelectionModal
        title={translateBuilder(BUILDER.CREATE_SHORTCUT_MODAL_TITLE)}
        buttonText={buttonText}
        onClose={onClose}
        open={open}
        onConfirm={onConfirm}
        items={[item]}
      />
    );
  }

  return null;
};

export default CreateShortcutModal;
