import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';

export function Menu() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'NAVBAR' });
  return (
    <Stack direction="row" gap={2}>
      <ButtonLink activeProps={() => ({ fontWeight: 'bold' })} to="/features">
        {t('FEATURES')}
      </ButtonLink>
      <ButtonLink activeProps={() => ({ fontWeight: 'bold' })} to="/support">
        {t('GETTING_STARTED')}
      </ButtonLink>
      <ButtonLink
        activeProps={() => ({ fontWeight: 'bold' })}
        to={GRAASP_LIBRARY_HOST}
      >
        {t('LIBRARY')}
      </ButtonLink>
      <ButtonLink activeProps={() => ({ fontWeight: 'bold' })} to="/about-us">
        {t('ABOUT_US')}
      </ButtonLink>
    </Stack>
  );
}
