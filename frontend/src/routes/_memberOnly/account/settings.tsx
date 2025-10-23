import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { createFileRoute } from '@tanstack/react-router';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { NS } from '@/config/constants';
import { SETTINGS_PAGE_CONTAINER_ID } from '@/config/selectors';
import { MemberCard } from '@/modules/home/MemberCard';

import { DeleteMemberSection } from '~account/settings/DeleteMemberSection';
import { ExportMemberData } from '~account/settings/ExportMemberData';
import { Password } from '~account/settings/password/Password';
import { Preferences } from '~account/settings/preferences/Preferences';
import { PersonalInformation } from '~account/settings/profile/PersonalInformation';
import { PublicProfile } from '~account/settings/publicProfile/PublicProfile';

export const Route = createFileRoute('/_memberOnly/account/settings')({
  component: SettingsRoute,
});

function SettingsRoute(): JSX.Element {
  const { t } = useTranslation(NS.Account);

  return (
    <ScreenLayout
      id={SETTINGS_PAGE_CONTAINER_ID}
      title={t('MAIN_MENU.SETTINGS')}
    >
      <MemberCard />
      <PersonalInformation />
      <Password />
      <PublicProfile />
      <Preferences />
      <ExportMemberData />
      <DeleteMemberSection />
    </ScreenLayout>
  );
}
