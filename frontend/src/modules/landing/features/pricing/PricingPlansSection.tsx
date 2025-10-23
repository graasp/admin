import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

import { IncludedOption } from './IncludedOption';
import { PlanLayout } from './PlanLayout';

type PricingPlanProps = {
  name: string;
  storage: string;
  support: string;
  templates: string;
  price: string;
};
export function PricingPlan({
  name,
  storage,
  support,
  templates,
  price,
}: Readonly<PricingPlanProps>) {
  return (
    <PlanLayout name={name} price={price}>
      <IncludedOption text={storage} />
      <IncludedOption text={support} />
      <IncludedOption text={templates} />
    </PlanLayout>
  );
}

export function PricingPlansSection() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'FEATURES.PRICING' });
  return (
    <Stack maxWidth="lg" gap={4} alignItems="center">
      <Typography color="primary" variant="h2">
        {t('TITLE')}
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
        <PricingPlan
          name={t('FREE.NAME')}
          storage={t('FREE.STORAGE')}
          support={t('FREE.SUPPORT')}
          templates={t('FREE.TEMPLATES')}
          price={t('FREE.PRICE')}
        />
        <PricingPlan
          name={t('PREMIUM.NAME')}
          storage={t('PREMIUM.STORAGE')}
          support={t('PREMIUM.SUPPORT')}
          templates={t('PREMIUM.TEMPLATES')}
          price={t('PREMIUM.PRICE')}
        />
        <PlanLayout name={t('CUSTOM.NAME')} price={t('CUSTOM.GET_A_QUOTE')}>
          <Typography textAlign="center">{t('CUSTOM.CONTACT_US')}</Typography>
        </PlanLayout>
      </Stack>
      <ButtonLink variant="contained" to="/home">
        {t('CALL_TO_ACTION')}
      </ButtonLink>
    </Stack>
  );
}
