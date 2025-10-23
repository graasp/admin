import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, MenuItem, Select } from '@mui/material';

import {
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  LexicalEditor,
} from 'lexical';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from 'lucide-react';

import { NS } from '@/config/constants';

import { ICON_SIZE } from './constants';

type AllowedElementFormatType = Exclude<
  ElementFormatType,
  'end' | 'start' | ''
>;

type FormatOption = {
  icon: ReactNode;
  name: string;
};

export function TextFormatDropDown({
  editor,
  value,
}: {
  editor: LexicalEditor;
  value: ElementFormatType;
}) {
  const { t } = useTranslation(NS.PageEditor, {
    keyPrefix: 'TOOLBAR.TEXT_FORMAT',
  });
  const ELEMENT_FORMAT_OPTIONS: {
    [key in AllowedElementFormatType]: FormatOption;
  } = {
    left: {
      icon: <AlignLeftIcon size={ICON_SIZE} />,
      name: t('LEFT'),
    },
    right: {
      icon: <AlignRightIcon size={ICON_SIZE} />,
      name: t('RIGHT'),
    },
    center: {
      icon: <AlignCenterIcon size={ICON_SIZE} />,
      name: t('CENTER'),
    },
    justify: {
      icon: <AlignJustifyIcon size={ICON_SIZE} />,
      name: t('JUSTIFY'),
    },
  };

  const formatOption =
    value in ELEMENT_FORMAT_OPTIONS
      ? ELEMENT_FORMAT_OPTIONS[(value as AllowedElementFormatType) || 'left']
      : ELEMENT_FORMAT_OPTIONS.left;

  return (
    <Select
      variant="standard"
      disableUnderline
      value={value || 'left'}
      label={formatOption.name}
      sx={{ ml: 1 }}
      renderValue={() => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {formatOption.icon}
          </Box>
        );
      }}
    >
      {Object.entries(ELEMENT_FORMAT_OPTIONS).map(([v, option]) => {
        return (
          <MenuItem
            value={v}
            onClick={() => {
              editor.dispatchCommand(
                FORMAT_ELEMENT_COMMAND,
                v as AllowedElementFormatType,
              );
            }}
            sx={{ gap: 1 }}
          >
            {option.icon} {option.name}
          </MenuItem>
        );
      })}
    </Select>
  );
}
