import { styled } from '@mui/material';

import { ChevronDownIcon } from 'lucide-react';

const StyledAnchor = styled('a')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  alignItems: 'center',
  textAlign: 'center',
  color: 'unset',
  fontWeight: 'bold',
  textDecoration: 'none',
  borderRadius: theme.spacing(2),
  backgroundColor: '#f7eefe',
  padding: theme.spacing(2, 4),
}));

export function UserStoryButton({
  id,
  text,
}: Readonly<{ id: string; text: string }>) {
  return (
    <StyledAnchor href={`#${id}`}>
      {text}
      <ChevronDownIcon />
    </StyledAnchor>
  );
}
