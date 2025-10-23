import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Marker, Popup } from 'react-leaflet';

import { NS } from '@/config/constants';

import { currentLocationMarker } from '../icons/icons';

const CurrentLocationMarker = ({
  position,
}: {
  position?: { lat: number; lng: number };
}): JSX.Element | null => {
  const { t } = useTranslation(NS.Map);

  if (!position) {
    return null;
  }

  return (
    <Marker icon={currentLocationMarker} position={position}>
      <Popup autoPan={false}>{t('My Location')}</Popup>
    </Marker>
  );
};

export default CurrentLocationMarker;
