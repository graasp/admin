import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { NS } from '@/config/constants';

import { BUILDER } from '../../langs';

type Props = {
  id?: string;
};

const ErrorAlert = ({ id }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  return (
    <Alert id={id} severity="error">
      {translateBuilder(BUILDER.ERROR_MESSAGE)}
    </Alert>
  );
};

export default ErrorAlert;
