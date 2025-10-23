import { JSX, useCallback } from 'react';

import { Box, MenuItem, Select } from '@mui/material';

import { $patchStyleText } from '@lexical/selection';
import { $getSelection, LexicalEditor } from 'lexical';
import { TypeIcon } from 'lucide-react';

import { ICON_SIZE } from './constants';

const FONT_FAMILY_OPTIONS = [
  'Arial',
  'Courier New',
  'Georgia',
  'Nunito',
  'Times New Roman',
  'Verdana',
];

export const DEFAULT_FONT_FAMILY = FONT_FAMILY_OPTIONS[0];

export function FontDropDown({
  editor,
  value,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: string;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            'font-family': option,
          });
        }
      });
    },
    [editor],
  );

  return (
    <Select
      variant="standard"
      disableUnderline
      disabled={disabled}
      label={value}
      value={value || DEFAULT_FONT_FAMILY}
      sx={{ ml: 1 }}
      renderValue={(fontFamily) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily,
              gap: 1,
            }}
          >
            <TypeIcon size={ICON_SIZE} />
            {fontFamily.split(' ')[0].slice(0, 6)}
          </Box>
        );
      }}
    >
      {FONT_FAMILY_OPTIONS.map((fontFamily) => (
        <MenuItem
          onClick={() => handleClick(fontFamily)}
          key={fontFamily}
          sx={{ fontFamily }}
        >
          {fontFamily}
        </MenuItem>
      ))}
    </Select>
  );
}
