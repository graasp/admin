import { type JSX } from 'react';
import { FeatureGroup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { Box, CircularProgress, Stack } from '@mui/material';

import { useQueryClientContext } from '../context/QueryClientContext';
import ItemMarker from './ItemMarker';

const ItemsMarkers = ({
  tags,
  bounds,
}: {
  tags: string[];
  bounds?: {
    lat1: number;
    lat2: number;
    lng1: number;
    lng2: number;
  };
}): JSX.Element | JSX.Element[] | undefined => {
  const { item, useItemsInMap } = useQueryClientContext();
  const { data: itemGeolocations, isFetching } = useItemsInMap({
    ...bounds,
    parentItemId: item?.id,
    keywords: tags,
  });

  if (isFetching) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 50,
          zIndex: 450,
        }}
      >
        <Stack justifyContent="center" alignItems="center" py={2} height="100%">
          <CircularProgress />
        </Stack>
      </Box>
    );
  }
  // color of clusters is defined by number of markers grouped together
  return (
    <FeatureGroup>
      <MarkerClusterGroup chunkedLoading showCoverageOnHover={false}>
        {itemGeolocations?.map((geoloc) => (
          <ItemMarker key={geoloc.id} geolocation={geoloc} />
        ))}
      </MarkerClusterGroup>
    </FeatureGroup>
  );
};

export default ItemsMarkers;
