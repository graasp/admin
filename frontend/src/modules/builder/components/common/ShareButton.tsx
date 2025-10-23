import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import {
  SHARE_ITEM_BUTTON_CLASS,
  buildShareButtonId,
} from '@/config/selectors';
import GraaspShareButton from '@/ui/buttons/ShareButton/ShareButton';

import { BUILDER } from '../../langs';

type Props = {
  itemId: string;
};

const ShareButton = ({ itemId }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  return (
    <Link to="/builder/items/$itemId/share" params={{ itemId }}>
      <GraaspShareButton
        tooltip={translateBuilder(BUILDER.SHARE_ITEM_BUTTON)}
        ariaLabel={translateBuilder(BUILDER.SHARE_ITEM_BUTTON)}
        className={SHARE_ITEM_BUTTON_CLASS}
        id={buildShareButtonId(itemId)}
      />
    </Link>
  );
};

export default ShareButton;
