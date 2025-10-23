import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Typography, useMediaQuery } from '@mui/material';

import { PackedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { FOLDER_NAME_TITLE_CLASS } from '@/config/selectors';
import TextDisplay from '@/ui/TextDisplay/TextDisplay';
import Thumbnail from '@/ui/Thumbnail/Thumbnail';
import { theme } from '@/ui/theme';

type SectionHeaderProps = {
  item: PackedItem;
};

export function SectionHeader({
  item,
}: Readonly<SectionHeaderProps>): JSX.Element {
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation(NS.Common);
  const thumbnailSrc = item.thumbnails?.medium;

  return (
    <Stack gap={2}>
      <Stack direction={{ sm: 'row' }} gap={2} alignItems="center">
        {thumbnailSrc && (
          <Stack width={{ xs: '100%', sm: 'inherit' }}>
            <Thumbnail
              maxWidth={isSm ? '96px' : '100%'}
              maxHeight={isSm ? '96px' : '100%'}
              url={thumbnailSrc}
              alt={item.name}
              sx={{ borderRadius: 5 }}
            />
          </Stack>
        )}
        <Stack gap={1} width="100%">
          <Typography
            className={FOLDER_NAME_TITLE_CLASS}
            variant="h2"
            component="h1"
          >
            {item.name}
          </Typography>
          {item.creator && (
            <Typography variant="caption">
              {t('FOLDER_HEADER_CREATED_BY', {
                name: item.creator?.name,
              })}
            </Typography>
          )}
        </Stack>
      </Stack>
      <TextDisplay content={item.description ?? ''} />
    </Stack>
  );
}
