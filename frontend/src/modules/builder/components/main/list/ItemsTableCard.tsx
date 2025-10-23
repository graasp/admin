import type { JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Stack } from '@mui/material';

import { ItemType, PackedItem } from '@graasp/sdk';

import { useLocation } from '@tanstack/react-router';

import { CustomLink } from '@/components/ui/CustomLink';
import { NS } from '@/config/constants';
import type { DroppedFile } from '@/ui/draggable/types';

import SmallUploadFile from '~builder/components/file/SmallUploadFile';
import { ItemLayoutMode } from '~builder/enums';

import { useLayoutContext } from '../../context/LayoutContext';
import Badges, { ItemsStatuses } from '../../table/Badges';
import ItemActions from '../../table/ItemActions';
import ItemCard from '../../table/ItemCard';
import ItemMenuContent from '../ItemMenuContent';

const LinkComponent = ({ itemId }: { itemId: string }) => {
  const { search } = useLocation();

  return ({ children }: { children: ReactNode }) => {
    return (
      <CustomLink
        to="/builder/items/$itemId"
        params={{ itemId }}
        style={{ textDecoration: 'none', color: 'unset' }}
        search={search}
      >
        {children}
      </CustomLink>
    );
  };
};

type Props = {
  item: PackedItem | DroppedFile;
  isDragging: boolean;
  isOver: boolean;
  isMovable: boolean;
  showThumbnail: boolean;
  itemsStatuses: ItemsStatuses;
  enableMoveInBetween: boolean;
  onClick?: (id: string) => void;
  isSelected?: boolean;
  onThumbnailClick?: () => void;
};

const ItemsTableCard = ({
  item,
  isDragging,
  isOver,
  isMovable,
  showThumbnail,
  itemsStatuses,
  enableMoveInBetween,
  onClick,
  isSelected,
  onThumbnailClick,
}: Props): JSX.Element => {
  const { mode } = useLayoutContext();
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const dense = mode === ItemLayoutMode.List;

  if ('files' in item) {
    return <SmallUploadFile text={translateBuilder('UPLOAD_BETWEEN_FILES')} />;
  }

  const thumbnailUrl = showThumbnail ? item.thumbnails?.medium : undefined;

  const itemId =
    item.type === ItemType.SHORTCUT ? item.extra.shortcut.target : item.id;

  return (
    <Box px={1} onClick={() => onClick?.(item.id)}>
      <ItemCard
        onThumbnailClick={onThumbnailClick}
        dense={dense}
        item={item}
        isOver={isOver}
        disabled={!isMovable && enableMoveInBetween}
        isDragging={isDragging}
        isSelected={isSelected}
        thumbnailUrl={thumbnailUrl}
        CardLink={LinkComponent({
          itemId,
        })}
        menu={<ItemMenuContent item={item} />}
        footer={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Badges itemsStatuses={itemsStatuses} data={item} />
            <ItemActions data={item} />
          </Stack>
        }
      />
    </Box>
  );
};

export default ItemsTableCard;
