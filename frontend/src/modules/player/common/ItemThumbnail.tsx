import type { JSX } from 'react';

import {
  DiscriminatedItem,
  ThumbnailSize,
  ThumbnailsBySize,
  getMimetype,
} from '@graasp/sdk';

import { type PackedItem } from '@/openapi/client';
import ItemIcon from '@/ui/icons/ItemIcon';

type Props = {
  item: Pick<PackedItem, 'thumbnails' | 'extra' | 'type' | 'name'>;

  size?: keyof ThumbnailsBySize;
};
const ItemThumbnail = ({
  item,
  size = ThumbnailSize.Medium,
}: Props): JSX.Element | null => {
  const thumbnailSrc = item.thumbnails?.[size];

  return (
    <ItemIcon
      type={item.type}
      // TODO: fix type
      mimetype={getMimetype((item as DiscriminatedItem).extra)}
      alt={item.name}
      iconSrc={thumbnailSrc}
    />
  );
};
export default ItemThumbnail;
