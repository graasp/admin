import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Tooltip } from '@mui/material';

import { Link } from '@tanstack/react-router';
import { LibraryBigIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import {
  PUBLISH_ITEM_BUTTON_CLASS,
  buildPublishButtonId,
} from '@/config/selectors';

import { BUILDER } from '../../langs';

type Props = {
  itemId: string;
};

const PublishButton = ({ itemId }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const title = translateBuilder(BUILDER.LIBRARY_SETTINGS_BUTTON_TITLE);

  return (
    <Tooltip title={title}>
      <Link to="/builder/items/$itemId/publish" params={{ itemId }}>
        <IconButton
          aria-label={title}
          className={PUBLISH_ITEM_BUTTON_CLASS}
          id={buildPublishButtonId(itemId)}
        >
          <LibraryBigIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export default PublishButton;
