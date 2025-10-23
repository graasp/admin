import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Alert, Box, FormLabel, Typography } from '@mui/material';

import { MAX_DESCRIPTION_LENGTH, NS } from '@/config/constants';
import TextEditor from '@/ui/TextEditor/TextEditor';

export type DescriptionFormProps = {
  id?: string;
};

export function DescriptionForm({
  id,
}: Readonly<DescriptionFormProps>): JSX.Element {
  const { control } = useFormContext<{
    description: string;
  }>();
  const { t: translateMessages } = useTranslation(NS.Messages);
  const { t } = useTranslation(NS.Builder, {
    keyPrefix: 'DESCRIPTION',
  });
  return (
    <Box>
      <FormLabel>
        <Typography variant="caption">{t('LABEL')}</Typography>
      </FormLabel>
      <Controller
        name="description"
        control={control}
        rules={{
          maxLength: {
            value: MAX_DESCRIPTION_LENGTH,
            message: translateMessages(
              'INVALID_ITEM_DESCRIPTION_MAX_LENGTH_ERROR',
            ),
          },
        }}
        render={({ field, formState: { errors } }) => (
          <>
            {errors.description?.message && (
              <Alert id={`${id}-error`} severity="error">
                {errors.description.message}
              </Alert>
            )}
            <TextEditor
              id={id}
              value={field.value}
              onChange={(v) => field.onChange(v)}
              placeholderText={t('PLACEHOLDER')}
            />
          </>
        )}
      />
    </Box>
  );
}
