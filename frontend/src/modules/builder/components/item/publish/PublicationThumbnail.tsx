import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import WarningIcon from '@mui/icons-material/Warning';
import { Tooltip } from '@mui/material';

import { PackedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { buildPublishWarningIcon } from '@/config/selectors';
import { useButtonColor } from '@/ui/buttons/hooks';

import ThumbnailUploader, {
  EventChanges,
  EventChangesType,
} from '~builder/components/thumbnails/ThumbnailUploader';
import { BUILDER } from '~builder/langs';

const THUMBNAIL_SIZE = 150;
const SYNC_STATUS_KEY = 'PublicationThumbnail';

type Props = {
  item: PackedItem;
  thumbnailSize?: number;
  fullWidth?: boolean;
};
export const PublicationThumbnail = ({
  item,
  thumbnailSize = THUMBNAIL_SIZE,
  fullWidth = false,
}: Props): JSX.Element => {
  const { color } = useButtonColor('warning');
  const { t } = useTranslation(NS.Builder);
  const [showWarning, setShowWarning] = useState(false);
  // not sure about this value
  const title = 'my-categories';

  const handleChange = (e: EventChangesType) => {
    switch (e) {
      case EventChanges.ON_UPLOADING:
      case EventChanges.ON_HAS_THUMBNAIL:
        setShowWarning(false);
        break;
      case EventChanges.ON_NO_THUMBNAIL:
        setShowWarning(true);
        break;
      default:
      // nothing to do
    }
  };

  const warningTooltip = showWarning ? (
    <Tooltip title={t(BUILDER.LIBRARY_SETTINGS_THUMBNAIL_MISSING_WARNING)}>
      <WarningIcon htmlColor={color} data-cy={buildPublishWarningIcon(title)} />
    </Tooltip>
  ) : undefined;

  return (
    <ThumbnailUploader
      item={item}
      thumbnailSize={thumbnailSize}
      fullWidth={fullWidth}
      syncStatusKey={SYNC_STATUS_KEY}
      topCornerElement={warningTooltip}
      onChange={handleChange}
    />
  );
};

export default PublicationThumbnail;
