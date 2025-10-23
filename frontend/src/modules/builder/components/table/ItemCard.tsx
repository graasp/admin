import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';

import {
  DiscriminatedItem,
  ItemType,
  formatDate,
  getLinkThumbnailUrl,
} from '@graasp/sdk';

import { NS } from '@/config/constants';
import { ITEM_CARD_CLASS, buildItemCard } from '@/config/selectors';
import { Card, type CardProps } from '@/ui/Card/Card';
import TextDisplay from '@/ui/TextDisplay/TextDisplay';

type Props = {
  item: DiscriminatedItem;
  dense?: boolean;
  footer: JSX.Element;
  isOver?: boolean;
  isDragging?: boolean;
  disabled?: boolean;
  menu?: JSX.Element;
  isSelected?: boolean;
  onThumbnailClick?: () => void;
  thumbnailUrl?: string;
  CardLink?: CardProps['CardLink'];
};

const ItemCard = ({
  item,
  footer,
  dense = true,
  isDragging = false,
  isOver = false,
  isSelected = false,
  disabled,
  menu,
  thumbnailUrl,
  onThumbnailClick,
  CardLink,
}: Props): JSX.Element => {
  const { t: translateCommon, i18n } = useTranslation(NS.Common);

  const dateColumnFormatter = (value: string) =>
    formatDate(value, {
      locale: i18n.language,
      defaultValue: translateCommon('UNKNOWN_DATE'),
    });

  const content = (
    <Grid
      container
      height="100%"
      justifyContent="flex-start"
      alignItems="center"
      pl={1}
    >
      {dense ? (
        <>
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 6,
            }}
          >
            <Typography variant="caption">{item.type}</Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 6,
            }}
          >
            <Typography variant="caption">
              {dateColumnFormatter(item.updatedAt)}
            </Typography>
          </Grid>
        </>
      ) : (
        <Grid size={12}>
          <Typography variant="caption">
            <TextDisplay content={item.description ?? ''} />
          </Typography>
        </Grid>
      )}
    </Grid>
  );

  // show link thumbnail
  let thumbnail = thumbnailUrl;
  if (!thumbnail && item.type === ItemType.LINK) {
    thumbnail = getLinkThumbnailUrl(item.extra);
  }

  return (
    <Box data-id={item.id}>
      <Card
        onThumbnailClick={onThumbnailClick}
        className={ITEM_CARD_CLASS}
        id={buildItemCard(item.id)}
        sx={{ background: disabled ? 'lightgrey' : undefined }}
        dense={dense}
        elevation={false}
        thumbnail={thumbnail}
        name={item.name}
        alt={item.name}
        type={item.type}
        footer={footer}
        creator={item.creator?.name}
        content={content}
        fullWidth
        menu={menu}
        isDragging={isDragging}
        isOver={isOver}
        isSelected={isSelected}
        CardLink={CardLink}
      />
    </Box>
  );
};
export default ItemCard;
