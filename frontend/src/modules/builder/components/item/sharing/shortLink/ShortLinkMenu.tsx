import { type JSX, type MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';

import { ShortLink } from '@graasp/sdk';

import { CopyIcon, MoreVerticalIcon, PenIcon, TrashIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import {
  buildShortLinkDeleteBtnId,
  buildShortLinkEditBtnId,
  buildShortLinkMenuBtnId,
  buildShortLinkShortenBtnId,
} from '@/config/selectors';

import QRCode from '~builder/components/common/QRCode';
import { BUILDER } from '~builder/langs';
import { copyToClipboard } from '~builder/utils/clipboard';

type Props = {
  shortLink: ShortLink;
  url: string;
  isShorten: boolean;
  canAdminShortLink: boolean;
  onCreate: (platform: ShortLink['platform']) => void;
  onUpdate: () => void;
  onDelete: () => void;
};

const ShortLinkMenu = ({
  shortLink,
  url,
  isShorten,
  canAdminShortLink,
  onCreate,
  onUpdate,
  onDelete,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateMessages } = useTranslation(NS.Messages);

  const { alias, platform, itemId } = shortLink;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    handleMenuClose();
    onUpdate();
  };

  const handleCopy = () => {
    if (url) {
      copyToClipboard(url, {
        onSuccess: () => {
          toast.success(translateMessages('COPY_LINK_TO_CLIPBOARD'));
        },
        onError: () => {
          toast.error(translateMessages('COPY_LINK_TO_CLIPBOARD_ERROR'));
        },
      });
    }
  };

  const handleClickDelete = () => {
    handleMenuClose();
    onDelete();
  };

  return (
    <Stack direction="row">
      <Tooltip title={translateBuilder(BUILDER.SHARE_ITEM_LINK_COPY_TOOLTIP)}>
        <span>
          <IconButton onClick={handleCopy}>
            <CopyIcon />
          </IconButton>
        </span>
      </Tooltip>

      <QRCode value={url} />

      {canAdminShortLink && (
        <>
          {isShorten && (
            <>
              <IconButton
                id={buildShortLinkMenuBtnId(alias)}
                onClick={handleMenuClick}
              >
                <MoreVerticalIcon />
              </IconButton>
              <Menu
                id={buildShortLinkMenuBtnId(alias)}
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleUpdate}
                  id={buildShortLinkEditBtnId(alias)}
                >
                  <ListItemIcon>
                    <PenIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {translateBuilder(BUILDER.EDIT_SHORT_LINK_TITLE)}
                  </ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={handleClickDelete}
                  id={buildShortLinkDeleteBtnId(alias)}
                >
                  <ListItemIcon>
                    <TrashIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {translateBuilder(BUILDER.DELETE_SHORT_LINK_TITLE)}
                  </ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}

          {!isShorten && (
            <Tooltip title={translateBuilder(BUILDER.SHORTEN_LINK_TOOLTIP)}>
              <span>
                <IconButton
                  id={buildShortLinkShortenBtnId(itemId, platform)}
                  onClick={() => onCreate(platform)}
                >
                  <PenIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </>
      )}
    </Stack>
  );
};

export default ShortLinkMenu;
