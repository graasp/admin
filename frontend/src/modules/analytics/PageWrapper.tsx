import { type JSX, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material';

import { Context } from '@graasp/sdk';

import { getRouteApi } from '@tanstack/react-router';

import { HeaderRightContent } from '@/components/ui/HeaderRightContent';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';
import { HomeHeaderLink } from '@/ui/Main/HomeHeaderLink';
import Main from '@/ui/Main/Main';
import PlatformSwitch from '@/ui/PlatformSwitch/PlatformSwitch';
import { Platform } from '@/ui/PlatformSwitch/hooks';
import { useMobileView } from '@/ui/hooks/useMobileView';
import AnalyticsIcon from '@/ui/icons/AnalyticsIcon';

import { AnalyticsSidebar } from './AnalyticsSidebar';

const itemRoute = getRouteApi('/analytics/items/$itemId');

const LinkComponent = ({ children }: { children: ReactNode }): JSX.Element => (
  <HomeHeaderLink to="/home">{children}</HomeHeaderLink>
);
export function PageWrapper({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  const { t } = useTranslation(NS.Analytics);
  const { itemId } = itemRoute.useParams();
  const { isMobile } = useMobileView();
  const theme = useTheme();
  const platformProps = {
    [Platform.Builder]: {
      href: `/builder/items/${itemId}`,
    },
    [Platform.Player]: {
      href: `/player/${itemId}/${itemId}`,
    },
    [Platform.Library]: {
      href: GRAASP_LIBRARY_HOST,
    },
    [Platform.Analytics]: {
      disabled: true,
    },
  };

  return (
    <Main
      context={Context.Analytics}
      drawerContent={<AnalyticsSidebar itemId={itemId} />}
      drawerOpenAriaLabel={t('DRAWER_OPEN_ARIA')}
      headerRightContent={<HeaderRightContent />}
      PlatformComponent={
        <PlatformSwitch
          CustomMobileIcon={AnalyticsIcon}
          platformsProps={platformProps}
          color={isMobile ? theme.palette.primary.main : 'white'}
          accentColor={isMobile ? 'white' : theme.palette.primary.main}
        />
      }
      LinkComponent={LinkComponent}
    >
      {children}
    </Main>
  );
}
