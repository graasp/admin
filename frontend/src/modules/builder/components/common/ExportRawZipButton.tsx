import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { ListItemIcon, MenuItem } from '@mui/material';

import { PackedItem } from '@graasp/sdk';

import { useMutation } from '@tanstack/react-query';
import { PackageIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { buildExportAsZipButtonId } from '@/config/selectors';
import { exportZipMutation } from '@/openapi/client/@tanstack/react-query.gen';

type Props = {
  item: PackedItem;

  /**
   * ui context the button is located
   */
  dataUmamiContext?: string;
};

/**
 * Export folder as zip
 * This button cannot be for other item types
 */
const ExportRawZipButton = ({ item, dataUmamiContext }: Props): JSX.Element => {
  const { t: translateBuilder } = useTranslation(NS.Builder);
  const { t: translateMessage } = useTranslation(NS.Messages);

  const { mutate: exportZip } = useMutation({
    ...exportZipMutation(),
    onSuccess: () => {
      toast.success(translateMessage('EXPORT_RAW_SUCCESS_MESSAGE'));
    },
    onError: () => {
      toast.error(translateMessage('EXPORT_RAW_ERROR_MESSAGE'));
    },
  });

  return (
    <MenuItem
      id={buildExportAsZipButtonId(item.id)}
      onClick={() => exportZip({ path: { itemId: item.id } })}
      data-umami-event="export-zip"
      data-umami-event-context={dataUmamiContext}
    >
      <ListItemIcon>
        <PackageIcon />
      </ListItemIcon>
      {translateBuilder('ITEM_MENU_EXPORT_RAW_MENU_ITEM')}
    </MenuItem>
  );
};

export default ExportRawZipButton;
