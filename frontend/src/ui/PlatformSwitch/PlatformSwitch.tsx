/* eslint-disable jsx-a11y/anchor-is-valid */
import type { JSX } from 'react';

import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SxProps,
  Tooltip,
  TooltipProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Link } from '@tanstack/react-router';

import AnalyticsIcon from '../icons/AnalyticsIcon.js';
import BuildIcon from '../icons/BuildIcon.js';
import LibraryIcon from '../icons/LibraryIcon.js';
import PlayIcon from '../icons/PlayIcon.js';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme.js';
import { Platform, PlatformType } from './hooks.js';

export type PlatformSwitchProps = {
  /** Element ID of the Platform Switch */
  id?: string;
  /** Size of the icons (default: 32) */
  size?: number;
  /** Spacing in-between icons as well as padding inside the switch frame */
  spacing?: number;
  /** Color of the switch controls */
  color?: string;
  /** Color of the icons when highlighted */
  accentColor?: string;
  /** Color of the icons when the corresponding platform is disabled */
  disabledColor?: string;
  /** Style overrides to apply to the switch frame */
  sx?: SxProps;
  /** Platform that should be currently highlighted */
  selected?: PlatformType;
  /** Platform-specific icon props */
  platformsProps?: Partial<
    Record<
      PlatformType,
      {
        /** Element ID of this specific platform button */
        id?: string;
        /** Whether this platform should be disabled (non-clickable) */
        disabled?: boolean;
        /** Tooltips to add to the buttons, in order left to right */
        tooltip?: string;
        /** Placements of tooltips, in order left to right */
        placement?: TooltipProps['placement'];
        /** Target when this platform button is clicked */
        href?: string;
        /** Style overrides for this platform's icon */
        sx?: SxProps;
      }
    >
  >;
  /**
   * Custom icon to show as selected in mobile
   */
  CustomMobileIcon?: (props: IconProps) => JSX.Element;
};

/** Common props for all platform icons */
type IconProps = {
  size?: number;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
  sx?: SxProps;
  disabledColor?: string;
  disabled?: boolean;
  selected?: boolean;
  disableHover?: boolean;
};

/** Mapping from platform to their icons */
const PlatformIcons: Record<PlatformType, (props: IconProps) => JSX.Element> = {
  [Platform.Builder]: BuildIcon,
  [Platform.Player]: PlayIcon,
  [Platform.Library]: LibraryIcon,
  [Platform.Analytics]: AnalyticsIcon,
};

/**
 * PlatformSwitch allows the user to change between the platforms
 */
export const PlatformSwitch = ({
  id,
  spacing = 0.5,
  size = 32,
  color = SECONDARY_COLOR,
  accentColor = PRIMARY_COLOR,
  disabledColor = '#CCC',
  sx,
  selected,
  platformsProps,
  CustomMobileIcon,
}: PlatformSwitchProps): JSX.Element => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /** Helper inner component: generates buttons from icons while capturing parent props */
  const PlatformButton = ({
    platform,
    sx: localSX = {},
  }: {
    /** Platform which button should be rendered */
    platform: PlatformType;
    /** Styles applied to the underlying icon */
    sx?: SxProps;
  }): JSX.Element => {
    const isSelectedPlatform = platform === selected;

    const platformProps = platformsProps?.[platform];

    const Icon = PlatformIcons[platform];

    const tooltip = platformProps?.tooltip;
    const sxProps = { ...localSX, ...platformProps?.sx };
    return (
      <Tooltip
        title={platformProps?.disabled ? undefined : tooltip}
        placement={platformProps?.placement}
      >
        <Link
          id={platformProps?.id}
          style={{
            display: 'flex',
            cursor: platformProps?.disabled ? 'default' : 'pointer',
          }}
          data-testid={platform}
          to={!platformProps?.disabled ? platformProps?.href : undefined}
          aria-disabled={platformProps?.disabled}
          // data-umami-event={`header-navigation-switch-${platform}`}
        >
          <Icon
            disabledColor={disabledColor}
            disabled={platformProps?.disabled}
            selected={isSelectedPlatform}
            secondaryColor={accentColor}
            primaryColor={color}
            primaryOpacity={1}
            size={size}
            sx={sxProps}
            disableHover={false}
          />
        </Link>
      </Tooltip>
    );
  };

  const buttons = Object.values(Platform).map((platform, index, platforms) => (
    <PlatformButton
      key={platform}
      // the last icon does not need margin at the end
      sx={{ mr: index === platforms.length - 1 ? 0 : spacing }}
      platform={platform}
    />
  ));

  if (isMobile) {
    const selectedPlatform = selected || Platform.Builder;
    const SelectedIcon = CustomMobileIcon ?? PlatformIcons[selectedPlatform];
    const platformProps = platformsProps?.[selectedPlatform];
    const sxProps = { ...sx, ...platformProps?.sx };
    return (
      <Box sx={{ position: 'relative', height: '40px' }}>
        <SpeedDial
          FabProps={{
            size: 'small',
            sx: {
              border: '2px solid white',
            },
          }}
          icon={
            <SelectedIcon
              selected
              secondaryColor={accentColor}
              primaryColor={color}
              primaryOpacity={1}
              size={size}
              sx={sxProps}
            />
          }
          role="navigation"
          direction={'down'}
          ariaLabel="platform switch dial"
        >
          {Object.values(Platform).map((platform) => {
            const Icon = PlatformIcons[platform];
            const isSelectedPlatform = platform === selected;
            const localPlatformProps = platformsProps?.[platform];
            const localSxProps = { ...sx, ...(platformProps?.sx ?? {}) };
            return (
              <SpeedDialAction
                key={platform}
                icon={
                  <Icon
                    disabledColor={disabledColor}
                    disabled={localPlatformProps?.disabled}
                    selected={isSelectedPlatform}
                    secondaryColor={accentColor}
                    primaryColor={color}
                    primaryOpacity={1}
                    size={size}
                    sx={localSxProps}
                  />
                }
                tooltipTitle={localPlatformProps?.tooltip}
                onClick={() => {
                  if (
                    !localPlatformProps?.disabled &&
                    localPlatformProps?.href
                  ) {
                    location.assign(localPlatformProps?.href);
                  }
                }}
              />
            );
          })}
        </SpeedDial>
      </Box>
    );
  }
  return (
    <Box
      component="nav"
      id={id}
      sx={{
        p: spacing,
        border: 1,
        borderColor: color,
        borderRadius: `${size}px`,
        width: 'fit-content',
        display: 'flex',
        // props sx must be spread last to override existing styles
        ...sx,
      }}
    >
      {buttons}
    </Box>
  );
};

export default PlatformSwitch;
