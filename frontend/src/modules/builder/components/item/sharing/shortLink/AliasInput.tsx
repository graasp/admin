import { ChangeEvent, type JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Stack, TextField, Tooltip } from '@mui/material';

import { RefreshCcwIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import {
  SHORT_LINK_ALIAS_INPUT_ID,
  SHORT_LINK_RANDOMIZE_BUTTON_ID,
} from '@/config/selectors';

import { BUILDER } from '~builder/langs';
import { randomAlias } from '~builder/utils/shortLink';

type Props = {
  alias: string;
  onChange: (newAlias: string) => void;
  isError: boolean;
};

const AliasInput = ({ alias, onChange, isError }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const handleAliasChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };
  return (
    <Stack direction="row" alignItems="center">
      <TextField
        id={SHORT_LINK_ALIAS_INPUT_ID}
        label={translateBuilder(BUILDER.ALIAS_INPUT)}
        variant="outlined"
        size="small"
        value={alias}
        onChange={handleAliasChange}
        error={isError}
      />
      <Tooltip title={translateBuilder(BUILDER.GENERATE_ALIAS_TOOLTIP)}>
        <span>
          <IconButton
            onClick={() => onChange(randomAlias())}
            id={SHORT_LINK_RANDOMIZE_BUTTON_ID}
          >
            <RefreshCcwIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
};

export default AliasInput;
