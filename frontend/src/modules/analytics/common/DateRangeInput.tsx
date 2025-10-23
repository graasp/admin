import { type JSX, useState } from 'react';
import {
  DateRangePicker,
  Range,
  StaticRange,
  defaultInputRanges,
  defaultStaticRanges,
} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useTranslation } from 'react-i18next';

import { Popover, Stack, Typography } from '@mui/material';

import { endOfDay } from 'date-fns/endOfDay';
import { format } from 'date-fns/format';
import { isSameDay } from 'date-fns/isSameDay';
import { subMonths } from 'date-fns/subMonths';

import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import { getLocalForDateFns } from '@/config/langs';

import { DateRange } from '~analytics/config/type';

const threeMonthsRange = {
  startDate: subMonths(new Date(), 3),
  endDate: endOfDay(new Date()),
};

type Props = {
  dateRange: DateRange;
  setDateRange: (d: DateRange) => void;
};

const DateRangeInput = ({ dateRange, setDateRange }: Props): JSX.Element => {
  const { t, i18n } = useTranslation(NS.Analytics);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedStartDate = format(dateRange.startDate, 'MMM d, yyyy');
  const formattedEndDate = format(dateRange.endDate, 'MMM d, yyyy');
  const inputValue = `${formattedStartDate} - ${formattedEndDate}`;

  const defaultStaticRangesTranslatedLabels = defaultStaticRanges.map((r) => ({
    ...r,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    label: t(r.label as string) as string,
  }));

  const lastThreeMonths: StaticRange = {
    label: t('LAST_THREE_MONTHS_LABEL'),
    range: () => threeMonthsRange,
    isSelected(range: Range) {
      return (
        isSameDay(range.startDate as Date, threeMonthsRange.startDate) &&
        isSameDay(range.endDate as Date, threeMonthsRange.endDate)
      );
    },
  };

  return (
    <Stack>
      <Typography variant="note" color="textSecondary">
        {t('RANGE_DATE_PICKER_INPUT_LABEL')}:
      </Typography>
      <Button
        variant="outlined"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{ width: 'max-content' }}
      >
        {inputValue}
      </Button>
      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          onChange={(item) => setDateRange({ ...dateRange, ...item.selection })}
          maxDate={new Date()}
          ranges={[dateRange]}
          locale={getLocalForDateFns(i18n.language)}
          staticRanges={[
            ...defaultStaticRangesTranslatedLabels,
            lastThreeMonths,
          ]}
          inputRanges={[defaultInputRanges[0]]}
        />
      </Popover>
    </Stack>
  );
};

export default DateRangeInput;
