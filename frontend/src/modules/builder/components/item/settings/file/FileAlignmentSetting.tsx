import { type JSX, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ToggleButton as MuiToggleButton,
  Paper,
  ToggleButtonGroup,
  styled,
  toggleButtonGroupClasses,
} from '@mui/material';

import { Alignment, AlignmentType, FileItemType } from '@graasp/sdk';

import {
  AlignCenterIcon,
  AlignCenterVerticalIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@/ui/theme';

import ItemSettingProperty from '../ItemSettingProperty';
import { SettingVariant, SettingVariantType } from '../settingTypes';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.divider}`,
}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
}));
const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
    '&:hover': {
      backgroundColor: DEFAULT_LIGHT_PRIMARY_COLOR.dark,
    },
  },
}));

export const FileAlignmentSetting = ({
  variant = SettingVariant.List,
  item,
}: {
  variant: SettingVariantType;
  item: FileItemType;
}): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { mutate: editItem } = mutations.useEditItem();

  const onChangeAlignment = (
    _e: MouseEvent<HTMLElement>,
    value: AlignmentType,
  ) => {
    // only send an update when the value is not null, as this is sent when clicking a selected button
    if (value !== null) {
      editItem({
        id: item.id,
        settings: { alignment: value },
      });
    }
  };

  const { alignment } = item.settings;
  const control = (
    <StyledPaper elevation={0}>
      <StyledToggleButtonGroup
        value={alignment}
        exclusive
        onChange={onChangeAlignment}
        aria-label={translateBuilder('SETTINGS_ALIGNMENT_ARIA_LABEL')}
        size="small"
      >
        <ToggleButton
          value={Alignment.Left}
          aria-label={translateBuilder('SETTINGS_ALIGNMENT_LEFT_ARIA_LABEL')}
        >
          <AlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          value={Alignment.Center}
          aria-label={translateBuilder('SETTINGS_ALIGNMENT_CENTER_ARIA_LABEL')}
        >
          <AlignCenterIcon />
        </ToggleButton>
        <ToggleButton
          value={Alignment.Right}
          aria-label={translateBuilder('SETTINGS_ALIGNMENT_RIGHT_ARIA_LABEL')}
        >
          <AlignRightIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledPaper>
  );
  switch (variant) {
    case SettingVariant.List:
      return (
        <ItemSettingProperty
          title={translateBuilder('SETTINGS_ALIGNMENT_LABEL')}
          valueText={translateBuilder('SETTINGS_ALIGNMENT_HELPER')}
          icon={<AlignCenterVerticalIcon />}
          inputSetting={control}
        />
      );
    case SettingVariant.Button:
    default:
      return control;
  }
};

export default FileAlignmentSetting;
