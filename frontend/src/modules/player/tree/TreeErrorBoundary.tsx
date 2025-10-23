import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { TREE_FALLBACK_RELOAD_BUTTON_ID } from '@/config/selectors';

export function TreeErrorBoundary(): JSX.Element {
  const { t } = useTranslation(NS.Player);
  return (
    <ButtonLink
      id={TREE_FALLBACK_RELOAD_BUTTON_ID}
      to={window.location.toString()}
    >
      {t('TREE_NAVIGATION_RELOAD_TEXT')}
    </ButtonLink>
  );
}
