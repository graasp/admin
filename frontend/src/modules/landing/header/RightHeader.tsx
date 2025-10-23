import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack, useMediaQuery, useTheme } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { ArrowRightIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { ButtonLink } from '@/components/ui/ButtonLink';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { NS } from '@/config/constants';
import { OnChangeLangProp } from '@/types';

type RightHeaderProps = {
  onChangeLang: OnChangeLangProp;
};

export function RightHeader({
  onChangeLang,
}: Readonly<RightHeaderProps>): JSX.Element {
  const { isAuthenticated, user } = useAuth();
  const { t, i18n } = useTranslation(NS.Common);
  const { t: translateLanding } = useTranslation(NS.Landing);

  const theme = useTheme();
  const showRegisterButton = useMediaQuery(theme.breakpoints.up('sm'));

  if (isAuthenticated) {
    if (user.type === AccountType.Individual) {
      return (
        <Stack gap={2} direction="row" alignItems="center">
          <ButtonLink
            variant="contained"
            to="/home"
            endIcon={<ArrowRightIcon />}
          >
            {translateLanding('NAV.GO_TO_GRAASP')}
          </ButtonLink>

          <LanguageSwitch
            id="languageSwitch"
            lang={i18n.language}
            onChange={onChangeLang}
          />
        </Stack>
      );
    } else {
      return (
        <Stack gap={2} direction="row" alignItems="center">
          <ButtonLink
            variant="contained"
            // guests only have access to a single item
            to="/player/$rootId/$itemId"
            params={{
              rootId: user.item.id,
              itemId: user.item.id,
            }}
            endIcon={<ArrowRightIcon />}
          >
            {translateLanding('NAV.GO_TO_ITEM', { name: user.item.name })}
          </ButtonLink>
        </Stack>
      );
    }
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper" alignItems="center">
      <ButtonLink to="/auth/login">{t('LOG_IN.BUTTON_TEXT')}</ButtonLink>
      {showRegisterButton && (
        <ButtonLink to="/auth/register">{t('REGISTER.BUTTON_TEXT')}</ButtonLink>
      )}
      <LanguageSwitch lang={i18n.language} onChange={onChangeLang} />
    </Stack>
  );
}
