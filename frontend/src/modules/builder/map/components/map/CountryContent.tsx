import { type Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import { Paper } from '@mui/material';

import { NS } from '@/config/constants';

import { Country } from '../../types';
import CountryForm from '../CountryForm/CountryForm';

export function CountryContent({
  onCountrySelection,
}: Readonly<{
  onCountrySelection: Dispatch<Country>;
}>) {
  const { i18n } = useTranslation(NS.Map);

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1200,
        }}
      />
      <Paper
        style={{
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          zIndex: 1201,
          borderRadius: 15,
        }}
      >
        <CountryForm
          onChange={onCountrySelection}
          placement="bottom"
          lang={i18n.language}
        />
      </Paper>
    </div>
  );
}
