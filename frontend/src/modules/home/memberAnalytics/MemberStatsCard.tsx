import type { JSX } from 'react';

import { Box, Stack, Typography, styled } from '@mui/material';

const StyledCardBox = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(228, 224, 228, 0.61)',
  borderRadius: theme.spacing(2),
  color: '#808080',
  flex: 1,
  justifyContent: 'space-between',
}));

export function MemberStatsCard({
  title,
  stat,
}: Readonly<{
  title: string;
  stat: number;
}>): JSX.Element {
  return (
    <StyledCardBox>
      <Typography fontWeight={700}>{title}</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          fontWeight: 900,
          color: '#7F82CD',
        }}
      >
        {stat}
      </Box>
    </StyledCardBox>
  );
}
