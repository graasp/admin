import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@mui/material';

import { PackedItem, PublicationStatus } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { buildItemPublicationButton } from '@/config/selectors';

import useModalStatus from '~builder/components/hooks/useModalStatus';
import { BUILDER } from '~builder/langs';

import PublicVisibilityModal from '../PublicVisibilityModal';
import PublicationButton from './PublicationButton';

type Props = {
  item: PackedItem;
  isLoading: boolean;
  notifyCoEditors: boolean;
};

const { usePublishItem } = mutations;

export const ReadyToPublishButton = ({
  item,
  isLoading,
  notifyCoEditors,
}: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { id: itemId, public: isPublic } = item;
  const { isOpen, openModal, closeModal } = useModalStatus();

  const { mutate: publish, isPending: isPublishing } = usePublishItem();

  const publishItem = () =>
    publish({ id: itemId, notification: notifyCoEditors });

  const handlePublishItem = () => {
    if (isPublic) {
      publishItem();
    } else {
      openModal();
    }
  };

  const handleModalValidate = () => {
    publishItem();
    closeModal();
  };

  const description = (
    <Typography>
      {t(BUILDER.LIBRARY_SETTINGS_VALIDATION_STATUS_READY_TO_PUBLISH)}
    </Typography>
  );

  return (
    <>
      {!isPublic && (
        <PublicVisibilityModal
          item={item}
          isOpen={isOpen}
          onClose={closeModal}
          onValidate={handleModalValidate}
        />
      )}
      <PublicationButton isLoading={isLoading} description={description}>
        <Button
          variant="contained"
          loading={isPublishing}
          onClick={handlePublishItem}
          data-cy={buildItemPublicationButton(PublicationStatus.ReadyToPublish)}
        >
          {t(BUILDER.LIBRARY_SETTINGS_PUBLISH_BUTTON)}
        </Button>
      </PublicationButton>
    </>
  );
};

export default ReadyToPublishButton;
