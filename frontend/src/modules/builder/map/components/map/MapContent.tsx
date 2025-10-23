import { type JSX, useState } from 'react';

import { PermissionLevel, PermissionLevelCompare } from '@graasp/sdk';

import { useQueryClientContext } from '../context/QueryClientContext';
import CurrentLocationMarker from './CurrentLocationMarker';
import CurrentMarker from './CurrentMarker';
import ItemsMarkers from './ItemsMarkers';
import MapEvents from './MapEvents';

const MapContent = ({
  currentPosition,
  tags,
}: {
  currentPosition?: { lat: number; lng: number };
  tags: string[];
}): JSX.Element => {
  const { item } = useQueryClientContext();
  const [bounds, setBounds] = useState<{
    lat1: number;
    lat2: number;
    lng1: number;
    lng2: number;
  }>();

  // can write in root or with right permission in item
  const canWrite =
    !item ||
    (item.permission &&
      PermissionLevelCompare.gte(item.permission, PermissionLevel.Write));

  return (
    <>
      <MapEvents setBounds={setBounds} />
      <ItemsMarkers tags={tags} bounds={bounds} />
      <CurrentLocationMarker position={currentPosition} />
      {canWrite && <CurrentMarker />}
    </>
  );
};

export default MapContent;
