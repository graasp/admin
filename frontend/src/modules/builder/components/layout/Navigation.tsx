import type { JSX } from 'react';

import { useParams } from '@tanstack/react-router';

import { hooks } from '@/config/queryClient';
import { NAVIGATION_ROOT_ID, buildNavigationLink } from '@/config/selectors';
import { Navigation } from '@/ui/Navigation/Navigation';

const { useItem, useParents, useChildren } = hooks;

const Navigator = (): JSX.Element | null => {
  const { itemId } = useParams({ strict: false });
  const { data: item, isLoading: isItemLoading } = useItem(itemId);

  const { data: parents, isLoading: areParentsLoading } = useParents({
    id: itemId,
  });

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  return (
    <Navigation
      id={NAVIGATION_ROOT_ID}
      item={item}
      itemPath={`/builder/items/$itemId`}
      parents={parents}
      buildMenuItemId={buildNavigationLink}
      useChildren={useChildren}
    />
  );
};

export default Navigator;
