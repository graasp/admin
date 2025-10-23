import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, AlertTitle } from '@mui/material';

import { AccountType } from '@graasp/sdk';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  PERSONAL_INFO_DISPLAY_CONTAINER_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  PERSONAL_INFO_EMAIL_DISPLAY_ID,
  PERSONAL_INFO_EMAIL_UPDATE_ALERT_ID,
  PERSONAL_INFO_USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import { SettingItem } from '~account/settings/SettingItem';

import { EditPersonalInformation } from './EditPersonalInformation';

export function PersonalInformation(): JSX.Element | null {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useTranslation(NS.Account);

  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const onClose = () => setIsEditing(false);

  if (member?.type !== AccountType.Individual) {
    return null;
  }

  if (isEditing) {
    return (
      <EditPersonalInformation
        member={member}
        onClose={onClose}
        onEmailUpdate={setNewEmail}
      />
    );
  }
  return (
    <BorderedSection
      title={t('PERSONAL_INFORMATION_TITLE')}
      id={PERSONAL_INFO_DISPLAY_CONTAINER_ID}
      topAction={
        <Button
          key="edit"
          id={PERSONAL_INFO_EDIT_BUTTON_ID}
          onClick={() => setIsEditing(true)}
          variant="contained"
          size="small"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>
      }
    >
      <SettingItem
        key="name"
        title={t('PROFILE_MEMBER_NAME')}
        content={member?.name}
        contentId={PERSONAL_INFO_USERNAME_DISPLAY_ID}
      />
      <SettingItem
        key="email"
        title={t('PROFILE_EMAIL_TITLE')}
        content={member?.email}
        contentId={PERSONAL_INFO_EMAIL_DISPLAY_ID}
      />
      {newEmail && (
        <Alert severity="info" id={PERSONAL_INFO_EMAIL_UPDATE_ALERT_ID}>
          <AlertTitle>{t('PROFILE_EMAIL_UPDATED_ALERT_TITLE')}</AlertTitle>
          {t('PROFILE_EMAIL_UPDATED_ALERT_MESSAGE', { email: newEmail })}
        </Alert>
      )}
    </BorderedSection>
  );
}
