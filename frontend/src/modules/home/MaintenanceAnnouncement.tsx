import { Trans, useTranslation } from 'react-i18next';

import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { formatDate } from 'date-fns';
import { XIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { getLocalForDateFns } from '@/config/langs';
import { getNextMaintenanceOptions } from '@/openapi/client/@tanstack/react-query.gen';

import { useLocalStorage } from './useLocalStorage';

export function MaintenanceAnnouncement({
  suffix,
  showCloseButton = true,
}: Readonly<{ suffix: string; showCloseButton?: boolean }>) {
  const { i18n, t } = useTranslation(NS.Builder, { keyPrefix: 'MAINTENANCE' });
  const { data: maintenance } = useQuery(getNextMaintenanceOptions());
  const { value: isClosed, changeValue: setIsClosed } = useLocalStorage(
    `maintenance-${maintenance?.slug}-closed-${suffix}`,
    // show by default if a maintenance exists
    !maintenance,
  );

  if (maintenance) {
    return (
      <Collapse in={!isClosed}>
        <Alert
          action={
            showCloseButton && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsClosed(true);
                }}
              >
                <XIcon />
              </IconButton>
            )
          }
          severity="warning"
          sx={{ fontSize: 16 }}
        >
          <AlertTitle sx={{ fontWeight: 'bold' }}>{t('TITLE')}</AlertTitle>
          <p>
            <Trans
              t={t}
              i18nKey="INTRODUCTION"
              values={{
                fromDate: formatDate(
                  maintenance.startAt,
                  // use the long localized date (PPP)
                  'PPP',
                  {
                    locale: getLocalForDateFns(i18n.language),
                  },
                ),
                toDate: formatDate(
                  maintenance.endAt,
                  // use the long localized date (PPP)
                  'PPP',
                  {
                    locale: getLocalForDateFns(i18n.language),
                  },
                ),
              }}
              components={{ b: <strong /> }}
            />
          </p>
          <p>
            <Trans
              t={t}
              i18nKey="DETAILS"
              values={{
                fromDate: formatDate(
                  maintenance.startAt,
                  // use the long localized date (PPP) and short localized time (p) and add the timezone (O)
                  'PPPp O',
                  {
                    locale: getLocalForDateFns(i18n.language),
                  },
                ),
                toDate: formatDate(
                  maintenance.endAt,
                  // use the long localized date (PPP) and short localized time (p) and add the timezone (O)
                  'PPPp O',
                  {
                    locale: getLocalForDateFns(i18n.language),
                  },
                ),
              }}
              components={{ b: <strong /> }}
            />
          </p>
          <p>
            <Trans t={t} i18nKey="CONTACT" />
          </p>
        </Alert>
      </Collapse>
    );
  }

  return null;
}
