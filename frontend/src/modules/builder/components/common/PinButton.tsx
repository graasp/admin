import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { PIN_ITEM_BUTTON_CLASS } from '@/config/selectors';
import GraaspPinButton from '@/ui/buttons/PinButton/PinButton';
import { ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../langs';

type Props = {
  type?: ActionButtonVariant;
  item: DiscriminatedItem;
  onClick?: () => void;
};

const PinButton = ({ item, type, onClick }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const editItem = mutations.useEditItem();
  const [isPinned, setIsPinned] = useState(item?.settings?.isPinned);

  const handlePin = () => {
    setIsPinned(!isPinned);

    editItem.mutate({
      id: item.id,
      name: item.name,
      settings: {
        isPinned: !isPinned,
      },
    });
    onClick?.();
  };

  const pinText = translateBuilder(BUILDER.PIN_ITEM_PIN_TEXT);
  const unPinText = translateBuilder(BUILDER.PIN_ITEM_UNPIN_TEXT);

  return (
    <GraaspPinButton
      color="inherit"
      type={type}
      onClick={handlePin}
      isPinned={isPinned}
      pinText={pinText}
      unPinText={unPinText}
      menuItemClassName={PIN_ITEM_BUTTON_CLASS}
    />
  );
};

export default PinButton;
