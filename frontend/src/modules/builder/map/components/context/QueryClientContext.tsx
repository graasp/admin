import { type JSX, createContext, useContext, useMemo } from 'react';

import {
  CurrentAccount,
  DiscriminatedItem,
  ItemGeolocation,
  PackedItem,
} from '@graasp/sdk';

import type { configureQueryClient } from '@/query';
import {
  type useAddressFromGeolocation,
  type useItemsInMap,
  type useSuggestionsForAddress,
} from '@/query/hooks/itemGeolocation';

type QueryClientMutations = ReturnType<
  typeof configureQueryClient
>['mutations'];

export interface QueryClientContextInterface {
  item?: PackedItem;
  currentMember?: CurrentAccount | null;
  useAddressFromGeolocation: typeof useAddressFromGeolocation;
  useItemsInMap: typeof useItemsInMap;
  useSuggestionsForAddress: typeof useSuggestionsForAddress;
  currentPosition?: { lat: number; lng: number };
  useRecycleItems: QueryClientMutations['useRecycleItems'];
  usePostItem: QueryClientMutations['usePostItem'];
  useDeleteItemGeolocation: QueryClientMutations['useDeleteItemGeolocation'];
  viewItem: (item: DiscriminatedItem) => void;
  viewItemInBuilder: (item: DiscriminatedItem) => void;
  handleAddOnClick?: ({
    location,
  }: {
    location: Pick<ItemGeolocation, 'lat' | 'lng'> &
      Partial<Pick<ItemGeolocation, 'country' | 'addressLabel'>>;
  }) => void;
}

export const QueryClientContext = createContext<QueryClientContextInterface>({
  currentMember: undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useRecycleItems: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAddressFromGeolocation: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useItemsInMap: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSuggestionsForAddress: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usePostItem: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDeleteItemGeolocation: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewItem: () => ({}) as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewItemInBuilder: () => ({}) as any,
});

export const QueryClientContextProvider = ({
  currentMember,
  children,
  useRecycleItems,
  usePostItem,
  useDeleteItemGeolocation,
  useAddressFromGeolocation,
  useItemsInMap,
  useSuggestionsForAddress,
  viewItem,
  item,
  currentPosition,
  handleAddOnClick,
  viewItemInBuilder,
}: QueryClientContextInterface & { children: JSX.Element }): JSX.Element => {
  const value = useMemo(
    () => ({
      currentMember,
      useRecycleItems,
      usePostItem,
      useDeleteItemGeolocation,
      useAddressFromGeolocation,
      useItemsInMap,
      useSuggestionsForAddress,
      viewItem,
      item,
      currentPosition,
      handleAddOnClick,
      viewItemInBuilder,
    }),
    [
      currentMember,
      useRecycleItems,
      usePostItem,
      useDeleteItemGeolocation,
      useAddressFromGeolocation,
      useItemsInMap,
      useSuggestionsForAddress,
      viewItem,
      item,
      currentPosition,
      handleAddOnClick,
      viewItemInBuilder,
    ],
  );

  return (
    <QueryClientContext.Provider value={value}>
      {children}
    </QueryClientContext.Provider>
  );
};

export const useQueryClientContext = (): QueryClientContextInterface =>
  useContext<QueryClientContextInterface>(QueryClientContext);
