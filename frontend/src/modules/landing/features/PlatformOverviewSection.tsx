import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { Image } from '@/components/ui/StyledImages';
import { NS } from '@/config/constants';
import { useButtonColor } from '@/ui/buttons/hooks';
import AnalyticsIcon from '@/ui/icons/AnalyticsIcon';
import BuildIcon from '@/ui/icons/BuildIcon';
import LibraryIcon from '@/ui/icons/LibraryIcon';
import PlayIcon from '@/ui/icons/PlayIcon';

function PlatformDisplayGlass({
  Icon,
  imageSrc,
  color,
}: Readonly<{ Icon: typeof BuildIcon; imageSrc: string; color?: string }>) {
  return (
    <Stack
      flex={1}
      // set a maximum height
      height="150px"
      // use all width available
      width="100%"
      // center elements inside
      alignItems="center"
      justifyContent="center"
      // use position relative so children can use absolute and stack over one another
      position="relative"
      // make a nice rounded borders
      overflow="hidden"
      borderRadius={4}
    >
      <Image src={imageSrc} width="100%" height="100%" />
      <Stack
        width="100%"
        height="100%"
        bgcolor={color}
        sx={{ opacity: 0.6, position: 'absolute' }}
      ></Stack>
      <Icon primaryColor="white" size={100} sx={{ position: 'absolute' }} />
    </Stack>
  );
}

const icons = {
  builder: {
    Icon: BuildIcon,
    imageSrc: '/illustration/computer-top-view.webp',
    title: `Photo by <a href="https://unsplash.com/@bramnaus">Bram Naus</a> on <a href="https://unsplash.com/photos/silver-macbook-beside-space-gray-iphone-6-and-clear-drinking-glass-on-brown-wooden-top-n8Qb1ZAkK88">Unsplash</a>`,
  },
  player: {
    Icon: PlayIcon,
    imageSrc: '/illustration/board-presentation.webp',
    title: `Photo by <a href="https://unsplash.com/@airfocus">airfocus</a> on <a href="https://unsplash.com/photos/man-in-white-and-black-checked-dress-shirt-holding-white-printer-paper-K_VeavYEfdA">Unsplash</a>`,
  },
  analytics: {
    Icon: AnalyticsIcon,
    imageSrc: '/illustration/computer-analytics.webp',
    title: `Photo by <a href="https://unsplash.com/@kmuza?utm_content=creditCopyText">Carlos Muza</a> on <a href="https://unsplash.com/photos/laptop-computer-on-glass-top-table-hpjSkU2UYSU">Unsplash</a>`,
  },
  library: {
    Icon: LibraryIcon,
    imageSrc: '/illustration/earth-space.webp',
    title: `Photo by <a href="https://unsplash.com/@nasa">NASA</a> on <a href="https://unsplash.com/photos/photo-of-outer-space-Q1p7bh3SHj8">Unsplash</a>`,
  },
} as const;

type PlatformOverviewProps = {
  platform: 'builder' | 'player' | 'analytics' | 'library';
};
function PlatformOverview({ platform }: Readonly<PlatformOverviewProps>) {
  const { color } = useButtonColor(platform);
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: `FEATURES.PLATFORM_OVERVIEW.${platform}`,
  });
  const { Icon, imageSrc } = icons[platform];
  return (
    <Stack
      direction={{ xs: 'row', md: 'column' }}
      alignItems="center"
      // stretch so all elements take the same height
      justifyContent="stretch"
      textAlign={{ md: 'center' }}
      gap={2}
    >
      <PlatformDisplayGlass Icon={Icon} imageSrc={imageSrc} color={color} />
      <Stack gap={1} flex={1} alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
          {t('TITLE')}
        </Typography>
        <Typography flex={1} maxWidth={{ xs: '25ch' }}>
          {t('DESCRIPTION')}
        </Typography>
        <ButtonLink
          sx={{ backgroundColor: '#e4c8ff90', color: '#a84eff' }}
          to="."
          hash={platform}
        >
          {t('BUTTON_TEXT')}
        </ButtonLink>
      </Stack>
    </Stack>
  );
}

export function PlatformOverviewSection() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'FEATURES.PLATFORM_OVERVIEW',
  });
  return (
    <Stack gap={2} maxWidth="lg" alignItems="center" width="100%">
      <Typography variant="h2" color="primary" width={{ md: '100%' }}>
        {t('TITLE')}
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        maxWidth={{ xs: '600px', md: 'lg' }}
        gap={4}
      >
        <PlatformOverview platform="builder" />
        <PlatformOverview platform="player" />
        <PlatformOverview platform="analytics" />
        <PlatformOverview platform="library" />
      </Stack>
    </Stack>
  );
}
