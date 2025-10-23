import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { DiscriminatedItem } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';

import { NS } from '@/config/constants';
import { buildDownloadButtonId } from '@/config/selectors';
import { downloadFileMutation } from '@/openapi/client/@tanstack/react-query.gen';
import GraaspDownloadButton from '@/ui/buttons/DownloadButton/DownloadButton';
import { ActionButton, ActionButtonVariant } from '@/ui/types';

import { BUILDER } from '../../langs';

type Props = {
  item: DiscriminatedItem;
  type?: ActionButtonVariant;
};

/**
 * Download file button
 * This button cannot be used for folders
 */
export const DownloadButton = ({
  item,
  type = ActionButton.ICON_BUTTON,
}: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);

  const { mutate: downloadItem, isPending: isDownloading } = useMutation({
    ...downloadFileMutation(),
    onSuccess: (file) => {
      const url = window.URL.createObjectURL(new Blob([file as ArrayBuffer]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', item.name);
      document.body.appendChild(link);
      link.click();
    },
    onError: () => {
      toast.error(translateMessage('DOWNLOAD_FILE_UNEXPECTED_ERROR'));
    },
  });

  const handleDownload = () => {
    downloadItem({ path: { itemId: item.id } });
  };

  return (
    <GraaspDownloadButton
      type={type}
      id={buildDownloadButtonId(item.id)}
      handleDownload={handleDownload}
      isLoading={isDownloading}
      title={translateBuilder(BUILDER.DOWNLOAD_ITEM_BUTTON)}
      ariaLabel={translateBuilder(BUILDER.DOWNLOAD_ITEM_BUTTON)}
    />
  );
};

export default DownloadButton;
