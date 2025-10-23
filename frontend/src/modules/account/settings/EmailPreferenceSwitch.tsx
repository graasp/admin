import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { SelectChangeEvent } from '@mui/material';

import { CompleteMember, EmailFrequency } from '@graasp/sdk';

import { NS, emailFrequency } from '@/config/constants';
import Select from '@/ui/Select/Select';

type EmailPreferenceSwitchProps = {
  id?: string;
  emailFreq: CompleteMember['extra']['emailFreq'];
  onChange: (newEmailFreq: `${EmailFrequency}`) => void;
};

export function EmailPreferenceSwitch({
  id,
  emailFreq,
  onChange,
}: Readonly<EmailPreferenceSwitchProps>): JSX.Element {
  const { t } = useTranslation(NS.Account);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newEmailFreq = event.target.value as `${EmailFrequency}`;
    if (newEmailFreq) {
      onChange(newEmailFreq);
    } else {
      console.error(`The frequency ${event.target.value} is not valid`);
    }
  };

  return (
    <Select
      id={id}
      defaultValue={emailFreq}
      onChange={handleChange}
      variant="outlined"
      size="small"
      values={Object.entries(emailFrequency).map(([freq, name]) => ({
        value: freq,
        text: t(name),
      }))}
    />
  );
}
