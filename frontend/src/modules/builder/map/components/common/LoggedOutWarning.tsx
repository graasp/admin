import { type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';

import { useQueryClientContext } from '../context/QueryClientContext';

const LoggedOutWarning = (): JSX.Element | null => {
  const { t } = useTranslation(NS.Map);
  const [open, setOpen] = useState(false);
  const { currentMember } = useQueryClientContext();

  useEffect(() => {
    if (!currentMember) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (currentMember || !open) {
    return null;
  }

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Alert
      sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 500,
        margin: 'auto',
      }}
      severity="warning"
      onClose={onClose}
    >
      {t('FUNCTIONALITIES_REDUCED_FOR_LOGGED_OUT_MESSAGE')}
    </Alert>
  );
};

export default LoggedOutWarning;
