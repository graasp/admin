import { ChangeEventHandler, type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  LinearProgress,
  List,
  ListItemButton,
  TextField,
} from '@mui/material';

import { DEFAULT_LANG, NS } from '@/config/constants';
import { type useSuggestionsForAddress } from '@/query/hooks/itemGeolocation';

import { MAP } from '../../constants';
import { useOutsideClick } from './hook';

export type GeolocationPickerProps = {
  disabled?: boolean;
  useSuggestionsForAddress: typeof useSuggestionsForAddress;
  onChangeOption?: (args: {
    addressLabel: string;
    lat: number;
    lng: number;
    country?: string;
  }) => void;
  invisible?: boolean;
  initialValue?: string;
  endAdornment?: JSX.Element;
  label?: string;
};

const GeolocationPicker = ({
  disabled = false,
  useSuggestionsForAddress,
  onChangeOption,
  invisible = false,
  initialValue = '',
  label,
}: GeolocationPickerProps): JSX.Element => {
  const { t, i18n } = useTranslation(NS.Map);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState<string | undefined>(initialValue);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const { data: suggestions, isFetching } = useSuggestionsForAddress({
    address: query !== initialValue ? query : undefined,
    lang: i18n.language ?? DEFAULT_LANG,
  });
  const ref = useOutsideClick(() => {
    setShowSuggestions(false);
  });

  useEffect(() => {
    if (initialValue !== query) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setQuery(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    setSelectedAddress(undefined);
  };

  const handleChangeOption = (option: {
    addressLabel: string;
    lat: number;
    lng: number;
    country?: string;
  }): void => {
    onChangeOption?.(option);

    setSelectedAddress(option.addressLabel);
    setQuery(undefined);
  };

  return (
    <Box flex={1} position="relative" ref={ref}>
      <TextField
        disabled={disabled}
        fullWidth
        label={label ?? t(MAP.GEOLOCATION_PICKER_TITLE)}
        multiline
        placeholder={t(MAP.GEOLOCATION_PICKER_PLACEHOLDER)}
        onChange={onChange}
        onFocus={() => setShowSuggestions(true)}
        value={selectedAddress ?? query}
        {...(invisible
          ? {
              variant: 'standard',
              InputLabelProps: {
                shrink: true,
              },
              InputProps: {
                disableUnderline: true,
              },
            }
          : {})}
      />
      {isFetching && query && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {showSuggestions && suggestions && !selectedAddress && (
        <List
          sx={{
            position: 'absolute',
            background: 'white',
            top: 60,
            width: '100%',
            zIndex: 2,
            boxShadow: '0px 5px 6px rgba(0,0,0,0.3)',
          }}
        >
          {suggestions.map((r) => (
            <ListItemButton
              key={r.id}
              onMouseDown={() => {
                handleChangeOption(r);
                setShowSuggestions(false);
              }}
            >
              {r.addressLabel}
            </ListItemButton>
          ))}
          {!suggestions.length &&
            query &&
            !isFetching &&
            t(MAP.GEOLOCATION_PICKER_NO_ADDRESS)}
        </List>
      )}
    </Box>
  );
};

export default GeolocationPicker;
