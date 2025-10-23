import { type JSX, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Dialog, DialogTitle } from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { NS } from '@/config/constants';
import { EDIT_MODAL_ID } from '@/config/selectors';

import { BUILDER } from '../../../langs';
import BaseItemForm from '../form/BaseItemForm';
import { DocumentEditForm } from '../form/document/DocumentEditForm';
import { EtherpadEditForm } from '../form/etherpad/EtherpadEditForm';
import { FileForm } from '../form/file/FileForm';
import { FolderEditForm } from '../form/folder/FolderEditForm';
import { LinkEditForm } from '../form/link/LinkEditForm';
import { EditPageForm } from '../form/page/EditPageForm';
import EditShortcutForm from '../shortcut/EditShortcutForm';

type Props = {
  item: DiscriminatedItem;
  onClose: () => void;
  open: boolean;
};

export function EditModal({
  item,
  onClose,
  open,
}: Readonly<Props>): JSX.Element {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);

  // updated properties are separated from the original item
  // so only necessary properties are sent when editing
  const [updatedItem, setUpdatedItem] = useState<DiscriminatedItem>(item);

  useEffect(() => {
    if (item.id !== updatedItem.id) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setUpdatedItem(item);
    }
  }, [item, updatedItem.id]);

  // temporary solution for displaying separate dialog content
  const renderContent = () => {
    if (item.type === ItemType.FOLDER) {
      return <FolderEditForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.FILE) {
      return <FileForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.SHORTCUT) {
      return <EditShortcutForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.DOCUMENT) {
      return <DocumentEditForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.ETHERPAD) {
      return <EtherpadEditForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.LINK) {
      return <LinkEditForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.APP || item.type === ItemType.H5P) {
      return <BaseItemForm onClose={onClose} item={item} />;
    }
    if (item.type === ItemType.PAGE) {
      return <EditPageForm onClose={onClose} item={item} />;
    }

    toast.error(translateMessage('UNEXPECTED_ERROR'));

    return null;
  };

  return (
    <Dialog
      onClose={onClose}
      id={EDIT_MODAL_ID}
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id={item?.id}>
        {translateBuilder(BUILDER.EDIT_ITEM_MODAL_TITLE)}
      </DialogTitle>
      {renderContent()}
    </Dialog>
  );
}
