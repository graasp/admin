import { useEffect, useState } from 'react';

import { LocalStorage } from '@/config/localStorage';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T | undefined>();

  // need this effect to correctly change value when the key changes
  useEffect(
    () => {
      const storedValue = LocalStorage.getItem(key);
      if (storedValue) {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setValue(JSON.parse(storedValue));
      } else {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        setValue(defaultValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  const changeValue = (v: T) => {
    localStorage.setItem(key, JSON.stringify(v));
    setValue(v);
  };

  return { value, changeValue };
}
