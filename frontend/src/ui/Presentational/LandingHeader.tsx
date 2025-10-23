import { ReactNode } from 'react';

import { Stack, styled } from '@mui/material';

const LandingHeaderContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '60ch',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row-reverse',
    textAlign: 'unset',
    maxWidth: theme.breakpoints.values.lg,
  },
}));

type LandingHeaderProps = {
  children: ReactNode;
  image: ReactNode;
};
export function LandingHeader({
  children,
  image,
}: Readonly<LandingHeaderProps>) {
  return (
    <LandingHeaderContainer maxWidth="lg" gap={8} mt={{ xs: 3, md: 8 }}>
      <Stack
        flex={{ md: 1 }}
        maxHeight={{ xs: '15rem', md: 'fit-content' }}
        maxWidth={{ xs: '32rem' }}
        borderRadius={4}
        overflow="hidden"
      >
        {image}
      </Stack>
      <Stack
        gap={4}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        flex={{ md: 2 }}
      >
        {children}
      </Stack>
    </LandingHeaderContainer>
  );
}
