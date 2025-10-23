import type { JSX } from 'react';
import { Marker } from 'react-leaflet';

import { ItemGeolocation } from '@graasp/sdk';

import L from 'leaflet';

import { marker } from '../icons/icons';
import MarkerPopup from './MarkerPopup';

const ItemMarker = ({
  geolocation,
}: {
  geolocation: ItemGeolocation;
}): JSX.Element => {
  const thumbnailUrl = geolocation.item.thumbnails?.small;

  return (
    <Marker
      icon={
        thumbnailUrl
          ? L.icon({
              iconUrl: thumbnailUrl,
              iconSize: [30, 30],
            })
          : marker
      }
      position={[geolocation.lat, geolocation.lng]}
    >
      <MarkerPopup geolocation={geolocation} />
    </Marker>
  );
};

export default ItemMarker;
