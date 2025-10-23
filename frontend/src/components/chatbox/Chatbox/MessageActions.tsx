import { type MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Delete, Edit, MoreVert } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';

import { useChatboxProvider } from '@/components/chatbox/Chatbox/chatbox.hook.js';
import { NS } from '@/config/constants.js';
import type { ChatMessageWithCreator } from '@/openapi/client/types.gen.js';

import { LIST_ICON_MIN_WIDTH } from '../constants.js';
import { useEditingContext } from '../context/EditingContext.js';
import {
  deleteMenuItemCypress,
  editMenuItemCypress,
  messageActionsButtonCypress,
} from '../selectors.js';

type Props = {
  message: ChatMessageWithCreator;
  isOwn?: boolean;
  itemId: string;
};

const StyledListItemIcon = styled(ListItemIcon)({
  // reduce min width of icons in list to make more compact
  '&.MuiListItemIcon-root': {
    minWidth: LIST_ICON_MIN_WIDTH,
  },
});

export function MessageActions({ message, isOwn = false, itemId }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { t } = useTranslation(NS.Chatbox);
  const { enableEdit } = useEditingContext();
  const { deleteMessage } = useChatboxProvider({ itemId });

  const handleOnClickMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchor(e.currentTarget);
    setMenuOpen(!menuOpen);
  };

  const handleOnCloseMenu = (): void => {
    setMenuAnchor(null);
  };

  const handleDeleteMessage = (): void => {
    deleteMessage({ path: { itemId: message.itemId, messageId: message.id } });
    handleOnCloseMenu();
  };

  const handleEditMessage = (): void => {
    enableEdit(message.id, message.body);
    handleOnCloseMenu();
  };

  return (
    <>
      <IconButton
        data-cy={messageActionsButtonCypress}
        onClick={handleOnClickMenu}
      >
        <MoreVert />
      </IconButton>
      <Menu
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={handleOnCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {
          // only show the edit button on own messages
          isOwn && (
            <MenuItem
              data-cy={editMenuItemCypress}
              onClick={handleEditMessage}
              dense
            >
              <StyledListItemIcon>
                <Edit color="primary" />
              </StyledListItemIcon>
              <ListItemText>{t('EDIT_BUTTON')}</ListItemText>
            </MenuItem>
          )
        }
        <MenuItem
          data-cy={deleteMenuItemCypress}
          onClick={handleDeleteMessage}
          dense
        >
          <StyledListItemIcon>
            <Delete color="error" />
          </StyledListItemIcon>
          <ListItemText>{t('DELETE_BUTTON')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
