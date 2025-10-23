import { Action } from '@graasp/sdk';

import { addDays } from 'date-fns/addDays';
import { addMonths } from 'date-fns/addMonths';
import { addWeeks } from 'date-fns/addWeeks';
import { addYears } from 'date-fns/addYears';
import { isBefore } from 'date-fns/isBefore';
import { parseISO } from 'date-fns/parseISO';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';
import { startOfWeek } from 'date-fns/startOfWeek';
import { startOfYear } from 'date-fns/startOfYear';
import fromPairs from 'lodash.frompairs';
import groupBy from 'lodash.groupby';
import orderBy from 'lodash.orderby';
import toPairs from 'lodash.topairs';

import { GroupByInterval, GroupByIntervalType } from '~analytics/config/type';

const getStartDateFunction = (interval: GroupByIntervalType) => {
  switch (interval) {
    case GroupByInterval.Year:
      return startOfYear;
    case GroupByInterval.Month:
      return startOfMonth;
    case GroupByInterval.Day:
      return startOfDay;
    case GroupByInterval.Week:
    default:
      return (date: Date) => startOfWeek(date, { weekStartsOn: 1 });
  }
};

const fillDateGaps = (
  data: { [key: string]: Action[] },
  freq: GroupByIntervalType,
  start: Date,
  stop: Date,
): { [key: string]: Action[] } => {
  const copy = { ...data };
  const nextFunc = {
    [GroupByInterval.Day]: addDays,
    [GroupByInterval.Month]: addMonths,
    [GroupByInterval.Week]: addWeeks,
    [GroupByInterval.Year]: addYears,
  };
  const getStartDate = getStartDateFunction(freq);

  let currentDate = getStartDate(start);

  while (isBefore(currentDate, stop)) {
    if (!copy[currentDate.toISOString()]) {
      copy[currentDate.toISOString()] = [];
    }

    const getNextInterval = nextFunc[freq];
    currentDate = getNextInterval(currentDate, 1);
  }

  return copy;
};

const groupActionsByInterval = (
  actions: Action[],
  interval: GroupByIntervalType,
): { [key: string]: Action[] } => {
  const getStartDate = getStartDateFunction(interval);

  const groupedByInterval = groupBy(actions, (item) => {
    const date = parseISO(item.createdAt);
    const startDate = getStartDate(date);
    return startDate.toISOString();
  });

  return groupedByInterval;
};

const groupActionsBasedOnMaxIntervals = (
  actions: {
    [key: string]: Action[];
  },
  maxNoOfIntervals: number,
): { [key: string]: Action[] } => {
  const keys = Object.keys(actions);
  const totalActions = Object.values(actions);

  const len = keys.length;

  const maxKeysPerGroup = Math.ceil(len / maxNoOfIntervals);

  if (len > maxNoOfIntervals) {
    const obj = totalActions.reduce(
      (acc: { [key: string]: Action[] }, curr, index) => {
        const base = Math.floor(index / maxKeysPerGroup);
        if (index % maxKeysPerGroup === 0) {
          acc[keys[index]] = curr;
        } else {
          /*
          index stepped by maxKeysPerGroup, so if index = 1 and maxKeysPerGroup = 2, acc[1*2]
          index stepped by maxKeysPerGroup, so if index = 9 and maxKeysPerGroup = 2, acc[4*2]
          */
          acc[keys[base * maxKeysPerGroup]] = acc[
            keys[base * maxKeysPerGroup]
          ]?.concat(...curr);
        }
        return acc;
      },
      {},
    );

    return obj;
  }
  return actions;
};

export const groupActions = (
  actions: Action[],
  groupByKey: GroupByIntervalType,
  start: Date,
  stop: Date,
  maxIntervals: number,
): { [key: string]: Action[] } => {
  const groupedActions = groupActionsByInterval(actions, groupByKey);
  const filledGroupedActions = fillDateGaps(
    groupedActions,
    groupByKey,
    start,
    stop,
  );
  const sortedGroupedActions = orderBy(
    toPairs(filledGroupedActions),
    ([key]) => key,
  );

  const pairsActions = fromPairs(sortedGroupedActions);

  const groupedActionsMatchingMax = groupActionsBasedOnMaxIntervals(
    pairsActions,
    maxIntervals,
  );

  return groupedActionsMatchingMax;
};
