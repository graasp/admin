import { UnionOfConst } from '@graasp/sdk';

export const GroupByInterval = {
  Week: 'week',
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;
export type GroupByIntervalType = UnionOfConst<typeof GroupByInterval>;

export type DateRange = { startDate: Date; endDate: Date; key: string };
