import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButtonProps } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { PackedBookmark } from '@/openapi/client';
import {
  createBookmarkMutation,
  deleteBookmarkMutation,
  getOwnBookmarkOptions,
  getOwnBookmarkQueryKey,
} from '@/openapi/client/@tanstack/react-query.gen';
import GraaspBookmarkButton from '@/ui/buttons/BookmarkButton/BookmarkButton';
import { ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../langs';

type Props = {
  item: DiscriminatedItem;
  type?: ActionButtonVariant;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  className?: string;
};

const isItemBookmarked = (
  item: DiscriminatedItem,
  bookmarks?: PackedBookmark[],
): boolean => bookmarks?.some((f) => f.item.id === item.id) || false;

const BookmarkButton = ({
  item,
  size,
  type,
  onClick,
  className,
}: Props): JSX.Element | null => {
  const { data: bookmarks } = useQuery(getOwnBookmarkOptions());
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const queryClient = useQueryClient();
  const addFavorite = useMutation({
    ...createBookmarkMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getOwnBookmarkQueryKey() });
    },
  });
  const deleteFavorite = useMutation({
    ...deleteBookmarkMutation(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getOwnBookmarkQueryKey() });
    },
  });

  const isFavorite = isItemBookmarked(item, bookmarks);

  const handleFavorite = () => {
    addFavorite.mutate({ path: { itemId: item.id } });
    onClick?.();
  };

  const handleUnbookmark = () => {
    deleteFavorite.mutate({ path: { itemId: item.id } });
    onClick?.();
  };

  const text = isFavorite
    ? translateBuilder(BUILDER.BOOKMARKED_ITEM_REMOVE_TEXT)
    : translateBuilder(BUILDER.BOOKMARKED_ITEM_ADD_TEXT);

  return (
    <GraaspBookmarkButton
      className={className}
      isFavorite={isFavorite}
      ariaLabel={text}
      handleUnbookmark={handleUnbookmark}
      handleBookmark={handleFavorite}
      tooltip={text}
      type={type}
      size={size}
      text={text}
    />
  );
};

export default BookmarkButton;
