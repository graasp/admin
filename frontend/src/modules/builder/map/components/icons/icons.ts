import L from 'leaflet';

import currentMarker from './currentLocationMarker.svg';
import markerIcon from './marker.svg';
import pointerIcon from './pointer.svg';

const currentLocationMarker = new L.Icon({
  iconUrl: currentMarker,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const marker = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  shadowSize: [41, 41],
});

const pointer = new L.Icon({
  iconUrl: pointerIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
  shadowSize: [41, 41],
});

export { currentLocationMarker, marker, pointer };
