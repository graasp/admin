import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, AlertTitle, IconButton, Stack } from '@mui/material';

import { Link } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_VALIDATION_BANNER_CLOSE_BUTTON_ID,
  MEMBER_VALIDATION_BANNER_ID,
} from '@/config/selectors';

import useModalStatus from '../../builder/components/hooks/useModalStatus';

const DOCUMENTATION_ORIGIN = 'https://graasp.github.io/docs';
const MEMBER_VALIDATION_DOCUMENTATION_LINK = '/user/account/validation';

const buildLocalizedDocumentationOrigin = (lang: string = 'en') => {
  if (lang == 'en') {
    return DOCUMENTATION_ORIGIN;
  }
  return `${DOCUMENTATION_ORIGIN}/${lang}`;
};

const buildLocalizedDocumentationLink = (lang: string): string => {
  // english does not use a path prefix
  return `${buildLocalizedDocumentationOrigin(lang)}${MEMBER_VALIDATION_DOCUMENTATION_LINK}`;
};

export function MemberValidationBanner(): JSX.Element | null {
  const { isOpen, closeModal } = useModalStatus({
    isInitiallyOpen: true,
  });
  const { t, i18n } = useTranslation(NS.Builder);
  const { data: member } = hooks.useCurrentMember();

  // banner should not be shown when the member does not have the property
  if (isOpen && member && 'isValidated' in member && !member.isValidated) {
    return (
      <Alert
        id={MEMBER_VALIDATION_BANNER_ID}
        severity="warning"
        action={
          <IconButton
            id={MEMBER_VALIDATION_BANNER_CLOSE_BUTTON_ID}
            onClick={closeModal}
          >
            <XIcon />
          </IconButton>
        }
      >
        <AlertTitle>{t('MEMBER_VALIDATION_TITLE')}</AlertTitle>
        <Stack gap={1}>
          {t('MEMBER_VALIDATION_DESCRIPTION')}
          <Link to={buildLocalizedDocumentationLink(i18n.language)}>
            {t('MEMBER_VALIDATION_LINK_TEXT')}
          </Link>
        </Stack>
      </Alert>
    );
  }
  return null;
}
