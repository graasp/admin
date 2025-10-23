import { type JSX, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Info } from '@mui/icons-material';
import { Tooltip, styled } from '@mui/material';

import { NS } from '@/config/constants';

import { DataContext } from '~analytics/context/DataProvider';

import StyledAlert from '../common/StyledAlert';

const StyledRoot = styled('div')(({ theme }) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AlertsTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    fontSize: '11px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginRight: theme.spacing(1),
  },
}));

const ChartsAlerts = (): JSX.Element => {
  const { t } = useTranslation(NS.Analytics);
  const { requestedSampleSize } = useContext(DataContext);

  // adding a tooltip to an Alert is tricky; this hack uses the Alert's built-in 'action' prop to do this

  return (
    <StyledRoot>
      {/* // TODO: implement maxTreeLengthExceeded to show message if depth is capped */}
      <StyledAlert
        severity="info"
        action={
          <AlertsTooltip
            title={t('SAMPLE_ACTIONS_MESSAGE', { requestedSampleSize })}
            placement="left"
          >
            <Info fontSize="small" />
          </AlertsTooltip>
        }
      >
        {t('SAMPLE_ACTIONS_CHARTS_MESSAGE', {
          requestedSampleSize,
        })}
      </StyledAlert>
    </StyledRoot>
  );
};

export default ChartsAlerts;
