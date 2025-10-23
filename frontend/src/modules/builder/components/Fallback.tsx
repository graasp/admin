import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

const FallbackComponent = (): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <Stack
      direction={['column-reverse', 'row']}
      justifyContent="center"
      alignItems="center"
      height="100svh"
      spacing={4}
    >
      <Box>
        <Typography variant="h1" fontSize="6em">
          {translateBuilder('FALLBACK_TITLE')}
        </Typography>
        <Typography>{translateBuilder('FALLBACK_TEXT')}</Typography>
        <ButtonLink to="/" sx={{ mt: 3 }} reloadDocument variant="contained">
          {translateBuilder('FALLBACK_BACK_TO_HOME')}
        </ButtonLink>
      </Box>
      <ErrorOutline
        fontSize="large"
        htmlColor="#5050d2"
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '10em',
          aspectRatio: 1,
          height: 'auto',
          maxHeight: '10em',
        }}
      />
    </Stack>
  );
};

export default FallbackComponent;
