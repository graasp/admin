import type { JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconButton, TextField } from '@mui/material';

import { Undo2Icon, XIcon } from 'lucide-react';

import { NS } from '@/config/constants';

type LinkDescriptionFieldProps = {
  onRestore: () => void;
  showRestoreButton: boolean;
};
const LinkDescriptionField = ({
  onRestore,
  showRestoreButton,
}: LinkDescriptionFieldProps): JSX.Element => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<{ description: string }>();
  const { t } = useTranslation(NS.Builder);
  const { description } = getValues();
  return (
    <TextField
      label={t('DESCRIPTION.LABEL')}
      variant="standard"
      slotProps={{
        inputLabel: { shrink: true },
        input: {
          endAdornment: (
            <>
              <IconButton
                onClick={onRestore}
                sx={{
                  visibility: showRestoreButton ? 'visible' : 'hidden',
                }}
              >
                <Undo2Icon size="20" />
              </IconButton>

              <IconButton
                onClick={() => setValue('description', '')}
                sx={{
                  visibility: description ? 'visible' : 'hidden',
                }}
              >
                <XIcon size="20" />
              </IconButton>
            </>
          ),
        },
      }}
      error={Boolean(errors.description)}
      helperText={errors.description?.message}
      {...register('description')}
    />
  );
};
export default LinkDescriptionField;
