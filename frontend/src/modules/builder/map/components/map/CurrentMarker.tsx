import { type JSX, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import { ItemGeolocation } from '@graasp/sdk';

import { LatLng } from 'leaflet';

import { useQueryClientContext } from '../context/QueryClientContext';
import { pointer } from '../icons/icons';
import CurrentMarkerPopupContent from './CurrentMarkerPopupContent';

const CurrentMarker = (): JSX.Element | null => {
  // click on pint at the map
  const [clickedPoint, setClickedPoint] =
    useState<Pick<ItemGeolocation, 'lat' | 'lng'>>();
  const [open, setOpen] = useState(false);
  const { currentMember } = useQueryClientContext();

  const handleClick = (e: { latlng: LatLng }) => {
    const { lat, lng } = e.latlng;
    setClickedPoint({ lat, lng });
  };

  useMapEvents({
    click: handleClick,
  });

  if (!clickedPoint || !currentMember) {
    return null;
  }

  return (
    <Marker
      icon={pointer}
      eventHandlers={{
        popupclose: () => {
          setOpen(false);
        },
        click: () => {
          setOpen(true);
        },
      }}
      position={[clickedPoint.lat, clickedPoint.lng]}
    >
      {currentMember && (
        <Popup autoPan={false}>
          <CurrentMarkerPopupContent open={open} point={clickedPoint} />
        </Popup>
      )}
    </Marker>
  );
};

export default CurrentMarker;
