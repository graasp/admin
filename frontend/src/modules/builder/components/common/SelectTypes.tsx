import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import { ItemType } from '@graasp/sdk';

import { NS } from '@/config/constants';
import ItemIcon from '@/ui/icons/ItemIcon';

import { useFilterItemsContext } from '../context/FilterItemsContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const LABEL_ID = 'select-types-filter-label';

export const SelectTypes = (): JSX.Element => {
  const { itemTypes, setItemTypes } = useFilterItemsContext();
  const { t: translateEnums } = useTranslation(NS.Enums);
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const types = Object.values(ItemType).sort((t1, t2) =>
    translateEnums(t1).localeCompare(translateEnums(t2)),
  );

  const handleChange = (event: SelectChangeEvent<typeof itemTypes>) => {
    const {
      target: { value },
    } = event;
    setItemTypes(value as typeof itemTypes);
  };

  const label = translateBuilder('FILTER_BY_TYPES_LABEL');

  const renderValues = (value: typeof itemTypes) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {value.map((type) => (
        <ItemIcon key={type} alt={type} type={type} />
      ))}
    </Stack>
  );

  return (
    <FormControl sx={{ width: 'max-content', minWidth: '200px' }} size="small">
      <InputLabel id={LABEL_ID}>{label}</InputLabel>
      <Select
        labelId={LABEL_ID}
        size="small"
        multiple
        value={itemTypes}
        onChange={handleChange}
        input={
          <OutlinedInput
            label={label}
            inputProps={{ 'data-umami-event': 'filter-item-type' }}
          />
        }
        renderValue={renderValues}
        MenuProps={MenuProps}
        sx={{
          borderRadius: 40,
        }}
      >
        {types.map((type) => (
          <MenuItem key={type} value={type} disableGutters sx={{ padding: 0 }}>
            <Checkbox checked={itemTypes.includes(type)} size="small" />
            <Stack direction="row" spacing={1} alignItems="center">
              <ItemIcon alt={type} type={type} />
              <ListItemText primary={translateEnums(type)} />
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectTypes;
