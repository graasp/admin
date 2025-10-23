import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { MenuItem, Select } from '@mui/material';

import { DescriptionPlacement, DescriptionPlacementType } from '@graasp/sdk';

import { CornerDownRightIcon, CornerUpRightIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import {
  ITEM_SETTING_DESCRIPTION_PLACEMENT_SELECT_ID,
  buildDescriptionPlacementId,
} from '@/config/selectors';

import ItemSettingProperty from '../../settings/ItemSettingProperty';

const DescriptionPlacementForm = (): JSX.Element | null => {
  const { t } = useTranslation(NS.Builder);
  const { watch, control } = useFormContext<{
    descriptionPlacement: DescriptionPlacementType;
  }>();

  const descriptionPlacement = watch('descriptionPlacement');

  return (
    <ItemSettingProperty
      title={t('ITEM_SETTINGS_DESCRIPTION_PLACEMENT_TITLE')}
      icon={
        descriptionPlacement === DescriptionPlacement.ABOVE ? (
          <CornerUpRightIcon />
        ) : (
          <CornerDownRightIcon />
        )
      }
      valueText={t('ITEM_SETTINGS_DESCRIPTION_PLACEMENT_HELPER', {
        placement: t(descriptionPlacement).toLowerCase(),
      })}
      inputSetting={
        <Controller
          name="descriptionPlacement"
          control={control}
          render={({ field }) => (
            <Select
              id={ITEM_SETTING_DESCRIPTION_PLACEMENT_SELECT_ID}
              value={field.value ?? DescriptionPlacement.BELOW}
              onChange={(v) => {
                field.onChange(v);
              }}
              size="small"
            >
              {Object.values(DescriptionPlacement).map((placement) => (
                <MenuItem
                  key={placement}
                  id={buildDescriptionPlacementId(placement)}
                  value={placement}
                >
                  {t(placement)}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      }
    />
  );
};

export default DescriptionPlacementForm;
