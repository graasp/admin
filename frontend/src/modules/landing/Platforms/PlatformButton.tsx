import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { NS } from '@/config/constants';
import { type PlatformType } from '@/ui/PlatformSwitch/hooks';
import BuildIcon from '@/ui/icons/BuildIcon';

type PlatformButtonProps = {
  platform: PlatformType;
  direction: 'left' | 'right';
  buttonText: string;
  description: string;
};
export function PlatformButton({
  platform,
  direction,
  description,
  buttonText,
}: Readonly<PlatformButtonProps>): JSX.Element {
  const { t: translatePlatforms } = useTranslation(NS.Enums);
  const { color, name, Icon, href } = {
    color: '#fde',
    name: 'builder' as const,
    Icon: BuildIcon,
    href: '#',
  };
  const alignItems = {
    xs: 'center',
    lg: direction === 'left' ? 'flex-start' : 'end',
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const icon = (
    <Icon
      primaryColor={color}
      secondaryColor="transparent"
      sx={{ flexShrink: 0 }}
    />
  );
  return (
    <Grid
      id="puzzleButtonContainer"
      container
      size={{ xs: 6, lg: 12 }}
      gap={2}
      direction="column"
      alignItems={alignItems}
    >
      <Stack alignItems={alignItems}>
        {isSmallScreen && icon}
        <Typography
          variant="h4"
          component="p"
          color={color}
          textTransform="capitalize"
        >
          {translatePlatforms(name)}
        </Typography>
      </Stack>
      <Stack
        // icon and text should be in reverse order when on the right side
        direction={direction == 'left' ? 'row' : 'row-reverse'}
        alignItems="center"
        gap={1}
        flex={1}
      >
        {!isSmallScreen && icon}
        <Typography textAlign={{ xs: 'center', lg: direction }}>
          {description}
        </Typography>
      </Stack>

      <Button
        variant="contained"
        href={href}
        color={platform}
        {...(!isSmallScreen ? { fullWidth: true } : {})}
      >
        {buttonText}
      </Button>
    </Grid>
  );
}
