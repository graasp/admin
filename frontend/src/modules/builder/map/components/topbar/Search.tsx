import { type JSX, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Autocomplete, TextField } from '@mui/material';

import { NS } from '@/config/constants';

const Search = ({
  onChange,
  invisible = false,
  tags,
}: {
  invisible?: boolean;
  tags: string[];
  onChange: (newTags: string[]) => void;
}): JSX.Element => {
  const ref = useRef(undefined);
  const { t } = useTranslation(NS.Map);

  const onChangeTags = (_e: unknown, newValue: string[]) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      sx={{ flex: 1 }}
      multiple
      freeSolo
      aria-label={t('Keywords')}
      value={tags}
      options={[]}
      clearOnBlur
      renderInput={(params) => (
        <TextField
          onBlur={(e) => {
            const startedKeyword = e.target.value;
            if (startedKeyword) {
              onChangeTags(e, [...tags, startedKeyword]);
            }
          }}
          inputRef={ref}
          {...params}
          placeholder={t('Enter keywords here')}
          label={t('Keywords')}
          {...(invisible
            ? {
                variant: 'standard',
                InputLabelProps: {
                  shrink: true,
                },
                InputProps: {
                  ...params.InputProps,
                  disableUnderline: true,
                },
              }
            : {})}
        />
      )}
      onChange={onChangeTags}
    />
  );
};
export default Search;
