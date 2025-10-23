import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

export function ContactSection() {
  const { t } = useTranslation(NS.Landing);
  return <ButtonLink to="/contact-us">{t('CONTACT_US.TITLE')}</ButtonLink>;
}
