import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@mui/material';

import { ItemType, PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import { useParams } from '@tanstack/react-router';
import { MessageSquareOff, MessageSquareText } from 'lucide-react';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { ITEM_CHATBOX_BUTTON_ID } from '@/config/selectors';

import { useLayoutContext } from '~player/contexts/LayoutContext';

import { ToolButton } from './customButtons';

const useChatButton = (): { chatButton: JSX.Element | null } => {
  const { t } = useTranslation(NS.Player);
  const { itemId, rootId } = useParams({ from: '/player/$rootId/$itemId' });
  const { data: item } = hooks.useItem(itemId);
  const { data: root } = hooks.useItem(rootId);
  const { data: descendants } = hooks.useDescendants({
    id: rootId,
    // only fetch folder descendants as this is what the button will show
    types: [ItemType.FOLDER],
    showHidden: false,
  });
  const { toggleChatbox, isChatboxOpen } = useLayoutContext();

  const chatEnabledItems = descendants?.filter(
    ({ settings }) => settings.showChatbox,
  );

  if ((chatEnabledItems ?? []).length > 0 || root?.settings.showChatbox) {
    const canWrite = item?.permission
      ? PermissionLevelCompare.gte(item?.permission, PermissionLevel.Write)
      : false;

    const isDisabled = !item?.settings?.showChatbox;
    const tooltip = canWrite
      ? t('NAVIGATION_ISLAND_CHAT_BUTTON_HELPER_TEXT_WRITERS')
      : t('NAVIGATION_ISLAND_CHAT_BUTTON_HELPER_TEXT_READERS');

    return {
      chatButton: (
        <Tooltip title={isDisabled ? tooltip : undefined} arrow>
          <span>
            <ToolButton
              disabled={isDisabled}
              key="chatButton"
              id={ITEM_CHATBOX_BUTTON_ID}
              onClick={toggleChatbox}
              aria-label={
                isChatboxOpen ? t('HIDE_CHAT_TOOLTIP') : t('SHOW_CHAT_TOOLTIP')
              }
            >
              {isChatboxOpen ? <MessageSquareOff /> : <MessageSquareText />}
            </ToolButton>
          </span>
        </Tooltip>
      ),
    };
  }
  // disable the chat button if there are no items with the chat enabled
  return { chatButton: null };
};
export default useChatButton;
