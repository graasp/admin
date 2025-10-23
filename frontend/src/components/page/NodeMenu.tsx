import { JSX, ReactNode } from 'react';

import { Box, Stack } from '@mui/material';

import { ElementFormatType } from 'lexical';

/**
 * Wrapper for menu for elements in pages (e.g. LinkItem)
 */
export function NodeMenu({
  format,
  isSelected,
  children,
}: {
  children: ReactNode;
  isSelected: boolean;
  format?: ElementFormatType;
}): JSX.Element {
  return (
    <Box>
      {isSelected && (
        <Box
          sx={{
            // align depending on format
            justifyItems: format ? format : undefined,
            position: 'relative',
          }}
        >
          <Stack
            sx={{
              position: 'absolute',
              zIndex: 1,
              top: -50,
              boxShadow: '0 4px 8px lightgrey',
              background: 'white',
              mb: 1,
            }}
            borderRadius={2}
            width="fit-content"
            px={2}
            direction="row"
          >
            {children}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
