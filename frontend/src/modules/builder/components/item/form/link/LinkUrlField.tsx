import type { JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconButton, TextField } from '@mui/material';

import { XIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { ITEM_FORM_LINK_INPUT_ID } from '@/config/selectors';

import { LINK_REGEX } from '~builder/utils/item';

const LinkUrlField = (): JSX.Element => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<{ url: string }>();
  const { t } = useTranslation(NS.Builder);
  return (
    <TextField
      variant="standard"
      id={ITEM_FORM_LINK_INPUT_ID}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      margin="dense"
      label={t('CREATE_ITEM_LINK_LABEL')}
      slotProps={{
        inputLabel: { shrink: true },
        input: {
          endAdornment: (
            <IconButton
              onClick={() => setValue('url', '')}
              sx={{
                visibility: getValues().url ? 'visible' : 'hidden',
              }}
            >
              <XIcon fontSize="20" />
            </IconButton>
          ),
        },
      }}
      fullWidth
      required
      error={Boolean(errors.url)}
      helperText={errors.url?.message}
      placeholder="https://graasp.org"
      {...register('url', {
        pattern: {
          value: LINK_REGEX,
          message: t('LINK_INVALID_MESSAGE'),
        },
      })}
    />
  );
};
export default LinkUrlField;
