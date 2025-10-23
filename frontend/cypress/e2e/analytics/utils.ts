export const buildItemPath = ({
  itemId = `:itemId`,
  searchParams = '',
} = {}): string => {
  let url = `/analytics/items/${itemId}`;
  // append search parameters if present
  if (searchParams) {
    url = `${url}?${searchParams}`;
  }
  return url;
};
