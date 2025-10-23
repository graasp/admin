import { type JSX, createContext, useMemo, useState } from 'react';

import {
  ActionViewContext,
  ActionViewContextUnion,
} from '~analytics/constants';

const defaultValue: {
  view: ActionViewContextUnion;
  setView: (view: string) => void;
} = {
  view: ActionViewContext.Builder,
  setView: () => {
    // do nothing
  },
};

const isActionView = (view: string): view is ActionViewContextUnion => {
  return Object.values<string>(ActionViewContext).includes(view);
};

export const ViewDataContext = createContext(defaultValue);

const ViewDataProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [view, setView] = useState<ActionViewContextUnion>(
    ActionViewContext.Builder,
  );
  const value = useMemo(
    () => ({
      view,
      setView: (v: string): void => {
        if (isActionView(v)) {
          setView(v);
        }
      },
    }),
    [view, setView],
  );
  return (
    <ViewDataContext.Provider value={value}>
      {children}
    </ViewDataContext.Provider>
  );
};

export default ViewDataProvider;
