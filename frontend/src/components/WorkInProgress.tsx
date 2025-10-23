import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { ArrowLeftIcon, ConstructionIcon, HomeIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import { useButtonColor } from '@/ui/buttons/hooks';

import { ConstructionAnimation } from './ConstructionTruck';
import { ButtonLink } from './ui/ButtonLink';

function ActionButtons() {
  const { t } = useTranslation(NS.Common);
  return (
    <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
      <Button
        variant="contained"
        onClick={() => history.back()}
        startIcon={<ArrowLeftIcon />}
      >
        {t('BACK.BUTTON_TEXT')}
      </Button>
      <Typography>{t('CONJONCTION.OR')}</Typography>
      <ButtonLink variant="contained" to="/" endIcon={<HomeIcon />}>
        {t('HOME.BUTTON_TEXT')}
      </ButtonLink>
    </Stack>
  );
}

export function WorkInProgress() {
  const { t } = useTranslation(NS.Common);
  const { color } = useButtonColor('warning');
  return (
    <>
      <Stack
        minHeight="60ch"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Stack gap={3}>
            <ConstructionIcon size={80} color={color} />
            <Stack maxWidth="60ch" alignItems="center" gap={2}>
              <Typography variant="h1">{t('CONSTRUCTION.TITLE')}</Typography>
              <Typography color="textSecondary" textAlign="justify">
                {t('CONSTRUCTION.DESCRIPTION')}
              </Typography>
            </Stack>
            <ActionButtons />
          </Stack>
        </Stack>
      </Stack>
      <ConstructionAnimation />
    </>
  );
}
