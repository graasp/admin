import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { PackedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';

import ThumbnailUploader, {
  EventChanges,
  EventChangesType,
} from '~builder/components/thumbnails/ThumbnailUploader';
import { BUILDER } from '~builder/langs';

const THUMBNAIL_SIZE = 120;

type Props = { item: PackedItem };

const ThumbnailSetting = ({ item }: Props): JSX.Element | null => {
  const { t } = useTranslation(NS.Builder);
  const [hasThumbnail, setHasThumbnail] = useState(Boolean(item.thumbnails));

  const handleChange = (e: EventChangesType) => {
    switch (e) {
      case EventChanges.ON_UPLOADING:
      case EventChanges.ON_HAS_THUMBNAIL:
        setHasThumbnail(true);
        break;
      case EventChanges.ON_NO_THUMBNAIL:
        setHasThumbnail(false);
        break;
      default:
      // nothing to do
    }
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <ThumbnailUploader
        item={item}
        thumbnailSize={THUMBNAIL_SIZE}
        onChange={handleChange}
      />
      {!hasThumbnail && (
        <Typography variant="caption">
          {t(BUILDER.SETTINGS_THUMBNAIL_SETTINGS_INFORMATIONS)}
        </Typography>
      )}
    </Stack>
  );
};

export default ThumbnailSetting;
