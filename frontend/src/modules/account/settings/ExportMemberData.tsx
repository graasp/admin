import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Stack, Typography } from '@mui/material';

import { useMutation } from '@tanstack/react-query';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import { EXPORT_DATA_BUTTON_ID } from '@/config/selectors';
import { exportMemberDataMutation } from '@/openapi/client/@tanstack/react-query.gen';

export function ExportMemberData(): JSX.Element {
  const { t } = useTranslation(NS.Account);

  const [isExported, setIsExported] = useState(false);
  const {
    mutate: exportData,
    isSuccess,
    isError,
  } = useMutation(exportMemberDataMutation());
  const onClick = () => {
    exportData({});
    setIsExported(true);
  };

  return (
    <BorderedSection title={t('EXPORT_INFORMATIONS_TITLE')}>
      <Stack direction="column" spacing={2}>
        <Typography variant="body2">
          {t('EXPORT_INFORMATIONS_DESCRIPTION')}
        </Typography>
        {isSuccess && (
          <Alert severity="success">{t('EXPORT_SUCCESS_MESSAGE')}</Alert>
        )}
        {isError && <Alert severity="error">{t('EXPORT_ERROR_MESSAGE')}</Alert>}
        <Button
          onClick={onClick}
          disabled={isExported}
          id={EXPORT_DATA_BUTTON_ID}
          variant="contained"
        >
          {t('EXPORT_INFORMATIONS_BUTTON_TEXT')}
        </Button>
      </Stack>
    </BorderedSection>
  );
}
