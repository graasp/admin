import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import {
  DiscriminatedItem,
  PermissionLevel,
  PermissionLevelCompare,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { ITEM_CHATBOX_BUTTON_ID } from '@/config/selectors';
import ChatboxButton from '@/ui/buttons/ChatboxButton/ChatboxButton';
import { ActionButton } from '@/ui/types';

import useModalStatus from '~builder/components/hooks/useModalStatus';

import PublishButton from '../../common/PublishButton';
import ShareButton from '../../common/ShareButton';
import EditButton from '../edit/EditButton';
import { EditModal } from '../edit/EditModal';
import ItemSettingsButton from '../settings/ItemSettingsButton';
import Actions from './Actions';

const { useItem } = hooks;

type Props = {
  itemId: DiscriminatedItem['id'];
  isChatboxOpen: boolean;
  toggleChatbox: () => void;
};

const ItemHeaderActions = ({
  itemId,
  isChatboxOpen,
  toggleChatbox,
}: Props): JSX.Element | null => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { data: item } = useItem(itemId);
  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModalStatus();

  const canWrite = item?.permission
    ? PermissionLevelCompare.gte(item.permission, PermissionLevel.Write)
    : false;
  const canAdmin = item?.permission
    ? PermissionLevelCompare.gte(item.permission, PermissionLevel.Admin)
    : false;

  // if id is defined, we are looking at an item
  if (item && item?.id) {
    return (
      <Stack direction="row">
        {canWrite && (
          <>
            <EditModal
              onClose={closeEditModal}
              open={isEditModalOpen}
              item={item}
            />
            <EditButton
              onClick={openEditModal}
              type={ActionButton.ICON_BUTTON}
              itemId={item.id}
            />
          </>
        )}

        <ShareButton itemId={item.id} />
        <ChatboxButton
          showChat={isChatboxOpen}
          tooltip={translateBuilder('ITEM_CHATBOX_TITLE', {
            name: item.name,
          })}
          id={ITEM_CHATBOX_BUTTON_ID}
          onClick={toggleChatbox}
        />
        {canAdmin && <PublishButton itemId={item.id} />}
        {canWrite && <ItemSettingsButton itemId={item.id} />}
        {/* prevent moving from top header to avoid confusion */}
        <Actions item={item} />
      </Stack>
    );
  }

  return null;
};

export default ItemHeaderActions;
