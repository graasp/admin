import { type JSX, type ReactNode } from 'react';

import { Divider, Stack, Typography, styled } from '@mui/material';

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: '#e4dfff',
  '&:nth-of-type(odd)': {
    backgroundColor: '#e2ecff',
    [theme.breakpoints.up('md')]: {
      marginBlockStart: theme.spacing(6),
    },
  },
}));

type PlanLayoutProps = {
  name: string;
  price: string;
  children: ReactNode;
};
export function PlanLayout({
  name,
  price,
  children,
}: Readonly<PlanLayoutProps>): JSX.Element {
  return (
    <StyledStack borderRadius={4} p={4} gap={4} flex={1} alignItems="center">
      <Typography variant="h4" component="span">
        {name}
      </Typography>

      <Divider flexItem />
      <Stack direction="column" gap={1} flex={1} justifyContent="center">
        {children}
      </Stack>
      <Divider flexItem />

      <Typography variant="h5" fontWeight="bold" textAlign="center">
        {price}
      </Typography>
    </StyledStack>
  );
}
