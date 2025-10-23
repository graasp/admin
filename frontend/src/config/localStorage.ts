/**
 * Wrapper around window.localStorage
 * some localStorage functions can throw because it can be unavailable, full or corrupted
 */
export const LocalStorage = {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  },
  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Error while setting "${key}" in localstorage`, e);
    }
  },
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error while removing "${key}" in localstorage`, e);
    }
  },
};
