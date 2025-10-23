import { type JSX, createContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FlagType } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { createItemFlagMutation } from '@/openapi/client/@tanstack/react-query.gen';
import { ItemFlagDialog } from '@/ui/ItemFlag/ItemFlagDialog';

const FlagItemModalContext = createContext<{
  openModal?: (id: string) => void;
}>({});

const FlagItemModalProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { t: translateMessage } = useTranslation(NS.Messages);
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateCommon } = useTranslation(NS.Common);
  const { mutateAsync: postItemFlagAsync } = useMutation(
    createItemFlagMutation(),
  );
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState<string | null>(null);

  const openModal = (newItemId: string) => {
    setOpen(true);
    setItemId(newItemId);
  };

  const onClose = () => {
    setOpen(false);
    setItemId(null);
  };

  const onFlag = (newFlag?: FlagType) => {
    if (!itemId || !newFlag) {
      toast.error('item id or flag type is not defined');
    } else {
      postItemFlagAsync({
        path: { itemId },
        body: {
          type: newFlag,
        },
      })
        .then(() => {
          toast.success(translateMessage('POST_ITEM_FLAG'));
        })
        .catch((e) => {
          toast.error(e);
        });
    }
    onClose();
  };

  const value = useMemo(() => ({ openModal }), []);

  return (
    <FlagItemModalContext.Provider value={value}>
      <ItemFlagDialog
        flags={Object.values(FlagType)}
        onFlag={onFlag}
        open={open}
        onClose={onClose}
        descriptionText={translateBuilder('FLAG_REASON_DESCRIPTION')}
        title={translateBuilder('FLAG_MODAL_TITLE')}
        cancelButtonText={translateCommon('CANCEL.BUTTON_TEXT')}
        confirmButtonText={translateBuilder('FLAG_MODAL_CONFIRM')}
      />
      {children}
    </FlagItemModalContext.Provider>
  );
};

export { FlagItemModalProvider, FlagItemModalContext };
