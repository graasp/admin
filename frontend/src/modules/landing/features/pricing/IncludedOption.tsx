import { Stack, Typography } from '@mui/material';

import { CheckIcon } from 'lucide-react';

import { useButtonColor } from '@/ui/buttons/hooks';

export function IncludedOption({ text }: Readonly<{ text: string }>) {
  const { color } = useButtonColor('success');

  return (
    <Stack direction="row" gap={1}>
      <CheckIcon
        style={{ verticalAlign: 'text-bottom', flexShrink: 0 }}
        color={color}
      />
      <Typography>{text}</Typography>
    </Stack>
  );
}
