import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@mui/material';

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
};

const { usePostItemValidation } = mutations;

export const UnpublishedButton = ({ item, isLoading }: Props): JSX.Element => {
  const { t } = useTranslation(NS.Builder);
  const { id: itemId, public: isPublic } = item;
  const { isOpen, openModal, closeModal } = useModalStatus();

  const { mutate: validateItem, isPending: isValidating } =
    usePostItemValidation();

  const handleValidateItem = () => {
    if (isPublic) {
      validateItem({ itemId });
    } else {
      openModal();
    }
  };

  const handleModalValidate = () => {
    validateItem({ itemId });
    closeModal();
  };

  const description = t(BUILDER.LIBRARY_SETTINGS_VALIDATION_INFORMATIONS);

  return (
    <>
      {!isPublic && (
        <PublicVisibilityModal
          item={item}
          isOpen={isOpen}
          shouldUpdateVisibility={false}
          onClose={closeModal}
          onValidate={handleModalValidate}
        />
      )}
      <PublicationButton isLoading={isLoading} description={description}>
        <Button
          variant="contained"
          onClick={handleValidateItem}
          loading={isValidating}
          data-cy={buildItemPublicationButton(PublicationStatus.Unpublished)}
        >
          {t(BUILDER.LIBRARY_SETTINGS_VALIDATION_VALIDATE_BUTTON)}
        </Button>
      </PublicationButton>
    </>
  );
};

export default UnpublishedButton;
