import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import Clear from '@mui/icons-material/Clear';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  useItemGeolocation,
  useSuggestionsForAddress,
} from '@/query/hooks/itemGeolocation';

import { BUILDER } from '~builder/langs';
import MapGeolocationPicker, {
  type GeolocationPickerProps,
} from '~builder/map/components/GeolocationPicker/GeolocationPicker';

import GeolocationModalButton from './GeolocationModalButton';

const GeolocationPicker = ({
  item,
}: {
  item: DiscriminatedItem;
}): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { data: geoloc } = useItemGeolocation(item.id);
  const { mutate: putGeoloc } = mutations.usePutItemGeolocation();
  const { mutate: deleteGeoloc } = mutations.useDeleteItemGeolocation();

  const onChangeOption: GeolocationPickerProps['onChangeOption'] = (option: {
    addressLabel: string;
    lat: number;
    lng: number;
    country?: string;
  }): void => {
    const { addressLabel, lat, lng, country } = option;
    putGeoloc({
      itemId: item.id,
      geolocation: {
        addressLabel,
        lat,
        lng,
        country,
      },
    });
  };

  const clearGeoloc = () => {
    deleteGeoloc({ itemId: item.id });
  };

  // the input is disabled if the geoloc is defined in parent
  // but it should be enabled if the geoloc is not defined
  const isDisabled = Boolean(geoloc && geoloc?.item?.id !== item.id);

  return (
    <Stack gap={1}>
      <Box>
        <Typography variant="h4">
          {t(BUILDER.ITEM_SETTINGS_GEOLOCATION_TITLE)}
        </Typography>
        <Typography variant="body1">
          {t(BUILDER.ITEM_SETTINGS_GEOLOCATION_EXPLANATION)}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center">
        <MapGeolocationPicker
          useSuggestionsForAddress={useSuggestionsForAddress}
          onChangeOption={onChangeOption}
          initialValue={geoloc?.addressLabel ?? undefined}
          disabled={isDisabled}
        />
        {/* show clear only if not disabled */}
        {!isDisabled && (
          <Tooltip title={t(BUILDER.ITEM_SETTINGS_GEOLOCATION_CLEAR)}>
            <IconButton onClick={clearGeoloc}>
              <Clear />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      {isDisabled && (
        <Typography variant="caption">
          {t(BUILDER.ITEM_SETTINGS_GEOLOCATION_INHERITED_EXPLANATION)}
        </Typography>
      )}
      <GeolocationModalButton item={item} />
    </Stack>
  );
};

export default GeolocationPicker;
