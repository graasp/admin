import type { JSX } from 'react';

import { PackedItem, PermissionLevel } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { Chatbox as GraaspChatbox } from '@/components/chatbox/Chatbox/Chatbox';
import { useChatboxProvider } from '@/components/chatbox/Chatbox/chatbox.hook';
import { CHATBOX_ID, CHATBOX_INPUT_BOX_ID } from '@/config/selectors';
import { getCurrentAccountOptions } from '@/openapi/client/@tanstack/react-query.gen';
import Loader from '@/ui/Loader/Loader';

type Props = {
  item: PackedItem;
};

const Chatbox = ({ item }: Props): JSX.Element | null => {
  const { isLoading: isChatLoading } = useChatboxProvider({ itemId: item.id });
  const { data: currentAccount, isLoading: isLoadingCurrentMember } = useQuery(
    getCurrentAccountOptions(),
  );

  if (isChatLoading || isLoadingCurrentMember) {
    return <Loader />;
  }

  // only signed in member can see the chat
  if (!currentAccount) {
    return null;
  }

  // only show export chat when user has admin right on the item
  const isAdmin = item.permission === PermissionLevel.Admin;

  return (
    <GraaspChatbox
      id={CHATBOX_ID}
      sendMessageBoxId={CHATBOX_INPUT_BOX_ID}
      itemId={item.id}
      showAdminTools={isAdmin}
    />
  );
};

export default Chatbox;
