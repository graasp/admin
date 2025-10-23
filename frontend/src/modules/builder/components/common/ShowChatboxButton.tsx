import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import ChatboxButton from '@/ui/buttons/ChatboxButton/ChatboxButton';
import { ActionButtonVariant } from '@/ui/types';

type Props = {
  type?: ActionButtonVariant;
  item: DiscriminatedItem;
};

const ShowChatboxButton = ({ item, type }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const editItem = mutations.useEditItem();
  const showChatbox = item?.settings?.showChatbox;

  const onClick = () => {
    editItem.mutate({
      id: item.id,
      name: item.name,
      settings: {
        showChatbox: !showChatbox,
      },
    });
  };

  return (
    <ChatboxButton
      color={showChatbox ? 'primary' : 'inherit'}
      showChat={showChatbox ?? false}
      type={type}
      onClick={onClick}
      showChatText={translateBuilder('CHAT.SHOW')}
      hideChatText={translateBuilder('CHAT.HIDE')}
    />
  );
};

export default ShowChatboxButton;
