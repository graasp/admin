import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ThumbnailSize } from '@graasp/sdk';

import { NS } from '@/config/constants';
import Avatar from '@/ui/Avatar/Avatar';

import { hooks } from '../../config/queryClient';

type Props = {
  id?: string;
  maxWidth?: number;
  maxHeight?: number;
  component?: 'avatar' | 'img';
};
// avatar size in header
const AVATAR_HEADER_SIZE = 40;

const MemberAvatar = ({
  id,
  maxWidth = AVATAR_HEADER_SIZE,
  maxHeight = AVATAR_HEADER_SIZE,
  component = 'avatar',
}: Props): JSX.Element => {
  const { t } = useTranslation(NS.Account);
  const { data: member, isPending } = hooks.useCurrentMember();
  const { data: avatarUrl, isPending: isPendingAvatar } = hooks.useAvatarUrl({
    id,
    size: ThumbnailSize.Medium,
  });
  return (
    <Avatar
      url={avatarUrl}
      isLoading={isPending || isPendingAvatar}
      alt={member?.name ?? t('PROFILE_AVATAR_CURRENT_ALT')}
      component={component}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    />
  );
};

export default MemberAvatar;
