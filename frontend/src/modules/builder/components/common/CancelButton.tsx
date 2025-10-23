import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonProps } from '@mui/material';

import { NS } from '@/config/constants';
import Button from '@/ui/buttons/Button/Button';

type Props = {
  onClick: () => void;
  color?: ButtonProps['color'];
  id?: string;
  disabled?: boolean;
};

export function CancelButton({
  id,
  onClick,
  color,
  disabled,
}: Readonly<Props>): JSX.Element {
  const { t: translateCommon } = useTranslation(NS.Common);
  return (
    <Button
      id={id}
      onClick={onClick}
      variant="text"
      color={color}
      disabled={disabled}
    >
      {translateCommon('CANCEL.BUTTON_TEXT')}
    </Button>
  );
}

export default CancelButton;
