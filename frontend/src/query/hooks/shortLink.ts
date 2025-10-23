import { useQuery } from '@tanstack/react-query';

import * as Api from '../api/shortLink.js';
import { itemKeys } from '../keys.js';

export const useShortLinksItem = (itemId: string) =>
  useQuery({
    queryKey: itemKeys.single(itemId).shortLinks,
    queryFn: () => Api.getShortLinksItem(itemId),
    enabled: Boolean(itemId),
  });
