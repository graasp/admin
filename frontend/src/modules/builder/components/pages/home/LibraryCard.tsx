import { useTranslation } from 'react-i18next';

import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { ArrowRightIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';
import LibraryIcon from '@/ui/icons/LibraryIcon';
import { AccentColors } from '@/ui/theme';

function LibraryCard() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation(NS.Home, { keyPrefix: 'LIBRARY.CARD' });

  return (
    <Stack alignItems="center" mb={2}>
      <Stack
        borderRadius={5}
        gap={3}
        p={isXs ? 2 : 3}
        direction="row"
        sx={{
          background: `linear-gradient(${AccentColors.library}ef, ${AccentColors.library}cc), 50% 50% url(/library/books.jpeg)`,
        }}
      >
        <Stack gap={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3" color="white">
              {t('TITLE')}
            </Typography>
            <LibraryIcon primaryColor="white" />
          </Stack>
          <Typography color="white">{t('SUBTITLE')}</Typography>
          <ButtonLink
            sx={{ background: 'white', color: AccentColors.library }}
            variant="contained"
            endIcon={<ArrowRightIcon size={20} />}
            to={GRAASP_LIBRARY_HOST}
          >
            {t('BUTTON_TEXT')}
          </ButtonLink>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LibraryCard;
