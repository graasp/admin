import type { JSX } from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { useTranslation } from 'react-i18next';

import { IconButton, Stack, Tooltip, styled } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { useParams, useSearch } from '@tanstack/react-router';
import { ExpandIcon, ShrinkIcon } from 'lucide-react';

import { Chatbox } from '@/components/chatbox/Chatbox/Chatbox';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  CHATBOX_DRAWER_ID,
  CHATBOX_ID,
  ITEM_FULLSCREEN_BUTTON_ID,
  ITEM_PINNED_ID,
} from '@/config/selectors';
import { DRAWER_WIDTH } from '@/ui/constants';
import { useMobileView } from '@/ui/hooks/useMobileView';

import { FLOATING_BUTTON_Z_INDEX } from '~player/config/constants';
import { useLayoutContext } from '~player/contexts/LayoutContext';
import { ItemContentWrapper } from '~player/item/Item';

import SideDrawer from './SideDrawer';

const StyledMain = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isShifted',
})<{ isShifted: boolean }>(({ theme, isShifted }) => {
  const contentShift = isShifted
    ? {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: DRAWER_WIDTH,
      }
    : {};

  return {
    position: 'relative',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...contentShift,
  };
});

const StyledIconButton = styled(IconButton)({
  float: 'right',
  zIndex: FLOATING_BUTTON_Z_INDEX,
});

type Props = {
  item: DiscriminatedItem;
  content: JSX.Element;
};

const SideContent = ({ content, item }: Props): JSX.Element | null => {
  const { rootId } = useParams({ from: '/player/$rootId/$itemId' });
  const { isMobile } = useMobileView();
  const { data: children } = hooks.useChildren(item.id, undefined, {
    enabled: !!item,
  });
  const search = useSearch({ from: '/player/$rootId/$itemId' });

  const {
    toggleChatbox,
    togglePinned,
    isChatboxOpen,
    isPinnedOpen,
    isFullscreen,
    setIsFullscreen,
  } = useLayoutContext();

  const { t } = useTranslation(NS.Player);
  const settings = item.settings ?? {};

  if (!rootId) {
    return null;
  }

  const pinnedItems = children?.filter(
    ({ settings: s, hidden }) => s.isPinned && !hidden,
  );
  const pinnedCount = pinnedItems?.length ?? 0;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const displayFullscreenButton = () => {
    const { fullscreen } = search;
    if (isMobile || !fullscreen) {
      return null;
    }

    return (
      <Tooltip
        title={
          isFullscreen
            ? t('EXIT_FULLSCREEN_TOOLTIP')
            : t('ENTER_FULLSCREEN_TOOLTIP')
        }
      >
        <StyledIconButton
          id={ITEM_FULLSCREEN_BUTTON_ID}
          aria-label={
            isFullscreen
              ? t('EXIT_FULLSCREEN_TOOLTIP')
              : t('ENTER_FULLSCREEN_TOOLTIP')
          }
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
        </StyledIconButton>
      </Tooltip>
    );
  };

  const displayChatbox = () => {
    if (!settings?.showChatbox) return null;

    return (
      <div id={CHATBOX_DRAWER_ID}>
        <SideDrawer
          title={t('ITEM_CHATBOX_TITLE', {
            name: item.name,
          })}
          onClose={toggleChatbox}
          open={isChatboxOpen}
        >
          <Chatbox itemId={item.id} id={CHATBOX_ID} />
        </SideDrawer>
      </div>
    );
  };

  const displayPinnedItems = () => {
    if (pinnedItems?.length) {
      return (
        <SideDrawer
          title={t('PINNED_ITEMS')}
          onClose={togglePinned}
          open={isPinnedOpen}
        >
          {/* show children pinned items */}
          <Stack id={ITEM_PINNED_ID} gap={2} mt={1} pb={9}>
            {pinnedItems.map((pinnedItem) => (
              <ItemContentWrapper key={pinnedItem.id} item={pinnedItem} />
            ))}
          </Stack>
        </SideDrawer>
      );
    }
    return null;
  };

  return (
    <Fullscreen
      enabled={isFullscreen}
      onChange={(isFullscreenEnabled) => setIsFullscreen(isFullscreenEnabled)}
    >
      {displayChatbox()}
      {displayPinnedItems()}
      <Stack id="contentGrid">
        <StyledMain
          isShifted={isChatboxOpen || (isPinnedOpen && pinnedCount > 0)}
        >
          {displayFullscreenButton()}

          {content}
        </StyledMain>
      </Stack>
    </Fullscreen>
  );
};

export default SideContent;
