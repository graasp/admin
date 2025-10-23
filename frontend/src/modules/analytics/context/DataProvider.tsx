import {
  Dispatch,
  type JSX,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Context,
  DiscriminatedItem,
  ItemType,
  Member,
  PackedItem,
} from '@graasp/sdk';

import { addDays } from 'date-fns/addDays';

import { hooks } from '@/config/queryClient';
import { useDescendants } from '@/query/item/descendants/hooks';

import { DateRange } from '~analytics/config/type';
import { DEFAULT_REQUEST_SAMPLE_SIZE } from '~analytics/constants';

import { ViewDataContext } from './ViewDataProvider';

const defaultValue: {
  // allMembers: Member[];
  selectedUsers: Member[];
  setSelectedUsers: Dispatch<Member[]>;
  selectedActionTypes: string[];
  setSelectedActionTypes: Dispatch<string[]>;
  error: boolean;
  itemData?: DiscriminatedItem;
  itemChildren?: DiscriminatedItem[];
  isLoading: boolean;
  requestedSampleSize: number;
  descendantApps: PackedItem[];
  dateRange: DateRange;
  setDateRange: (view: DateRange) => void;
  itemId: string | undefined;
} = {
  // allMembers: [],
  selectedUsers: [],
  itemChildren: [],
  setSelectedUsers: () => {
    // do nothing
  },
  setSelectedActionTypes: () => {
    // do nothing
  },
  selectedActionTypes: [],
  error: false,
  isLoading: true,
  requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
  descendantApps: [],
  dateRange: {
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: 'selection',
  },
  setDateRange: () => {
    // do nothing
  },
  itemId: undefined,
};

export const DataContext = createContext(defaultValue);

// fetch data only if enabled is true
// enabled becomes true only if the user change the view in select

type Props = {
  children: JSX.Element | JSX.Element[];
  itemId: string;
};

const DataProvider = ({ children, itemId }: Props): JSX.Element => {
  const [enabledArray, setEnabledArray] = useState({
    [Context.Builder]: false,
    [Context.Player]: false,
    [Context.Library]: false,
  });
  const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
  const [selectedActionTypes, setSelectedActionTypes] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { view } = useContext(ViewDataContext);

  const [dateRange, setDateRange] = useState(defaultValue.dateRange);

  // todo: have a dynamic value
  const requestedSampleSize = DEFAULT_REQUEST_SAMPLE_SIZE;
  const { data: appDescendants = [] } = useDescendants({
    id: itemId || '',
    types: [ItemType.APP],
    showHidden: false,
  });

  const {
    data: itemData,
    isError: itemIsError,
    isLoading: itemIsLoading,
  } = hooks.useItem(itemId);
  const { data: itemChildren } = hooks.useChildren(itemId, undefined, {
    enabled: itemData?.type === ItemType.FOLDER,
  });
  // TODO: fix issue by refactoring code depending on this
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const descendantApps =
    itemData?.type === ItemType.APP
      ? [itemData, ...appDescendants]
      : appDescendants;

  useEffect(() => {
    if (itemIsError) {
      // TODO: fix this issue
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setError(true);
    }
  }, [itemIsError]);

  useEffect(() => {
    // fetch corresponding data only when view is shown
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!enabledArray[view]) {
      // TODO: fix this issue
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setEnabledArray({ ...enabledArray, [view]: true });
    }
  }, [view, enabledArray]);

  const value = useMemo(
    () => ({
      // allMembers,
      selectedUsers,
      setSelectedUsers,
      selectedActionTypes,
      setSelectedActionTypes,
      error,
      itemData,
      itemChildren,
      isLoading: itemIsLoading,
      requestedSampleSize,
      descendantApps,
      dateRange,
      setDateRange,
      itemId,
    }),
    [
      // allMembers,
      error,
      selectedUsers,
      selectedActionTypes,
      itemData,
      itemIsLoading,
      itemChildren,
      requestedSampleSize,
      descendantApps,
      dateRange,
      itemId,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
