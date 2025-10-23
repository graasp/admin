import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Button } from '@mui/material';

import { Context, PackedItem, PublicationStatus } from '@graasp/sdk';

import { LinkIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { buildItemPublicationButton } from '@/config/selectors';
import { ClientManager } from '@/lib/ClientManager';

import PublicationButton from './PublicationButton';

type Props = {
  item: PackedItem;
  isLoading: boolean;
};

const { useUnpublishItem } = mutations;

export const PublishedButton = ({ item, isLoading }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { id: itemId } = item;

  const { mutate: unpublish, isPending: isUnPublishing } = useUnpublishItem();

  const handleUnPublishItem = () => unpublish({ id: itemId });

  const getLibraryLink = () => {
    const clientManager = ClientManager.getInstance();
    return clientManager.getItemLink(Context.Library, itemId);
  };

  const description = <Alert>{t('LIBRARY_SETTINGS_PUBLISHED_STATUS')}</Alert>;

  return (
    <PublicationButton isLoading={isLoading} description={description}>
      <Button
        variant="outlined"
        loading={isUnPublishing}
        onClick={handleUnPublishItem}
        data-cy={buildItemPublicationButton(PublicationStatus.Published)}
      >
        {t('LIBRARY_SETTINGS_UNPUBLISH_BUTTON')}
      </Button>
      <Button
        variant="contained"
        startIcon={<LinkIcon />}
        href={getLibraryLink()}
        target="_blank"
      >
        {t('LIBRARY_SETTINGS_VIEW_LIBRARY_BUTTON')}
      </Button>
    </PublicationButton>
  );
};

export default PublishedButton;
