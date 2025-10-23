import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Skeleton, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { Button } from '@/components/ui/Button';
import { NS } from '@/config/constants';
import {
  PASSWORD_DISPLAY_CONTAINER_ID,
  PASSWORD_DISPLAY_INFORMATION_ID,
  PASSWORD_EDIT_BUTTON_ID,
} from '@/config/selectors';
import { getOwnPasswordStatusOptions } from '@/openapi/client/@tanstack/react-query.gen';

import CreatePassword from './CreatePassword';
import EditPassword from './EditPassword';

export function Password(): JSX.Element {
  const { t } = useTranslation(NS.Account);
  const { t: translateCommon } = useTranslation(NS.Common);

  const [isEditing, setIsEditing] = useState(false);
  const { data: passwordStatus, isPending: isPasswordStatusPending } = useQuery(
    getOwnPasswordStatusOptions(),
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  // show correct form if is editing
  if (isEditing && passwordStatus) {
    if (passwordStatus.hasPassword) {
      return <EditPassword onClose={handleClose} />;
    }
    return <CreatePassword onClose={handleClose} />;
  }

  // read content
  if (!isEditing) {
    return (
      <BorderedSection
        id={PASSWORD_DISPLAY_CONTAINER_ID}
        title={t('PASSWORD_TITLE')}
        topAction={
          <Button
            key="edit"
            variant="contained"
            onClick={handleEditClick}
            id={PASSWORD_EDIT_BUTTON_ID}
            size="small"
            data-umami-event="edit-password"
          >
            {passwordStatus?.hasPassword
              ? t('EDIT_BUTTON_LABEL')
              : t('CONFIGURE_BUTTON_LABEL')}
          </Button>
        }
      >
        <Typography
          id={PASSWORD_DISPLAY_INFORMATION_ID}
          variant="body1"
          color="textSecondary"
        >
          {passwordStatus?.hasPassword
            ? t('PASSWORD_SETTINGS_INFORMATION')
            : t('PASSWORD_SETTINGS_INFORMATION_NEW_PASSWORD')}
        </Typography>
      </BorderedSection>
    );
  }

  if (isPasswordStatusPending) {
    return <Skeleton />;
  }

  return <Alert severity="error">{translateCommon('ERRORS.UNEXPECTED')}</Alert>;
}
