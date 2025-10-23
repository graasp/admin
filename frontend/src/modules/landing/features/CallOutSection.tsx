import type { ReactNode } from 'react';

import { Stack, Typography, styled } from '@mui/material';

const TEXT_CONTAINER = 'text-container';
const StyledStack = styled(Stack)(() => ({
  flexDirection: 'row-reverse',
  [`.${TEXT_CONTAINER}`]: {
    alignItems: 'flex-start',
    textAlign: 'right',
  },
  '&:nth-of-type(even)': {
    flexDirection: 'row',
    [`.${TEXT_CONTAINER}`]: {
      alignItems: 'flex-end',
      textAlign: 'left',
    },
  },
}));

type CallOutSectionProps = {
  lead: string;
  title: ReactNode;
  children: ReactNode;
  actions: ReactNode;
  image: ReactNode;
};
export function CallOutSection({
  lead,
  title,
  children,
  actions,
  image,
}: Readonly<CallOutSectionProps>) {
  return (
    <StyledStack gap={4} width="100%">
      <Stack flex={1} overflow="hidden" borderRadius={4}>
        {image}
      </Stack>
      <Stack gap={2} flex={2} className={TEXT_CONTAINER}>
        <Typography variant="note" color="textSecondary">
          {lead}
        </Typography>
        <Typography variant="h2" color="primary" maxWidth="50ch">
          {title}
        </Typography>
        {children}
        {actions}
      </Stack>
    </StyledStack>
  );
}
