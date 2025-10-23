import type { JSX } from 'react';

import { Box, Stack } from '@mui/material';

import { NAVIGATION_ISLAND_CLASSNAME } from '@/config/selectors';

import useChatButton from './ChatButton';
import useGeolocationButton from './GeolocationButton';
import usePinnedItemsButton from './PinnedItemsButton';
import { usePreviousNextButtons } from './PreviousNextButtons';

const NavigationIslandBox = (): JSX.Element | null => {
  const { previousButton, nextButton } = usePreviousNextButtons();
  const { chatButton } = useChatButton();
  const { geolocationButton } = useGeolocationButton();
  const { pinnedButton } = usePinnedItemsButton();

  // if all buttons are disabled do not show the island at all
  if (
    !chatButton &&
    !pinnedButton &&
    !previousButton &&
    !nextButton &&
    !geolocationButton
  ) {
    return null;
  }

  return (
    <Box
      className={NAVIGATION_ISLAND_CLASSNAME}
      // set some background and shadow
      bgcolor="white"
      boxShadow="0px 3px 6px 0px rgba(0, 0, 0, 0.25)"
      // add an asymmetrical border radius
      borderRadius="16px 16px 0px 0px"
      // position the island on the bottom of the page
      position="fixed"
      bottom={0}
      // equal margins on both sides
      margin="auto"
      // set let and right to 0 so that it can be centered
      left="0"
      right="0"
      // need to set a maximum width otherwise the left and right will stretch the island
      maxWidth="max-content"
      // put on top of the content but not above the cookie buttons
      zIndex={998}
      // have some padding for the content that will be rendered inside
      p={1}
    >
      <Stack direction="row" flexGrow={1} gap={10}>
        {previousButton && nextButton && (
          <Stack direction="row" gap={1}>
            {previousButton}
            {nextButton}
          </Stack>
        )}
        {
          // if one of the button is present, show the stack
          (chatButton || pinnedButton || geolocationButton) && (
            <Stack direction="row" gap={1}>
              {chatButton}
              {pinnedButton}
              {geolocationButton}
            </Stack>
          )
        }
      </Stack>
    </Box>
  );
};
export default NavigationIslandBox;
