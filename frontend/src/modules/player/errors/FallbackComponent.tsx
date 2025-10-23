import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

export function FallbackComponent(): JSX.Element {
  const { t: translateBuilder } = useTranslation(NS.Player);

  return (
    <Stack
      direction={['column-reverse', 'row']}
      justifyContent="center"
      alignItems="center"
      height="100svh"
      spacing={4}
      p={2}
    >
      <Box>
        <Typography variant="display" color="primary">
          {translateBuilder('FALLBACK_TITLE')}
        </Typography>
        <Typography>{translateBuilder('FALLBACK_TEXT')}</Typography>
        <ButtonLink to="/" sx={{ mt: 3 }} variant="contained">
          {translateBuilder('FALLBACK_RELOAD_PAGE')}
        </ButtonLink>
      </Box>
      <ErrorOutline
        fontSize="large"
        htmlColor="#5050d2"
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '8em',
          maxHeight: '8em',
          aspectRatio: 1,
          height: 'auto',
        }}
      />
    </Stack>
  );
}
