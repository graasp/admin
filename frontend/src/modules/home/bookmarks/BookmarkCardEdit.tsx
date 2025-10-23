import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Badge,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { formatDate } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { buildBookmarkCardEditClassName } from '@/config/selectors';
import {
  deleteBookmarkMutation,
  getOwnBookmarkQueryKey,
} from '@/openapi/client/@tanstack/react-query.gen';
import { PackedItem } from '@/openapi/client/types.gen';
import { useButtonColor } from '@/ui/buttons/hooks';

import ItemThumbnail from '../../player/common/ItemThumbnail';

type Props = {
  item: PackedItem;
};

export function BookmarkCardEdit({ item }: Readonly<Props>): JSX.Element {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  const { color } = useButtonColor('error');
  const { t } = useTranslation(NS.Common, { keyPrefix: 'ARIA' });

  const { mutate: removeBookmark } = useMutation({
    ...deleteBookmarkMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getOwnBookmarkQueryKey(),
      });
    },
  });

  return (
    <Badge
      className={buildBookmarkCardEditClassName(item.id)}
      sx={{ width: '100%' }}
      badgeContent={
        <IconButton
          aria-label={t('REMOVE_BOOKMARK')}
          onClick={() => {
            removeBookmark({ path: { itemId: item.id } });
          }}
        >
          <XIcon color={color} />
        </IconButton>
      }
    >
      <Card sx={{ height: '100%', width: '100%' }} id={`bookmark-${item.id}`}>
        <CardContent id={`bookmarkCardAction-${item.id}`}>
          <Stack
            direction="row"
            alignItems="stretch"
            width="100%"
            height="100%"
            gap={1}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              // do not allow icons to shrink
              flexShrink={0}
            >
              <ItemThumbnail item={item} />
            </Box>

            <Stack minWidth={0}>
              <Typography
                variant="h5"
                component="h2"
                alignItems="center"
                textOverflow="ellipsis"
                overflow="hidden"
                noWrap
              >
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(item.updatedAt, { locale: i18n.language })}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Badge>
  );
}
