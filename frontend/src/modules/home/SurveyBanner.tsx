import { Trans, useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';

import { useLocalStorage } from './useLocalStorage';

function SurveyBanner() {
  const { t } = useTranslation(NS.Home);

  const { value: isClosed, changeValue: setIsClosed } = useLocalStorage(
    `user-survey-2025-closed`,
    false,
  );

  if (isClosed) {
    return null;
  }

  return (
    <Alert
      severity="info"
      onClose={() => {
        setIsClosed(true);
      }}
    >
      <Trans
        t={t}
        i18nKey={'SURVEY.INFO'}
        components={{
          l1: (
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScSSD8oPlpvLvX1YPDfvfDGQzV7zqqPoSEhkItIZ8pIAPCpTw/viewform?usp=preview">
              {/* the text here has no impact */}
              here
            </a>
          ),
        }}
      />
    </Alert>
  );
}

export default SurveyBanner;
