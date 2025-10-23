import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { useSearch } from '@tanstack/react-router';
import { DoorOpenIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { BACK_TO_SHORTCUT_ID } from '@/config/selectors';

export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';

export function FromShortcutButton(): JSX.Element | null {
  const search = useSearch({ from: '/player/$rootId/$itemId/' });
  const { t } = useTranslation(NS.Player);
  const { from: fromUrl, fromName } = search;

  if (
    !fromUrl ||
    !fromName ||
    // should match player item url
    !new RegExp(`/${ID_FORMAT}`).exec(fromUrl)?.length
  ) {
    return null;
  }

  if (fromUrl) {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center">
        <ButtonLink
          id={BACK_TO_SHORTCUT_ID}
          to={fromUrl}
          search={search}
          variant="outlined"
          startIcon={<DoorOpenIcon />}
          color="warning"
          sx={{ textTransform: 'unset' }}
        >
          {t('FROM_SHORTCUT_BUTTON_TEXT', { name: fromName })}
        </ButtonLink>
      </Stack>
    );
  }

  return null;
}
