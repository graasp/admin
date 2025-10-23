import { type JSX, createContext, useContext, useMemo } from 'react';

import { useSearch } from '@tanstack/react-router';

import {
  DEFAULT_ITEM_LAYOUT_MODE,
  ItemLayoutMode,
  ItemLayoutModeType,
} from '~builder/enums';

interface LayoutContextInterface {
  mode: ItemLayoutModeType;
}

export const LayoutContext = createContext<LayoutContextInterface>({
  mode: ItemLayoutMode.List,
});

export const LayoutContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { mode } = useSearch({ from: '/builder/items/$itemId' });

  const value: LayoutContextInterface = useMemo(
    () => ({
      mode: mode ?? DEFAULT_ITEM_LAYOUT_MODE,
    }),
    [mode],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextInterface =>
  useContext<LayoutContextInterface>(LayoutContext);
