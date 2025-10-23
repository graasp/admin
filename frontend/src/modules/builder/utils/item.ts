export const LINK_REGEX = new RegExp(
  '^(https?:\\/\\/)?' + // protocol is optional
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3})|' + // OR ip (v4) address
    'localhost)' + // OR localhost alias
    '(\\:\\d+)?' + // post (optional)
    '(\\/\\S*?)*' + // path (lazy: takes as few as possible)
    '(\\?\\S*?)?' + // query string (lazy)
    '(\\#\\S*)?$',
  'i',
); // fragment locator

export const isUrlValid = (str?: string | null): boolean => {
  if (!str) {
    return false;
  }
  const pattern = LINK_REGEX;
  if (pattern.test(str)) {
    return true;
  }
  return false;
};

export const stripHtml = (str?: string | null): string =>
  str?.replace(/<[^>]*>?/gm, '') || '';

// sort objects by alphabetical order according to name
export const sortByName = (
  a: { name: string },
  b: { name: string },
): number => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};
