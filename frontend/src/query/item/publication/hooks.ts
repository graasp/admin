import { UUID } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { itemKeys } from '../../keys.js';
import { getItemPublicationStatus } from './api.js';

export const usePublicationStatus = (itemId: UUID) =>
  useQuery({
    queryKey: itemKeys.single(itemId).publicationStatus,
    queryFn: () => getItemPublicationStatus(itemId),
    enabled: Boolean(itemId),
  });
