import { type JSX, type ReactNode } from 'react';

import { Stack, SxProps, Typography, styled } from '@mui/material';

import { PlatformType } from '@/ui/PlatformSwitch/hooks';
import { useButtonColor } from '@/ui/buttons/hooks';

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  textAlign: 'left',
  [theme.breakpoints.up('sm')]: {
    '&:nth-of-type(even)': {
      flexDirection: 'row-reverse',
      textAlign: 'right',
    },
  },
}));

const StyledButton = styled('a')<{ color: PlatformType }>(
  ({ theme, color }) => ({
    borderRadius: theme.spacing(1),
    color: theme.palette[color].main,
    background: 'white',
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: theme.spacing(1, 3),
    transition: 'all 130ms ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette[color].dark,
      color: 'white',
    },
  }),
);

type IconComponentType = (props: {
  size: number;
  primaryColor: string;
  primaryOpacity?: number;
  secondaryColor: string;
  secondaryOpacity?: number;
  disabledColor?: string;
  disabled?: boolean;
  selected?: boolean;
  disableHover?: boolean;
  sx: SxProps;
}) => JSX.Element;

type PlatformColorSurfaceProps = {
  color: PlatformType;
  text: ReactNode;
  Icon: IconComponentType;
  button: {
    text: string;
    href: string;
  };
};
export function PlatformColorSurface({
  button,
  text,
  Icon,
  color,
}: Readonly<PlatformColorSurfaceProps>) {
  const { color: platformColor } = useButtonColor(color);
  return (
    <StyledStack
      bgcolor={platformColor}
      direction="row"
      gap={2}
      p={2}
      flex={1}
      // give a bit of breathing room to the text
      minHeight="200px"
    >
      <Icon
        size={50}
        secondaryColor={platformColor ?? 'black'}
        primaryColor="white"
        selected
        sx={{ minWidth: '40px' }}
      />
      <Stack direction="column" gap={2} alignItems="stretch">
        <Typography fontSize={20} color="white" flex={1}>
          {text}
        </Typography>
        <StyledButton href={button.href} color={color}>
          {button.text}
        </StyledButton>
      </Stack>
    </StyledStack>
  );
}
