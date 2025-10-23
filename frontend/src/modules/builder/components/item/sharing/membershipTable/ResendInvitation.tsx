import { type JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { ITEM_RESEND_INVITATION_BUTTON_CLASS } from '@/config/selectors';
import Button from '@/ui/buttons/Button/Button';

import { BUILDER } from '../../../../langs';

type Props = {
  invitationId: string;
  itemId: string;
  disabled?: boolean;
};

const ResendInvitation = ({
  itemId,
  invitationId,
  disabled = false,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { mutate: resendInvitation } = mutations.useResendInvitation();

  const [clicked, setClicked] = useState(false);

  const resendEmail = () => {
    setClicked(true);
    resendInvitation({ itemId, id: invitationId });
  };

  return (
    <Button
      variant="text"
      onClick={resendEmail}
      disabled={clicked || disabled}
      className={ITEM_RESEND_INVITATION_BUTTON_CLASS}
      size="small"
    >
      {translateBuilder(BUILDER.SHARING_INVITATIONS_RESEND_BUTTON)}
    </Button>
  );
};

export default ResendInvitation;
