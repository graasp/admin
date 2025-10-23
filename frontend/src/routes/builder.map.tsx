import type { JSX } from 'react';

import { DiscriminatedItem } from '@graasp/sdk';

import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import MapView from '~builder/components/item/MapView';

const schema = z.object({
  enableGeolocation: z.boolean().default(true),
  parentId: z.string().optional(),
});

export const Route = createFileRoute('/builder/map')({
  validateSearch: zodValidator(schema),
  component: MapItemScreen,
});

// this page is used by the mobile app to display the map
function MapItemScreen(): JSX.Element | null {
  const search = Route.useSearch();
  const { enableGeolocation, parentId } = search;

  const navigate = useNavigate();

  const viewItem = (item: DiscriminatedItem) => {
    throw redirect({
      to: '/player/$rootId/$itemId',
      params: { rootId: item.id, itemId: item.id },
    });
  };

  const viewItemInBuilder = (item: DiscriminatedItem) => {
    // navigate to item in map
    navigate({
      to: '/builder/items/$itemId',
      params: { itemId: item.id },
    });
  };

  return (
    <MapView
      viewItem={viewItem}
      viewItemInBuilder={viewItemInBuilder}
      enableGeolocation={enableGeolocation}
      parentId={parentId}
    />
  );
}
