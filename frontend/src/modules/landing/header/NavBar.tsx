import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { LANDING_PAGE_PATH } from '@/config/paths';
import { updateCurrentAccountMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { memberKeys } from '@/query/keys';
import { OnChangeLangProp } from '@/types';
import GraaspLogo from '@/ui/GraaspLogo/GraaspLogo';
import { useButtonColor } from '@/ui/buttons/hooks';
import { useMobileView } from '@/ui/hooks/useMobileView';

import { Menu } from '~landing/header/Menu';
import MobileMenu from '~landing/header/MobileMenu';
import { RightHeader } from '~landing/header/RightHeader';
import { usePreviewMode } from '~landing/preview/PreviewModeContext';

export function NavBar() {
  const { i18n } = useTranslation(NS.Landing, { keyPrefix: 'NAVBAR' });
  const { t: translateMessage } = useTranslation(NS.Messages);
  const { isAuthenticated, user } = useAuth();
  const { isMobile } = useMobileView();
  const { fill: primary } = useButtonColor('primary');

  const theme = useTheme();
  const showFullLengthMenu = useMediaQuery(theme.breakpoints.up('lg'));

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    ...updateCurrentAccountMutation(),
    onError: (error: Error) => {
      console.error(error);
      toast.error(translateMessage('EDIT_MEMBER_ERROR'));
    },
    // Always refetch after error or success:
    onSettled: async () => {
      // invalidate all queries
      await queryClient.invalidateQueries({
        queryKey: memberKeys.current().content,
      });
    },
  });
  const { isEnabled: isPreviewEnabled } = usePreviewMode();
  const onChangeLang: OnChangeLangProp = (lang: string) => {
    // only "full users" can change their language
    if (isAuthenticated && user.type === AccountType.Individual) {
      mutate({ body: { extra: { lang } } });
    }
    i18n.changeLanguage(lang);
  };

  return (
    <Stack
      // take maximum width
      width="100%"
      // make some room around the buttons
      p={2}
      gap={2}
      bgcolor="white"
      position="fixed"
      top="0px"
      sx={{
        boxShadow: (t) => t.shadows[3],
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Stack
        direction="row"
        maxWidth="lg"
        // take maximum width
        width="100%"
        m="auto"
        // separate the logo part from the buttons part
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          id="rightTitleWrapper"
          gap={4}
        >
          <Stack direction="row" gap={1} alignItems="center">
            {!showFullLengthMenu && <MobileMenu />}
            <Stack
              to={LANDING_PAGE_PATH}
              component={Link}
              // override link styling
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <GraaspLogo height={44} sx={{ fill: primary! }} />
            </Stack>
            {!isMobile && (
              <Typography fontWeight="bold" variant="h2" color="primary">
                Graasp
                {isPreviewEnabled ? (
                  <Typography variant="note">preview</Typography>
                ) : (
                  ''
                )}
              </Typography>
            )}
          </Stack>
          {showFullLengthMenu && <Menu />}
        </Stack>
        <RightHeader onChangeLang={onChangeLang} />
      </Stack>
    </Stack>
  );
}
