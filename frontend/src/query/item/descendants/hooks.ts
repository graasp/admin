import { ItemTypeUnion, UUID } from '@graasp/sdk';

import { useQuery } from '@tanstack/react-query';

import { UndefinedArgument } from '../../config/errors.js';
import { itemKeys } from '../../keys.js';
import { getDescendants } from './api.js';

export const useDescendants = ({
  id,
  types,
  showHidden,
  enabled,
}: {
  id?: UUID;
  types?: ItemTypeUnion[];
  showHidden?: boolean;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: itemKeys.single(id).descendants({ types, showHidden }),
    queryFn: () => {
      if (!id) {
        throw new UndefinedArgument();
      }
      return getDescendants({ id, types, showHidden });
    },
    enabled: enabled && Boolean(id),
  });
};
