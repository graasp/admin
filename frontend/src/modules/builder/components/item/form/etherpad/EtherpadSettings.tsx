import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControlLabel, FormGroup, Switch } from '@mui/material';

import { NS } from '@/config/constants';
import { ETHERPAD_ALLOW_READER_TO_WRITE_SETTING_ID } from '@/config/selectors';

function EtherpadSettings() {
  const { t } = useTranslation(NS.Builder);
  const { control } = useFormContext<{ allowReadersToWrite: boolean }>();

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Controller
            name="allowReadersToWrite"
            control={control}
            render={({ field }) => (
              <Switch
                id={ETHERPAD_ALLOW_READER_TO_WRITE_SETTING_ID}
                checked={field.value}
                onChange={(_, checked) => {
                  field.onChange(checked);
                }}
              />
            )}
          />
        }
        label={t('ETHERPAG_ALLOW_READER_TO_WRITE_SETTING')}
      />
    </FormGroup>
  );
}

export default EtherpadSettings;
