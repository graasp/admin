import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from '@mui/material';

import { ItemGeolocation } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { useAddressFromGeolocation } from '@/query/hooks/itemGeolocation';

import { useQueryClientContext } from '../context/QueryClientContext';
import AddItemButton from './AddItemButton';

const CurrentMarkerPopupContent = ({
  point,
  open,
}: {
  open: boolean;
  point: Pick<ItemGeolocation, 'lat' | 'lng'>;
}): JSX.Element => {
  const { t } = useTranslation(NS.Map);
  const { currentMember } = useQueryClientContext();
  const { data: address, isPending } = useAddressFromGeolocation(point, {
    enabled: Boolean(currentMember) && open,
  });

  const renderAddress = () => {
    if (address?.addressLabel) {
      return address?.addressLabel;
    }

    if (isPending) {
      return <Skeleton />;
    }

    return t('This location does not match a specific address.');
  };

  return (
    <div style={{ minWidth: 300 }}>
      {renderAddress()}
      <br />
      <AddItemButton
        location={{
          ...point,
          addressLabel: address?.addressLabel,
          country: address?.country,
        }}
      />
    </div>
  );
};

export default CurrentMarkerPopupContent;
