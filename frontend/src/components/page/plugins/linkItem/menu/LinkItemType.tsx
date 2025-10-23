import { useTranslation } from 'react-i18next';

import { MenuItem, Select, type SelectProps, Stack } from '@mui/material';

import {
  FullscreenIcon,
  LinkIcon,
  RectangleHorizontalIcon,
} from 'lucide-react';

import { NS } from '@/config/constants';

import { type Layout } from '../LinkItemNode';

type Props = {
  layout: string;
  onLayoutChange: (layout: Layout) => void;
};

export function LinkItemType({ layout, onLayoutChange }: Readonly<Props>) {
  const { t } = useTranslation(NS.PageEditor);
  const onChange: SelectProps['onChange'] = (event) => {
    onLayoutChange(event.target.value as Layout);
  };

  return (
    <>
      <Select
        disableUnderline
        variant="standard"
        value={layout}
        label="Link type"
        onChange={onChange}
        size="small"
      >
        <MenuItem value="button">
          <Stack direction="row" alignItems="center" gap={1}>
            <RectangleHorizontalIcon size={16} />
            {t('LINK.TYPE.BUTTON')}
          </Stack>
        </MenuItem>
        <MenuItem value="embed">
          <Stack direction="row" alignItems="center" gap={1}>
            <FullscreenIcon size={16} />
            {t('LINK.TYPE.EMBED')}
          </Stack>
        </MenuItem>
        <MenuItem value="text">
          <Stack direction="row" alignItems="center" gap={1}>
            <LinkIcon size={16} />
            {t('LINK.TYPE.TEXT')}
          </Stack>
        </MenuItem>
      </Select>
    </>
  );
}
