import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ThumbnailSize } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { buildMemberAvatarId } from '@/config/selectors';
import Avatar from '@/ui/Avatar/Avatar';

const AVATAR_ICON_HEIGHT = 30;

type Props = {
  maxWidth?: number;
  maxHeight?: number;
};

export function CurrentMemberAvatar({
  maxWidth = AVATAR_ICON_HEIGHT,
  maxHeight = AVATAR_ICON_HEIGHT,
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Builder);
  const { data: member, isPending } = hooks.useCurrentMember();
  const { data: avatarUrl, isPending: isPendingAvatar } = hooks.useAvatarUrl({
    id: member?.id,
    size: ThumbnailSize.Small,
  });
  return (
    <Avatar
      id={buildMemberAvatarId(member?.id)}
      url={avatarUrl}
      isLoading={isPending || isPendingAvatar}
      alt={member?.name ?? t('AVATAR_DEFAULT_ALT')}
      component="avatar"
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      sx={{ mx: 1 }}
    />
  );
}
