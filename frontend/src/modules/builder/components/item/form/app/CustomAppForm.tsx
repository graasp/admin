import { Dispatch, type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ArrowBack } from '@mui/icons-material';
import { DialogContent, Stack, TextField, Typography } from '@mui/material';

import { NS } from '@/config/constants';
import { CUSTOM_APP_URL_ID } from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import { LINK_REGEX } from '~builder/utils/item';

import { BUILDER } from '../../../../langs';
import { ItemNameField } from '../ItemNameField';

export function CustomAppForm({
  setIsCustomApp,
}: Readonly<{
  setIsCustomApp: Dispatch<boolean>;
}>): JSX.Element {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const {
    reset,
    register,
    formState: { errors },
  } = useFormContext<{ name: string; url: string }>();

  return (
    <DialogContent>
      <Stack gap={1} alignItems="flex-start">
        <Button
          startIcon={<ArrowBack fontSize="small" />}
          variant="text"
          onClick={() => {
            setIsCustomApp(false);
            reset({ name: '', url: '' });
          }}
        >
          {translateBuilder(BUILDER.CREATE_NEW_APP_BACK_TO_APP_LIST_BUTTON)}
        </Button>
        <Typography>
          {translateBuilder(BUILDER.CREATE_CUSTOM_APP_HELPER_TEXT)}
        </Typography>
        <TextField
          id={CUSTOM_APP_URL_ID}
          fullWidth
          variant="standard"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          slotProps={{
            inputLabel: { shrink: true },
          }}
          error={Boolean(errors.url)}
          helperText={errors.url?.message}
          label={translateBuilder(BUILDER.APP_URL)}
          {...register('url', {
            required: true,
            pattern: {
              value: LINK_REGEX,
              message: translateBuilder(BUILDER.LINK_INVALID_MESSAGE),
            },
          })}
        />
        <ItemNameField
          required
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={false}
        />
      </Stack>
    </DialogContent>
  );
}
