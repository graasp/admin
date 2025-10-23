import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountType } from '@graasp/sdk';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { DEFAULT_LANG, NS } from '@/config/constants';
import { LANGS } from '@/config/langs';
import { hooks } from '@/config/queryClient';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_EDIT_BUTTON_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_DISPLAY_ID,
} from '@/config/selectors';

import { SettingItem } from '~account/settings/SettingItem';

import { EditPreferences } from './EditPreferences';

export const Preferences = (): JSX.Element | null => {
  const { data: member } = hooks.useCurrentMember();

  const { t } = useTranslation(NS.Account);

  const [isEditing, setIsEditing] = useState(false);

  // in case there is no member or they are not of the individual type, we render nothing
  if (!member || member?.type !== AccountType.Individual) {
    return null;
  }

  const languageCode = (member.extra?.lang ??
    DEFAULT_LANG) as keyof typeof LANGS;
  const languageName = LANGS[languageCode];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditPreferences member={member} onClose={handleClose} />;
  }
  return (
    <BorderedSection
      title={t('PROFILE_PREFERENCES_TITLE')}
      topAction={
        <Button
          key="edit"
          variant="contained"
          onClick={handleEditClick}
          id={PREFERENCES_EDIT_BUTTON_ID}
          size="small"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>
      }
    >
      <SettingItem
        title={t('PROFILE_LANGUAGE_TITLE')}
        content={languageName}
        contentId={PREFERENCES_LANGUAGE_DISPLAY_ID}
      />
      <SettingItem
        title={t('PROFILE_EMAIL_FREQUENCY_TITLE')}
        content={
          member.extra?.emailFreq === 'always'
            ? t('ALWAYS_RECEIVE_EMAILS')
            : t('DISABLE_EMAILS')
        }
        contentId={PREFERENCES_EMAIL_FREQUENCY_ID}
      />
      <SettingItem
        title={t('PROFILE_SAVE_ACTIONS_TITLE')}
        content={
          member.enableSaveActions
            ? t('PROFILE_SAVE_ACTIONS_ENABLED')
            : t('PROFILE_SAVE_ACTIONS_DISABLED')
        }
        contentId={PREFERENCES_ANALYTICS_SWITCH_ID}
      />
    </BorderedSection>
  );
};
