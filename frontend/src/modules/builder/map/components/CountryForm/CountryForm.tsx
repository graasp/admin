import type { JSX, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Autocomplete,
  AutocompleteChangeReason,
  Popper,
  PopperProps,
  TextField,
} from '@mui/material';

import countriesISO from 'i18n-iso-countries';
import arTrans from 'i18n-iso-countries/langs/ar.json';
import deTrans from 'i18n-iso-countries/langs/de.json';
import enTrans from 'i18n-iso-countries/langs/en.json';
import esTrans from 'i18n-iso-countries/langs/es.json';
import frTrans from 'i18n-iso-countries/langs/fr.json';
import itTrans from 'i18n-iso-countries/langs/it.json';

import { NS } from '@/config/constants';
import { MAP_COUNTRY_SELECTION_FORM_ID } from '@/config/selectors';

import countries from '../../countries.json';
import { Country } from '../../types';

countriesISO.registerLocale(enTrans);
countriesISO.registerLocale(frTrans);
countriesISO.registerLocale(arTrans);
countriesISO.registerLocale(esTrans);
countriesISO.registerLocale(deTrans);
countriesISO.registerLocale(itTrans);

const CustomPopper = ({
  placement = 'auto',
}: {
  placement: PopperProps['placement'];
}) =>
  function (props: PopperProps): JSX.Element {
    return (
      <Popper
        {...props}
        style={{ width: '100%' }}
        popperOptions={{ placement }}
      />
    );
  };

export type CountryFormProps = {
  onChange: (newValue: Country) => void;
  placement?: PopperProps['placement'];
  initialValue?: string;
  lang?: string;
};

const CountryForm = ({
  onChange,
  placement = 'auto',
  initialValue,
  lang = 'en',
}: CountryFormProps): JSX.Element => {
  const { t } = useTranslation(NS.Map);

  const handleOnChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: {
      name: string;
      maxBoundary: number[];
      minBoundary: number[];
      alpha2: string;
    } | null,
    _reason: AutocompleteChangeReason,
  ) => {
    if (newValue) {
      onChange?.(newValue as Country);
    }
  };

  const translatedCountries = countries
    .map((c) => ({
      ...c,
      name: countriesISO.getName(c.alpha2, lang) ?? c.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div id={MAP_COUNTRY_SELECTION_FORM_ID} style={{ position: 'relative' }}>
      <Autocomplete
        autoSelect
        onChange={handleOnChange}
        disablePortal
        defaultValue={countries.find((c) => c.alpha2 === initialValue)}
        options={translatedCountries}
        getOptionKey={(o) => o.alpha2}
        getOptionLabel={(o) => o.name}
        sx={{ minWidth: 250 }}
        // set custom popper to force placement
        slots={{ popper: CustomPopper({ placement }) }}
        slotProps={
          placement !== 'auto'
            ? {
                popper: {
                  modifiers: [
                    {
                      name: 'flip',
                      enabled: false,
                    },
                    {
                      name: 'preventOverflow',
                      enabled: false,
                    },
                  ],
                },
              }
            : {}
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ background: 'transparent' }}
            slotProps={{
              input: {
                ...params.InputProps,
                sx: { borderRadius: '15px' },
              },
            }}
            label={t('Select a country')}
          />
        )}
      />
    </div>
  );
};

export default CountryForm;
