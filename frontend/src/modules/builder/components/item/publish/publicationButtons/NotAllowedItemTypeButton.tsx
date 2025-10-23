import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { PublishableItemTypeChecker } from '@graasp/sdk';

import { NS } from '@/config/constants';

import { BUILDER } from '~builder/langs';

export const NotAllowedItemTypeButton = (): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { t: translateEnum } = useTranslation(NS.Enums);

  const allowedTypes = PublishableItemTypeChecker.getAllowedTypes();
  const translatedAllowedTypes = allowedTypes
    .map((e) => translateEnum(e))
    .join(', ');

  return (
    <Alert severity="info">
      {t(BUILDER.LIBRARY_SETTINGS_TYPE_NOT_ALLOWED_STATUS, {
        allowedItemTypes: translatedAllowedTypes,
        count: allowedTypes.length,
      })}
    </Alert>
  );
};

export default NotAllowedItemTypeButton;
