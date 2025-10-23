import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

import { ListItemIcon, MenuItem } from '@mui/material';

import { DiscriminatedItem, getParentFromPath } from '@graasp/sdk';

import { CopyIcon } from 'lucide-react';

import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { ITEM_MENU_DUPLICATE_BUTTON_CLASS } from '@/config/selectors';

import { BUILDER } from '~builder/langs';

const DuplicateButton = ({
  item,
  onClick,
}: {
  onClick?: () => void;
  item: DiscriminatedItem;
}): JSX.Element => {
  const { mutate: copyItems } = mutations.useCopyItems();
  const { t: translateBuilder } = useTranslation(NS.Builder);

  const handleDuplicate = () => {
    const to = getParentFromPath(item.path);

    copyItems({
      ids: [item.id],
      to,
    });

    onClick?.();
  };

  return (
    <MenuItem
      onClick={handleDuplicate}
      key="duplicate"
      className={ITEM_MENU_DUPLICATE_BUTTON_CLASS}
    >
      <ListItemIcon>
        <CopyIcon />
      </ListItemIcon>
      {translateBuilder(BUILDER.ITEM_MENU_DUPLICATE_MENU_ITEM)}
    </MenuItem>
  );
};

export default DuplicateButton;
