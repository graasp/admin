import type { JSX } from 'react';

import { Context, ShortLink } from '@graasp/sdk';

import GraaspLogo from '@/ui/GraaspLogo/GraaspLogo';
import BuildIcon from '@/ui/icons/BuildIcon';
import LibraryIcon from '@/ui/icons/LibraryIcon';
import PlayIcon from '@/ui/icons/PlayIcon';

const DEFAULT_ICON_SIZE = 25;

type Props = {
  platform: ShortLink['platform'];
  accentColor: string;
  size?: number;
};

const PlatformIcon = ({
  platform,
  accentColor,
  size = DEFAULT_ICON_SIZE,
}: Props): JSX.Element => {
  switch (platform) {
    case Context.Builder:
      return <BuildIcon size={size} primaryColor={accentColor} />;
    case Context.Player:
      return <PlayIcon size={size} primaryColor={accentColor} />;
    case Context.Library:
      return <LibraryIcon size={size} primaryColor={accentColor} />;
    default:
      console.error(`Undefined platform ${platform}.`);
      return <GraaspLogo height={size} sx={{ fill: accentColor }} />;
  }
};

export default PlatformIcon;
