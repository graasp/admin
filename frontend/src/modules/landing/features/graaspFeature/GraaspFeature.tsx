import { Trans, useTranslation } from 'react-i18next';

import { Box, Button, Stack, Typography, styled } from '@mui/material';

import { NS } from '@/config/constants';
import { useButtonColor } from '@/ui/buttons/hooks';

const BUTTON_CONTAINER = 'button-container';
const TEXT_CONTAINER = 'text-container';

const FeatureContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  justifyContent: 'center',
  textAlign: 'center',
  [`.${TEXT_CONTAINER}`]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'justify',
  },
  [`.${BUTTON_CONTAINER}`]: {
    // default for small screens (always primary action on top)
    flexDirection: 'column-reverse',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '100%',
    justifyContent: 'flex-start',
    [`.${TEXT_CONTAINER}`]: {
      textAlign: 'left',
      flexDirection: 'row-reverse',
    },
    [`.${BUTTON_CONTAINER}`]: {
      flexDirection: 'row-reverse',
    },
  },
  '&:nth-of-type(even)': {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      [`.${TEXT_CONTAINER}`]: {
        textAlign: 'right',
        flexDirection: 'row',
      },
      [`.${BUTTON_CONTAINER}`]: {
        flexDirection: 'row',
      },
    },
  },
}));

type GraaspFeatureProps = {
  platform: 'builder' | 'player' | 'analytics' | 'library';
};

export function GraaspFeature({ platform }: Readonly<GraaspFeatureProps>) {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: `FEATURES.GRAASP_FEATURES.${platform}`,
  });
  const { color } = useButtonColor(platform);
  return (
    <FeatureContainer gap={2}>
      <Box position="absolute" top="-150px" id={platform} />
      <Stack className={TEXT_CONTAINER} gap={8}>
        <Box
          width="200px"
          height="200px"
          bgcolor={color}
          borderRadius={4}
          flexShrink={0}
        ></Box>
        <Stack gap={4}>
          <Box>
            <Typography variant="note" color="textSecondary">
              {t('LEAD_SENTENCE')}
            </Typography>
            <Typography variant="h2" component="h3" color="primary">
              <Trans
                i18nKey="TITLE"
                t={t}
                components={{ color: <span style={{ color }} /> }}
              />
            </Typography>
          </Box>
          <Typography>
            <Trans i18nKey="DESCRIPTION" t={t} />
          </Typography>
        </Stack>
      </Stack>

      <Stack className={BUTTON_CONTAINER} gap={3}>
        <Button
          sx={{ flex: 1 }}
          variant="contained"
          color="secondary"
          fullWidth
        >
          {t('SECONDARY_ACTION_BUTTON_TEXT')}
        </Button>
        <Button
          sx={{ flex: 1 }}
          variant="contained"
          color="secondary"
          fullWidth
        >
          {t('TERTIARY_ACTION_BUTTON_TEXT')}
        </Button>
        <Button sx={{ flex: 2 }} variant="contained" color="primary">
          {t('CTA_BUTTON_TEXT')}
        </Button>
      </Stack>
    </FeatureContainer>
  );
}
