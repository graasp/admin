import { Dispatch, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

const MapEvents = ({
  setBounds,
}: {
  setBounds: Dispatch<{
    lat1: number;
    lat2: number;
    lng1: number;
    lng2: number;
  }>;
}): null => {
  const map = useMap();

  const updateBounds = () => {
    const b = map.getBounds();
    setBounds({
      lat1: b.getSouthWest().lat,
      lat2: b.getNorthEast().lat,
      lng1: b.getSouthWest().lng,
      lng2: b.getNorthEast().lng,
    });
  };

  useEffect(() => {
    map.scrollWheelZoom.enable();
    map.dragging.enable();
    // I guess it works only because the transition is immediate
    // might be breaking later
    updateBounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMapEvents({
    zoomend: (_e) => {
      updateBounds();
    },
    dragend: (_e) => {
      updateBounds();
    },
  });

  return null;
};

export default MapEvents;
