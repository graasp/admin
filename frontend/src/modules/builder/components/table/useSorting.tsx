import { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';

import { Ordering, OrderingType } from '~builder/enums';

import {
  AllSortingOptions,
  SortingOptions,
  SortingOptionsForFolder,
  SortingOptionsType,
} from './types';

export const useSorting = ({
  sortBy: s,
  ordering: o = Ordering.DESC,
}: {
  sortBy?: AllSortingOptions;
  ordering: OrderingType;
}): {
  sortBy: AllSortingOptions;
  ordering: OrderingType;
  setSortBy: Dispatch<AllSortingOptions>;
  setOrdering: Dispatch<OrderingType>;
  sortFn: (a: DiscriminatedItem, b: DiscriminatedItem) => number;
} => {
  const [sortBy, setSortBy] = useState<AllSortingOptions>(
    s ?? SortingOptions.ItemUpdatedAt,
  );
  const [ordering, setOrdering] = useState<OrderingType>(o);

  const sortFn = (a: DiscriminatedItem, b: DiscriminatedItem) => {
    const f = ordering === Ordering.ASC ? 1 : -1;
    let value = 0;
    switch (sortBy) {
      case SortingOptions.ItemName:
        value = a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        break;
      case SortingOptions.ItemCreator:
        if (!a.creator) {
          value = -1;
        } else if (!b.creator) {
          value = 1;
        } else {
          value =
            a.creator?.name?.toLowerCase() > b.creator?.name?.toLowerCase()
              ? 1
              : -1;
        }
        break;
      case SortingOptions.ItemType:
        value = a.type > b.type ? 1 : -1;
        break;
      case SortingOptions.ItemUpdatedAt:
        value = a.updatedAt > b.updatedAt ? 1 : -1;
        break;
      case SortingOptionsForFolder.Order:
      default:
        value = 0;
    }

    return value * f;
  };

  return { sortBy, ordering, setSortBy, setOrdering, sortFn };
};

export const useTranslatedSortingOptions = (): SortingOptionsType[] => {
  const { t } = useTranslation(NS.Builder);

  return Object.values(SortingOptions).sort((t1, t2) => {
    const tt1 = t(t1);
    const tt2 = t(t2);
    return tt1.localeCompare(tt2);
  });
};
